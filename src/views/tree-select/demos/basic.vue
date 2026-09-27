<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from '@/components/tree-select/index'
import { treeData } from '@/views/tree/demos/data'

const value = ref('1-1')
</script>

<template>
  <div class="demo-treeselect">
    <KTreeSelect
      v-model="value"
      :data="treeData"
      default-expand-all
      clearable
    />
    <span class="demo-treeselect__tip">当前选中 id：{{ value || '（未选择）' }}</span>
  </div>
</template>

<style scoped>
.demo-treeselect :deep(.k-tree-select) {
  width: 280px;
}

.demo-treeselect__tip {
  display: inline-block;
  margin-top: 8px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
