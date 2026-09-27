<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import dayjs, { type Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<Dayjs | null>(null)
const minDate = dayjs().startOf('day').subtract(5, 'day')
const maxDate = dayjs().startOf('day').add(5, 'day')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>自定义格式 YYYY/MM/DD HH:mm:</label>
      <KDateTimePicker v-model="value1" format="YYYY/MM/DD HH:mm" placeholder="选择日期时间" />
      <p class="current-info">{{ value1 ? value1.format('YYYY/MM/DD HH:mm') : '未选择' }}</p>
    </div>
    <div class="demo-item">
      <label>可选范围限制（只能选最近前后 5 天）:</label>
      <KDateTimePicker v-model="value2" :min-date="minDate" :max-date="maxDate" placeholder="选择日期时间" />
      <p class="current-info">{{ value2 ? value2.format('YYYY-MM-DD HH:mm:ss') : '未选择' }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
