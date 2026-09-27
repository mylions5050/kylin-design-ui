<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag size="small">小标签</KTag>
    <KTag>标准标签</KTag>
    <KTag size="large">大标签</KTag>
  </div>
  <div class="row mt8">
    <KTag :sizeNum="10">10px</KTag>
    <KTag :sizeNum="12">12px</KTag>
    <KTag :sizeNum="14">14px</KTag>
    <KTag :sizeNum="16">16px</KTag>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.mt8 {
  margin-top: 8px;
}
</style>
