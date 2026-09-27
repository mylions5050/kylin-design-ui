<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

// 参考 Element row-class-name：函数返回 class 名，样式在 CSS 里灵活定义
const rowClassName = ({ state }: User) => `row-${state}`
</script>

<template>
  <BaseTable :columns="columns" :data="users" :row-class-name="rowClassName" />
</template>

<style scoped lang="scss">
:deep(.row-success td) {
  background: #edfcb4 !important;
  color: #02613b;
}
:deep(.row-info td) {
  background: #ccecff !important;
  color: #0078bd;
}
:deep(.row-warning td) {
  background: #fffbe6 !important;
  color: #a99000;
}
:deep(.row-danger td) {
  background: #ffe8f0 !important;
  color: #e2195d;
}
</style>
