<script setup lang="ts">
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="samples">
    <KIcon name="check-item-filling" :size="12" />
    <KIcon name="check-item-filling" :size="16" />
    <KIcon name="check-item-filling" :size="20" />
    <KIcon name="check-item-filling" :size="28" />
    <KIcon name="check-item-filling" :size="40" />
  </div>
</template>

<style scoped lang="scss">
// 水平排列容器，gap 拉开不挤压
.samples {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
