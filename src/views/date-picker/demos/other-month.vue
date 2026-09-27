<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import type { Dayjs } from 'dayjs'

const hiddenDate = ref<Dayjs | null>(null)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>隐藏剩余:</label>
      <KDatePickerPane :value="hiddenDate" @select="hiddenDate = $event" :show-other-month="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>