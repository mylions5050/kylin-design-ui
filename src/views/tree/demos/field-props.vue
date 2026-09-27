<script setup lang="ts">
import KTree from '@/components/tree/index'
import type { TreeNodeData } from '@/components/tree/index'

/** 模拟后端返回的字段名（key/name/subList） */
const serverData = [
  {
    key: 'dept-1',
    name: '教学一部',
    subList: [
      { key: 'dept-1-1', name: '张老师' },
      { key: 'dept-1-2', name: '李老师' },
    ],
  },
  {
    key: 'dept-2',
    name: '教学二部',
    subList: [{ key: 'dept-2-1', name: '王老师' }],
  },
  { key: 'dept-3', name: '行政部' },
]

// 异构数据经由 fieldProps 映射使用，类型上对齐为树节点结构
const mappedData = serverData as unknown as TreeNodeData[]
</script>

<template>
  <div class="demo-tree">
    <KTree
      :data="mappedData"
      :field-props="{ id: 'key', label: 'name', children: 'subList' }"
      default-expand-all
    />
  </div>
</template>

<style scoped>
.demo-tree {
  max-width: 320px;
}
</style>
