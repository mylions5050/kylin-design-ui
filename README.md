# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

---

## 组件演示页：API 表格与代码展示

组件演示页（`src/views/<组件>/index.vue`）底部统一展示三栏 API 表格（Props / Events / Slots），并支持每个用例的"查看源码 / 复制"。

### API 表格怎么来的（自动生成）

`src/components/api-table` 是本项目内部的轻量文档表格组件，数据由脚本自动从组件源码提取，不手写。

1. **生成数据**：`node scripts/gen-api.mjs <组件 index.tsx 路径> <输出 api-data.ts 路径>`
   - 例：`node scripts/gen-api.mjs src/components/button/index.tsx src/views/button/api-data.ts`
   - 脚本用 TypeScript AST 解析 `defineComponent` 的 `props` / `emits` / `setup`，展开 `types.ts` 里的联合类型别名，输出 `api-data.ts`（纯数据、勿手改）。
2. **接入页面**：在演示页底部渲染
   ```
   <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
   ```

### 中文说明从哪来（规范：单一来源）

**API 表格里的"说明"列 = 组件源码 JSDoc 注释的原文，脚本不做翻译、只做搬运。** 所以要把说明写成什么语言，取决于源码注释写什么语言。

规范约定：**组件所有 prop / emit / type 别名的 JSDoc 注释统一使用中文**，写在「离代码最近」的 `types.ts` 里有对应 prop 的上方（或 tsx 里的行内注释），这样 API 表格自动展示中文、且和代码永远同步，不会出现"改了代码忘了改文档"的漂移。

- `types.ts` 的 `interface XxxProps` 里每个字段上方写 `/** 中文说明 */`，脚本优先从这里取描述。
- 类型别名（如 `ButtonType`）的 JSDoc 也建议中文，便于阅读。
- 若某 prop 只定义在 tsx 里（未进 `ButtonProps` 接口），则在 tsx 的 prop 上方写行内中文注释。
- 改完注释后重跑 gen-api 脚本即可刷新 `api-data.ts`。

