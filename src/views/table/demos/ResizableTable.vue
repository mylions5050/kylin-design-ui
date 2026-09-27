<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// resizable：拖动表头右边缘调整列宽（内存态，刷新恢复）
const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
  { field: 'age', title: '年龄' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users" resizable />
</template>
