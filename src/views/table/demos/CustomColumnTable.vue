<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态', emptyText: false },
  { field: 'action', title: '操作', emptyText: false },
]

const stateMeta: Record<User['state'], { bg: string; color: string; label: string }> = {
  success: { bg: '#e6f2fb', color: '#0a6ebd', label: '正常' },
  info: { bg: '#e6f2fb', color: '#0a6ebd', label: '信息' },
  warning: { bg: '#fff7e6', color: '#e0700a', label: '警告' },
  danger: { bg: '#ffe8f0', color: '#e2195d', label: '错误' },
}

const lastAction = ref('')
const onEdit = (row: User) => {
  lastAction.value = `编辑 ${row.name}`
}
const onDelete = (row: User) => {
  lastAction.value = `删除 ${row.name}`
}
</script>

<template>
  <p class="hint">{{ lastAction || '点击操作按钮' }}</p>
  <BaseTable :columns="columns" :data="users">
    <template #cell-status="{ row }: { row: User }">
      <span class="tag" :style="{ background: stateMeta[row.state].bg, color: stateMeta[row.state].color }">
        {{ stateMeta[row.state].label }}
      </span>
    </template>
    <template #cell-action="{ row }">
      <span class="actions">
        <button class="btn" @click.stop="onEdit(row)">编辑</button>
        <button class="btn btn-danger" @click.stop="onDelete(row)">删除</button>
      </span>
    </template>
  </BaseTable>
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}

.tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.actions {
  display: inline-flex;
  gap: 8px;
}

.btn {
  padding: 2px 10px;
  border: 1px solid #d3ddec;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  color: #3c4b62;

  &:hover {
    color: #0a96e6;
    border-color: #0a96e6;
  }
}

.btn-danger:hover {
  color: #e2195d;
  border-color: #e2195d;
}
</style>
