<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const items: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '组件', path: '/button' },
  { label: '数据展示' },
]
</script>

<template>
  <div class="demo-row">
    <KBreadcrumb :items="items" />
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
