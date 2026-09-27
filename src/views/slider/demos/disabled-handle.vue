<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

/** 3 个滑块，中间一个被单独禁用 */
const value = ref<number[]>([20, 50, 80])
</script>

<template>
  <div class="demo-slider">
    <KSlider v-model="value" range :disabled="[false, true, false]" tooltip-open />
    <span class="demo-slider__tip">
      disabled 传数组可单独禁用指定滑块（本例中间滑块被禁用），被禁用的滑块作为移动边界，
      两侧滑块无法越过它。当前值：{{ value }}
    </span>
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
