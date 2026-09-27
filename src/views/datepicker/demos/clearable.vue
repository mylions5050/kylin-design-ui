<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date = ref<Dayjs | null>(dayjs())
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>可清除:</label>
      <KDatePicker v-model="date" clearable placeholder="选择日期" />
      <span class="event-log">{{ date ? date.format('YYYY-MM-DD') : '已清除' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>