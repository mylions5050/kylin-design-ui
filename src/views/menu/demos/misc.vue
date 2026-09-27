<script setup lang="ts">
import { ref } from 'vue'
import KMenu from '@/components/menu/index'
import type { MenuItem } from '@/components/menu/index'

const miscItems: MenuItem[] = [
  { id: 'home', label: '首页', value: 'home', icon: 'home-filling' },
  { id: 'table3', label: '表格', value: 'table3', icon: 'column-vertical' },
  { id: 'new', label: '新增功能', value: 'new', icon: 'more', suffix: { text: 'new', type: 'primary', size: 'small' } },
  { id: 'settings', label: '设置', value: 'settings', icon: 'more', disabled: true, suffix: { text: 'soon', type: 'warning', size: 'small' } },
  { id: 'advanced', label: '高级功能', value: 'advanced', icon: 'more', disabled: true, suffix: { text: 'beta', type: 'default', size: 'small' } },
  { id: 'dialog2', label: '对话框', value: 'dialog2', icon: 'more' },
]

const miscVal = ref('home')
</script>

<template>
  <div class="demo-inner">
    <KMenu
      :items="miscItems"
      v-model="miscVal"
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
