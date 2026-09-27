<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date = ref<Dayjs | null>(null)
const minDate = dayjs().subtract(7, 'day')
const maxDate = dayjs().add(7, 'day')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>限制日期:</label>
      <KDatePicker v-model="date" :min-date="minDate" :max-date="maxDate" placeholder="选择日期" />
      <span class="event-log">可选：{{ minDate.format('MM/DD') }} - {{ maxDate.format('MM/DD') }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>