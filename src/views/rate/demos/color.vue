<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const red = ref(4)
const green = ref(2)
</script>

<template>
  <div class="demo-rate demo-rate--colors">
    <KRate v-model="red" color="#ff6666" />
    <KRate v-model="green" color="#52c41a" />
    <KRate v-model="red" color="#1677ff" disabled />
  </div>
</template>
