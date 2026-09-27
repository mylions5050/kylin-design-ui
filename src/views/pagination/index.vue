<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import DataAmountsDemo from './demos/data-amounts.vue'
import dataAmountsCode from './demos/data-amounts.vue?raw'
import WithTableDemo from './demos/with-table.vue'
import withTableCode from './demos/with-table.vue?raw'
import DynamicTotalDemo from './demos/dynamic-total.vue'
import dynamicTotalCode from './demos/dynamic-total.vue?raw'
import CustomLabelDemo from './demos/custom-label.vue'
import customLabelCode from './demos/custom-label.vue?raw'
import CustomSummaryDemo from './demos/custom-summary.vue'
import customSummaryCode from './demos/custom-summary.vue?raw'
import EventsDemo from './demos/events.vue'
import eventsCode from './demos/events.vue?raw'
import ExtensionsDemo from './demos/extensions.vue'
import extensionsCode from './demos/extensions.vue?raw'
import SimpleDemo from './demos/simple.vue'
import simpleCode from './demos/simple.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="pagination-demo">
    <h1>Pagination 组件用例</h1>
    <p>当数据量过多时，使用分页分解数据，支持页码导航、总览信息展示。</p>

    <DemoBlock title="基础用法" description="最基本的页码导航，默认每页 10 条，支持 @change 和 @page-change 两种事件" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="不同数据量" description="少量 / 中等 / 大量数据的分页展示差异" :code="dataAmountsCode">
      <DataAmountsDemo />
    </DemoBlock>

    <DemoBlock title="与表格联动" description="分页与表格数据联动，切换页码更新表格数据" :code="withTableCode">
      <WithTableDemo />
    </DemoBlock>

    <DemoBlock title="动态切换数据总量" description="切换数据总量时自动重置到第一页" :code="dynamicTotalCode">
      <DynamicTotalDemo />
    </DemoBlock>

    <DemoBlock title="自定义文案" description="通过 entity-label 自定义数据条目名称" :code="customLabelCode">
      <CustomLabelDemo />
    </DemoBlock>

    <DemoBlock title="自定义 summary" description="通过 #summary slot 完全自定义左侧文案" :code="customSummaryCode">
      <CustomSummaryDemo />
    </DemoBlock>

    <DemoBlock title="交互事件" description="监听 change 事件，获取 { page, pageSize } 对象" :code="eventsCode">
      <EventsDemo />
    </DemoBlock>

    <DemoBlock title="扩展功能" description="showQuickJumper 显示首尾页快速跳转，showSizeChanger 显示每页条数下拉切换" :code="extensionsCode">
      <ExtensionsDemo />
    </DemoBlock>

    <DemoBlock
      title="极简模式"
      description="simple 开启后仅保留「< 输入页码 / 总页数 >」，适合穿梭框等窄空间场景；输入页码后回车或失焦跳转，超范围自动夹取"
      :code="simpleCode"
    >
      <SimpleDemo />
    </DemoBlock>

    <section class="pagination-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.pagination-demo {
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
