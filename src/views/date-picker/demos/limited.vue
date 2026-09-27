<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const limitedDate = ref<Dayjs | null>(null)
const minDate = dayjs().subtract(7, 'day')
const maxDate = dayjs().add(7, 'day')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>限制日期:</label>
      <KDatePickerPane
        :value="limitedDate"
        :min-date="minDate"
        :max-date="maxDate"
        @select="limitedDate = $event"
      />
      <p class="current-info">
        可选范围：{{ minDate.format('MM/DD') }} - {{ maxDate.format('MM/DD') }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>