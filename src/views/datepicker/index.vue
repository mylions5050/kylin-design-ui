<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import clearableCode from './demos/clearable.vue?raw'
import sizesCode from './demos/sizes.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import limitedCode from './demos/limited.vue?raw'
import renderDateCode from './demos/render-date.tsx?raw'
import renderDateLabelCode from './demos/render-date-label.tsx?raw'
import typesCode from './demos/types.vue?raw'
import rangeCode from './demos/range.vue?raw'
import prefixSuffixCode from './demos/prefix-suffix.vue?raw'
import panelExtraCode from './demos/panel-extra.vue?raw'
import cellCode from './demos/cell.vue?raw'
import headerCustomCode from './demos/header-custom.tsx?raw'
import multipleCode from './demos/multiple.vue?raw'

import BasicDemo from './demos/basic.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import PanelExtraDemo from './demos/panel-extra.vue'
import CellDemo from './demos/cell.vue'
import HeaderCustomDemo from './demos/header-custom.tsx'
import MultipleDemo from './demos/multiple.vue'
import ClearableDemo from './demos/clearable.vue'
import SizesDemo from './demos/sizes.vue'
import DisabledDemo from './demos/disabled.vue'
import LimitedDemo from './demos/limited.vue'
import RenderDateDemo from './demos/render-date.tsx'
import RenderDateLabelDemo from './demos/render-date-label.tsx'
import TypesDemo from './demos/types.vue'
import RangeDemo from './demos/range.vue'
</script>

<template>
  <section class="datepicker-demo">
    <h1>DatePicker 组件用例</h1>
    <p>基于 KInput + KPopper + KDatePickerPane 拼装。支持 v-model 双向绑定、日期范围限制、可清除等。</p>

    <DemoBlock title="基础用法" description="v-model 双向绑定，支持默认选中" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="可清除" description="clearable 开启清除按钮" :code="clearableCode">
      <ClearableDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="small / default / large 三种尺寸，与 KInput/KSelect 保持一致" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <DemoBlock title="禁用状态" description="disabled 禁用选择器" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="限制日期范围" description="minDate / maxDate 限制可选日期" :code="limitedCode">
      <LimitedDemo />
    </DemoBlock>

    <DemoBlock title="自定义节日标记" description="renderDate 配合 KTooltip 实现小红点标记，hover 显示节日名称" :code="renderDateCode">
      <RenderDateDemo />
    </DemoBlock>

    <DemoBlock title="自定义日程文字" description="renderDate 直接返回文字，显示在日期下方，hover 可查看完整内容" :code="renderDateLabelCode">
      <RenderDateLabelDemo />
    </DemoBlock>

    <DemoBlock title="多种选择类型" description="支持 date / week / month / year / quarter 五种选择类型" :code="typesCode">
      <TypesDemo />
    </DemoBlock>

    <DemoBlock title="日期范围选择" description="range 开启范围选择：默认左右两块联动面板；加上 unlink-panels 则改为单个独立面板，也能选择起止日期" :code="rangeCode">
      <RangeDemo />
    </DemoBlock>

    <DemoBlock title="前后缀内容" description="prefixIcon / suffixIcon / prefix / suffix 自定义触发框内容，suffix 插槽可替换默认 calendar 图标" :code="prefixSuffixCode">
      <PrefixSuffixDemo />
    </DemoBlock>

    <DemoBlock title="面板内容区与快捷选项" description="cardPanel 卡片式面板（左侧快捷导航 + 右侧蓝边日期面板）+ confirm 手动确认模式：开启后需点“确定”才生效、点“取消”回滚" :code="panelExtraCode">
      <PanelExtraDemo />
    </DemoBlock>

    <DemoBlock title="自定义单元格" description="#cell 作用域插槽替换默认日期数字，可拿到 date / isSelected / isToday 等状态" :code="cellCode">
      <CellDemo />
    </DemoBlock>

    <DemoBlock title="自定义头部" description="renderHeaderPrev / renderHeaderNext 自定义单箭头（上一月/下一月），renderHeaderPrevYear / renderHeaderNextYear 自定义双箭头（上一年/下一年），renderHeaderTitle 自定义标题，对齐 Element Plus 的 prefix-icon 机制；返回空则回落默认" :code="headerCustomCode">
      <HeaderCustomDemo />
    </DemoBlock>

    <DemoBlock title="日期多选" description="multiple 开启多选，可在面板中点击多个日期/月份/年份（支持 date / month / year，与 range 互斥），v-model:values 绑定集合；搭配 confirm 可改为手动确认提交" :code="multipleCode">
      <MultipleDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="datepicker-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.datepicker-demo {
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