<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 可全屏
const fullscreenVisible = ref(false)
</script>

<template>
  <div class="demo-group">
    <KButton type="primary" @click="fullscreenVisible = true">可全屏</KButton>
  </div>

  <KDialog
    v-model="fullscreenVisible"
    title="全屏对话框"
    fullscreen
    @confirm="fullscreenVisible = false"
    @cancel="fullscreenVisible = false"
  >
    <p>点击头部全屏按钮切换全屏模式。</p>
    <p>全屏模式下拖拽和尺寸设置暂时失效。</p>
    <p v-for="i in 10" :key="i">第 {{ i }} 行：测试全屏下滚动。</p>
  </KDialog>
</template>
