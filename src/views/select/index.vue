<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

// 用 ?raw 导入各用例源码
import basicCode from './demos/basic.vue?raw'
import sizesCode from './demos/sizes.vue?raw'
import searchableCode from './demos/searchable.vue?raw'
import iconsCode from './demos/icons.vue?raw'
import disabledReadonlyCode from './demos/disabled-readonly.vue?raw'
import tooltipCode from './demos/tooltip.vue?raw'
import remoteCode from './demos/remote.vue?raw'
import customStylesCode from './demos/custom-styles.vue?raw'
import eventsCode from './demos/events.vue?raw'
import slotOptionsCode from './demos/slot-options.vue?raw'
import multipleCode from './demos/multiple.vue?raw'
import extraCode from './demos/extra.vue?raw'

import BasicDemo from './demos/basic.vue'
import SizesDemo from './demos/sizes.vue'
import SearchableDemo from './demos/searchable.vue'
import IconsDemo from './demos/icons.vue'
import DisabledReadonlyDemo from './demos/disabled-readonly.vue'
import TooltipDemo from './demos/tooltip.vue'
import RemoteDemo from './demos/remote.vue'
import CustomStylesDemo from './demos/custom-styles.vue'
import EventsDemo from './demos/events.vue'
import SlotOptionsDemo from './demos/slot-options.vue'
import MultipleDemo from './demos/multiple.vue'
import ExtraDemo from './demos/extra.vue'
</script>

<template>
  <section class="select-demo">
    <h1>Select 组件用例</h1>
    <p>下拉选择器，支持搜索、远程搜索、分组、多选等功能。适用于各种选择场景。</p>

    <DemoBlock title="基础用法" description="支持单选下拉选择，基本的选项配置" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="不同尺寸" description="small（小）、default（默认）、large（大）三种尺寸" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <DemoBlock title="可搜索" description="filterable 属性开启搜索过滤功能" :code="searchableCode">
      <SearchableDemo />
    </DemoBlock>

    <DemoBlock title="带图标的输入框" description="prefix-icon（前置图标）、suffix-icon（后置图标）" :code="iconsCode">
      <IconsDemo />
    </DemoBlock>

    <DemoBlock title="禁用与只读" description="disabled（禁用）、readonly（只读）状态控制" :code="disabledReadonlyCode">
      <DisabledReadonlyDemo />
    </DemoBlock>

    <DemoBlock title="带提示的选项" description="选项支持 tooltip 提示，鼠标悬停显示详细信息" :code="tooltipCode">
      <TooltipDemo />
    </DemoBlock>

    <DemoBlock title="远程搜索" description="remote 属性开启远程搜索，输入关键词后异步加载数据（模拟美国各州搜索，支持 label/value 模糊匹配）" :code="remoteCode">
      <RemoteDemo />
    </DemoBlock>

    <DemoBlock title="自定义样式" description="popper-class 属性自定义下拉菜单样式" :code="customStylesCode">
      <CustomStylesDemo />
    </DemoBlock>

    <DemoBlock title="事件监听" description="支持 change、visible-change、clear 等事件" :code="eventsCode">
      <EventsDemo />
    </DemoBlock>

    <DemoBlock title="插槽式选项 (KOption)" description="使用 KOption 组件定义选项，支持更灵活的配置" :code="slotOptionsCode">
      <SlotOptionsDemo />
    </DemoBlock>

    <DemoBlock title="多选模式" description="multiple 属性开启多选，使用 Tag 组件展示已选选项" :code="multipleCode">
      <MultipleDemo />
    </DemoBlock>

    <DemoBlock title="高级功能" description="no-match-text、no-data-text、default-first-option、placement 等高级 API" :code="extraCode">
      <ExtraDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="select-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.select-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  :deep(.demo-block__body) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .demo-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .demo-item {
    display: flex;
    align-items: center;
    gap: 12px;

    label {
      min-width: 120px;
      font-size: 14px;
      color: var(--k-color-text-secondary);
      flex-shrink: 0;
    }

    :deep(.k-select) {
      width: 300px;
    }

    .event-log {
      font-family: monospace;
      color: var(--k-color-primary);
      font-size: 14px;
    }
  }

  /* Popper class custom styles */
  :deep(.custom-select-dropdown .k-select-dropdown) {
    border: 2px solid #0a96e6 !important;
    border-radius: 4px !important;
    box-shadow: 0 6px 20px rgba(10, 150, 230, 0.2) !important;
  }

  :deep(.custom-select-dropdown .k-select-dropdown__item.is-selected) {
    background: var(--k-color-primary-light) !important;
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