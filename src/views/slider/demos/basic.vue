<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

const value = ref(30)
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" />
    <span class="demo-slider__tip">当前值：{{ value }}</span>
  </div>
</template>

<style scoped>
.demo-slider__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
