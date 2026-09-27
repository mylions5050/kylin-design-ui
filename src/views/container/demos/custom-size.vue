<script setup lang="ts">
import KContainer, { KHeader, KAside, KMain } from '@/components/container'
</script>

<template>
  <KContainer class="demo-layout">
    <KHeader height="48px">Header 48px</KHeader>
    <KContainer>
      <KAside width="160px">Aside 160px</KAside>
      <KMain>Main</KMain>
    </KContainer>
  </KContainer>
</template>

<style scoped lang="scss">
.demo-layout {
  height: 240px;
  border: 1px solid #d3ddec;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.k-header) {
  background: #d9e8fb;
  display: flex;
  align-items: center;
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
