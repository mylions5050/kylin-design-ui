<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import BasicDemo from './demos/basic.vue'
import rangeCode from './demos/range.vue?raw'
import RangeDemo from './demos/range.vue'
import disabledCode from './demos/disabled.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import clearableCode from './demos/clearable.vue?raw'
import ClearableDemo from './demos/clearable.vue'
import formatCode from './demos/format.vue?raw'
import FormatDemo from './demos/format.vue'
import sizesCode from './demos/sizes.vue?raw'
import SizesDemo from './demos/sizes.vue'
</script>

<template>
  <section class="date-time-picker-demo">
    <h1>DateTimePicker 组件用例</h1>
    <p>
      基于 KInput + KPopper + KDatePickerPane（日历）+ KScroll（时/分/秒列）拼装。
      面板内选择只写草稿，点"确定"才合并提交并关闭，支持"此刻"快捷填充。
    </p>

    <DemoBlock title="基础用法" description="v-model 双向绑定；format 时间段决定时/分/秒列（HH:mm 无秒列）；clearable 可清除" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="日期时间范围" description="range 开启双面板；v-model:start / v-model:end 绑定起止；两步点选成对后点「确定」提交，未成对不生效" :code="rangeCode">
      <RangeDemo />
    </DemoBlock>

    <DemoBlock title="禁用状态" description="disabled 后触发框不可交互、面板不可弹出（单选与范围两种形态）" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="可清除" description="clearable 开启后 hover 出现清除图标，点击清空并触发 clear 事件" :code="clearableCode">
      <ClearableDemo />
    </DemoBlock>

    <DemoBlock title="自定义格式与可选范围" description="format 控制触发框展示与时间列（HH:mm 无秒列）；minDate / maxDate 限制可选日期，超范围格子置灰禁点" :code="formatCode">
      <FormatDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 支持 small / default / large，与 KInput、KDatePicker 保持一致" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="date-time-picker-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.date-time-picker-demo {
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
