<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row dark-bg">
    <KTooltip content="light 主题" theme="light">
      <KButton>light</KButton>
    </KTooltip>
    <KTooltip content="dark 主题" theme="dark">
      <KButton>dark</KButton>
    </KTooltip>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  &.dark-bg {
    padding: 16px;
    background: var(--k-color-text);
    border-radius: var(--k-border-radius);
  }
}
</style>
