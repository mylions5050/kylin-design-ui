<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import TriggerDemo from './demos/trigger.vue'
import PlacementDemo from './demos/placement.vue'
import ItemStateDemo from './demos/item-state.vue'
import OverlayDemo from './demos/overlay.vue'
import DisabledDemo from './demos/disabled.vue'
import basicCode from './demos/basic.vue?raw'
import triggerCode from './demos/trigger.vue?raw'
import placementCode from './demos/placement.vue?raw'
import itemStateCode from './demos/item-state.vue?raw'
import overlayCode from './demos/overlay.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="dropdown-demo">
    <h1>Dropdown 组件用例</h1>
    <p>
    向下弹出的动作菜单；基于 KPopper 实现定位与视口翻转保护，
    支持 hover / 点击 / 右键三种触发方式与自定义面板。
    </p>

    <DemoBlock title="基础用法" description="悬浮触发展开菜单，点击菜单项触发 click 事件并自动收起。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="触发方式" description="trigger 支持 hover（悬浮）、click（点击）、contextmenu（右键弹出并定位到鼠标位置）。" :code="triggerCode">
      <TriggerDemo />
    </DemoBlock>

    <DemoBlock title="弹出位置" description="placement 支持 12 个方向，空间不足时自动翻转；常用方向示例如下。" :code="placementCode">
      <PlacementDemo />
    </DemoBlock>

    <DemoBlock title="菜单项状态" description="menu 项支持 icon 图标、disabled 禁用、danger 危险态（红色）、divided 分隔线。" :code="itemStateCode">
      <ItemStateDemo />
    </DemoBlock>

    <DemoBlock title="自定义面板" description="使用 #overlay 插槽完全自定义下拉面板内容，openChange 可同步显隐状态。" :code="overlayCode">
      <OverlayDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 后不响应任何触发方式。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="dropdown-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.dropdown-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin-bottom: 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 24px;

    h2 {
      margin-bottom: 12px;
    }
  }
}
</style>
