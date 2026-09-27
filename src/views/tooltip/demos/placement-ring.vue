<script setup lang="ts">
import KTooltip from '@/components/tooltip/index'
import KButton from '@/components/button/index'

/* ===== 环绕布局 ===== */
const circlePlacements = [
  { label: '上左', placement: 'top-start' },
  { label: '上边', placement: 'top' },
  { label: '上右', placement: 'top-end' },

  { label: '左上', placement: 'left-start' },
  { label: '左边', placement: 'left' },
  { label: '左下', placement: 'left-end' },

  { label: '右上', placement: 'right-start' },
  { label: '右边', placement: 'right' },
  { label: '右下', placement: 'right-end' },

  { label: '下左', placement: 'bottom-start' },
  { label: '下边', placement: 'bottom' },
  { label: '下右', placement: 'bottom-end' },
] as const
</script>

<template>
  <div class="placement-ring">
    <div class="ring-center">目标元素</div>

    <!-- 上排 -->
    <div class="ring-group top">
      <KTooltip
        v-for="item in circlePlacements.filter(i => i.placement.startsWith('top'))"
        :key="item.placement"
        :placement="item.placement"
        :content="item.placement"
        theme="dark"
      >
        <KButton size="small">{{ item.label }}</KButton>
      </KTooltip>
    </div>

    <!-- 下排 -->
    <div class="ring-group bottom">
      <KTooltip
        v-for="item in circlePlacements.filter(i => i.placement.startsWith('bottom'))"
        :key="item.placement"
        :placement="item.placement"
        :content="item.placement"
        theme="dark"
      >
        <KButton size="small">{{ item.label }}</KButton>
      </KTooltip>
    </div>

    <!-- 左侧 -->
    <div class="ring-group left">
      <KTooltip
        v-for="item in circlePlacements.filter(i => i.placement.startsWith('left'))"
        :key="item.placement"
        :placement="item.placement"
        :content="item.placement"
        theme="dark"
      >
        <KButton size="small">{{ item.label }}</KButton>
      </KTooltip>
    </div>

    <!-- 右侧 -->
    <div class="ring-group right">
      <KTooltip
        v-for="item in circlePlacements.filter(i => i.placement.startsWith('right'))"
        :key="item.placement"
        :placement="item.placement"
        :content="item.placement"
        theme="dark"
      >
        <KButton size="small">{{ item.label }}</KButton>
      </KTooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* ===== 环绕布局 ===== */
.placement-ring {
  position: relative;
  width: 520px;
  height: 360px;
  margin: 24px auto;

  .ring-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 96px;
    height: 96px;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    background: var(--k-color-bg-tertiary);
    display: grid;
    place-items: center;
    color: var(--k-color-text-secondary);
    font-size: 13px;
    user-select: none;
  }

  .ring-group {
    position: absolute;
    display: flex;
    gap: 12px;

    &.top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: row;
    }

    &.bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: row;
    }

    &.left {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }

    &.right {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
  }
}
</style>
