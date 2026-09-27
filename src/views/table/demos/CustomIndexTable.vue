<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// emptyText: false 让 isCellEmpty 不触发，走 cell slot 自定义序号（cellText 对空 val 会返回 -，不调 formatter）
const columns: BaseTableColumn<User>[] = [
  { field: '_index1', title: '默认序号（从 1）', width: 140, emptyText: false },
  { field: '_index0', title: '设置起点（从 0）', width: 140, emptyText: false },
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users">
    <template #cell-_index1="{ row }">{{ users.indexOf(row) + 1 }}</template>
    <template #cell-_index0="{ row }">{{ users.indexOf(row) }}</template>
  </BaseTable>
</template>
