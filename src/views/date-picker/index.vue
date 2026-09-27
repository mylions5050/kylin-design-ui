<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import rangeCode from './demos/range.vue?raw'
import limitedCode from './demos/limited.vue?raw'
import advancedCode from './demos/advanced.vue?raw'
import cardPropsCode from './demos/card-props.vue?raw'
import otherMonthCode from './demos/other-month.vue?raw'
import segmentsCode from './demos/segments.vue?raw'

import BasicDemo from './demos/basic.vue'
import RangeDemo from './demos/range.vue'
import LimitedDemo from './demos/limited.vue'
import AdvancedDemo from './demos/advanced.vue'
import CardPropsDemo from './demos/card-props.vue'
import OtherMonthDemo from './demos/other-month.vue'
import SegmentsDemo from './demos/segments.vue'
</script>

<template>
  <section class="date-picker-demo">
    <h1>DatePickerPane 组件用例</h1>
    <p>基于 KCard 容器，支持 :value + @select 双向绑定，单日期 / 范围选择。</p>

    <DemoBlock title="基础用法" description="支持基础选择、默认选中、交互选中" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="范围选择" description=":start / :end + @select 手动管理起止日期，支持默认范围" :code="rangeCode">
      <RangeDemo />
    </DemoBlock>

    <DemoBlock title="限制日期范围" description="minDate / maxDate 限制可选日期" :code="limitedCode">
      <LimitedDemo />
    </DemoBlock>

    <DemoBlock title="自定义初始月份" description="defaultMonth 控制面板初始显示月份" :code="advancedCode">
      <AdvancedDemo />
    </DemoBlock>

    <DemoBlock title="卡片属性控制" description="shadow / border / size 控制内部 KCard 样式" :code="cardPropsCode">
      <CardPropsDemo />
    </DemoBlock>

    <DemoBlock title="不展示剩余日期" description="showOtherMonth=false 隐藏上/下月灰色日期，只显示当前月" :code="otherMonthCode">
      <OtherMonthDemo />
    </DemoBlock>

    <DemoBlock title="分段多段范围" description="segment 开启分段模式：两步点选成段，点段内日期截断移除（如 2~10 号取消 4、5 号 → 拆成 2~3 号、6~10 号），重叠段自动合并" :code="segmentsCode">
      <SegmentsDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="date-picker-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.date-picker-demo {
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