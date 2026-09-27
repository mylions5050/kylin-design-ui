<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate/index'

const value = ref(3)
</script>

<template>
  <div class="demo-rate">
    <KRate v-model="value" />
    <span class="demo-rate__tip">当前评分：{{ value }}</span>
  </div>
</template>
