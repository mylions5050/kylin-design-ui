<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row">
    <KTooltip content="圆角：4px" :border-radius="4">
      <KButton size="small">4px</KButton>
    </KTooltip>

    <KTooltip content="圆角：8px" :border-radius="8">
      <KButton size="small">8px</KButton>
    </KTooltip>

    <KTooltip content="圆角：16px" :border-radius="16">
      <KButton size="small">16px</KButton>
    </KTooltip>

    <KTooltip content="圆角：50%" border-radius="50%">
      <KButton size="small">50%</KButton>
    </KTooltip>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
