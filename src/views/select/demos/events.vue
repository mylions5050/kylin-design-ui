<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const eventValue = ref('')
const basicOptions: SelectOption[] = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
  { label: '选项4', value: 'option4' },
  { label: '选项5', value: 'option5' },
]
const eventLog = ref('无')

const handleChange = (value: string | number) => {
  eventLog.value = `值变更: ${value}`
}
const handleVisibleChange = (visible: boolean) => {
  eventLog.value = visible ? '下拉框打开' : '下拉框关闭'
}
const handleClear = () => {
  eventLog.value = '清空选择'
}
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>事件监听:</label>
      <KSelect
        v-model="eventValue"
        :options="basicOptions"
        filterable
        clearable
        @change="handleChange"
        @visible-change="handleVisibleChange"
        @clear="handleClear"
        placeholder="监听选择器事件"
      />
    </div>
    <div class="demo-item">
      <label>事件日志:</label>
      <span class="event-log">{{ eventLog }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>