<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const sizeSmallValue = ref('')
const sizeDefaultValue = ref('')
const sizeLargeValue = ref('')

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
      <label>小尺寸:</label>
      <KSelect v-model="sizeSmallValue" :options="basicOptions" size="small" placeholder="小型选择器" />
    </div>
    <div class="demo-item">
      <label>默认尺寸:</label>
      <KSelect v-model="sizeDefaultValue" :options="basicOptions" size="default" placeholder="默认选择器" />
    </div>
    <div class="demo-item">
      <label>大尺寸:</label>
      <KSelect v-model="sizeLargeValue" :options="basicOptions" size="large" placeholder="大型选择器" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>