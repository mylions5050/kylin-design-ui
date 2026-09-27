<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const routeItems: KBreadcrumbItem[] = [
  { label: '首页', to: { path: '/' } },
  { label: '带参数的详情', to: { name: 'breadcrumb', query: { from: 'demo' } } },
  { label: '当前页' },
]

const replaceItems: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '组件', path: '/table' },
  { label: '表格' },
]

const externalItems: KBreadcrumbItem[] = [
  { label: 'Vue 官网', href: 'https://vuejs.org', target: '_blank' },
  { label: 'Github', href: 'https://github.com', target: '_blank' },
  { label: '文档' },
]

const newTabRouteItems: KBreadcrumbItem[] = [
  { label: '新的标签打开表单', to: { path: '/input' }, target: '_blank' },
  { label: '当前页' },
]
</script>

<template>
  <div class="demo-col">
    <p class="demo-tip">to 支持路由对象（{ path } / { name, query }…），比字符串 path 更加灵活</p>
    <KBreadcrumb :items="routeItems" />

    <p class="demo-tip">replace 为 true 时跳转不留历史记录（组件级默认，item 可单独覆盖）</p>
    <KBreadcrumb :items="replaceItems" replace />

    <p class="demo-tip">target="_blank" 支持 href 外部链接在新标签页打开</p>
    <KBreadcrumb :items="externalItems" />

    <p class="demo-tip">target="_blank" 也可对内部路由项生效（以新标签页打开对应路由）</p>
    <KBreadcrumb :items="newTabRouteItems" />
  </div>
</template>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.demo-tip {
  margin: 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
