<script setup lang="ts">
import InfoPopover from '@/components/info-popover/index'
</script>

<template>
  <div class="demo-row">
    <InfoPopover
      title="什么是 InfoPopover？"
      description="InfoPopover 是一个信息提示组件，用于在用户悬停或点击时展示详细的说明内容。它支持标题、描述文本，并且全局互斥——同一时刻只展开一个。"
      placement="center"
      trigger="hover"
    >
      <button class="demo-btn">悬停查看说明</button>
    </InfoPopover>
  </div>
</template>

<style scoped lang="scss">
.demo-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg);
  color: var(--k-color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;

  &:hover {
    border-color: var(--k-color-primary);
    color: var(--k-color-primary);
  }
}
</style>
