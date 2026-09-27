<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// 列总宽 ~1640px 超出容器 → 横向滚动；首列左固定 + 末列右固定
const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名', fixed: 'left', width: 120 },
  { field: 'email', title: '邮箱', width: 220 },
  { field: 'age', title: '年龄', width: 100 },
  { field: 'role', title: '角色', width: 120 },
  { field: 'status', title: '状态', width: 120 },
  { field: 'address', title: '地址', width: 320 },
  { field: 'address', title: '家庭住址', width: 320 },
  { field: 'email', title: '备用邮箱', width: 220 },
  { field: 'action', title: '操作', fixed: 'right', width: 100 },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users" />
</template>
