<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const iconPrefixValue = ref('')
const iconSuffixValue = ref('')

const iconOptions: SelectOption[] = [
  { label: '用户选择', value: 'user' },
  { label: '位置选择', value: 'location' },
  { label: '设置选项', value: 'setting' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>前置图标:</label>
      <KSelect v-model="iconPrefixValue" :options="iconOptions" prefix-icon="user" placeholder="用户选择" />
    </div>
    <div class="demo-item">
      <label>后置图标:</label>
      <KSelect v-model="iconSuffixValue" :options="iconOptions" suffix-icon="fabulous" placeholder="位置选择" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>