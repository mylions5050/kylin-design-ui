<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import { useTheme } from '@/composables/useTheme'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// 固定列宽 + 排序 + 行状态 + 选中，展示深色模式下的完整样式
const columns: BaseTableColumn<User>[] = [
  { field: 'id', title: 'ID', width: 80, sortable: true },
  { field: 'name', title: '姓名', width: 100, sortable: true },
  { field: 'email', title: '邮箱', width: 180 },
  { field: 'role', title: '角色', width: 100 },
  { field: 'status', title: '状态', width: 120 },
  { field: 'age', title: '年龄', width: 80, sortable: true },
  { field: 'registrationDate', title: '注册日期', width: 120, sortable: true },
]

const selectedKeys = ref<(string | number)[]>([])

const { theme, toggleTheme, setTheme } = useTheme()
</script>

<template>
  <div>
    <div class="controls">
      <p class="hint">当前主题: {{ theme === 'dark' ? '深色模式' : '浅色模式' }}</p>
      <div class="theme-buttons">
        <button class="btn" @click="setTheme('light')">
          浅色
        </button>
        <button class="btn" @click="toggleTheme">
          切换
        </button>
        <button class="btn" @click="setTheme('dark')">
          深色
        </button>
      </div>
    </div>

    <BaseTable
      :columns="columns"
      :data="users"
      multiple
      resizable
      zebra
      border
      rowKey="id"
      v-model:selectedKeys="selectedKeys"
      showOverflowTooltip
    />
  </div>
</template>

<style scoped lang="scss">
.controls {
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--k-color-bg-secondary);
  border: 1px solid var(--k-color-border);

  .hint {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: var(--k-color-text);
    font-weight: 600;
  }

  .theme-buttons {
    display: flex;
    gap: 8px;
  }

  .btn {
    padding: 6px 16px;
    border: 1px solid var(--k-color-border);
    border-radius: 4px;
    background: var(--k-color-bg);
    cursor: pointer;
    font-size: 13px;
    color: var(--k-color-text);
    transition: all 0.2s ease;

    &:hover {
      color: var(--k-color-primary);
      border-color: var(--k-color-primary);
      background: var(--k-color-bg-hover);
    }
  }
}
</style>