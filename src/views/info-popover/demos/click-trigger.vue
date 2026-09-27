<script setup lang="ts">
import InfoPopover from '@/components/info-popover/index'
</script>

<template>
  <div class="demo-row">
    <InfoPopover
      title="使用提示"
      description="点击触发模式适合需要用户主动查看的场景。点击弹出卡片外部区域即可关闭。卡片内容支持富文本描述。"
      placement="center"
      trigger="click"
    >
      <button class="demo-btn">点击查看详情</button>
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
