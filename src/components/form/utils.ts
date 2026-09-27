import Schema from 'async-validator'
import type {
  FormInvalidFields,
  FormItemRule,
  FormItemRule as FormItemRuleAlias,
} from './types'

/** 按点路径取值：getPropValue({ profile: { age: 1 } }, 'profile.age') → 1 */
export function getPropValue(model: Record<string, any>, prop: string): any {
  return prop.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), model)
}

/** 按点路径写值（中间节点不存在时自动创建对象） */
export function setPropValue(model: Record<string, any>, prop: string, value: any): void {
  const keys = prop.split('.')
  const last = keys.pop() as string
  let acc: Record<string, any> = model
  for (const key of keys) {
    if (acc[key] == null || typeof acc[key] !== 'object') acc[key] = {}
    acc = acc[key]
  }
  acc[last] = value
}

/** 把单条/多条规则统一成数组，方便给 async-validator */
export function normalizeRules(rule: FormItemRule | FormItemRule[] | undefined): FormItemRule[] {
  if (!rule) return []
  return Array.isArray(rule) ? rule : [rule]
}

/**
 * 对单个字段执行 async-validator 校验。
 * 通过 resolve；失败 reject（e.errors 为错误数组，e.fields 为按字段归类集合）。
 */
export function runRules(field: string, rules: FormItemRuleAlias[], value: any): Promise<void> {
  // async-validator 的 RuleItem 类型较窄（index signature 冲突），此处放宽
  const schema = new Schema({ [field]: rules } as any)
  return schema
    .validate({ [field]: value }, { firstFields: true })
    .then(() => undefined)
    .catch((e) => {
      throw e as { errors: Array<{ message?: string }>; fields: FormInvalidFields }
    })
}
