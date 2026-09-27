<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import KAlert from '@/components/alert/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date = ref<Dayjs | null>(null)
const confirmDate = ref<Dayjs | null>(null)

const shortcuts = [
  { text: '今天', value: () => dayjs() },
  { text: '明天', value: () => dayjs().add(1, 'day') },
  { text: '本周日', value: () => dayjs().endOf('week') },
  { text: '一个月后', value: () => dayjs().add(1, 'month') },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>卡片式面板（即时生效）:</label>
      <!-- 卡片式布局：最外层带阴影卡 + 左侧快捷导航 + 右侧 2px 蓝边日期面板 -->
      <!-- 默认无确认/取消，选择日期即时生效并关闭面板 -->
      <KDatePicker v-model="date" cardPanel placeholder="选择日期" :shortcuts="shortcuts">
        <template #top>
          <KAlert type="primary" effect="plain" size="mini" customClass="panel-alert">点击快捷项或手动选择日期，选中即生效</KAlert>
        </template>
      </KDatePicker>
      <span class="event-log">{{ date ? date.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>手动确认模式（confirm）:</label>
      <!-- 开启 confirm：选择日期/快捷项不即时关闭，需点“确定”才提交生效、点“取消”回滚 -->
      <KDatePicker
        v-model="confirmDate"
        cardPanel
        confirm
        placeholder="选择日期"
        :shortcuts="shortcuts"
      >
        <template #top>
          <KAlert type="warning" effect="plain" size="mini" customClass="panel-alert">选择后需点“确定”生效，点“取消”放弃</KAlert>
        </template>
      </KDatePicker>
      <span class="event-log">{{ confirmDate ? confirmDate.format('YYYY-MM-DD') : '未选择（点确定后才会更新）' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";

// 顶部提示条：收小圆角，与面板 2px 蓝框/外层卡保持一致，避免 KAlert 默认偏大圆角显得突兀
:deep(.panel-alert) {
  border-radius: 6px;
}
</style>