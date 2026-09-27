<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const dateSmall = ref<Dayjs | null>(dayjs())
const dateDefault = ref<Dayjs | null>(dayjs())
const dateLarge = ref<Dayjs | null>(dayjs())
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>小尺寸:</label>
      <KDatePicker v-model="dateSmall" size="small" placeholder="选择日期" />
    </div>
    <div class="demo-item">
      <label>默认尺寸:</label>
      <KDatePicker v-model="dateDefault" size="default" placeholder="选择日期" />
    </div>
    <div class="demo-item">
      <label>大尺寸:</label>
      <KDatePicker v-model="dateLarge" size="large" placeholder="选择日期" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>