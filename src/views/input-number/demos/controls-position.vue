<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// controls-position="right"：上下箭头堆叠在右侧，hover 或聚焦时出现
const value = ref<number | null>(3)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>右侧箭头:</label>
      <KInputNumber v-model="value" controls-position="right" />
      <span class="event-log">当前值：{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
