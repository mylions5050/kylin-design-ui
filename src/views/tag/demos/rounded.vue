<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag rounded>圆角默认</KTag>
    <KTag rounded type="primary">圆角主要</KTag>
    <KTag rounded type="success" icon="check-bold">圆角成功</KTag>
    <KTag rounded type="warning" size="large">圆角大号</KTag>
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
