<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import KIcon from '@/components/icon/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date1 = ref<Dayjs | null>(null)
const date2 = ref<Dayjs | null>(null)
const date3 = ref<Dayjs | null>(null)
const range = ref<{ start: Dayjs | null; end: Dayjs | null }>({ start: null, end: null })
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>前缀文字:</label>
      <KDatePicker v-model="date1" placeholder="选择日期">
        <template #prefix><span class="prefix-text">出发</span></template>
      </KDatePicker>
      <span class="event-log">{{ date1 ? date1.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>前后缀图标:</label>
      <KDatePicker v-model="date2" placeholder="选择日期" prefix-icon="clock" suffix-icon="calendar-filling" />
      <span class="event-log">{{ date2 ? date2.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>自定义后缀插槽:</label>
      <KDatePicker v-model="date3" placeholder="选择日期" clearable>
        <template #suffix><KIcon name="edit-filling" class="custom-suffix" /></template>
      </KDatePicker>
      <span class="event-log">{{ date3 ? date3.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>范围前后缀:</label>
      <KDatePicker v-model:start="range.start" v-model:end="range.end" range placeholder="选择日期范围" prefix-icon="calendar">
        <template #suffix><KIcon name="arrow-right" class="custom-suffix" /></template>
      </KDatePicker>
      <span class="event-log">
        {{ range.start && range.end ? `${range.start.format('YYYY-MM-DD')} ~ ${range.end.format('YYYY-MM-DD')}` : '未选择' }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";

.prefix-text {
  font-size: 13px;
  color: var(--k-color-text-secondary);
  white-space: nowrap;
}

.custom-suffix {
  color: var(--k-color-primary);
  font-size: 14px;
}
</style>