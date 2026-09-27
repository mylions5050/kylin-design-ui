<script setup lang="ts">
import { ref } from 'vue'
import KTree from '@/components/tree/index'
import type { TreeNodeData } from '@/components/tree/index'
import { treeData } from './data'

const lastDrop = ref('（还未拖拽）')

const handleDrop = ({
  dragNode,
  targetNode,
  type,
}: {
  dragNode: TreeNodeData
  targetNode: TreeNodeData
  type: 'before' | 'after' | 'inner'
}) => {
  lastDrop.value = `「${dragNode.label}」以 ${type} 方式落到「${targetNode.label}」`
}
</script>

<template>
  <div class="demo-tree">
    <KTree
      :data="treeData"
      draggable
      default-expand-all
      @drop="handleDrop"
    />
    <p class="demo-tree__tip">最近一次拖拽：{{ lastDrop }}</p>
  </div>
</template>

<style scoped>
.demo-tree {
  max-width: 320px;
}
.demo-tree__tip {
  margin-top: 12px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
