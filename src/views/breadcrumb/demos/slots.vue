<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import KTag from '@/components/tag/index'
import KIcon from '@/components/icon/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const items: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '组件' },
  { label: '面包屑' },
]

const many: KBreadcrumbItem[] = [
  { label: '甲', path: '/' },
  { label: '乙', path: '/alert' },
  { label: '丙', path: '/card' },
  { label: '丁', path: '/tag' },
  { label: '当前' },
]
</script>

<template>
  <div class="demo-col">
    <p class="demo-tip">#item 插槽完全自定义单项（可自由插入 link 等）</p>
    <KBreadcrumb :items="items">
      <template #item="{ item, index }">
        <span class="c-item">{{ index + 1 }}. {{ item.label }}</span>
      </template>
    </KBreadcrumb>

    <p class="demo-tip">#separator 插槽自定义分隔符（此处用 iconfont 图标）</p>
    <KBreadcrumb :items="items">
      <template #separator>
        <KIcon name="arrow-right-bold" class="c-sep" />
      </template>
    </KBreadcrumb>

    <p class="demo-tip">#more 插槽定制折叠占位（显示被省略数量）</p>
    <KBreadcrumb :items="many" :max-items="3">
      <template #more="{ from, to }">
        <KTag size="small" type="info">+{{ to - from }}</KTag>
      </template>
    </KBreadcrumb>
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
.c-item {
  color: var(--k-color-primary);
  font-weight: 600;
}
.c-sep {
  color: var(--k-color-warning);
  font-size: 14px;
}
</style>
