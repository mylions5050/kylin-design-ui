<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

const num = (v: unknown) => String(v ?? 0)

// 照 admin Educator Usage：首列固定 + 3 组 children（2 层）+ 组 background + align + formatter + cellClass
const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: 'Educator', width: 140, fixed: 'left' },
  {
    title: 'BOOKS EXPLORED',
    children: [
      {
        field: 'age',
        title: 'Total',
        width: 90,
        align: 'right',
        formatter: num,
        cellClass: 'is-cell-bold',
      },
      { field: 'age', title: 'During', width: 90, align: 'right', formatter: num },
      { field: 'age', title: 'After', width: 90, align: 'right', formatter: num },
    ],
  },
  {
    title: 'BOOKS COMPLETED',
    background: '#F4F7FB',
    children: [
      {
        field: 'age',
        title: 'Total',
        width: 90,
        align: 'right',
        formatter: num,
        cellClass: 'is-cell-bold',
      },
      { field: 'age', title: 'During', width: 90, align: 'right', formatter: num },
      { field: 'age', title: 'After', width: 90, align: 'right', formatter: num },
    ],
  },
  {
    title: 'READING MINUTES',
    children: [
      {
        field: 'age',
        title: 'Total',
        width: 90,
        align: 'right',
        formatter: num,
        cellClass: 'is-cell-bold',
      },
      { field: 'age', title: 'During', width: 90, align: 'right', formatter: num },
      { field: 'age', title: 'After', width: 90, align: 'right', formatter: num },
    ],
  },
]
</script>

<template>
  <div class="group-header-table">
    <BaseTable :columns="columns" :data="users" row-key="id" resizable show-overflow-tooltip />
  </div>
</template>

<style scoped lang="scss">
.group-header-table {
  // border: 1px solid #e5e6eb;
  border-radius: 6px;
  overflow: hidden;

  :deep(.is-cell-bold) {
    font-weight: 600;
  }

  :deep(.base-table__table thead th) {
    background: transparent;
  }
}
</style>
