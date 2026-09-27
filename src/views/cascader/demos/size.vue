<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
</script>

<template>
  <div class="demo-sizes">
    <KCascader v-model="value" :options="regionOptions" size="small" placeholder="small" />
    <KCascader v-model="value" :options="regionOptions" placeholder="default" />
    <KCascader v-model="value" :options="regionOptions" size="large" placeholder="large" />
  </div>
</template>

<style scoped>
.demo-sizes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
}
</style>
