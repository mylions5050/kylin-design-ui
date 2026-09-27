<script setup lang="ts">
import BaseTable from '@/components/table/base-table/index'
import type { BaseTableColumn } from '@/components/table/types'
import type { User } from './mock-data'

// 独立 data：role 连续相同（管理员/编辑/查看），便于演示行合并
const rows: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'a@x.com',
    role: '管理员',
    status: '活跃',
    age: 28,
    address: '',
    state: 'success',
  },
  {
    id: 2,
    name: '李四',
    email: 'b@x.com',
    role: '管理员',
    status: '停用',
    age: 34,
    address: '',
    state: 'info',
  },
  {
    id: 3,
    name: '王五',
    email: 'c@x.com',
    role: '编辑',
    status: '活跃',
    age: 25,
    address: '',
    state: 'warning',
  },
  {
    id: 4,
    name: '赵六',
    email: 'd@x.com',
    role: '编辑',
    status: '活跃',
    age: 41,
    address: '',
    state: 'danger',
  },
  {
    id: 5,
    name: '孙七',
    email: 'e@x.com',
    role: '查看',
    status: '停用',
    age: 30,
    address: '',
    state: 'success',
  },
]

const columns: BaseTableColumn<User>[] = [
  { field: 'name', title: '姓名' },
  { field: 'role', title: '角色' },
  { field: 'email', title: '邮箱' },
  { field: 'status', title: '状态' },
  { field: 'age', title: '年龄' },
]

// spanMethod：role 列连续相同合并（rowspan）+ 第 3 行 status+age 合并（colspan）
const spanMethod = ({
  row,
  rowIndex,
  columnIndex,
}: {
  row: User
  rowIndex: number
  columnIndex: number
}): [number, number] | undefined => {
  if (columnIndex === 1) {
    const prev = rows[rowIndex - 1]
    if (prev && prev.role === row.role) return undefined
    let count = 1
    for (let r = rowIndex + 1; r < rows.length; r++) {
      const next = rows[r]
      if (next && next.role === row.role) count++
      else break
    }
    return [count, 1]
  }
  if (rowIndex === 2 && columnIndex === 3) return [1, 2]
  if (rowIndex === 2 && columnIndex === 4) return undefined
  return undefined
}
</script>

<template>
  <BaseTable :columns="columns" :data="rows" :span-method="spanMethod" border />
</template>
