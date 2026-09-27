<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row">
    <KTooltip content="鼠标悬停触发" trigger="hover">
      <KButton>Hover 触发</KButton>
    </KTooltip>

    <KTooltip content="点击触发，再点击外部关闭" trigger="click">
      <KButton>Click 触发</KButton>
    </KTooltip>

    <KTooltip content="手动控制触发方式" trigger="manual">
      <KButton>Manual 触发</KButton>
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
