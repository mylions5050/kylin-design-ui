<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row">
    <KTooltip content="这是一段提示文字">
      <KButton>Hover 我</KButton>
    </KTooltip>

    <!-- Click 触发 -->
    <KTooltip content="点击触发提示" trigger="click">
      <KButton>Click 我</KButton>
    </KTooltip>

    <!-- 自定义圆角 -->
    <KTooltip content="自定义圆角：4px" :border-radius="4">
      <KButton>圆角 4px</KButton>
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
