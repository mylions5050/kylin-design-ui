<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const range = ref<[Dayjs | null, Dayjs | null]>([null, null])
const defaultRange = ref<[Dayjs | null, Dayjs | null]>([dayjs().subtract(5, 'day'), dayjs().add(5, 'day')])

const onRangeSelect = (date: Dayjs) => {
  const [s, e] = range.value
  if (!s || (s && e)) {
    range.value = [date, null]
  } else {
    if (date.isBefore(s)) {
      range.value = [date, s]
    } else {
      range.value = [s, date]
    }
  }
}

const onDefaultRangeSelect = (date: Dayjs) => {
  const [s, e] = defaultRange.value
  if (!s || (s && e)) {
    defaultRange.value = [date, null]
  } else {
    if (date.isBefore(s)) {
      defaultRange.value = [date, s]
    } else {
      defaultRange.value = [s, date]
    }
  }
}
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>范围选择:</label>
      <KDatePickerPane
        :start="range[0]"
        :end="range[1]"
        @select="onRangeSelect"
      />
      <p class="current-info">
        {{ range[0] ? `开始：${range[0].format('YYYY-MM-DD')}` : '请选择开始日期' }}
        {{ range[1] ? `，结束：${range[1].format('YYYY-MM-DD')}` : '' }}
      </p>
    </div>
    <div class="demo-item">
      <label>默认范围:</label>
      <KDatePickerPane
        :start="defaultRange[0]"
        :end="defaultRange[1]"
        @select="onDefaultRangeSelect"
      />
      <p class="current-info">
        {{ defaultRange[0] ? `开始：${defaultRange[0].format('YYYY-MM-DD')}` : '请选择开始日期' }}
        {{ defaultRange[1] ? `，结束：${defaultRange[1].format('YYYY-MM-DD')}` : '' }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>