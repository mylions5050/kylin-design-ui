<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from '@/components/time-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const time1 = ref<Dayjs | null>(null)
const time2 = ref(dayjs('2026-08-26 14:30:00'))
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础选择:</label>
      <KTimePicker v-model="time1" placeholder="选择时间" />
      <span class="event-log">{{ time1 ? time1.format('HH:mm:ss') : '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>默认选中:</label>
      <KTimePicker v-model="time2" placeholder="选择时间" />
      <span class="event-log">{{ time2.format('HH:mm:ss') }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>