<template>
  <!-- 统计信息 -->
  <div class="selection-info" v-if="multiple">
    <p>已选择 {{ selectedKeys.length }} / {{ users.length }} 项</p>
    <div class="selection-actions">
      <button @click="handleSelectAll" :class="['action-btn', { 'is-active': allSelected }]">
        {{ allSelected ? '取消全选' : '全选' }}
      </button>
      <button @click="handleClearSelection" :disabled="!selectedKeys.length" class="action-btn">
        清除选择
      </button>
    </div>
  </div>

  <!-- 选择表格 -->
  <BaseTable
    v-model:selected-keys="selectedKeys"
    :columns="columns"
    :data="users"
    :multiple="multiple"
    row-key="id"
    @select="handleSelect"
    @select-all="handleSelectAllEvent"
    @row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import { users, type User } from './mock-data'

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色' },
  { field: 'status', title: '状态' },
]

// 多选状态
const multiple = ref(true)
const selectedKeys = ref<(string | number)[]>([])

// 计算属性
const allSelected = computed(() => selectedKeys.value.length === users.length)

// 方法
const handleSelect = (payload: {
  row: User
  selected: boolean
  selectedKeys: (string | number)[]
}) => {
  console.log('选择行:', payload)
}

const handleSelectAllEvent = (payload: {
  selected: boolean
  selectedKeys: (string | number)[]
  allSelected: boolean
}) => {
  console.log('全选:', payload)
}

const handleSelectAll = () => {
  if (allSelected.value) {
    selectedKeys.value = []
  } else {
    selectedKeys.value = users.map((user) => user.id)
  }
}

const handleClearSelection = () => {
  selectedKeys.value = []
}

const handleRowClick = (row: User, index: number) => {
  console.log('行点击:', row, index)
}
</script>

<style scoped lang="scss">
.selection-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .selection-actions {
    display: flex;
    gap: 8px;

    .action-btn {
      padding: 6px 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      background-color: white;
      color: #606266;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }

      &.is-active {
        background-color: #409eff;
        border-color: #409eff;
        color: white;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
}
</style>
