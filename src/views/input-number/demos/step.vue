<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// step 支持小数；空值时从 0（或 min）起步
const value = ref<number | null>(10)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>步长 10:</label>
      <KInputNumber v-model="value" :step="10" />
      <span class="event-log">当前值：{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
