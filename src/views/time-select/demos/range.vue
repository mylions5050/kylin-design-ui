<script setup lang="ts">
import { ref } from 'vue'
import KTimeSelect from '@/components/time-select/index'

const startTime = ref('')
const endTime = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>固定时间范围（先选开始，结束的早期选项置灰；反之亦然）:</label>
      <div class="range-row">
        <KTimeSelect
          v-model="startTime"
          :max-time="endTime"
          start="08:30"
          step="00:15"
          end="18:30"
          placeholder="开始时间"
        />
        <KTimeSelect
          v-model="endTime"
          :min-time="startTime"
          start="08:30"
          step="00:15"
          end="18:30"
          placeholder="结束时间"
        />
      </div>
      <p class="current-info">
        {{ startTime ? `开始：${startTime}` : '未选择开始' }}
        {{ endTime ? `，结束：${endTime}` : '' }}
      </p>
    </div>
    <div class="demo-item">
      <label>minTime / maxTime 置灰（只允许 12:00 ~ 15:00 之间）:</label>
      <KTimeSelect start="09:00" step="00:30" end="18:00" min-time="12:00" max-time="15:00" placeholder="选择时间" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.range-row {
  display: flex;
  gap: 12px;
}
</style>
