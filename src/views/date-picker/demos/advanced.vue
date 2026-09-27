<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const customMonth = dayjs().add(2, 'month')
const customDate = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>初始月份:</label>
      <KDatePickerPane
        :value="customDate"
        :default-month="customMonth"
        @select="customDate = $event"
      />
      <p class="current-info">
        初始月份：{{ customMonth.format('YYYY-MM') }}
        {{ customDate ? `，选中：${customDate.format('YYYY-MM-DD')}` : '' }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>