<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const values = ref<Dayjs[]>([
  dayjs('2026-08-11'),
  dayjs('2026-08-15'),
  dayjs('2026-08-22'),
])
const confirmValues = ref<Dayjs[]>([dayjs('2026-08-11')])
const months = ref<Dayjs[]>([dayjs('2026-03-01'), dayjs('2026-08-01')])
const years = ref<Dayjs[]>([dayjs('2024-01-01'), dayjs('2026-01-01')])
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>多选（即时生效）:</label>
      <!-- multiple 开启多选，v-model:values 双向绑定已选日期集合，clearable 一键清空 -->
      <KDatePicker
        v-model:values="values"
        multiple
        clearable
        placeholder="选择多个日期"
      />
      <span class="event-log">{{ values.length ? values.map(d => d.format('MM-DD')).join(', ') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>多选 + 手动确认:</label>
      <!-- multiple + confirm：点选进草稿，点“确定”才提交生效、点“取消”回滚 -->
      <KDatePicker
        v-model:values="confirmValues"
        multiple
        confirm
        cardPanel
        placeholder="选择多个日期"
      />
      <span class="event-log">{{ confirmValues.length ? confirmValues.map(d => d.format('MM-DD')).join(', ') : '未选择（点确定后才会更新）' }}</span>
    </div>

    <div class="demo-item">
      <label>月份多选:</label>
      <KDatePicker
        v-model:values="months"
        multiple
        type="month"
        placeholder="选择多个月份"
      />
      <span class="event-log">{{ months.length ? months.map(d => d.format('YYYY-MM')).join(', ') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>年份多选:</label>
      <KDatePicker
        v-model:values="years"
        multiple
        type="year"
        placeholder="选择多个年份"
      />
      <span class="event-log">{{ years.length ? years.map(d => d.format('YYYY')).join(', ') : '未选择' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>