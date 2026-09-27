<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn, SortItem } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名', sortable: true },
  { field: 'age', title: '年龄', sortable: true, sorter: (a: User, b: User) => a.age - b.age },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

// 三态循环：默认(无) → 正序 asc → 逆序 desc → 默认。defaultSort 先设正序
const sorts = ref<SortItem[]>([{ field: 'age', order: 'asc' }])
const onSortChange = (payload: { sorts: SortItem[] }) => {
  sorts.value = payload.sorts
}
</script>

<template>
  <p class="hint">
    当前排序：{{ sorts.length ? sorts.map((s) => `${s.field} ${s.order}`).join(', ') : '默认（无排序）' }}
  </p>
  <BaseTable
    :columns="columns"
    :data="users"
    :default-sort="[{ field: 'age', order: 'asc' }]"
    @sort-change="onSortChange"
  />
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
</style>
