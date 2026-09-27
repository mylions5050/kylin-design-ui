<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import dayjs, { type Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(dayjs('2026-09-15 14:30:00'))
const rangeStart = ref<Dayjs | null>(dayjs().startOf('day').hour(9))
const rangeEnd = ref<Dayjs | null>(dayjs().startOf('day').hour(18))
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>禁用（单选）:</label>
      <KDateTimePicker v-model="value" disabled />
    </div>
    <div class="demo-item">
      <label>禁用（范围）:</label>
      <KDateTimePicker v-model:start="rangeStart" v-model:end="rangeEnd" range disabled />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
