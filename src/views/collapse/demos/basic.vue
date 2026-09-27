<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'
import type { KCollapseItem } from '@/components/collapse/types'

// 基础用法：items 数据驱动，v-model 绑定激活 key 数组（多开）
const activeKeys = ref<(string | number)[]>(['1'])

const items: KCollapseItem[] = [
  {
    key: '1',
    label: '这是面板标题 1',
    children: '面板内容 1：AntD 风格的折叠面板，点击标题栏展开 / 收起，内容区高度平滑过渡。',
  },
  {
    key: '2',
    label: '这是面板标题 2',
    children: '面板内容 2：activeKey 是数组时允许多个面板同时展开。',
  },
  {
    key: '3',
    label: '这是面板标题 3（禁用）',
    children: '面板内容 3',
    disabled: true,
  },
]
</script>

<template>
  <KCollapse v-model="activeKeys" :items="items" />
</template>
