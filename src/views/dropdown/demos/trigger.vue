<script setup lang="ts">
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { message } from '@/components/message/useMessage'
import type { DropdownOption } from '@/components/dropdown/types'

const menu: DropdownOption[] = [
  { key: 'copy', label: '复制', icon: 'copy' },
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'delete', label: '删除', icon: 'delete', danger: true, divided: true },
]

const onClick = (key: string | number) => message.success(`click：${key}`)
</script>

<template>
  <div class="demo-trigger">
    <KDropdown :menu="menu" trigger="click" @click="onClick">
      <KButton>
        点击触发
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>

    <KDropdown :menu="menu" trigger="hover" @click="onClick">
      <KButton>
        悬浮触发
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>

    <KDropdown :menu="menu" trigger="contextmenu" placement="bottom-start" @click="onClick">
      <div class="demo-trigger__area">右键此区域</div>
    </KDropdown>
  </div>
</template>

<style scoped>
.demo-trigger {
  display: flex;
  gap: 16px;
  align-items: center;
}

.demo-trigger__area {
  padding: 8px 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius-sm);
  font-size: 14px;
  color: var(--k-color-text-secondary);
  cursor: context-menu;
  user-select: none;
}
</style>
