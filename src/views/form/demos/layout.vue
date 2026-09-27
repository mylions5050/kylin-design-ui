<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KSelect from '@/components/select/index'
import KDatePicker from '@/components/date-picker/date-picker'
import KRadioGroup from '@/components/radio/group'
import KRadio from '@/components/radio/index'
import type { FormLabelPosition } from '@/components/form/index'

const form = reactive({ user: '', region: '', date: undefined })
const regionOptions = ['华北', '华东', '华南'].map((r) => ({ label: r, value: r }))

// 标签位置：left / right / top
const positions: Array<{ label: string; value: FormLabelPosition }> = [
  { label: '左对齐', value: 'left' },
  { label: '右对齐', value: 'right' },
  { label: '标签在上', value: 'top' },
]
const position = ref<FormLabelPosition>('right')

// 排列方式：块级 / 行内
const layouts = [
  { label: '块级', value: 'block' },
  { label: '行内', value: 'inline' },
]
const layout = ref<'block' | 'inline'>('block')
</script>

<template>
  <div class="form-layout">
    <div class="form-layout__panel">
      <KForm :model="form" :label-position="position" :inline="layout === 'inline'" label-width="80px">
        <KFormItem label="用户名">
          <KInput v-model="form.user" placeholder="请输入用户名" />
        </KFormItem>
        <KFormItem label="地区">
          <KSelect v-model="form.region" :options="regionOptions" placeholder="请选择地区" />
        </KFormItem>
        <KFormItem label="日期">
          <KDatePicker v-model="form.date" placeholder="请选择日期" />
        </KFormItem>
      </KForm>
    </div>

    <div class="form-layout__controls">
      <div class="form-layout__control">
        <span class="form-layout__label">标签位置</span>
        <KRadioGroup v-model="position">
          <KRadio v-for="p in positions" :key="p.value" :value="p.value" :label="p.label" />
        </KRadioGroup>
      </div>
      <div class="form-layout__control">
        <span class="form-layout__label">排列方式</span>
        <KRadioGroup v-model="layout">
          <KRadio v-for="l in layouts" :key="l.value" :value="l.value" :label="l.label" />
        </KRadioGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-layout__panel {
  padding: 20px;
  border: 1px solid var(--k-color-border-light);
  border-radius: 8px;
  background: var(--k-color-bg);
}

.form-layout__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 40px;
  margin-top: 16px;
}

.form-layout__control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-layout__label {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
