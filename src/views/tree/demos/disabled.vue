<script setup lang="ts">
import KTree from '@/components/tree/index'
import { treeData } from './data'

// 数据源中把 2-1、1-1-2 设为禁用做演示
const disabledData = treeData.map((node) =>
  node.id === '2'
    ? {
        ...node,
        children: node.children!.map((child, i) => ({
          ...child,
          disabled: i === 0,
        })),
      }
    : node,
)
</script>

<template>
  <div class="demo-tree">
    <KTree :data="disabledData" :default-expanded-keys="['1']" />
  </div>
</template>

<style scoped>
.demo-tree {
  max-width: 320px;
}
</style>
