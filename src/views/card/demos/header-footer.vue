<script setup lang="ts">
import KCard from '@/components/card/index'
</script>

<template>
  <div class="card-grid">
    <KCard header="卡片标题" footer="卡片页脚">
      <p class="card-text">带标题和页脚的卡片内容。</p>
      <p class="card-text">标题和页脚通过 prop 传入字符串即可。</p>
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
