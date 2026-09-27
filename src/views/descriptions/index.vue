<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import borderedCode from './demos/bordered.vue?raw'
import sizeCode from './demos/size.vue?raw'
import verticalCode from './demos/vertical.vue?raw'
import spanCode from './demos/span.vue?raw'
import titleExtraCode from './demos/title-extra.vue?raw'

import BasicDemo from './demos/basic.vue'
import BorderedDemo from './demos/bordered.vue'
import SizeDemo from './demos/size.vue'
import VerticalDemo from './demos/vertical.vue'
import SpanDemo from './demos/span.vue'
import TitleExtraDemo from './demos/title-extra.vue'
</script>

<template>
  <section class="descriptions-demo">
    <h1>Descriptions 组件用例</h1>
    <p>成组展示多个只读字段，常见于详情页。items 数据驱动，支持 bordered 边框、column 列数、span 跨列、horizontal / vertical 两种布局，样式参考 Element Plus Descriptions。</p>

    <DemoBlock title="基础用法" description="items 数据驱动，column 控制每行列数（默认 3，演示区较窄示例用 2 列）" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="带边框" description="bordered 开启后标签列带浅色背景，单元格带边框，适合详情页、审批单等正式场景" :code="borderedCode">
      <BorderedDemo />
    </DemoBlock>

    <DemoBlock title="三种尺寸" description="size 控制单元格内边距：default / middle / small" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="垂直布局" description="layout 为 vertical 时标签在内容上方，常与 bordered 搭配" :code="verticalCode">
      <VerticalDemo />
    </DemoBlock>

    <DemoBlock title="跨列 span" description="span 控制占据的列数；超出当前行剩余列自动换行，最后一行不满时末位自动补满（AntD 同款）" :code="spanCode">
      <SpanDemo />
    </DemoBlock>

    <DemoBlock title="标题与额外内容" description="title / extra 展示在列表顶部，extra 通常放操作按钮，也可用 #title、#extra 插槽自定义" :code="titleExtraCode">
      <TitleExtraDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="descriptions-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.descriptions-demo {
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
