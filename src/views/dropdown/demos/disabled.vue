<script setup lang="ts">
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import type { DropdownOption } from '@/components/dropdown/types'

const menu: DropdownOption[] = [
  { key: '1', label: '1st item' },
  { key: '2', label: '2nd item' },
]
</script>

<template>
  <div class="demo-disabled">
    <KDropdown :menu="menu" disabled>
      <KButton disabled>
        禁用
        <KIcon name="arrow-down" :size="12" />
      </KButton>
    </KDropdown>
  </div>
</template>
