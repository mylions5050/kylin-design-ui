<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from '@/components/time-picker/index'
import type { Dayjs } from 'dayjs'

const manual = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>手动确认:</label>
      <KTimePicker v-model="manual" confirm placeholder="选择时间" />
      <span class="event-log">{{ manual ? manual.format('HH:mm:ss') : '未选择' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>