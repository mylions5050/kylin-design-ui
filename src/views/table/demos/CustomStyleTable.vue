<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// cellStyle 传样式对象，随心所欲设置列样式（背景 + 文字色 + 加粗等，应用到 th + td）
const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  {
    field: 'email',
    title: '邮箱',
    cellStyle: { background: '#FFE8F0', color: '#E2195D' },
  },
  {
    field: 'role',
    title: '角色',
    cellStyle: { background: '#F2FAFF', color: '#0078BD' },
  },
  { field: 'status', title: '状态' },
  { field: 'age', title: '年龄' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users" />
</template>
