<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import { KRow, KCol } from '@/components/grid'
import KInput from '@/components/input/index'
import KInputNumber from '@/components/input-number/index'
import KSelect from '@/components/select/index'
import KDatePicker from '@/components/date-picker/date-picker'
import KTimePicker from '@/components/time-picker/index'
import KCascader from '@/components/cascader/index'
import KTreeSelect from '@/components/tree-select/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { FormRules } from '@/components/form/index'
import type { CascaderOption } from '@/components/cascader/index'
import type { TreeNodeData } from '@/components/tree/index'

const formRef = ref<{ validate: () => Promise<true>; resetFields: () => void }>()

const form = reactive({
  keyword: '',
  city: '',
  checkIn: undefined,
  guests: undefined as number | undefined,
  channel: '',
  org: '',
  arrive: '',
  star: undefined as number | undefined,
})

const cityOptions = ['北京', '上海', '广州', '深圳', '杭州'].map((c) => ({ label: c, value: c }))

const channelOptions: CascaderOption[] = [
  {
    label: '线上',
    value: 'online',
    children: [
      { label: '官网', value: 'web' },
      { label: 'APP', value: 'app' },
      { label: '小程序', value: 'mini' },
    ],
  },
  {
    label: '线下',
    value: 'offline',
    children: [{ label: '门店', value: 'store' }],
  },
]

const orgTree: TreeNodeData[] = [
  {
    id: 'east',
    label: '华东大区',
    children: [
      { id: 'sh', label: '上海站' },
      { id: 'hz', label: '杭州站' },
    ],
  },
  {
    id: 'north',
    label: '华北大区',
    children: [{ id: 'bj', label: '北京站' }],
  },
]

const starOptions = [1, 2, 3, 4, 5].map((n) => ({ label: `${n} 星级`, value: n }))

const rules: FormRules = {
  guests: [{ type: 'number', min: 1, max: 20, message: '人数需在 1 - 20 之间' }],
}

const handleSearch = () => {
  formRef.value
    ?.validate()
    .then(() => message.success('搜索条件已应用'))
    .catch(() => message.error('搜索条件有误，请检查'))
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="form-search">
    <KForm ref="formRef" :model="form" :rules="rules" inline label-width="70px" class="form-search__form">
      <KRow :gutter="16" class="form-search__row">
        <KCol :span="6">
          <KFormItem prop="keyword" label="关键词">
            <KInput v-model="form.keyword" placeholder="酒店名称" clearable />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="city" label="城市">
            <KSelect v-model="form.city" :options="cityOptions" placeholder="请选择" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="checkIn" label="入住日期">
            <KDatePicker v-model="form.checkIn" placeholder="请选择" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="guests" label="人数">
            <KInputNumber v-model="form.guests" :min="1" :max="20" placeholder="入住人数" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="channel" label="渠道来源">
            <KCascader v-model="form.channel" :options="channelOptions" placeholder="请选择" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="org" label="所属站点">
            <KTreeSelect v-model="form.org" :data="orgTree" placeholder="请选择" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="arrive" label="到店时间">
            <KTimePicker v-model="form.arrive" placeholder="HH:mm" />
          </KFormItem>
        </KCol>
        <KCol :span="6">
          <KFormItem prop="star" label="星级">
            <KSelect v-model="form.star" :options="starOptions" placeholder="请选择" />
          </KFormItem>
        </KCol>
        <KCol :span="24" class="form-search__actions">
          <KButton type="primary" @click="handleSearch">搜索</KButton>
          <KButton @click="handleReset">重置</KButton>
        </KCol>
      </KRow>
    </KForm>
  </div>
</template>

<style scoped>
/* 行内 + 栅格：item 与 content 撑满栅格列，控件才能跟随列宽 */
.form-search__form :deep(.k-row) {
  width: 100%;
}

.form-search__form :deep(.k-form__item) {
  width: 100%;
}

.form-search__form :deep(.k-form__content) {
  flex: 1;
}

/* 行内 + 栅格：控件跟随栅格宽度撑满，不再用固定 220px */
.form-search__form :deep(.k-form__content .k-input),
.form-search__form :deep(.k-form__content .k-select),
.form-search__form :deep(.k-form__content .k-input-number),
.form-search__form :deep(.k-form__content .k-date-picker),
.form-search__form :deep(.k-form__content .k-cascader),
.form-search__form :deep(.k-form__content .k-tree-select),
.form-search__form :deep(.k-form__content .k-time-picker) {
  width: 100%;
  max-width: 100%;
}

.form-search__actions {
  display: flex;
  gap: 8px;
}
</style>
