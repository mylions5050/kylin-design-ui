<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiSlots } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import BasicUsageDemo from './demos/basic-usage.vue'
import basicUsageCode from './demos/basic-usage.vue?raw'
import GutterDemo from './demos/gutter.vue'
import gutterCode from './demos/gutter.vue?raw'
import MixedLayoutDemo from './demos/mixed-layout.vue'
import mixedLayoutCode from './demos/mixed-layout.vue?raw'
import OffsetDemo from './demos/offset.vue'
import offsetCode from './demos/offset.vue?raw'
import JustifyAlignDemo from './demos/justify-align.vue'
import justifyAlignCode from './demos/justify-align.vue?raw'
import ResponsiveDemo from './demos/responsive.vue'
import responsiveCode from './demos/responsive.vue?raw'
</script>

<template>
  <section class="grid-demo">
    <h1>Grid 组件用例</h1>
    <p>24 栅格布局组件，通过 Row 与 Col 实现灵活的分栏排版。</p>
    <DemoBlock title="基础栅格" description="span 占 24 列中的份数。" :code="basicUsageCode">
      <BasicUsageDemo />
    </DemoBlock>

    <DemoBlock title="分栏间隔 gutter" description="gutter 列间距（px）。" :code="gutterCode">
      <GutterDemo />
    </DemoBlock>

    <DemoBlock title="混合布局" description="通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。" :code="mixedLayoutCode">
      <MixedLayoutDemo />
    </DemoBlock>

    <DemoBlock title="偏移 offset" description="offset 左侧空出列数。" :code="offsetCode">
      <OffsetDemo />
    </DemoBlock>

    <DemoBlock title="对齐 justify / align" description="justify 水平，align 垂直。" :code="justifyAlignCode">
      <JustifyAlignDemo />
    </DemoBlock>

    <DemoBlock title="响应式" description="xs 全宽、sm 两列、md 三列（缩放窗口看变化）。" :code="responsiveCode">
      <ResponsiveDemo />
    </DemoBlock>

    <section class="grid-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.grid-demo {
  padding: 24px;

  &__api {
    margin-top: 32px;
  }
}
</style>
