<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 自定义遮罩
const customOverlayVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customOverlayVisible = true">亮色遮罩</KButton>
  </div>

  <KDialog
    v-model="customOverlayVisible"
    title="自定义遮罩"
    overlay-background="rgba(255, 255, 255, 0.8)"
    @confirm="customOverlayVisible = false"
    @cancel="customOverlayVisible = false"
  >
    亮色半透明遮罩，适合在暗色主题下需要高亮展示的场景。
  </KDialog>
</template>
