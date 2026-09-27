<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import type { User } from './mock-data'
import emptyIcon from '@/assets/icons/empty-state.svg?url'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]
</script>

<template>
  <BaseTable :columns="columns" :data="[]">
    <template #empty>
      <div class="empty-state">
        <div class="empty-state__icon-box">
          <img :src="emptyIcon" class="empty-state__icon" alt="" />
        </div>
        <p class="empty-state__text">No data</p>
      </div>
    </template>
  </BaseTable>
</template>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  &__icon-box {
    display: flex;
    width: 64px;
    height: 64px;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    background: #f9fafd;
  }

  &__icon {
    width: 28px;
    height: 28px;
  }

  &__text {
    margin: 0;
    color: #6a7e9c;
    text-align: center;
    font-family: Mikado, sans-serif;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
}
</style>
