<script setup lang="ts">
import { ref } from 'vue'
import KDatePickerPane from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import type { DateSegment } from '@/components/date-picker/index'

// 默认预置一段 2 号 ~ 10 号
const ranges = ref<DateSegment[]>([
  [dayjs().startOf('month').date(2), dayjs().startOf('month').date(10)],
])

const onRangesChange = (segs: DateSegment[]) => {
  ranges.value = segs
}

const formatSegs = (segs: DateSegment[]) =>
  segs.map(([s, e]) => `${s.date()}~${e.date()}号`).join('、') || '无'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>分段多段范围:</label>
      <KDatePickerPane segment :ranges="ranges" @update:ranges="onRangesChange" />
      <p class="current-info">
        两步点选成段；点段内日期截断移除（如取消 4、5 号 → 拆成 2~3 号、6~10 号）
      </p>
      <p class="current-info">当前分段：{{ formatSegs(ranges) }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>
