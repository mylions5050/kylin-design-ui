<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate/index'

const value = ref(3)
</script>

<template>
  <div class="demo-rate">
    <KRate v-model="value" disabled />
    <span class="demo-rate__tip">禁用后不可点击，仅展示当前评分</span>
  </div>
</template>
