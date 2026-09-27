<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'

const visible = ref(true)
</script>

<template>
  <KLoading v-model="visible" local type="primary" text="primary 加载" />
  <KLoading v-model="visible" local type="success" text="success 加载" />
  <KLoading v-model="visible" local type="info" text="info 加载" />
  <KLoading v-model="visible" local type="warning" text="warning 加载" />
  <KLoading v-model="visible" local type="error" text="error 加载" />
</template>
