<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<Dayjs | null>(null)
const value3 = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>small:</label>
      <KDateTimePicker v-model="value1" size="small" />
    </div>
    <div class="demo-item">
      <label>default:</label>
      <KDateTimePicker v-model="value2" size="default" />
    </div>
    <div class="demo-item">
      <label>large:</label>
      <KDateTimePicker v-model="value3" size="large" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
