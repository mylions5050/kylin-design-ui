<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// 三种尺寸：small / default / large
const small = ref<number | null>(1)
const normal = ref<number | null>(2)
const large = ref<number | null>(3)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>small:</label>
      <KInputNumber v-model="small" size="small" />
    </div>
    <div class="demo-item">
      <label>default:</label>
      <KInputNumber v-model="normal" />
    </div>
    <div class="demo-item">
      <label>large:</label>
      <KInputNumber v-model="large" size="large" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
