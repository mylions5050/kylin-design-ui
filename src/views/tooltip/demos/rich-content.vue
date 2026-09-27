<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="row">
    <KTooltip theme="dark">
      <KButton size="small">状态说明</KButton>
      <template #content>
        <div class="rich">
          <span class="dot success"></span>
          运行中 · 最近 5 分钟无异常
        </div>
      </template>
    </KTooltip>

    <KTooltip>
      <KButton size="small">快捷键</KButton>
      <template #content>
        <div class="rich shortcut">
          <span>保存</span>
          <kbd>⌘ S</kbd>
        </div>
      </template>
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

.rich {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.success {
      background: var(--k-color-success);
    }
  }

  &.shortcut {
    gap: 12px;

    kbd {
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.25);
      font-family: monospace;
      font-size: 12px;
    }
  }
}
</style>
