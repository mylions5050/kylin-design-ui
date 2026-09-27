<script setup lang="ts">
import InfoPopover from '@/components/info-popover/index'
</script>

<template>
  <div class="demo-row" style="gap: 24px;">
    <InfoPopover
      title="第一条消息"
      description="这是第一条提示信息。点击另一个按钮时，这条会自动关闭。"
      placement="center"
      trigger="click"
    >
      <button class="demo-btn">点击打开 1</button>
    </InfoPopover>

    <InfoPopover
      title="第二条消息"
      description="这是第二条提示信息。当你打开这条时，上一条会自动关闭，这就是全局互斥的效果。"
      placement="center"
      trigger="click"
    >
      <button class="demo-btn">点击打开 2</button>
    </InfoPopover>

    <InfoPopover
      title="第三条消息"
      description="这是第三条提示信息。InfoPopover 通过全局单例状态实现互斥，同一时刻只显示一个。"
      placement="center"
      trigger="click"
    >
      <button class="demo-btn">点击打开 3</button>
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
