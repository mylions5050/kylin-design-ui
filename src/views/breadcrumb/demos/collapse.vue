<script setup lang="ts">
import KBreadcrumb from '@/components/breadcrumb/index'
import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

const many: KBreadcrumbItem[] = [
  { label: '一级菜单', path: '/' },
  { label: '二级菜单', path: '/checkbox' },
  { label: '三级菜单', path: '/radio' },
  { label: '四级菜单', path: '/select' },
  { label: '五级菜单', path: '/input' },
  { label: '当前页面' },
]
</script>

<template>
  <div class="demo-col">
    <p class="demo-tip">默认折叠（maxItems=3，保留首 1 + 末 1，中间省略为 …）</p>
    <KBreadcrumb :items="many" :max-items="3" />

    <p class="demo-tip">保留首 2 + 末 1（items-before-collapse="2"）</p>
    <KBreadcrumb :items="many" :max-items="3" :items-before-collapse="2" />

    <p class="demo-tip">永远不折叠（maxItems=0）</p>
    <KBreadcrumb :items="many" />
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
