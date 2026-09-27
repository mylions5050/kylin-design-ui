<script setup lang="ts">
import KCard from '@/components/card/index'
</script>

<template>
  <div class="card-grid">
    <KCard
      header="自定义样式"
      :body-style="{ background: 'var(--k-color-bg-secondary)', borderRadius: '4px', padding: '24px' }"
    >
      <p class="card-text">body 区域使用了自定义背景色和内边距。</p>
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
