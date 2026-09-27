<script setup lang="ts">
import { ref } from 'vue'
import KTree from '@/components/tree/index'
import { treeData } from './data'

// 初始勾选「实习计划」；父节点全部勾选时会自动级联
const checkedKeys = ref<string[]>(['2-1'])
</script>

<template>
  <div class="demo-tree">
    <KTree
      v-model:checked-keys="checkedKeys"
      :data="treeData"
      show-checkbox
      :default-expanded-keys="['1']"
    />
    <p class="demo-tree__tip">已勾选：{{ checkedKeys.join('、') || '无' }}</p>
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
