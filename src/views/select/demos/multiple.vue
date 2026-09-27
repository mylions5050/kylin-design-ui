<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import KOption from '@/components/select/option'
import type { SelectOption } from '@/components/select/types'

const multiselectValue = ref<string[]>([])
const multiselectSearchValue = ref<string[]>([])
const multiselectCollapsedValue = ref<string[]>([])
const multiselectClearableValue = ref<string[]>(['shanghai', 'beijing'])
const multiselectSlotValue = ref<string[]>(['vue'])

const multiselectOptions: SelectOption[] = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '南京', value: 'nanjing' },
  { label: '武汉', value: 'wuhan' },
  { label: '成都', value: 'chengdu' },
]

const skillOptions: SelectOption[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Node.js', value: 'node' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础多选:</label>
      <KSelect
        v-model="multiselectValue"
        :options="multiselectOptions"
        multiple
        placeholder="选择多个城市"
      />
    </div>
    <div class="demo-item">
      <label>多选+可搜索:</label>
      <KSelect
        v-model="multiselectSearchValue"
        :options="skillOptions"
        multiple
        filterable
        placeholder="搜索并选择技能"
      />
    </div>
    <div class="demo-item">
      <label>折叠标签模式:</label>
      <KSelect
        v-model="multiselectCollapsedValue"
        :options="multiselectOptions"
        multiple
        collapse-tags
        :max-tags="2"
        placeholder="超过2个标签将折叠"
      />
    </div>
    <div class="demo-item">
      <label>多选+可清除:</label>
      <KSelect
        v-model="multiselectClearableValue"
        :options="multiselectOptions"
        multiple
        clearable
        placeholder="默认选择上海和北京"
      />
    </div>
    <div class="demo-item">
      <label>多选+插槽模式:</label>
      <KSelect
        v-model="multiselectSlotValue"
        multiple
        filterable
        placeholder="选择喜欢的框架"
      >
        <KOption label="Vue.js" value="vue" />
        <KOption label="React" value="react" />
        <KOption label="Angular" value="angular" />
        <KOption label="Svelte" value="svelte" />
        <KOption label="Solid.js" value="solid" />
        <KOption label="Qwik" value="qwik" />
      </KSelect>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>