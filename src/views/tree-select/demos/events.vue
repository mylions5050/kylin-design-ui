<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from '@/components/tree-select/index'
import { message } from '@/components/message/useMessage'
import { treeData } from '@/views/tree/demos/data'
import type { TreeNodeData } from '@/components/tree/index'

const value = ref('')

const onChange = (id: string) => message.info(`change：${id}`)
const onSelect = (node: TreeNodeData) => message.success(`select：${node.label}`)
const onVisibleChange = (visible: boolean) =>
  message.info(visible ? '面板展开' : '面板收起')
const onClear = () => message.warning('clear：已清空选择')
</script>

<template>
  <div class="demo-treeselect">
    <KTreeSelect
      v-model="value"
      :data="treeData"
      clearable
      default-expand-all
      @change="onChange"
      @select="onSelect"
      @visible-change="onVisibleChange"
      @clear="onClear"
    />
  </div>
</template>

<style scoped>
.demo-treeselect :deep(.k-tree-select) {
  width: 280px;
}
</style>
