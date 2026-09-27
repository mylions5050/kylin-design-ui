<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import BasicUsageDemo from './demos/basic-usage.vue'
import basicUsageCode from './demos/basic-usage.vue?raw'
import ThreeStatesDemo from './demos/three-states.vue'
import threeStatesCode from './demos/three-states.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import disabledCode from './demos/disabled.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import IndeterminateDemo from './demos/indeterminate.vue'
import indeterminateCode from './demos/indeterminate.vue?raw'
import ChangeEventDemo from './demos/change-event.vue'
import changeEventCode from './demos/change-event.vue?raw'
import NoLabelDemo from './demos/no-label.vue'
import noLabelCode from './demos/no-label.vue?raw'
</script>

<template>
  <section class="checkbox-demo">
    <h1>Checkbox 组件用例</h1>
    <p>多选框组件，支持受控绑定、三态展示、禁用与自定义尺寸。</p>
    <DemoBlock title="基础用法" description="v-model:checked 双向绑定，标签作为 default 插槽。" :code="basicUsageCode">
      <BasicUsageDemo />
    </DemoBlock>

    <DemoBlock title="三态展示" description="checked / indeterminate / unchecked 三种视觉态。" :code="threeStatesCode">
      <ThreeStatesDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 为 true 时不响应点击。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 控制方框尺寸（px 数字）。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock
      title="半选（indeterminate）"
      description="全选框在部分选中时显示半选态；点击全选框切换全部选中 / 全部取消。"
      :code="indeterminateCode"
    >
      <IndeterminateDemo />
    </DemoBlock>

    <DemoBlock title="change 事件" description="点击切换时触发 change，payload 为新的 checked。" :code="changeEventCode">
      <ChangeEventDemo />
    </DemoBlock>

    <DemoBlock title="无标签" description="不传 default 插槽时只渲染方框（表格场景常用）。" :code="noLabelCode">
      <NoLabelDemo />
    </DemoBlock>

    <section class="checkbox-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.checkbox-demo {
  padding: 24px;

  code {
    padding: 1px 4px;
    background: var(--k-color-bg-tertiary);
    border-radius: 3px;
    font-size: 12px;
  }

  &__api {
    margin-top: 32px;
  }
}
</style>
