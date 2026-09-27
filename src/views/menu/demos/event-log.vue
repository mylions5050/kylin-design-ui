<script setup lang="ts">
import { ref } from 'vue'
import KMenu from '@/components/menu/index'
import type { MenuItem } from '@/components/menu/index'

const basicItems: MenuItem[] = [
  { id: 'home', label: '首页', value: 'home', icon: 'home-filling' },
  { id: 'table', label: '表格', value: 'table', icon: 'column-vertical' },
  { id: 'btn', label: '按钮', value: 'btn', icon: 'more' },
  { id: 'icon', label: '图标', value: 'icon', icon: 'picture-filling' },
  { id: 'alert', label: '提示', value: 'alert', icon: 'prompt-filling' },
  { id: 'dialog', label: '对话框', value: 'dialog', icon: 'more' },
]

const basicVal = ref('home')
const eventLog = ref('点击菜单项')
</script>

<template>
  <div class="demo-inner">
    <KMenu
      :items="basicItems"
      v-model="basicVal"
      @select="(item) => eventLog = `选中: ${item.label} (value: ${item.value ?? '-'})`"
    />
    <p class="event-log">{{ eventLog }}</p>
  </div>
</template>

<style scoped lang="scss">
.demo-inner {
  width: 229px;
  border: 1px solid var(--k-color-border-light);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}

.event-log {
  margin: 12px 0 0;
  font-family: monospace;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
