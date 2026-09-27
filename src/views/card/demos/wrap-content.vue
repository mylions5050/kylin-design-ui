<script setup lang="ts">
import KCard from '@/components/card/index'
</script>

<template>
  <div class="card-grid" style="max-width: 320px;">
    <KCard shadow="hover" :body-style="{ padding: '16px' }">
      <div style="text-align: center; color: var(--k-color-text-secondary); padding: 32px 0;">
        这里是 KCard 包裹的内容区域
      </div>
    </KCard>
  </div>
</template>

<style scoped lang="scss">
.card-grid {
  max-width: 480px;
}
</style>
