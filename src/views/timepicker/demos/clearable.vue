<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from '@/components/time-picker/index'
import type { Dayjs } from 'dayjs'

const t1 = ref<Dayjs | null>(null)
const t2 = ref<Dayjs | null>(null)
const t3 = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>可清除:</label>
      <KTimePicker v-model="t1" clearable placeholder="可清除" />
      <span class="event-log">{{ t1 ? t1.format('HH:mm:ss') : '未选择' }}</span>
    </div>
    <div class="demo-item">
      <label>禁用:</label>
      <KTimePicker v-model="t2" disabled placeholder="禁用" />
    </div>
    <div class="demo-item">
      <label>只读:</label>
      <KTimePicker v-model="t3" readonly placeholder="只读" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>