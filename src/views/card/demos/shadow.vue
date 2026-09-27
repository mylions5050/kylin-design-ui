<script setup lang="ts">
import { ref } from 'vue'
import KCard from '@/components/card/index'
import KButton from '@/components/button/index'

const shadowType = ref<'always' | 'hover' | 'never'>('always')
const shadowOptions = ['always', 'hover', 'never'] as const
let shadowIdx = 0
const toggleShadow = () => {
  shadowIdx = (shadowIdx + 1) % 3
  shadowType.value = shadowOptions[shadowIdx] as 'always' | 'hover' | 'never'
}
</script>

<template>
  <div class="card-grid">
    <KCard :shadow="shadowType" header="阴影卡片">
      <p class="card-text">当前阴影模式：<strong>{{ shadowType }}</strong></p>
      <p class="card-text">hover 模式：鼠标悬停时显示阴影</p>
      <p class="card-text">never 模式：始终无阴影</p>
    </KCard>
  </div>
  <div class="demo-buttons" style="margin-top: 12px;">
    <KButton @click="toggleShadow">切换阴影模式（{{ shadowType }}）</KButton>
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
