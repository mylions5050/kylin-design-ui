<script setup lang="ts">
import { ref } from 'vue'
import KOverlay from '@/components/overlay/index'
import KButton from '@/components/button/index'

// KOverlay 单独使用
const overlayVisible = ref(false)
const overlayLog = ref('')
</script>

<template>
  <div>
    <KButton type="primary" @click="overlayVisible = true">打开遮罩</KButton>
    <span class="event-log">事件: {{ overlayLog }}</span>
  </div>

  <KOverlay
    v-model="overlayVisible"
    @open="overlayLog = 'open'"
    @opened="overlayLog = 'opened'"
    @close="overlayLog = 'close'"
    @closed="overlayLog = 'closed'"
  >
    <div class="overlay-card" @pointerdown.stop>
      <h3>自定义遮罩内容</h3>
      <p>KOverlay 只提供遮罩层 + 动画，内容完全由使用者自定义。</p>
      <p>点击遮罩区域或下方按钮关闭。</p>
      <KButton type="primary" @click="overlayVisible = false">关闭遮罩</KButton>
    </div>
  </KOverlay>
</template>

<style scoped lang="scss">
.event-log {
  font-family: monospace;
  font-size: 13px;
  color: var(--k-color-primary);
}

.overlay-card {
  background: var(--k-color-bg);
  border-radius: var(--k-border-radius-lg);
  padding: 32px;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.12);

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: var(--k-color-text);
  }

  p {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--k-color-text-secondary);
    line-height: 22px;
  }
}
</style>
