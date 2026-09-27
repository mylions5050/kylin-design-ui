<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

const selectedKeys = ref<(string | number)[]>([])
</script>

<template>
  <p class="hint">已选 {{ selectedKeys.length }} / {{ users.length }}</p>
  <BaseTable
    v-model:selected-keys="selectedKeys"
    :columns="columns"
    :data="users"
    multiple
  />
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
</style>
