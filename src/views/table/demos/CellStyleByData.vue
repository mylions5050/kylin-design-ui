<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// cellStyle 支持函数：基于 row 数据动态返回样式（data 里 state 字段）
const statusStyle = (row: User): Record<string, string> => {
  if (row.state === 'success') return { background: '#FFFBE6', color: '#A99000' }
  if (row.state === 'danger') return { background: '#FFE8F0', color: '#E2195D' }
  return {}
}

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态', cellStyle: statusStyle },
  { field: 'age', title: '年龄' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users" />
</template>
