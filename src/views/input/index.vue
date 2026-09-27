<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import clearableCode from './demos/clearable.vue?raw'
import sizesCode from './demos/sizes.vue?raw'
import disabledReadonlyCode from './demos/disabled-readonly.vue?raw'
import formatterCode from './demos/formatter.vue?raw'
import iconsCode from './demos/icons.vue?raw'
import textareaCode from './demos/textarea.vue?raw'
import modifiersCode from './demos/modifiers.vue?raw'

import BasicDemo from './demos/basic.vue'
import ClearableDemo from './demos/clearable.vue'
import SizesDemo from './demos/sizes.vue'
import DisabledReadonlyDemo from './demos/disabled-readonly.vue'
import FormatterDemo from './demos/formatter.vue'
import IconsDemo from './demos/icons.vue'
import TextareaDemo from './demos/textarea.vue'
import ModifiersDemo from './demos/modifiers.vue'
</script>

<template>
  <section class="input-demo">
    <h1>Input 组件用例</h1>
    <p>用于文本输入的基础表单组件。支持多种类型、尺寸、状态和自定义功能，适用于各类表单场景。</p>

    <DemoBlock title="基础用法" description="支持文本输入、密码输入等不同类型" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="可清除" description="clearable 属性开启清除功能" :code="clearableCode">
      <ClearableDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="small（小）、default（默认）、large（大）三种尺寸" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <DemoBlock title="禁用与只读" description="disabled（禁用）、readonly（只读）状态控制" :code="disabledReadonlyCode">
      <DisabledReadonlyDemo />
    </DemoBlock>

    <DemoBlock title="格式化输入" description="formatter 和 parser 实现输入格式化和数据解析" :code="formatterCode">
      <FormatterDemo />
    </DemoBlock>

    <DemoBlock title="带图标的输入框" description="prefix-icon（前置图标）、suffix-icon（后置图标）、slot 方式自定义图标" :code="iconsCode">
      <IconsDemo />
    </DemoBlock>

    <DemoBlock title="多行文本" description="type='textarea' 转换为多行文本输入框" :code="textareaCode">
      <TextareaDemo />
    </DemoBlock>

    <DemoBlock title="v-model 修饰符" description="支持 .trim / .lazy / .number 修饰符" :code="modifiersCode">
      <ModifiersDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="input-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.input-demo {
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