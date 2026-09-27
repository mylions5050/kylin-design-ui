<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'

// 手风琴：accordion 开启后同一时刻最多展开一个，展开新面板自动收起旧面板；
// v-model 为单个 key，全部收起时为 ''
const activeKey = ref<string | number>('1')

const items = [
  { key: '1', label: '手风琴面板 1', children: '同一时刻最多展开一个面板。' },
  { key: '2', label: '手风琴面板 2', children: '展开本面板时，面板 1 会自动收起。' },
  { key: '3', label: '手风琴面板 3', children: '再次点击已展开的标题栏可以全部收起。' },
]
</script>

<template>
  <KCollapse v-model="activeKey" accordion :items="items" />
</template>
