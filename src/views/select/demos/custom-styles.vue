<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const customValue = ref('')

const customOptions: SelectOption[] = [
  { label: 'VIP用户', value: 'vip' },
  { label: '普通用户', value: 'normal' },
  { label: '试用用户', value: 'trial' },
  { label: '停用用户', value: 'disabled' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>自定义样式:</label>
      <KSelect
        v-model="customValue"
        :options="customOptions"
        filterable
        popper-class="custom-select-dropdown"
        placeholder="自定义下拉菜单样式"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>