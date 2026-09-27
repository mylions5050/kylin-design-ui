<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'
import type { SliderColor, SliderMarks } from '@/components/slider/index'

const value = ref(50)

/** 每个阶段的刻度标签单独配色 */
const marks: SliderMarks = {
  0: { label: '简单', style: { color: '#52c41a' } },
  33: { label: '一般', style: { color: '#1677ff' } },
  66: { label: '困难', style: { color: '#fa8c16' } },
  100: { label: '地狱', style: { color: '#f5222d' } },
}

/** 按当前值取色：轨道、滑块、激活刻度点随阶段变色 */
const stageColor: SliderColor = (v) => {
  if (v < 33) return '#52c41a'
  if (v < 66) return '#1677ff'
  if (v < 100) return '#fa8c16'
  return '#f5222d'
}
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" :marks="marks" :color="stageColor" tooltip-open />
  </div>
</template>

<style scoped>
.demo-slider {
  padding-top: 4px;
}
</style>
