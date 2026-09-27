<script setup lang="ts">
import { ref } from 'vue'
import KDateTimePicker from '@/components/date-time-picker/index'
import dayjs, { type Dayjs } from 'dayjs'

const start = ref<Dayjs | null>(dayjs().startOf('day').hour(9))
const end = ref<Dayjs | null>(dayjs().startOf('day').hour(18))
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>日期时间范围（默认值）:</label>
      <KDateTimePicker v-model:start="start" v-model:end="end" range clearable />
      <p class="current-info">
        {{ start ? `开始：${dayjs(start).format('YYYY-MM-DD HH:mm:ss')}` : '未选择开始' }}
        {{ end ? `，结束：${dayjs(end).format('YYYY-MM-DD HH:mm:ss')}` : '' }}
      </p>
    </div>
    <div class="demo-item">
      <label>日期时间范围（无默认值）:</label>
      <KDateTimePicker range placeholder="选择起止时间" format="YYYY-MM-DD HH:mm" />
      <p class="current-info">两步点选成对后点"确定"生效；未成对点"确定"不提交</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
