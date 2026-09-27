<script setup lang="ts">
import TreeTable from '@/components/table/tree-table/index'
import type { BaseTableColumn } from '@/components/table/types'

interface Org {
  id: number
  name: string
  role: string
  hasChildren?: boolean
  children?: Org[]
}

const columns: BaseTableColumn<Org>[] = [
  { field: 'name', title: '名称' },
  { field: 'role', title: '角色' },
]

// 静态树（总部→研发部/市场部→前端/后端）+ 分公司A 懒加载（hasChildren + lazy load）
const data: Org[] = [
  {
    id: 1,
    name: '总部',
    role: '公司',
    hasChildren: true,
    children: [
      {
        id: 11,
        name: '研发部',
        role: '部门',
        hasChildren: true,
        children: [
          { id: 111, name: '前端组', role: '小组' },
          { id: 112, name: '后端组', role: '小组' },
        ],
      },
      { id: 12, name: '市场部', role: '部门' },
    ],
  },
  { id: 2, name: '分公司A', role: '分公司', hasChildren: true },
]

const load = (_row: Org, resolve: (children: Org[]) => void) => {
  setTimeout(() => {
    resolve([
      { id: 21, name: '销售组', role: '小组' },
      { id: 22, name: '客服组', role: '小组' },
    ])
  }, 800)
}
</script>

<template>
  <TreeTable :data="data" :columns="columns" row-key="id" lazy :load="load" />
</template>
