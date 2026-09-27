<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import formatCode from './demos/format.vue?raw'
import rangeCode from './demos/range.vue?raw'
import disabledCode from './demos/disabled.vue?raw'

import BasicDemo from './demos/basic.vue'
import FormatDemo from './demos/format.vue'
import RangeDemo from './demos/range.vue'
import DisabledDemo from './demos/disabled.vue'
</script>

<template>
  <section class="time-select-demo">
    <h1>TimeSelect 组件用例</h1>
    <p>基于 KSelect 封装的固定时间点选择器，通过 start / step / end 生成选项，minTime / maxTime 可置灰范围外选项。</p>

    <DemoBlock title="基础用法" description="start / step / end 指定起始时间、步长与结束时间，v-model 绑定 HH:mm 字符串" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="时间格式" description="format 控制下拉项与触发框的展示文案（dayjs format），绑定值始终为 HH:mm" :code="formatCode">
      <FormatDemo />
    </DemoBlock>

    <DemoBlock title="固定时间范围" description="两个 KTimeSelect 通过 max-time / min-time 互为约束，先选开始则结束的早期选项置灰" :code="rangeCode">
      <RangeDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 后整体不可交互" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="time-select-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.time-select-demo {
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
