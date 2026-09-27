<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
const cleared = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>可清除（hover 出现清除图标）:</label>
      <KDateTimePicker v-model="value" clearable @clear="cleared = '已触发 clear 事件'" />
      <p class="current-info">{{ cleared }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
