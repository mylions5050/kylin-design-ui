<script setup lang="ts">
import { ref, computed } from 'vue'
import KBreadcrumb from '@/components/breadcrumb/index'
import KCheckbox from '@/components/checkbox/index'

import type { KBreadcrumbItem } from '@/components/breadcrumb/index'

// 模拟"管理中台"下拉级是否可见（业务中常按权限/角色/菜单配置动态决定）
const showMiddle = ref(true)

const items = computed<KBreadcrumbItem[]>(() => [
  { label: '首页', path: '/' },
  { label: '管理中台', show: showMiddle.value, href: 'https://example.com/admin' },
  { label: '报表中心' },
  { label: '当前页面' },
])
</script>

<template>
  <div class="demo-col">
    <div class="switch-row">
      <KCheckbox :checked="showMiddle" @change="(v: boolean) => (showMiddle = v)">
        显示「管理中台」这一级
      </KCheckbox>
    </div>
    <KBreadcrumb :items="items" />
    <p class="demo-tip">取消勾选后，中间级「管理中台」及其分隔符会被过滤隐藏，后级顺延、末页高亮保持正确。</p>
  </div>
</template>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
.switch-row {
  display: inline-flex;
  align-items: center;
  /* KCheckbox 自身含方框，文字紧随其后 */
}
.demo-tip {
  margin: 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
