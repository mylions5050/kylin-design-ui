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

const selectedKey = ref<number | string>(users[1]!.id)
const lastClicked = ref('')

const onRowClick = (row: User) => {
  lastClicked.value = `点击了 ${row.name}（id=${row.id}）`
}
</script>

<template>
  <p class="hint">已选 id: {{ selectedKey }} · {{ lastClicked || '未点击' }}</p>
  <BaseTable
    v-model:selected-key="selectedKey"
    :columns="columns"
    :data="users"
    selectable
    @row-click="(row) => onRowClick(row as User)"
  />
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
</style>
