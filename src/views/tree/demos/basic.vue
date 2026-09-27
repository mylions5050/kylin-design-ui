<script setup lang="ts">
import { ref } from 'vue'
import KTree from '@/components/tree/index'
import { treeData } from './data'

const currentKey = ref('')
</script>

<template>
  <div class="demo-tree">
    <KTree v-model="currentKey" :data="treeData" />
    <p class="demo-tree__tip">当前选中：{{ currentKey || '未选择' }}</p>
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
