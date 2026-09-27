<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const value = ref(4)
</script>

<template>
  <div class="demo-rate demo-rate--readonly">
    <KRate v-model="value" readonly />
    <KRate v-model="value" color="#52c41a" character="好" readonly />
    <span class="demo-rate__tip">只读：保持正常颜色视觉，仅不可交互（对比禁用态的灰化）</span>
  </div>
</template>
