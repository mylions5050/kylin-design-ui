<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn, BaseTableSummary } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
  { field: 'age', title: '年龄' },
]

// summary 传 { field: text }，外部预算好文本（BaseTable 不自动 SUM）
const summary: BaseTableSummary = {
  name: '合计',
  role: `${users.length} 人`,
  age: `平均 ${Math.round(users.reduce((s, u) => s + u.age, 0) / users.length)} 岁`,
}
</script>

<template>
  <BaseTable :columns="columns" :data="users" :summary="summary" />
</template>
