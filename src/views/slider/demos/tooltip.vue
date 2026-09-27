<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

const value = ref(38)
const rangeValue = ref<[number, number]>([20, 70])
const percent = ref(66)

/** 自定义提示：加 % 后缀 */
const formatPercent = (v: number) => `${v}%`
</script>

<template>
  <div class="demo-slider">
    <div class="demo-slider__item">
      <span class="demo-slider__label">formatTooltip：</span>
      <KSlider v-model="value" :format-tooltip="formatPercent" />
    </div>
    <div class="demo-slider__item">
      <span class="demo-slider__label">tooltipOpen 常显：</span>
      <KSlider v-model="rangeValue" range tooltip-open />
    </div>
    <div class="demo-slider__item">
      <span class="demo-slider__label">数字取整显示：</span>
      <KSlider v-model="percent" :step="10" :format-tooltip="(v: number) => Math.round(v)" />
    </div>
  </div>
</template>

<style scoped>
.demo-slider__item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-slider__item + .demo-slider__item {
  margin-top: 16px;
}

.demo-slider__label {
  flex-shrink: 0;
  width: 140px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
