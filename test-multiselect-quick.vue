
<template>
  <div style="padding: 20px; max-width: 500px;">
    <h3>多选测试</h3>
    
    <KSelect 
      v-model="multiselectValue"
      :options="options"
      placeholder="请选择多选选项"
      multiple
      clearable
      filterable
      @change="handleChange"
      @remove-tag="handleRemoveTag"
      style="margin-bottom: 20px;"
    />

    <div style="margin: 20px 0; padding: 10px; border: 1px solid #ccc;">
      <strong>当前选中值：</strong>
      <pre>{{ multiselectValue }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from './src/components/select/index'

const multiselectValue = ref<string[]>(['北京', '上海'])

const options = [
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' },
  { label: '广州', value: '广州' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' },
  { label: '成都', value: '成都' },
  { label: '武汉', value: '武汉' },
  { label: '西安', value: '西安' },
]

const handleChange = (value: string[]) => {
  console.log('选择变化:', value)
}

const handleRemoveTag = (value: string) => {
  console.log('移除标签:', value)
}
</script>
