<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import formatsCode from './demos/formats.vue?raw'
import sizesCode from './demos/sizes.vue?raw'
import clearableCode from './demos/clearable.vue?raw'
import confirmCode from './demos/confirm.vue?raw'

import BasicDemo from './demos/basic.vue'
import FormatsDemo from './demos/formats.vue'
import SizesDemo from './demos/sizes.vue'
import ClearableDemo from './demos/clearable.vue'
import ConfirmDemo from './demos/confirm.vue'
</script>

<template>
  <section class="timepicker-demo">
    <h1>TimePicker 组件用例</h1>
    <p>基于 KInput + KPopper + KScroll 拼装。时分秒三列滚动选择，format 决定展示列，支持手动输入回车解析。</p>

    <DemoBlock title="基础用法" description="v-model 双向绑定，面板时分秒滚动选择，点选某项即时生效并自动关闭" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="时间格式" description="format 决定面板渲染的列：HH:mm:ss 三列、HH:mm 无秒列、HH 仅小时列" :code="formatsCode">
      <FormatsDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="small / default / large 三种尺寸，与 KInput/KSelect 保持一致" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <DemoBlock title="清除 / 禁用 / 只读" description="clearable 可清除、disabled 禁用、readonly 只读（禁止输入但仍可点选）" :code="clearableCode">
      <ClearableDemo />
    </DemoBlock>

    <DemoBlock title="手动确认模式" description="confirm 开启后选择仅记录草稿不生效，面板显示「此刻 | 确认」底部栏，点确认才提交生效；同时支持 hover/滚动浅灰实时预览" :code="confirmCode">
      <ConfirmDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="timepicker-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.timepicker-demo {
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
  }
}
</style>