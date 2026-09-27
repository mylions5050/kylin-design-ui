<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const good = ref(3)
const fabulous = ref(4.5)
</script>

<template>
  <div class="demo-rate demo-rate--icons">
    <KRate v-model="good" icon="good" />
    <KRate v-model="fabulous" icon="fabulous" allow-half color="#52c41a" />
  </div>
</template>
