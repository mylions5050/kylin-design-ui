<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// 禁用 / 只读（隐藏按钮）/ 隐藏增减按钮
const value = ref<number | null>(1)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>禁用:</label>
      <KInputNumber v-model="value" disabled />
    </div>
    <div class="demo-item">
      <label>只读:</label>
      <KInputNumber v-model="value" readonly />
    </div>
    <div class="demo-item">
      <label>隐藏增减按钮:</label>
      <KInputNumber v-model="value" :controls="false" />
    </div>
    <div class="demo-item">
      <label>禁用 + 右侧箭头:</label>
      <KInputNumber v-model="value" disabled controls-position="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
