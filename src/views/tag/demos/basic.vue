<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag>Default</KTag>
    <KTag type="primary">Primary</KTag>
    <KTag type="success">Success</KTag>
    <KTag type="info">Info</KTag>
    <KTag type="warning">Warning</KTag>
    <KTag type="error">Error</KTag>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
