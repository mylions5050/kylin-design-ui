<script setup lang="ts">
import { ref } from 'vue'
import KSlider from '@/components/slider/index'

const value = ref(30)
const rangeValue = ref<[number, number]>([20, 60])
</script>

<template>
  <div class="demo-slider">
    <!-- 垂直模式需显式给组件设置高度 -->
    <KSlider v-model="value" vertical style="height: 220px" />
    <KSlider v-model="rangeValue" range vertical style="height: 220px" />
  </div>
</template>

<style scoped>
.demo-slider {
  display: flex;
  gap: 24px;
}
</style>
