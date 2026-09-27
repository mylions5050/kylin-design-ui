<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'

// 面板嵌套：面板内容里再放一层 KCollapse；
// 外层 items 不传 children 时可用默认作用域插槽按 item.key 渲染内容
const outerKeys = ref<(string | number)[]>(['1'])
const innerKeys = ref<(string | number)[]>(['1-1'])

const outerItems = [
  { key: '1', label: '外层面板 1' },
  { key: '2', label: '外层面板 2', children: '外层面板 2 的普通内容。' },
]

const innerItems = [
  { key: '1-1', label: '内层面板 1-1', children: '嵌套的内层面板内容。' },
  { key: '1-2', label: '内层面板 1-2', children: '嵌套的内层面板内容。' },
]
</script>

<template>
  <KCollapse v-model="outerKeys" :items="outerItems">
    <template #default="{ item }">
      <KCollapse v-if="item.key === '1'" v-model="innerKeys" :items="innerItems" />
    </template>
  </KCollapse>
</template>
