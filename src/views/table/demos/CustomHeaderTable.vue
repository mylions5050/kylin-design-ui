<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'
import infoIcon from '@/assets/icons/info.svg?url'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="users">
    <template #header-role="{ col }">
      <span class="custom-header">
        <img :src="infoIcon" alt="" class="custom-header__icon" />
        {{ col.title }}
      </span>
    </template>
    <template #header-status="{ col }">
      <span class="custom-header">
        {{ col.title }}
        <span class="custom-header__badge">必填</span>
      </span>
    </template>
  </BaseTable>
</template>

<style scoped lang="scss">
.custom-header {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &__icon {
    width: 14px;
    height: 14px;
  }

  &__badge {
    padding: 0 6px;
    border-radius: 8px;
    background: #e6f2ff;
    color: #0a96e6;
    font-size: 11px;
    font-weight: 600;
  }
}
</style>
