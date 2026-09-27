<script setup lang="ts">
import { ref } from 'vue'
import KProgress from '@/components/progress/index'

const p = ref(60)
// 百分比键对象：line 生成 CSS 渐变，circle 生成 SVG linearGradient
const gradientStops = { '0%': '#108ee9', '100%': '#87d068' }
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>直线渐变（color 传百分比键对象）:</label>
      <KProgress :percentage="p" :color="gradientStops" />
    </div>
    <div class="demo-item">
      <label>直线渐变（color 直接传 CSS 渐变串）:</label>
      <KProgress :percentage="p" color="linear-gradient(90deg, #108ee9, #87d068)" />
    </div>
    <div class="demo-item">
      <label>渐变环形 circle:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="p" :color="gradientStops" />
        <KProgress type="circle" :percentage="p" :color="gradientStops" :stroke-width="10" :width="90" />
      </div>
    </div>
    <div class="demo-item">
      <label>渐变仪表盘 dashboard:</label>
      <KProgress type="dashboard" :percentage="p" :color="gradientStops" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.circle-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
