<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'
import KLoading from '@/components/loading/index'

const visible = ref(true)

// 默认暗色：true=暗色遮罩(半透明黑)，false=亮色遮罩(半透明白)
const isDark = ref(true)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px">
    <span>{{ isDark ? '暗色' : '亮色' }}</span>
    <KSwitch v-model="isDark" show-label :active-text="'暗'" :inactive-text="'亮'" />
  </div>

  <div style="position: relative; height: 120px">
    <KLoading v-model="visible" local type="info" :theme="isDark ? 'dark' : 'light'" text="主题切换演示" />
  </div>
</template>
