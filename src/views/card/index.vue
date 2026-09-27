<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiSlots } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import BasicUsageDemo from './demos/basic-usage.vue'
import basicUsageCode from './demos/basic-usage.vue?raw'
import HeaderFooterDemo from './demos/header-footer.vue'
import headerFooterCode from './demos/header-footer.vue?raw'
import CustomHeaderFooterDemo from './demos/custom-header-footer.vue'
import customHeaderFooterCode from './demos/custom-header-footer.vue?raw'
import ShadowDemo from './demos/shadow.vue'
import shadowCode from './demos/shadow.vue?raw'
import BodyStyleDemo from './demos/body-style.vue'
import bodyStyleCode from './demos/body-style.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import BorderDemo from './demos/border.vue'
import borderCode from './demos/border.vue?raw'
import WrapContentDemo from './demos/wrap-content.vue'
import wrapContentCode from './demos/wrap-content.vue?raw'
</script>

<template>
  <section class="card-demo">
    <h1>Card 组件用例</h1>
    <p>通用卡片容器，可承载标题、内容、页脚，支持自定义阴影和样式。</p>

    <DemoBlock title="基础用法" description="最简单的卡片，只有内容区域" :code="basicUsageCode">
      <BasicUsageDemo />
    </DemoBlock>

    <DemoBlock title="带标题和页脚" description="通过 header / footer prop 或 slot 自定义顶部和底部" :code="headerFooterCode">
      <HeaderFooterDemo />
    </DemoBlock>

    <DemoBlock title="自定义头部和底部" description="通过 #header / #footer slot 传入任意内容" :code="customHeaderFooterCode">
      <CustomHeaderFooterDemo />
    </DemoBlock>

    <DemoBlock title="阴影效果" description="shadow 属性控制阴影显示时机：always / hover / never" :code="shadowCode">
      <ShadowDemo />
    </DemoBlock>

    <DemoBlock title="body 样式自定义" description="通过 bodyStyle 自定义 body 区域的 CSS 样式" :code="bodyStyleCode">
      <BodyStyleDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 控制内边距：small / default / large" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="边框" description="border 属性控制是否显示边框" :code="borderCode">
      <BorderDemo />
    </DemoBlock>

    <DemoBlock title="在卡片中使用 KDatePickerPane" description="KCard 作为容器包裹其他组件" :code="wrapContentCode">
      <WrapContentDemo />
    </DemoBlock>

    <section class="card-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.card-demo {
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