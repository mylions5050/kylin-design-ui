<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiSlots } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import HoverTriggerDemo from './demos/hover-trigger.vue'
import hoverTriggerCode from './demos/hover-trigger.vue?raw'
import ClickTriggerDemo from './demos/click-trigger.vue'
import clickTriggerCode from './demos/click-trigger.vue?raw'
import PlacementsDemo from './demos/placements.vue'
import placementsCode from './demos/placements.vue?raw'
import ExclusiveDemo from './demos/exclusive.vue'
import exclusiveCode from './demos/exclusive.vue?raw'
</script>

<template>
  <section class="info-popover-demo">
    <h1>InfoPopover 组件用例</h1>
    <p>带标题和描述的信息弹出卡片，支持 hover 和 click 两种触发方式，全局互斥（同一时刻只展开一个）。</p>

    <DemoBlock title="Hover 触发" description="鼠标悬停显示信息卡片，placement=center 居中弹出" :code="hoverTriggerCode">
      <HoverTriggerDemo />
    </DemoBlock>

    <DemoBlock title="Click 触发" description="点击触发，placement=center 居中弹出，点击外部关闭" :code="clickTriggerCode">
      <ClickTriggerDemo />
    </DemoBlock>

    <DemoBlock title="三种对齐方式" description="placement 支持 left、center、right 三种对齐方式" :code="placementsCode">
      <PlacementsDemo />
    </DemoBlock>

    <DemoBlock title="全局互斥" description="同一时刻只展开一个 InfoPopover，打开新的自动关闭旧的" :code="exclusiveCode">
      <ExclusiveDemo />
    </DemoBlock>

    <section class="info-popover-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.info-popover-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 32px;
  }
}
</style>