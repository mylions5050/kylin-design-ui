<script setup lang="ts">
import VirtualTable from '@/components/table/virtual-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import type { User } from './mock-data'

// 1000 行 mock 数据
const bigData: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['管理员', '编辑', '查看'][i % 3] as User['role'],
  status: ['活跃', '停用'][i % 2] as User['status'],
  age: 20 + (i % 30),
  address: '',
  state: (['success', 'info', 'warning', 'danger'] as const)[i % 4]!,
}))

const columns: BaseTableColumn<User>[] = [
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '姓名', width: 120 },
  { field: 'email', title: '邮箱' },
  { field: 'role', title: '角色', width: 100 },
  { field: 'status', title: '状态', width: 100 },
  { field: 'age', title: '年龄', width: 80 },
]
</script>

<template>
  <p class="hint">
    共 {{ bigData.length }} 行，虚拟滚动只渲染可见区（~{{ Math.ceil(400 / 44) + 10 }} 行）
  </p>
  <VirtualTable :data="bigData" :columns="columns" :height="400" :row-height="44" row-key="id" />
</template>

<style scoped lang="scss">
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
</style>
