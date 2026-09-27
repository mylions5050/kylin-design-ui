<script setup lang="ts">
import KContainer, { KAside, KMain } from '@/components/container'
</script>

<template>
  <KContainer class="demo-layout">
    <KAside>Aside</KAside>
    <KMain>Main</KMain>
  </KContainer>
</template>

<style scoped lang="scss">
.demo-layout {
  height: 240px;
  border: 1px solid #d3ddec;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.k-aside) {
  background: #edfcb4;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.k-main) {
  background: #f0f5fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a7e9c;
}
</style>
