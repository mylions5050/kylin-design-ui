<script setup lang="ts">
import { ref } from 'vue'
import KTree from '@/components/tree/index'
import { treeData } from './data'

const currentKey = ref('')
</script>

<template>
  <div class="demo-tree">
    <KTree
      v-model="currentKey"
      :data="treeData"
      default-expand-all
      show-line
    />
  </div>
</template>
