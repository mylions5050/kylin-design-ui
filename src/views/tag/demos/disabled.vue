<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag disabled>不可操作</KTag>
    <KTag disabled closable>关闭被禁用</KTag>
    <KTag disabled type="primary">主要禁用</KTag>
    <KTag disabled type="success" icon="check-bold">图标禁用</KTag>
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
