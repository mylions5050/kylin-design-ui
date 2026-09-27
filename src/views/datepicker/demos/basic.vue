<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date1 = ref<Dayjs | null>(null)
const date2 = ref(dayjs())
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础选择:</label>
      <KDatePicker v-model="date1" placeholder="选择日期" />
      <span class="event-log">{{ date1 ? date1.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>默认选中:</label>
      <KDatePicker v-model="date2" placeholder="选择日期" />
      <span class="event-log">{{ date2.format('YYYY-MM-DD') }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>