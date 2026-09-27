<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import customIconCode from './demos/custom-icon.vue?raw'
import customContentCode from './demos/custom-content.vue?raw'
import page404Code from './demos/page-404.vue?raw'

import BasicDemo from './demos/basic.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import CustomContentDemo from './demos/custom-content.vue'
import Page404Demo from './demos/page-404.vue'
</script>

<template>
  <section class="result-demo">
    <h1>Result 组件用例</h1>
    <p>用于对用户的操作结果做反馈展示，如支付成功、提交失败、404 页面等。结构为：图标 → 主标题 → 副标题 → 操作区。</p>

    <DemoBlock title="基础用法" description="icon 切换 success / info / warning / error 四种状态，图标颜色随语义色变化；title 与 subTitle 分别为主、副标题" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="自定义图标" description="icon 插槽完全替换默认状态图标（图标 / 图片 / 任意内容均可），title 与 sub-title 也可用同名插槽自定义" :code="customIconCode">
      <CustomIconDemo />
    </DemoBlock>

    <DemoBlock title="自定义内容" description="extra 插槽放操作区（通常为主/次按钮组），随状态切换整体展示" :code="customContentCode">
      <CustomContentDemo />
    </DemoBlock>

    <DemoBlock title="经典 404 页面" description="纯插槽组合出的典型结果页场景" :code="page404Code">
      <Page404Demo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="result-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.result-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid var(--k-color-border);

    h2 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
