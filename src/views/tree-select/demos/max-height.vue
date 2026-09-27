<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from '@/components/tree-select/index'
import type { TreeNodeData } from '@/components/tree/index'

/** 造一份节点较多的长数据，用于展示面板 maxHeight 滚动 */
const longData: TreeNodeData[] = Array.from({ length: 12 }, (_, i) => ({
  id: `node-${i + 1}`,
  label: `节点 ${i + 1}`,
}))

const value = ref('')
</script>

<template>
  <div class="demo-treeselect">
    <KTreeSelect v-model="value" :data="longData" :max-height="180" placeholder="面板最大高度 180px" />
  </div>
</template>

<style scoped>
.demo-treeselect :deep(.k-tree-select) {
  width: 280px;
}
</style>
