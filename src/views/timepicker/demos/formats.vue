<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from '@/components/time-picker/index'
import type { Dayjs } from 'dayjs'

// format 控制面板渲染的列：HH:mm:ss 三列、HH:mm 两列（无秒）、HH 仅小时列
const full = ref<Dayjs | null>(null)
const noSecond = ref<Dayjs | null>(null)
const hourOnly = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>HH:mm:ss:</label>
      <KTimePicker v-model="full" format="HH:mm:ss" placeholder="含秒" />
      <span class="event-log">{{ full ? full.format('HH:mm:ss') : '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>HH:mm:</label>
      <KTimePicker v-model="noSecond" format="HH:mm" placeholder="不含秒" />
      <span class="event-log">{{ noSecond ? noSecond.format('HH:mm') : '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>HH:</label>
      <KTimePicker v-model="hourOnly" format="HH" placeholder="仅小时" />
      <span class="event-log">{{ hourOnly ? hourOnly.format('HH') : '未选择' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>