<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// 超出范围时失焦收敛回边界，步进到边界后对应按钮禁用
const value = ref<number | null>(5)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>限制 1 ~ 10:</label>
      <KInputNumber v-model="value" :min="1" :max="10" />
      <span class="event-log">当前值：{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
