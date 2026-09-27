<script setup lang="ts">
import { ref, computed } from 'vue'
import KRate from '@/components/rate'

const value = ref(2)
const texts = ['差', '中', '良', '优']
const colors = ['#ff4d4f', '#faad14', '#1677ff', '#52c41a']
const currentText = computed(() => texts[value.value - 1] ?? '未评分')
</script>

<template>
  <div class="demo-rate">
    <KRate v-model="value" :count="4" :texts="texts" :colors="colors" />
    <span class="demo-rate__tip">当前评价：{{ currentText }}</span>
  </div>
</template>
