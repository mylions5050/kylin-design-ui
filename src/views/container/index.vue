<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiSlots } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import HeaderMainFooterDemo from './demos/header-main-footer.vue'
import headerMainFooterCode from './demos/header-main-footer.vue?raw'
import AsideMainDemo from './demos/aside-main.vue'
import asideMainCode from './demos/aside-main.vue?raw'
import FullLayoutDemo from './demos/full-layout.vue'
import fullLayoutCode from './demos/full-layout.vue?raw'
import DirectionDemo from './demos/direction.vue'
import directionCode from './demos/direction.vue?raw'
import CustomSizeDemo from './demos/custom-size.vue'
import customSizeCode from './demos/custom-size.vue?raw'
</script>

<template>
  <section class="container-demo">
    <h1>Container 组件用例</h1>
    <p>布局容器组件，用于快速搭建页面的整体版式结构。</p>
    <DemoBlock title="上中下" description="Header + Main + Footer，自动纵向。" :code="headerMainFooterCode">
      <HeaderMainFooterDemo />
    </DemoBlock>

    <DemoBlock title="侧栏 + 主体" description="Aside + Main，自动横向。" :code="asideMainCode">
      <AsideMainDemo />
    </DemoBlock>

    <DemoBlock title="完整布局" description="Header + 嵌套 Container(Aside + Main) + Footer。" :code="fullLayoutCode">
      <FullLayoutDemo />
    </DemoBlock>

    <DemoBlock title="direction 覆盖" description="direction='horizontal' 强制横向（即使有 Header）。" :code="directionCode">
      <DirectionDemo />
    </DemoBlock>

    <DemoBlock title="自定义尺寸" description="Header height / Aside width 可调。" :code="customSizeCode">
      <CustomSizeDemo />
    </DemoBlock>

    <section class="container-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.container-demo {
  padding: 24px;

  code {
    padding: 1px 4px;
    background: #f0f5fc;
    border-radius: 3px;
    font-size: 12px;
  }

  &__api {
    margin-top: 32px;
  }
}
</style>
