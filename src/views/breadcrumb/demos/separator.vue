<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const base: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '我的订单' },
  { label: '订单详情' },
]
</script>

<template>
  <div class="demo-col">
    <p class="demo-tip">字符串分隔符：&gt; 符号</p>
    <KBreadcrumb :items="base" separator=">" />

    <p class="demo-tip">iconfont 图标分隔符：iconSeparator + separator="right"</p>
    <KBreadcrumb :items="base" separator="right" icon-separator />
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
