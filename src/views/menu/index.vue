<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import MultiLevelDemo from './demos/multi-level.vue'
import multiLevelCode from './demos/multi-level.vue?raw'
import AccordionDemo from './demos/accordion.vue'
import accordionCode from './demos/accordion.vue?raw'
import DefaultOpenDemo from './demos/default-open.vue'
import defaultOpenCode from './demos/default-open.vue?raw'
import CustomStyleDemo from './demos/custom-style.vue'
import customStyleCode from './demos/custom-style.vue?raw'
import MiscDemo from './demos/misc.vue'
import miscCode from './demos/misc.vue?raw'
import EventLogDemo from './demos/event-log.vue'
import eventLogCode from './demos/event-log.vue?raw'
</script>

<template>
  <section class="menu-demo">
    <h1>Menu 组件用例</h1>
    <p>支持 icon、label、value、children（多级）、disabled、suffix。</p>

    <DemoBlock title="基础用法" description="icon + label，默认选中第一项" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="多级菜单" description="children 嵌套，点击箭头展开/收起，默认选中第一项" :code="multiLevelCode">
      <MultiLevelDemo />
    </DemoBlock>

    <DemoBlock title="手风琴模式" description="accordion 开启，同一级同时只能展开一个，默认选中第一项" :code="accordionCode">
      <AccordionDemo />
    </DemoBlock>

    <DemoBlock title="默认展开" description="default-open-keys 指定默认展开项，默认选中第一项" :code="defaultOpenCode">
      <DefaultOpenDemo />
    </DemoBlock>

    <DemoBlock title="自定义样式" description="自定义选中背景色、文字色、装饰条色、图标色，以及 item-style 覆盖菜单项样式" :code="customStyleCode">
      <CustomStyleDemo />
    </DemoBlock>

    <DemoBlock title="功能展示" description="value 标识、disabled 禁用、suffix 标签（支持 KTag 对象），默认选中第一项" :code="miscCode">
      <MiscDemo />
    </DemoBlock>

    <DemoBlock title="事件日志" description="select 事件返回完整 item 对象" :code="eventLogCode">
      <EventLogDemo />
    </DemoBlock>

    <section class="menu-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.menu-demo {
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
