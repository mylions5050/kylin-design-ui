<script setup lang="ts">
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { message } from '@/components/message/useMessage'
import type { DropdownOption } from '@/components/dropdown/types'
import type { PopperPlacement } from '@/components/popper/index'

const menu: DropdownOption[] = [
  { key: '1', label: '1st item' },
  { key: '2', label: '2nd item' },
  { key: '3', label: '3rd item' },
]

const placements: { value: PopperPlacement; label: string }[] = [
  { value: 'bottom', label: 'bottom' },
  { value: 'bottom-start', label: 'bottom-start' },
  { value: 'bottom-end', label: 'bottom-end' },
  { value: 'top', label: 'top' },
  { value: 'top-start', label: 'top-start' },
  { value: 'top-end', label: 'top-end' },
]

const onClick = (key: string | number) => message.success(`click：${key}`)
</script>

<template>
  <div class="demo-placement">
    <KDropdown
      v-for="p in placements"
      :key="p.value"
      :menu="menu"
      :placement="p.value"
      trigger="click"
      @click="onClick"
    >
      <KButton size="small">
        {{ p.label }}
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>
  </div>
</template>

<style scoped>
.demo-placement {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
