<script setup lang="ts">
import { ref } from 'vue'
import KCard from '@/components/card/index'
import KButton from '@/components/button/index'
import type { CardSize } from '@/components/card/index'

const currentSize = ref<CardSize>('default')
const sizeOptions: CardSize[] = ['small', 'default', 'large']
let sizeIdx = 1
const toggleSize = () => {
  sizeIdx = (sizeIdx + 1) % 3
  currentSize.value = sizeOptions[sizeIdx]
}
</script>

<template>
  <div class="card-grid">
    <KCard :size="currentSize" header="卡片标题" footer="卡片页脚">
      <p class="card-text">当前尺寸：<strong>{{ currentSize }}</strong></p>
      <p class="card-text">small：12px 16px，default：20px，large：28px 32px</p>
    </KCard>
  </div>
  <div class="demo-buttons" style="margin-top: 12px;">
    <KButton @click="toggleSize">切换尺寸（{{ currentSize }}）</KButton>
  </div>
</template>

<style scoped lang="scss">
.card-grid {
  max-width: 480px;
}

.card-text {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--k-color-text);
  line-height: 22px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
