<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'

const visible = ref(true)
</script>

<template>
  <KLoading v-model="visible" local type="info" :size="24" text="小 24" />
  <KLoading v-model="visible" local type="info" :size="32" text="中 32" />
  <KLoading v-model="visible" local type="info" :size="48" text="大 48" />
</template>
