<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from '@/components/tree-select/index'
import { treeData } from '@/views/tree/demos/data'

const emptyValue = ref('')
const pickedValue = ref('1-1')
</script>

<template>
  <div class="demo-treeselect">
    <KTreeSelect v-model="emptyValue" :data="treeData" disabled placeholder="禁用状态" />
    <KTreeSelect v-model="pickedValue" :data="treeData" disabled />
  </div>
</template>

<style scoped>
.demo-treeselect :deep(.k-tree-select) {
  width: 280px;
}
</style>
