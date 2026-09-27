<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import extraCode from './demos/extra.vue?raw'
import mainContentCode from './demos/main-content.vue?raw'
import breadcrumbCode from './demos/breadcrumb.vue?raw'

import BasicDemo from './demos/basic.vue'
import ExtraDemo from './demos/extra.vue'
import MainContentDemo from './demos/main-content.vue'
import BreadcrumbDemo from './demos/breadcrumb.vue'
</script>

<template>
  <section class="page-header-demo">
    <h1>PageHeader 组件用例</h1>
    <p>声明页面的标题与层级入口，页面路径比较简单时，推荐用页头替代面包屑。</p>

    <DemoBlock title="基础用法" description="点击左侧返回区域（图标 / 标题）触发 back 事件，#content 插槽放置页面主标题" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="额外操作" description="icon 传空字符串可隐藏返回图标，#extra 插槽放置右侧操作按钮" :code="extraCode">
      <ExtraDemo />
    </DemoBlock>

    <DemoBlock title="主内容" description="#default 插槽放置页头下方正文，与标题行自然衔接" :code="mainContentCode">
      <MainContentDemo />
    </DemoBlock>

    <DemoBlock title="面包屑导航" description="层级较多时，通过 #breadcrumb 插槽用面包屑展示完整路径" :code="breadcrumbCode">
      <BreadcrumbDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="page-header-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.page-header-demo {
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
