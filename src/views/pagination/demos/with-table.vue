<script setup lang="ts">
import { ref, computed, h } from 'vue'
import KPagination from '@/components/pagination/index'
import KTable from '@/components/table/index'
import KTag from '@/components/tag/index'

const tablePage = ref(1)
const tablePageSize = ref(10)
const tableTotal = ref(86)

const tableData = computed(() => {
  const start = (tablePage.value - 1) * tablePageSize.value
  const end = Math.min(start + tablePageSize.value, tableTotal.value)
  return Array.from({ length: end - start }, (_, i) => ({
    id: start + i + 1,
    name: `用户 ${start + i + 1}`,
    role: ['管理员', '编辑', '访客', '运营'][(start + i) % 4],
    status: (start + i) % 3 === 0 ? 'active' : (start + i) % 3 === 1 ? 'inactive' : 'pending',
    createTime: `2025-0${((start + i) % 9) + 1}-${String((start + i) % 28 + 1).padStart(2, '0')}`,
  }))
})

const columns = [
  { field: 'id', title: 'ID', width: '80px' },
  { field: 'name', title: '姓名', width: '120px' },
  { field: 'role', title: '角色', width: '100px' },
  {
    field: 'status',
    title: '状态',
    width: '100px',
    render: (val: string) => {
      const map: Record<string, { type: 'success' | 'info' | 'warning' | 'default'; label: string }> = {
        active: { type: 'success', label: '启用' },
        inactive: { type: 'info', label: '停用' },
        pending: { type: 'warning', label: '待审' },
      }
      const item = map[val] || { type: 'default', label: val }
      return h(KTag, { type: item.type }, () => item.label)
    },
  },
  { field: 'createTime', title: '创建时间', width: '120px' },
]
</script>

<template>
  <KTable
    :columns="columns"
    :data="tableData"
    stripe
    highlight
    :style="{ marginBottom: '0', borderBottom: 'none' }"
  />
  <KPagination
    :current-page="tablePage"
    :page-size="tablePageSize"
    :total="tableTotal"
    entity-label="users"
    @change="tablePage = $event.page"
  />
</template>
