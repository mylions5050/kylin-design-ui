<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// 固定窄列宽 + 列多一些，让长内容（邮箱、地址）溢出，hover 显示完整 tooltip。
// tooltip-theme 切换 tooltip 配色（默认 dark）。
const columns: BaseTableColumn<User>[] = [
  { field: 'id', title: 'ID', width: 60 },
  { field: 'name', title: '姓名', width: 80 },
  { field: 'email', title: '邮箱地址', width: 100 },
  { field: 'role', title: '角色', width: 80 },
  { field: 'status', title: '状态', width: 80 },
  { field: 'age', title: '年龄', width: 60 },
  { field: 'address', title: '详细地址（悬停看完整）', width: 140 },
  { field: 'email', title: '备用邮箱', width: 110 },
]

const tooltipTheme = ref<'light' | 'dark'>('dark')
</script>

<template>
  <p class="hint">tooltip 主题：</p>
  <div class="theme-toggle">
    <button
      v-for="t in (['dark', 'light'] as const)"
      :key="t"
      class="btn"
      :class="{ 'is-active': tooltipTheme === t }"
      @click="tooltipTheme = t"
    >
      {{ t === 'dark' ? '深色' : '浅色' }}
    </button>
  </div>
  <BaseTable :columns="columns" :data="users" show-overflow-tooltip :tooltip-theme="tooltipTheme" />
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 8px;
  font-size: 13px;
  color: #666;
}

.theme-toggle {
  display: inline-flex;
  gap: 8px;
  margin-bottom: 12px;
}

.btn {
  padding: 4px 14px;
  border: 1px solid #d3ddec;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #3c4b62;

  &:hover {
    color: #0a96e6;
    border-color: #0a96e6;
  }

  &.is-active {
    color: #fff;
    background: #0a96e6;
    border-color: #0a96e6;
  }
}
</style>
