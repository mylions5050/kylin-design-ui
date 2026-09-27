<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import dayjs from 'dayjs'

const dt1 = ref(dayjs('2026-09-10 08:30:00'))
const dt2 = ref<string | dayjs.Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础用法（默认值）:</label>
      <KDateTimePicker v-model="dt1" clearable />
      <p class="current-info">{{ dt1 ? dayjs(dt1).format('YYYY-MM-DD HH:mm:ss') : '未选择' }}</p>
    </div>
    <div class="demo-item">
      <label>无默认值（HH:mm 无秒列）:</label>
      <KDateTimePicker v-model="dt2" format="YYYY-MM-DD HH:mm" placeholder="选择日期和时间" />
      <p class="current-info">{{ dt2 ? dayjs(dt2).format('YYYY-MM-DD HH:mm') : '未选择' }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
