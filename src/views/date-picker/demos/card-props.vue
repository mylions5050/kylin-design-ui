<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import type { Dayjs } from 'dayjs'

const cardSmallDate = ref<Dayjs | null>(null)
const cardDefaultDate = ref<Dayjs | null>(null)
const cardLargeDate = ref<Dayjs | null>(null)
const widthDefaultDate = ref<Dayjs | null>(null)
const widthFullDate = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>卡片属性:</label>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <KDatePickerPane :value="cardSmallDate" @select="cardSmallDate = $event" border shadow="always" size="small" />
        <KDatePickerPane :value="cardDefaultDate" @select="cardDefaultDate = $event" border shadow="hover" size="default" />
        <KDatePickerPane :value="cardLargeDate" @select="cardLargeDate = $event" :border="false" shadow="never" size="large" />
      </div>
    </div>
    <div class="demo-item">
      <label>自定义宽度:</label>
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start;">
        <KDatePickerPane :value="widthDefaultDate" @select="widthDefaultDate = $event" width="340px" />
        <KDatePickerPane :value="widthFullDate" @select="widthFullDate = $event" width="100%" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>