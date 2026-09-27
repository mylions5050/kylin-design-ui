<script setup lang="ts">
import { ref } from 'vue'
import KLoading from '@/components/loading/index'

const visible = ref(true)
</script>

<template>
  <KLoading v-model="visible" local type="info" spinner-type="spinner" text="spinner 双弧咬合" />
  <KLoading v-model="visible" local type="success" spinner-type="circle" text="circle 圆点脉冲" />
  <KLoading v-model="visible" local type="warning" spinner-type="arc" text="arc 经典弧线追逐" />
</template>
