<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const items: KBreadcrumbItem[] = [
  { label: '首页', icon: 'home', path: '/' },
  { label: '组件库', icon: 'kubie', path: '/menu' },
  { label: '导航', icon: 'more' },
]
</script>

<template>
  <div class="demo-col">
    <p class="demo-tip">通过 :items 的 icon 字段，每个面包屑项可前置图标。</p>
    <KBreadcrumb :items="items" />
  </div>
</template>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.demo-tip {
  margin: 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
