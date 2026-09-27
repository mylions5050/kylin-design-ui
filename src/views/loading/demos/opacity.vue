<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'

const visible = ref(true)
</script>

<template>
  <KLoading v-model="visible" local type="info" :opacity="0.2" text="opacity 0.2" />
  <KLoading v-model="visible" local type="info" :opacity="0.5" text="opacity 0.5" />
  <KLoading v-model="visible" local type="info" :opacity="0.8" background="#000000" text="opacity 0.8" />
</template>
