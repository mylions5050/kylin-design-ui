#!/usr/bin/env node
/**
 * gen-api — 自动从 TSX 组件源码中提取 Props / Emits / Slots，生成 API 表格数据。
 *
 * 用法：node scripts/gen-api.mjs <组件路径> <输出路径>
 *   - <组件路径>：组件 index.tsx 的绝对或相对路径
 *   - <输出路径>：生成的 .ts 数据文件路径（默认 <组件目录>/api-data.ts）
 *
 * 原理：
 *   1) 用 TypeScript AST 解析 defineComponent({ props, emits, setup }) 对象式 props；
 *   2) 用 getLeadingCommentRange 读取每个 prop 上方的 JSDoc 作为中文说明；
 *   3) 解析 types.ts 中引用的联合类型别名，展开为可读的类型字符串；
 *   4) 扫描 setup 返回的 render 里的 slots.xxx 提取隐式插槽。
 *
 * 说明：中文描述来自 prop 的 JSDoc；若源码注释为英文，脚本原样保留（可后续本地化）。
 */
import { createRequire } from 'node:module'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const [, , entryPathArg, outPathArg] = process.argv
if (!entryPathArg) {
  console.error('用法：node scripts/gen-api.mjs <index.tsx 路径> [输出 .ts 路径]')
  process.exit(1)
}

const entryPath = resolve(entryPathArg)
const outPath = outPathArg
  ? resolve(outPathArg)
  : resolve(dirname(entryPath), 'api-data.ts')

/** 读取源码并建 AST */
const src = await import('node:fs').then((fs) => fs.readFileSync(entryPath, 'utf8'))
const sf = ts.createSourceFile(
  entryPath,
  src,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
)

/** 解析节点的 JSDoc 注释（取 /** *\/ 块里的首行文字）。传入 source 以匹配对应文件的行号。 */
function getJsDoc(node, source = src) {
  const ranges = ts.getLeadingCommentRanges(source, node.pos)
  if (!ranges) return ''
  const comment = source.slice(ranges[0].pos, ranges[0].end)
  const body = comment
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*+\s?/, '').trim())
    .filter((l) => l && !l.startsWith('@'))
    .join(' ')
    .trim()
  return body
}

/** 从节点统一获取名字（支持 PropertyAssignment / MethodDeclaration） */
function getName(node) {
  if (!node || !node.name) return ''
  return node.name.text ?? node.name.getText(sf) ?? ''
}

/** 从 types.ts 的 interface XxxProps 里读取每个 prop 的 JSDoc 描述，写入 descMap */
function loadPropsDescsFromInterface(descMap) {
  const typesFile = resolve(dirname(entryPath), 'types.ts')
  if (!existsSync(typesFile)) return
  const tsrc = require('node:fs').readFileSync(typesFile, 'utf8')
  const tsf = ts.createSourceFile(typesFile, tsrc, ts.ScriptTarget.Latest, true)
  for (const st of tsf.statements) {
    if (!ts.isInterfaceDeclaration(st)) continue
    for (const member of st.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue
      const name = member.name.getText(tsf)
      const doc = getJsDoc(member, tsrc)
      if (doc && !descMap.has(name)) descMap.set(name, doc)
    }
  }
}

/** 把 tsx props 对象解析成 prop 元数据数组 */
function extractProps(propsNode) {
  if (!propsNode || !ts.isObjectLiteralExpression(propsNode)) return []
  // 优先从 types.ts 的 Props 接口读取描述（通常比 tsx 内注释更完整）
  const descMap = new Map()
  loadPropsDescsFromInterface(descMap)
  const result = []
  for (const prop of propsNode.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = prop.name.text ?? prop.name.getText(sf)
    const init = prop.initializer
    // 支持两种写法：A) { type, default }  B) 直接值（如 type: String）
    let typeStr = ''
    let defaultValue = '—'
    let desc = descMap.get(name) ?? getJsDoc(prop)
    if (ts.isObjectLiteralExpression(init)) {
      for (const p of init.properties) {
        if (!ts.isPropertyAssignment(p)) continue
        const key = p.name.text ?? p.name.getText(sf)
        if (key === 'type') {
          typeStr = typeToString(p.initializer)
        } else if (key === 'default') {
          defaultValue = defaultToString(p.initializer)
        } else if (key === 'required') {
          // 处理 required 布尔
        }
      }
    } else {
      typeStr = typeToString(init)
    }
    result.push({ name, type: typeStr, default: defaultValue, required: false, desc })
  }
  return result
}

/** 把 prop 的 type 表达式转成可读字符串，展开类型别名引用 */
function typeToString(expr) {
  if (!expr) return ''
  // 处理 `String as PropType<X>` / `as const` 等 as 断言
  if (ts.isAsExpression(expr)) {
    return typeToString(expr.type)
  }
  // 处理 <T>x 类型断言
  if (ts.isTypeAssertionExpression(expr)) {
    return typeToString(expr.type)
  }
  // PropType<ButtonType> → 取泛型参数再解析
  if (ts.isTypeReferenceNode(expr)) {
    if (expr.typeArguments && expr.typeArguments.length) {
      // 只要泛型参数（PropType<X> 取 X；也处理 Array<X> 取 X[]）
      const inner = typeToString(expr.typeArguments[0])
      const name = ts.isIdentifier(expr.typeName) ? expr.typeName.text : expr.typeName.getText(sf)
      return name.toLowerCase() === 'array' ? `${inner}[]` : inner
    }
    return ts.isIdentifier(expr.typeName) ? expandTypeAlias(expr.typeName.text) : expr.getText(sf)
  }
  if (ts.isIdentifier(expr)) {
    return expandTypeAlias(expr.text)
  }
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return `'${expr.text}'`
  }
  if (ts.isLiteralTypeNode(expr)) {
    const inner = expr.literal
    if (ts.isStringLiteral(inner)) return `'${inner.text}'`
    if (inner.kind === ts.SyntaxKind.TrueKeyword) return 'true'
    if (inner.kind === ts.SyntaxKind.FalseKeyword) return 'false'
    return inner.getText(sf)
  }
  if (ts.isUnionTypeNode(expr)) {
    return expr.types.map((t) => typeToString(t)).join(' | ')
  }
  if (ts.isArrayTypeNode(expr)) {
    return `${typeToString(expr.elementType)}[]`
  }
  return expr.getText(sf)
}

/** 展开类型别名（从 types.ts 里解析 export type X = A | B） */
const typeAliasCache = {}
function expandTypeAlias(name) {
  if (typeAliasCache[name]) return typeAliasCache[name]
  const typesFile = resolve(dirname(entryPath), 'types.ts')
  if (!existsSync(typesFile)) return name
  const tsrc = require('node:fs').readFileSync(typesFile, 'utf8')
  const tsf = ts.createSourceFile(typesFile, tsrc, ts.ScriptTarget.Latest, true)
  const aliases = new Map()
  for (const st of tsf.statements) {
    if (ts.isTypeAliasDeclaration(st)) {
      aliases.set(st.name.text, st)
    }
  }
  const alias = aliases.get(name)
  if (!alias) return name
  const cache = resolveTypeText(alias.type, aliases)
  typeAliasCache[name] = cache
  return cache
}

/** 递归把类型节点转成字符串，并展开嵌套的类型别名 */
function resolveTypeText(node, aliases) {
  if (ts.isUnionTypeNode(node)) {
    return node.types.map((t) => resolveTypeText(t, aliases)).join(' | ')
  }
  if (ts.isLiteralTypeNode(node)) {
    const l = node.literal
    if (ts.isStringLiteral(l)) return `'${l.text}'`
    if (l.kind === ts.SyntaxKind.NullKeyword) return 'null'
    if (l.kind === ts.SyntaxKind.TrueKeyword) return 'true'
    if (l.kind === ts.SyntaxKind.FalseKeyword) return 'false'
    return l.getText()
  }
  if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
    const sub = aliases.get(node.typeName.text)
    if (sub) return resolveTypeText(sub.type, aliases)
    return node.typeName.text
  }
  if (ts.isArrayTypeNode(node)) {
    return `${resolveTypeText(node.elementType, aliases)}[]`
  }
  if (ts.isParenthesizedTypeNode(node)) {
    return `(${resolveTypeText(node.type, aliases)})`
  }
  return node.getText()
}

/** 把 default 表达式转成字符串 */
function defaultToString(expr) {
  if (!expr) return '—'
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return `'${expr.text}'`
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return 'true'
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return 'false'
  if (ts.isNumericLiteral(expr)) return expr.text
  if (ts.isArrayLiteralExpression(expr)) return expr.getText(sf)
  if (ts.isObjectLiteralExpression(expr)) return expr.getText(sf)
  if (ts.isIdentifier(expr)) return expr.text
  return expr.getText(sf)
}

/** 从 defineComponent 对象里找 props 节点 */
function findDefineComponent() {
  let compProps = null
  let compEmits = null
  let setupRender = null
  let found = false

  function visit(node) {
    if (found) return
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      if (ts.isIdentifier(callee) && callee.text === 'defineComponent') {
        const arg = node.arguments[0]
        if (arg && ts.isObjectLiteralExpression(arg)) {
          for (const prop of arg.properties) {
            const key = getName(prop)
            if (key === 'props' && ts.isPropertyAssignment(prop)) compProps = prop.initializer
            else if (key === 'emits' && ts.isPropertyAssignment(prop)) compEmits = prop.initializer
            else if (key === 'setup') {
              // setup 可能是普通箭头(PropertyAssignment)或方法简写(MethodDeclaration)
              setupRender = ts.isPropertyAssignment(prop) ? prop.initializer : prop
            }
          }
          found = true
        }
        return
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  return { compProps, compEmits, setupRender }
}

/** 提取 emits 数组 */
function extractEmits(emitsNode) {
  if (!emitsNode) return []
  if (ts.isArrayLiteralExpression(emitsNode)) {
    return emitsNode.elements.map((el) => el.text ?? el.getText(sf))
  }
  if (ts.isObjectLiteralExpression(emitsNode)) {
    return emitsNode.properties.map((p) => (ts.isPropertyAssignment(p) ? p.name.text : p.getText(sf)))
  }
  return []
}

/** 扫描 setup 返回的 render，找 slots.xxx 提取插槽 */
function extractSlots(setupNode) {
  const slots = new Set()
  if (!setupNode) return [...slots]
  function visit(node) {
    // 形如 slots.xxx 或 slots['xxx']
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'slots') {
      if (ts.isIdentifier(node.name)) slots.add(node.name.text)
    }
    if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'slots') {
      if (ts.isStringLiteral(node.argumentExpression)) slots.add(node.argumentExpression.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(setupNode)
  return [...slots]
}

// ============ 主流程 ============
const { compProps, compEmits, setupRender } = findDefineComponent()

const props = extractProps(compProps)
const emits = extractEmits(compEmits)
const slots = extractSlots(setupRender)

// 输出 .ts 数据文件（含类型注解，便于编辑器提示）
const lines = []
lines.push(`/** 该文件由 scripts/gen-api.mjs 自动生成，请勿手改。重新生成：node scripts/gen-api.mjs ${entryPath} */`)
lines.push('')
lines.push("import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'")
lines.push('')
lines.push('export type { ApiPropRow, ApiEventRow, ApiSlotRow }')
lines.push('')

lines.push('export const apiProps: ApiPropRow[] = [')
props.forEach((p) => {
  lines.push(`  { name: '${p.name}', type: ${JSON.stringify(p.type)}, default: ${JSON.stringify(p.default)}, required: ${p.required}, desc: ${JSON.stringify(p.desc)} },`)
})
lines.push(']')
lines.push('')

lines.push('export const apiEmits: ApiEventRow[] = [')
emits.forEach((e) => lines.push(`  { name: '${e}', desc: '' },`))
lines.push(']')
lines.push('')

lines.push('export const apiSlots: ApiSlotRow[] = [')
slots.forEach((s) => lines.push(`  { name: '${s}', desc: '' },`))
lines.push(']')
lines.push('')

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, lines.join('\n'), 'utf8')

console.log(`✓ 已生成 ${outPath}`)
console.log(`  Props: ${props.length} 个 | Emits: ${emits.length} 个 | Slots: ${slots.length} 个`)
console.table(props.map((p) => ({ name: p.name, type: p.type, default: p.default, desc: p.desc })))
