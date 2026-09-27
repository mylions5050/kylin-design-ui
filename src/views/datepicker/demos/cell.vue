<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import KIcon from "@/components/icon/index";
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const date = ref<Dayjs | null>(null)
const month = ref<Dayjs | null>(null)
const year = ref<Dayjs | null>(null)

// 节日列表，模拟 element-plus 的 isHoliday 判断
const holidays = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07']

const isHoliday = ({ date: d }: { date: Dayjs }) => {
  return holidays.includes(d.format('YYYY-MM-DD'))
}
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>日期 cell:</label>
      <!-- #cell 暴露 date/text。用 date 判断节日标记，用容器类对齐默认格子尺寸 -->
      <KDatePicker v-model="date" placeholder="选择日期">
        <template #cell="{ date: d, text, isSelected, isToday }">
          <div
            class="k-date-picker-pane__cell-custom"
            :class="{ 'is-selected': isSelected, 'is-today': isToday }"
          >
            <KIcon v-if="isHoliday({ date: d })" color="#f00" name="favorite-filling" />
            <span v-else>{{ text }}</span>
          </div>
        </template>
      </KDatePicker>
      <span class="event-log">{{ date ? date.format('YYYY-MM-DD') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>月份 cell:</label>
      <!-- month 的 text 是 0 起始索引，展示时 +1。月/年/季格子是整宽按钮，直接放文字即可，勿套用日格子的固定尺寸容器 -->
      <KDatePicker v-model="month" type="month" placeholder="选择月份">
        <template #cell="{ text }">
          <span>{{ text + 1 }} 期</span>
        </template>
      </KDatePicker>
      <span class="event-log">{{ month ? month.format('YYYY-MM') : '未选择' }}</span>
    </div>

    <div class="demo-item">
      <label>年份 cell:</label>
      <!-- year 的 text 是年份本身，直接展示 -->
      <KDatePicker v-model="year" type="year" placeholder="选择年份">
        <template #cell="{ text }">
          <span>{{ text }} 年</span>
        </template>
      </KDatePicker>
      <span class="event-log">{{ year ? year.format('YYYY') : '未选择' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";

// 容器类内的选中/今日态样式由这里补充（对齐 EP 的 current 态）
:deep(.k-date-picker-pane__cell-custom.is-selected) {
  color: var(--k-color-bg);
}

:deep(.k-date-picker-pane__cell-custom.is-today) {
  color: var(--k-color-primary);
}
</style>