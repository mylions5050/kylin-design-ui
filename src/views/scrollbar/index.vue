<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import HorizontalDemo from './demos/horizontal.vue'
import horizontalCode from './demos/horizontal.vue?raw'
import BothDirectionsDemo from './demos/both-directions.vue'
import bothDirectionsCode from './demos/both-directions.vue?raw'
import TypeDemo from './demos/type.vue'
import typeCode from './demos/type.vue?raw'
import ThumbColorDemo from './demos/thumb-color.vue'
import thumbColorCode from './demos/thumb-color.vue?raw'
import ProgrammaticDemo from './demos/programmatic.vue'
import programmaticCode from './demos/programmatic.vue?raw'
import HideDelayDemo from './demos/hide-delay.vue'
import hideDelayCode from './demos/hide-delay.vue?raw'
import MaxHeightDemo from './demos/max-height.vue'
import maxHeightCode from './demos/max-height.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="scrollbar-demo">
    <h1>ScrollBar 组件用例</h1>
    <p>参考 Element Plus 风格，自定义滚动条提供更好的视觉效果和交互体验。</p>

    <!-- 基础用法 -->
    <DemoBlock title="基础用法" description="固定高度，超出时显示滚动条。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <!-- 水平滚动 -->
    <DemoBlock title="横向滚动" description="内容宽度超出容器时显示水平滚动条。" :code="horizontalCode">
      <HorizontalDemo />
    </DemoBlock>

    <!-- 双向滚动 -->
    <DemoBlock title="双向滚动" description="同时支持水平和垂直滚动。" :code="bothDirectionsCode">
      <BothDirectionsDemo />
    </DemoBlock>

    <!-- Type 类型 -->
    <DemoBlock title="Type 类型" description="通过 type 属性快速设置主题色滚动条。" :code="typeCode">
      <TypeDemo />
    </DemoBlock>

    <!-- 自定义滚动条颜色 -->
    <DemoBlock title="自定义滚动条颜色" description="通过 thumbColor 属性自定义滚动条颜色。" :code="thumbColorCode">
      <ThumbColorDemo />
    </DemoBlock>

    <!-- 编程式控制 -->
    <DemoBlock title="编程式控制" description="通过 expose 的方法控制滚动位置。" :code="programmaticCode">
      <ProgrammaticDemo />
    </DemoBlock>

    <!-- 滚动条隐藏延迟 -->
    <DemoBlock title="滚动条隐藏延迟" description="通过 hideDelay 属性设置鼠标离开后滚动条隐藏的延迟时间。" :code="hideDelayCode">
      <HideDelayDemo />
    </DemoBlock>

    <!-- 最大高度自适应 -->
    <DemoBlock title="最大高度自适应" description="使用 maxHeight 属性，内容较少时自适应高度。" :code="maxHeightCode">
      <MaxHeightDemo />
    </DemoBlock>

    <section class="scrollbar-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.scrollbar-demo {
  padding: 24px;


  .scrollbar-demo__api {
    margin-top: 32px;
  }

  > p {
    margin: 0 0 32px;
    color: var(--k-color-text-secondary);
    font-size: 14px;
  }
}
</style>
