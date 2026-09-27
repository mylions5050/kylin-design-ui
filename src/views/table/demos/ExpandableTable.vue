<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'
import chevronDown from '@/assets/icons/chevron-down.svg?url'

const columns: BaseTableColumn<User>[] = [
  { field: '_expand', title: '', width: 50, emptyText: false },
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

const expandedKeys = ref<(string | number)[]>([])

const isExpanded = (row: User) => expandedKeys.value.includes(row.id)
const toggleExpand = (row: User) => {
  const set = new Set(expandedKeys.value)
  if (set.has(row.id)) set.delete(row.id)
  else set.add(row.id)
  expandedKeys.value = [...set]
}
</script>

<template>
  <BaseTable v-model:expanded-keys="expandedKeys" :columns="columns" :data="users" expandable>
    <template #cell-_expand="{ row }">
      <img
        :src="chevronDown"
        class="expand-toggle"
        :class="{ 'is-open': isExpanded(row) }"
        alt=""
        @click.stop="toggleExpand(row)"
      />
    </template>
    <template #expand="{ row }">
      <div class="expand-content">
        <p>
          <strong>{{ row.name }}</strong> 的详细信息
        </p>
        <p>邮箱：{{ row.email }}</p>
        <p>角色：{{ row.role }} · 状态：{{ row.status }} · 年龄：{{ row.age }}</p>
        <p>地址：{{ row.address }}</p>
      </div>
    </template>
  </BaseTable>
</template>

<style scoped lang="scss">
.expand-toggle {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: rotate(-90deg);

  &.is-open {
    transform: rotate(0deg);
  }
}

.expand-content {
  p {
    margin: 0 0 4px;
    font-size: 13px;
    color: #3c4b62;
  }
}
</style>
