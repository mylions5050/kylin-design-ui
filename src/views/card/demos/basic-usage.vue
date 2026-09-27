<script setup lang="ts">
import KCard from '@/components/card/index'
</script>

<template>
  <div class="card-grid">
    <KCard>
      <p class="card-text">这是一张基础卡片，只有内容区域。</p>
      <p class="card-text">卡片默认使用 CSS 变量控制内边距和圆角。</p>
    </KCard>
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
