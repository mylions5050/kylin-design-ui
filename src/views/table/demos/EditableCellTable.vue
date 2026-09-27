<script setup lang="ts">
import { reactive } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

// 可编辑副本（reactive，cell slot v-model 直接改 row）
const data = reactive<User[]>(users.map((u) => ({ ...u })))

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名', emptyText: false },
  { field: 'role', title: '角色', emptyText: false },
  { field: 'age', title: '年龄', emptyText: false },
  { field: 'email', title: '邮箱' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="data">
    <template #cell-name="{ row }">
      <input v-model="row.name" class="edit-input" />
    </template>
    <template #cell-role="{ row }">
      <select v-model="row.role" class="edit-input">
        <option value="管理员">管理员</option>
        <option value="编辑">编辑</option>
        <option value="查看">查看</option>
      </select>
    </template>
    <template #cell-age="{ row }">
      <input v-model.number="row.age" type="number" class="edit-input" />
    </template>
  </BaseTable>
</template>

<style scoped lang="scss">
.edit-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #d3ddec;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;

  &:focus {
    border-color: #0a96e6;
    outline: none;
  }
}
</style>
