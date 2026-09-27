<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// #prefix / #suffix 插槽自定义前缀后缀内容，可与右侧箭头等形态组合
const price = ref<number | null>(100)
const weight = ref<number | null>(50)
const height = ref<number | null>(170)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>金额:</label>
      <KInputNumber v-model="price" :min="0">
        <template #prefix>¥</template>
      </KInputNumber>
    </div>
    <div class="demo-item">
      <label>重量:</label>
      <KInputNumber v-model="weight" :min="0">
        <template #suffix>kg</template>
      </KInputNumber>
    </div>
    <div class="demo-item">
      <label>右侧箭头 + 后缀:</label>
      <KInputNumber v-model="height" :min="0" controls-position="right">
        <template #suffix>cm</template>
      </KInputNumber>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
