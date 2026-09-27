<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'

// showExpandIcon 为 false 时不渲染箭头（默认图标与 expandIcon 插槽都受其控制）
const activeKeys = ref(['1'])

const items = [
  { key: '1', label: '这是面板标题 1', children: '整行不渲染切换图标，仅保留标题（和 extra），交互与默认一致。' },
  { key: '2', label: '这是面板标题 2', children: '适合不需要方向指示、追求极简外观的场景。' },
]
</script>

<template>
  <KCollapse v-model="activeKeys" :items="items" :show-expand-icon="false" />
</template>
