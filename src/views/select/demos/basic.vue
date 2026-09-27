<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const basicValue = ref('')
const defaultValue = ref('option2')

const basicOptions: SelectOption[] = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
  { label: '选项4', value: 'option4' },
  { label: '选项5', value: 'option5' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础选择器:</label>
      <KSelect v-model="basicValue" :options="basicOptions" placeholder="请选择选项" />
    </div>
    <div class="demo-item">
      <label>默认值:</label>
      <KSelect v-model="defaultValue" :options="basicOptions" placeholder="默认选中选项2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>