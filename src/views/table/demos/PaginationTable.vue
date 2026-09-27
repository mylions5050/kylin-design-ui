<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn, BaseTablePageChange } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

const page = ref(1)
const pageSize = ref(3)
const total = users.length

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return users.slice(start, start + pageSize.value)
})

const onPageChange = (payload: BaseTablePageChange) => {
  page.value = payload.page
  pageSize.value = payload.pageSize
}
</script>

<template>
  <BaseTable
    :columns="columns"
    :data="pagedData"
    :pagination="{ pageSize: pageSize, current: page }"
    :total="total"
    @page-change="onPageChange"
  />
</template>
