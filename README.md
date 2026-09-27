# Kylin Design UI

<div align="center">

<img src="https://raw.githubusercontent.com/mylions5050/kylin-design-ui/main/src/assets/logo.svg" width="88" alt="Kylin Design UI" />

**麒麟为之，企业级 Vue 3 组件库**

[![npm](https://img.shields.io/badge/npm-kylin--design--ui-1677ff)](https://www.npmjs.com/package/kylin-design-ui)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

</div>

基于 **Vue 3 + TypeScript** 打造的企业级组件库，50+ 高质量 **K 前缀**组件开箱即用。

## 特性

- 🧩 **50+ 企业级组件** —— 从 Button、Table 到类 Excel 的 SupTable 超级表格，覆盖中后台常见场景
- 🔷 **完整类型** —— 全部组件 `<script setup>` + TSX 编写，导出完整 `.d.ts`，Props 提示开箱即得
- 📦 **按需引入** —— ESM + Tree-shaking 友好导出，`withInstall` 支持全量 `app.use` 与单组件注册
- 🎨 **主题变量定制** —— 样式基于 CSS Design Tokens，覆盖变量即换肤，明暗双主题自动联动
- ⚡ **命令式 API** —— `notice` / `message` / `v-loading` 指令开箱即用，无需在模板中挂载组件
- ✅ **测试保障** —— Vitest 139 个单元测试全通过

## 安装

```bash
npm install kylin-design-ui
```

## 快速开始

### 全量引入

```ts
// main.ts
import { createApp } from 'vue'
import KylinUI from 'kylin-design-ui'
import 'kylin-design-ui/style.css'
import App from './App.vue'

createApp(App).use(KylinUI).mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { KButton, KSwitch, notice } from 'kylin-design-ui'
import 'kylin-design-ui/style.css'
</script>

<template>
  <KButton type="primary" @click="notice.success('保存成功')">保存</KButton>
  <KSwitch v-model="enabled" />
</template>
```

## 明星组件：SupTable 超级表格

类 Excel 的可编辑表格：单元格选择与填充柄拖拽、行列增删、列宽自适应、列选中等能力开箱即用。

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 启动演示站（含安装指南 / 组件总览 / 交互式示例）
npm run test       # 运行单元测试
npm run build:lib  # 构建库产物（ESM / UMD / CSS / d.ts）
```

## 开源协议

[MIT](./LICENSE)
