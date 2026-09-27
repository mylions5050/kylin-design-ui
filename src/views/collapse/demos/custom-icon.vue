<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from '@/components/collapse/index'
import KIcon from '@/components/icon/index'

// 自定义图标：expandIcon 作用域插槽替换默认右箭头，active 表示当前面板是否展开
const activeKeys = ref<(string | number)[]>(['1'])

const items = [
  { key: '1', label: '自定义图标面板 1', children: '插槽参数为 { item, active }，这里换成 arrow-double-right 并按 active 旋转 90°。' },
  { key: '2', label: '自定义图标面板 2', children: '不传插槽时使用默认的 arrow-right 右箭头。' },
]
</script>

<template>
  <KCollapse v-model="activeKeys" :items="items">
    <template #expandIcon="{ active }">
      <KIcon
        name="arrow-double-right"
        :style="{ color: 'var(--k-color-primary)', transition: 'transform .3s', transform: active ? 'rotate(90deg)' : 'none' }"
      />
    </template>
  </KCollapse>
</template>
