<script setup lang="ts">
import { ref } from 'vue'
import KRate from '@/components/rate'

const small = ref(2)
const normal = ref(3)
const large = ref(4)
</script>

<template>
  <div class="demo-rate demo-rate--sizes">
    <KRate v-model="small" :size="14" />
    <KRate v-model="normal" :size="18" />
    <KRate v-model="large" :size="26" />
  </div>
</template>
