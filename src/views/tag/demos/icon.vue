<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag icon="favorite-filling">收藏</KTag>
    <KTag icon="search" type="primary">搜索</KTag>
    <KTag icon="select-bold" type="success">完成</KTag>
    <KTag icon="warning" type="warning">警告</KTag>
    <KTag icon="close-bold" type="error">错误</KTag>
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
