<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import disabledCode from './demos/disabled.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import RadioGroupDemo from './demos/radio-group.vue'
import radioGroupCode from './demos/radio-group.vue?raw'
import GroupDisabledDemo from './demos/group-disabled.vue'
import groupDisabledCode from './demos/group-disabled.vue?raw'
import GroupSizeDemo from './demos/group-size.vue'
import groupSizeCode from './demos/group-size.vue?raw'
import ChangeEventDemo from './demos/change-event.vue'
import changeEventCode from './demos/change-event.vue?raw'
import VerticalDemo from './demos/vertical.vue'
import verticalCode from './demos/vertical.vue?raw'
import ArrayRenderDemo from './demos/array-render.vue'
import arrayRenderCode from './demos/array-render.vue?raw'
import ComprehensiveDemo from './demos/comprehensive.vue'
import comprehensiveCode from './demos/comprehensive.vue?raw'
import ConsistentDemo from './demos/consistent.vue'
import consistentCode from './demos/consistent.vue?raw'
</script>

<template>
  <section class="radio-demo">
    <h1>Radio 组件用例</h1>
    <p>单选框组件。独立使用或 RadioGroup 组合，支持 v-model，disabled，size 等特性。</p>

    <!-- 1) 基础用法 -->
    <DemoBlock title="基础用法" description="最简单的独立 Radio，v-model 绑定选中值。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <!-- 2) 禁用状态 -->
    <DemoBlock title="禁用状态" description="单个 Radio 设置 disabled。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- 3) 不同尺寸 -->
    <DemoBlock title="尺寸" description="size: small | default | large。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <!-- 4) RadioGroup 组合 -->
    <DemoBlock title="RadioGroup 组合" description="KRadioGroup 统一管理，v-model 绑定，gap 间距自动生效。" :code="radioGroupCode">
      <RadioGroupDemo />
    </DemoBlock>

    <!-- 5) RadioGroup 统一禁用 -->
    <DemoBlock title="统一禁用" description="RadioGroup 的 disabled 应用到所有子 Radio。" :code="groupDisabledCode">
      <GroupDisabledDemo />
    </DemoBlock>

    <!-- 6) RadioGroup 统一尺寸 -->
    <DemoBlock title="统一尺寸" description="RadioGroup size 控制所有子 Radio。" :code="groupSizeCode">
      <GroupSizeDemo />
    </DemoBlock>

    <!-- 7) change 事件 -->
    <DemoBlock title="change 事件" description="切换时触发 change，可拿到值变更。" :code="changeEventCode">
      <ChangeEventDemo />
    </DemoBlock>

    <!-- 8) 垂直布局 -->
    <DemoBlock title="垂直布局" description="RadioGroup 外层用 flex column 即可轻松垂直。" :code="verticalCode">
      <VerticalDemo />
    </DemoBlock>

    <!-- 9) 数组渲染 -->
    <DemoBlock title="数组渲染" description="循环渲染选项，更灵活。" :code="arrayRenderCode">
      <ArrayRenderDemo />
    </DemoBlock>

    <!-- 10) 综合用例 -->
    <DemoBlock title="综合用例" description="多特性同时使用。" :code="comprehensiveCode">
      <ComprehensiveDemo />
    </DemoBlock>

    <!-- 11) 与其他组件风格一致 -->
    <DemoBlock title="与其他组件风格一致" description="样式统一，配色 scheme 一致。" :code="consistentCode">
      <ConsistentDemo />
    </DemoBlock>

    <section class="radio-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.radio-demo {
  padding: 24px;

  > p {
    margin: 0 0 24px;
    color: #666;
  }

  &__api {
    margin-top: 32px;
  }
}
</style>
