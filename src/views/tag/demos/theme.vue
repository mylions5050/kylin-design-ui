<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="col">
    <div class="row">
      <span class="label">默认浅色：</span>
      <KTag>Default</KTag>
      <KTag type="primary">Primary</KTag>
      <KTag type="success">Success</KTag>
      <KTag type="warning">Warning</KTag>
      <KTag type="error">Error</KTag>
    </div>
    <div class="row">
      <span class="label">dark 实心底：</span>
      <KTag dark type="primary">Primary</KTag>
      <KTag dark type="success">Success</KTag>
      <KTag dark type="warning">Warning</KTag>
      <KTag dark type="error">Error</KTag>
    </div>
    <div class="row">
      <span class="label">plain 线框：</span>
      <KTag plain type="primary">Primary</KTag>
      <KTag plain type="success">Success</KTag>
      <KTag plain type="warning">Warning</KTag>
      <KTag plain type="error">Error</KTag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 13px;
  color: #666;
  width: 100px;
  flex-shrink: 0;
}
</style>
