<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from '@/components/time-picker/index'
import type { Dayjs } from 'dayjs'

const small = ref<Dayjs | null>(null)
const normal = ref<Dayjs | null>(null)
const large = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>small:</label>
      <KTimePicker v-model="small" size="small" placeholder="选择时间" />
    </div>
    <div class="demo-item">
      <label>default:</label>
      <KTimePicker v-model="normal" placeholder="选择时间" />
    </div>
    <div class="demo-item">
      <label>large:</label>
      <KTimePicker v-model="large" size="large" placeholder="选择时间" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>