<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const start1 = ref<Dayjs | null>(null)
const end1 = ref<Dayjs | null>(null)
const start2 = ref<Dayjs | null>(dayjs().subtract(7, 'day'))
const end2 = ref<Dayjs | null>(dayjs())
// 月范围：显示 1 - 7（仅月份数字）
const mStart = ref<Dayjs | null>(null)
const mEnd = ref<Dayjs | null>(null)
// 年范围：显示 2026 - 2029
const yStart = ref<Dayjs | null>(dayjs('2026-01-01'))
const yEnd = ref<Dayjs | null>(dayjs('2029-01-01'))
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>联动面板（默认）:</label>
      <KDatePicker range clearable v-model:start="start1" v-model:end="end1" placeholder="选择日期范围" />
      <span class="event-log">
        {{ start1 && end1 ? `${start1.format('YYYY-MM-DD')} ~ ${end1.format('YYYY-MM-DD')}` : '未选择' }}
      </span>
    </div>
    <div class="demo-item">
      <label>单面板独立选择:</label>
      <KDatePicker range unlink-panels v-model:start="start2" v-model:end="end2" placeholder="选择日期范围" />
      <span class="event-log">
        {{ start2 && end2 ? `${start2.format('YYYY-MM-DD')} ~ ${end2.format('YYYY-MM-DD')}` : '未选择' }}
      </span>
    </div>
    <div class="demo-item">
      <label>月范围（month）：</label>
      <KDatePicker range type="month" v-model:start="mStart" v-model:end="mEnd" placeholder="选择月份范围" />
      <span class="event-log">
        {{ mStart && mEnd ? `${mStart.year()}-${String(mStart.month() + 1).padStart(2, '0')} ~ ${mEnd.year()}-${String(mEnd.month() + 1).padStart(2, '0')}` : '未选择' }}
      </span>
    </div>
    <div class="demo-item">
      <label>年范围（year）：</label>
      <KDatePicker range type="year" v-model:start="yStart" v-model:end="yEnd" placeholder="选择年份范围" />
      <span class="event-log">
        {{ yStart && yEnd ? `${yStart.year()} - ${yEnd.year()}` : '未选择' }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>