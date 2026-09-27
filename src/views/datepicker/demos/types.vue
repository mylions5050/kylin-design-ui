<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const dateVal = ref<Dayjs | null>(null)
const weekVal = ref<Dayjs | null>(null)
const monthVal = ref<Dayjs | null>(null)
const yearVal = ref<Dayjs | null>(null)
const quarterVal = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>日选择:</label>
      <KDatePicker v-model="dateVal" type="date" placeholder="选择日期" />
      <span class="event-log">{{ dateVal?.format('YYYY-MM-DD') || '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>周选择:</label>
      <KDatePicker v-model="weekVal" type="week" placeholder="选择周" />
      <span class="event-log">{{ weekVal?.format('YYYY-MM-DD') || '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>月选择:</label>
      <KDatePicker v-model="monthVal" type="month" placeholder="选择月份" />
      <span class="event-log">{{ monthVal?.format('YYYY-MM') || '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>年选择:</label>
      <KDatePicker v-model="yearVal" type="year" placeholder="选择年份" />
      <span class="event-log">{{ yearVal?.format('YYYY') || '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>季度选择:</label>
      <KDatePicker v-model="quarterVal" type="quarter" placeholder="选择季度" />
      <span class="event-log">{{ quarterVal?.format('YYYY-[Q]Q') || '未选择' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>