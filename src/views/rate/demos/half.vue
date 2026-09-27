<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const value = ref(3.5)
</script>

<template>
  <div class="demo-rate">
    <KRate v-model="value" allow-half />
    <span class="demo-rate__tip">当前评分：{{ value }}（悬浮到星星前半部分记 0.5 分）</span>
  </div>
</template>
