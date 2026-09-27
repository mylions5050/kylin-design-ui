<script setup lang="ts">
import { ref } from 'vue'
import KMenu from '@/components/menu/index'
import type { MenuItem } from '@/components/menu/index'

const multiItems: MenuItem[] = [
  {
    id: '1',
    label: '导航',
    value: '1',
    icon: 'more',
    children: [
      { id: '1-1', label: '表格', value: '1-1', icon: 'column-vertical' },
      { id: '1-2', label: '按钮', value: '1-2', icon: 'more' },
      {
        id: '1-3',
        label: '反馈',
        value: '1-3',
        icon: 'prompt-filling',
        children: [
          { id: '1-3-1', label: '提示', value: '1-3-1', icon: 'prompt-filling' },
          { id: '1-3-2', label: '对话框', value: '1-3-2', icon: 'more' },
          { id: '1-3-3', label: '通知', value: '1-3-3', icon: 'prompt-filling' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: '数据',
    value: '2',
    icon: 'more',
    children: [
      { id: '2-1', label: 'Table 表格', value: '2-1', icon: 'column-vertical' },
      { id: '2-2', label: 'SupTable 超级表格', value: '2-2', icon: 'column-vertical' },
    ],
  },
  { id: '3', label: '设置', icon: 'more', disabled: true, suffix: 'soon' },
]

const accordionVal = ref('home')
</script>

<template>
  <div class="demo-inner">
    <KMenu
      :items="multiItems"
      v-model="accordionVal"
      accordion
      :default-open-keys="['1']"
    />
  </div>
</template>

<style scoped lang="scss">
.demo-inner {
  width: 229px;
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
</style>
