<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// precision 控制小数位数，展示与步进结果都按它取齐
const value = ref<number | null>(2.5)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>精度 2 位:</label>
      <KInputNumber v-model="value" :precision="2" :step="0.1" />
      <span class="event-log">当前值：{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
