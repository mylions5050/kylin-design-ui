<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'

// collapsible="icon"：点击标题栏无效，只有点击箭头才会展开/收起（语义同 AntD collapsible）
const activeKeys = ref(['1'])

const items = [
  { key: '1', label: '这是面板标题 1', children: '点击箭头才会展开/收起，点击标题栏无效。' },
  { key: '2', label: '这是面板标题 2', children: '适合标题栏承载跳转、选择等其他交互，避免误触折叠的场景。' },
]
</script>

<template>
  <KCollapse v-model="activeKeys" :items="items" collapsible="icon" />
</template>
