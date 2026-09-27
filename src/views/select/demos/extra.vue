<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const customNoMatchValue = ref('')
const customNoDataValue = ref('')
const dfOptionValue = ref('')
const basicValue = ref('')

const basicOptions: SelectOption[] = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
  { label: '选项4', value: 'option4' },
  { label: '选项5', value: 'option5' },
]

const trimValue = ref('')
const lazyValue = ref('')
const numberValue = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>无匹配文本:</label>
      <KSelect
        v-model="customNoMatchValue"
        :options="basicOptions"
        filterable
        no-match-text="未找到相关选项"
        placeholder="输入不存在的关键词试试"
      />
    </div>
    <div class="demo-item">
      <label>无数据文本:</label>
      <KSelect
        v-model="customNoDataValue"
        :options="[]"
        no-data-text="暂无可用选项"
        placeholder="空数据展示"
      />
    </div>
    <div class="demo-item">
      <label>高亮第一项:</label>
      <KSelect
        v-model="dfOptionValue"
        :options="basicOptions"
        filterable
        default-first-option
        placeholder="输入关键词后按 Enter 选中第一项"
      />
    </div>
    <div class="demo-item">
      <label>向上弹出:</label>
      <KSelect
        v-model="basicValue"
        :options="basicOptions"
        placement="top-start"
        placeholder="面板向上弹出"
      />
    </div>
    <div class="demo-item">
      <label>v-model.trim:</label>
      <KSelect
        v-model.trim="trimValue"
        :options="basicOptions"
        placeholder="选中值会自动 trim"
      />
      <span class="event-log">值: "{{ trimValue }}"</span>
    </div>
    <div class="demo-item">
      <label>v-model.number:</label>
      <KSelect
        v-model.number="numberValue"
        :options="basicOptions"
        placeholder="选中值转为数字"
      />
      <span class="event-log">类型: {{ typeof numberValue }}, 值: {{ numberValue }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>