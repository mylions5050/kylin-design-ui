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
      <label>禁用状态:</label>
      <KDatePicker v-model="date" disabled placeholder="选择日期" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>