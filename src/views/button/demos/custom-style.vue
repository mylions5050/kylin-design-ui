<script setup lang="ts">
import KButton from '@/components/button/index'
</script>

<template>
  <KButton type="primary" style="box-shadow: 0 2px 8px rgba(10, 150, 230, 0.3)">
    style 内联
  </KButton>
  <KButton type="primary" class="custom-btn">class 透传</KButton>
</template>

<style scoped lang="scss">
.custom-btn {
  border: 2px dashed #0a96e6 !important;
  background: transparent !important;
  color: #0a96e6 !important;
}
</style>
