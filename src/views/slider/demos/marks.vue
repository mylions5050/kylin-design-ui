<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

const value = ref(20)

/** 刻度标记：key 为数值位置，点击可定位 */
const marks = {
  0: '0°C',
  20: '20°C',
  37: '37°C',
  60: '60°C',
  100: {
    label: '100°C',
  },
}
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" :marks="marks" :step="10" dots />
  </div>
</template>

<style scoped>
.demo-slider {
  padding-top: 4px;
}
</style>
