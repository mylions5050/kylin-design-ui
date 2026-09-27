<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KSelect from '@/components/select/index'
import KDatePicker from '@/components/date-picker/date-picker'
import KSwitch from '@/components/switch/index'
import KButton from '@/components/button/index'

/** 是否整体禁用 */
const disabled = ref(true)

const form = reactive({
  name: '妙手',
  region: '杭州',
  date: undefined,
})

const regionOptions = ['北京', '上海', '广州', '深圳', '杭州'].map((c) => ({ label: c, value: c }))
</script>

<template>
  <div class="form-disabled">
    <div class="form-disabled__bar">
      <span class="form-disabled__label">整体禁用</span>
      <KSwitch v-model="disabled" />
    </div>
    <KForm :model="form" :disabled="disabled" label-width="80px">
      <KFormItem prop="name" label="用户名">
        <KInput v-model="form.name" placeholder="请输入用户名" />
      </KFormItem>
      <KFormItem prop="region" label="所在地区">
        <KSelect v-model="form.region" :options="regionOptions" placeholder="请选择地区" />
      </KFormItem>
      <KFormItem prop="date" label="日期">
        <KDatePicker v-model="form.date" placeholder="请选择日期" />
      </KFormItem>
      <KFormItem>
        <KButton type="primary" disabled>提交</KButton>
      </KFormItem>
    </KForm>
  </div>
</template>

<style scoped>
.form-disabled {
  max-width: 750px;
}

.form-disabled__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.form-disabled__label {
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
