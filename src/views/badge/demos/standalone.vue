<script setup lang="ts">
import { ref } from 'vue'
import KBadge from '@/components/badge/index'
import KButton from '@/components/button/index'

const visible = ref(true)
</script>

<template>
  <div class="badge-standalone">
    <div class="badge-row">
      <KBadge v-if="visible" :count="11" color="#f59e0b" style="margin-right: 32px" />
      <KBadge v-if="visible" :count="25" style="margin-right: 32px" />
      <KBadge v-if="visible" :count="109" style="background-color: #22c55e; margin-right: 32px" />
      <KButton size="small" @click="visible = false">隐藏</KButton>
      <KButton v-if="!visible" size="small" @click="visible = true">显示</KButton>
    </div>
  </div>
</template>

<style scoped>
.badge-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
