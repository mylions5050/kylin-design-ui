<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const searchValue = ref('')
const searchClearableValue = ref('')

const searchOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '南京', value: 'nanjing' },
  { label: '武汉', value: 'wuhan' },
  { label: '成都', value: 'chengdu' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>城市选择:</label>
      <KSelect v-model="searchValue" :options="searchOptions" filterable placeholder="搜索城市名称" />
    </div>
    <div class="demo-item">
      <label>可搜索+可清除:</label>
      <KSelect v-model="searchClearableValue" :options="searchOptions" filterable clearable placeholder="搜索并可以清空" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>