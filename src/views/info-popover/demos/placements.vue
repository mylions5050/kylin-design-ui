<script setup lang="ts">
import InfoPopover from '@/components/info-popover/index'
</script>

<template>
  <div class="demo-row" style="gap: 24px;">
    <InfoPopover
      title="左对齐"
      description="placement='left' 时，卡片与触发元素左侧对齐。适合触发元素在右侧的场景。"
      placement="left"
      trigger="hover"
    >
      <button class="demo-btn">左对齐</button>
    </InfoPopover>

    <InfoPopover
      title="居中对齐"
      description="placement='center' 时，卡片居中于触发元素下方。默认方式，适合大多数场景。"
      placement="center"
      trigger="hover"
    >
      <button class="demo-btn">居中对齐</button>
    </InfoPopover>

    <InfoPopover
      title="右对齐"
      description="placement='right' 时，卡片与触发元素右侧对齐。适合触发元素在左侧的场景。"
      placement="right"
      trigger="hover"
    >
      <button class="demo-btn">右对齐</button>
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
