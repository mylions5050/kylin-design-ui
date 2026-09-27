<script setup lang="ts">
import { ref } from 'vue'
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const log = ref('暂无事件。点击上面的可点击项试试（当前页不可点击）。')

const items: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '文档', path: '/menu' },
  { label: '面包屑' },
]

function onItemClick({ item, index, e }: { item: KBreadcrumbItem; index: number; e: Event }) {
  e.preventDefault() // 阻止默认的 router 跳转，仅演示事件
  log.value = `click-item 触发了：点击了第 ${index + 1} 项「${item.label}」`
}
</script>

<template>
  <div class="demo-col">
    <KBreadcrumb :items="items" @click-item="onItemClick" />
    <span class="demo-log">{{ log }}</span>
  </div>
</template>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-log {
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
