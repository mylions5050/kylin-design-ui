<script setup lang="ts">
import { ref } from 'vue'
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { message } from '@/components/message/useMessage'
import type { DropdownOption } from '@/components/dropdown/types'

const menu: DropdownOption[] = [
  { key: '1', label: '1st item' },
  { key: '2', label: '2nd item' },
  { key: '3', label: '3rd item' },
]

const log = ref('')
const onClick = (key: string | number) => {
  log.value = `点击了第 ${key} 项`
  message.success(`click：${key}`)
}
</script>

<template>
  <div class="demo-dropdown">
    <KDropdown :menu="menu" @click="onClick">
      <KButton>
        悬浮我
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>
    <span class="demo-dropdown__tip">{{ log || '鼠标移入按钮展开菜单' }}</span>
  </div>
</template>

<style scoped>
.demo-dropdown__tip {
  display: inline-block;
  margin-left: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
