<script setup lang="ts">
import KTree from '@/components/tree/index'
import { treeData } from './data'
</script>

<template>
  <div class="demo-tree">
    <KTree :data="treeData" default-expand-all />
  </div>
</template>

<style scoped>
.demo-tree {
  max-width: 320px;
}
</style>
