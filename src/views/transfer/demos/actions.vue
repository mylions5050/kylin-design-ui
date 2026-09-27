<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import KButton from '@/components/button/index'
import { h, type VNodeChild } from 'vue'
import { mockData } from './data'

const targetKeys = ref([])

// 自定义操作按钮（VNode）：组件会注入 disabled 与 onClick，
// 按钮自身的 onClick 仍会触发（合并调用）
const buildActions = (): VNodeChild[] => [
  h(KButton, { type: 'primary' }, { default: () => '移入' }),
  h(KButton, { type: 'primary', plain: true }, { default: () => '移出' }),
]
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="mockData" :actions="buildActions()" />
  </div>
</template>
