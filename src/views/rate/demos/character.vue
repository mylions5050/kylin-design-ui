<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const letter = ref(2)
const chinese = ref(3.5)
</script>

<template>
  <div class="demo-rate demo-rate--chars">
    <KRate v-model="letter" character="A" />
    <KRate v-model="chinese" character="好" allow-half color="#52c41a" />
  </div>
</template>
