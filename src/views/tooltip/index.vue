<template>
  <section class="tooltip-demo">
    <h1>Tooltip 组件用例</h1>
    <p>文字提示气泡组件，支持多种触发方式与 12 个显示方位。</p>
    <!-- 基础用法 -->
    <DemoBlock title="基础用法" description="默认 hover 触发、top 方向、light 主题。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <!-- 12 个方位：环绕布局 -->
    <DemoBlock
      title="12 个方位（环绕布局）"
      description="参考 Element Plus 风格，中间为目标元素，周围排列 12 个 placement。"
      :code="placementRingCode"
    >
      <PlacementRingDemo />
    </DemoBlock>

    <!-- 12 个 placement 平铺网格 -->
    <DemoBlock
      title="12 个方位（网格）"
      description="支持 top / bottom / left / right 及其 start / end 变体。"
      :code="placementGridCode"
    >
      <PlacementGridDemo />
    </DemoBlock>

    <!-- 触发方式 -->
    <DemoBlock title="触发方式" description="trigger: hover / click / manual。" :code="triggerCode">
      <TriggerDemo />
    </DemoBlock>

    <!-- 圆角自定义 -->
    <DemoBlock title="圆角自定义" description="borderRadius: 支持数字或字符串值。" :code="borderRadiusCode">
      <BorderRadiusDemo />
    </DemoBlock>

    <!-- 主题 -->
    <DemoBlock title="主题" description="theme: light / dark。" :code="themeCode">
      <ThemeDemo />
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock title="尺寸" description="size: small / middle / large。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <!-- 手动触发 -->
    <DemoBlock
      title="手动触发（anchorRect）"
      description="trigger=manual + visible + anchorRect，常用于表格单元格、图表、虚拟节点。"
      :code="manualCode"
    >
      <ManualDemo />
    </DemoBlock>

    <!-- 插槽内容 -->
    <DemoBlock title="content 插槽" description="支持任意 HTML / 组件。" :code="contentSlotCode">
      <ContentSlotDemo />
    </DemoBlock>

    <!-- 富内容 -->
    <DemoBlock title="富内容示例" description="状态说明、快捷键提示等。" :code="richContentCode">
      <RichContentDemo />
    </DemoBlock>

    <!-- 禁用 -->
    <DemoBlock title="禁用" description="disabled 为 true 时不显示提示。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- 边界翻转 -->
    <DemoBlock
      title="边界翻转"
      description="靠近视口边缘时，placement 会自动翻转，例如 top 翻为 bottom。"
      :code="edgeFlipCode"
    >
      <EdgeFlipDemo />
    </DemoBlock>

    <section class="tooltip-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'

import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import PlacementRingDemo from './demos/placement-ring.vue'
import placementRingCode from './demos/placement-ring.vue?raw'
import PlacementGridDemo from './demos/placement-grid.vue'
import placementGridCode from './demos/placement-grid.vue?raw'
import TriggerDemo from './demos/trigger.vue'
import triggerCode from './demos/trigger.vue?raw'
import BorderRadiusDemo from './demos/border-radius.vue'
import borderRadiusCode from './demos/border-radius.vue?raw'
import ThemeDemo from './demos/theme.vue'
import themeCode from './demos/theme.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import ManualDemo from './demos/manual.vue'
import manualCode from './demos/manual.vue?raw'
import ContentSlotDemo from './demos/content-slot.vue'
import contentSlotCode from './demos/content-slot.vue?raw'
import RichContentDemo from './demos/rich-content.vue'
import richContentCode from './demos/rich-content.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import disabledCode from './demos/disabled.vue?raw'
import EdgeFlipDemo from './demos/edge-flip.vue'
import edgeFlipCode from './demos/edge-flip.vue?raw'
</script>

<style scoped lang="scss">
.tooltip-demo {
  padding: 24px;

  &__api {
    margin-top: 32px;
  }
}
</style>
