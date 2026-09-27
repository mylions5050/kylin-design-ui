<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row edge-case">
    <KTooltip placement="top" content="我会翻转到 bottom">
      <KButton>顶部边缘</KButton>
    </KTooltip>

    <KTooltip placement="left" content="我会翻转到 right">
      <KButton>左侧边缘</KButton>
    </KTooltip>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  &.edge-case {
    justify-content: space-between;
  }
}
</style>
