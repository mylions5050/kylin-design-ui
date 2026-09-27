<script setup lang="ts">
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { message } from '@/components/message/useMessage'
import type { DropdownOption } from '@/components/dropdown/types'

const menu: DropdownOption[] = [
  { key: 'profile', label: '个人中心', icon: 'user' },
  { key: 'setting', label: '设置', icon: 'setting' },
  { key: 'preview', label: '预览（禁用）', icon: 'browse', disabled: true },
  { key: 'share', label: '分享', icon: 'share' },
  { key: 'delete', label: '删除', icon: 'delete', danger: true, divided: true },
]

const onClick = (key: string | number) => message.success(`click：${key}`)
</script>

<template>
  <div class="demo-item-state">
    <KDropdown :menu="menu" trigger="click" @click="onClick">
      <KButton>
        菜单项状态
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>
  </div>
</template>
