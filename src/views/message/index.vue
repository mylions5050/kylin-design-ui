<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import KMessage from '@/components/message/index'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import vnodeCode from './demos/vnode.vue?raw'
import longCode from './demos/long.vue?raw'
import durationCode from './demos/duration.vue?raw'
import callbacksCode from './demos/callbacks.vue?raw'
import closableCode from './demos/closable.vue?raw'
import effectsCode from './demos/effects.vue?raw'
import iconsCode from './demos/icons.vue?raw'
import customClassCode from './demos/custom-class.vue?raw'
import multipleCode from './demos/multiple.vue?raw'
import overflowCode from './demos/overflow.vue?raw'
import clearCode from './demos/clear.vue?raw'

import BasicDemo from './demos/basic.vue'
import VNodeDemo from './demos/vnode.vue'
import LongDemo from './demos/long.vue'
import DurationDemo from './demos/duration.vue'
import CallbacksDemo from './demos/callbacks.vue'
import ClosableDemo from './demos/closable.vue'
import EffectsDemo from './demos/effects.vue'
import IconsDemo from './demos/icons.vue'
import CustomClassDemo from './demos/custom-class.vue'
import MultipleDemo from './demos/multiple.vue'
import OverflowDemo from './demos/overflow.vue'
import ClearDemo from './demos/clear.vue'
</script>

<template>
  <section class="message-demo">
    <h1>Message 组件用例</h1>
    <p>全局提示，常用于主动操作后的反馈。参考 Ant Design message：顶部居中、按内容自适应宽度、图标随类型着色，支持编程式调用。</p>

    <DemoBlock title="基础用法" description="success / error / warning / info / loading 五种类型，默认 3 秒自动关闭" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="VNode 内容" description="第一个参数支持 VNode，内容里可以嵌图标、加粗等富文本" :code="vnodeCode">
      <VNodeDemo />
    </DemoBlock>

    <DemoBlock title="长文本" description="消息内容较长时自动换行，宽度不超过视口" :code="longCode">
      <LongDemo />
    </DemoBlock>

    <DemoBlock title="自定义时长" description="duration 参数控制显示时长（毫秒），默认 3000，传 0 不自动关闭" :code="durationCode">
      <DurationDemo />
    </DemoBlock>

    <DemoBlock title="回调" description="onClose 在消息关闭时触发（手动 / 自动 / 超限移除均触发）；onClick 在点击消息体时触发" :code="callbacksCode">
      <CallbacksDemo />
    </DemoBlock>

    <DemoBlock title="可关闭" description="默认不显示关闭按钮（与 Ant Design 一致），closable: true 开启" :code="closableCode">
      <ClosableDemo />
    </DemoBlock>

    <DemoBlock title="不同效果" description="light（白色背景 + 浅边框，默认）/ plain（type 浅色背景）/ dark（type 深色背景 + 白色文字）" :code="effectsCode">
      <EffectsDemo />
    </DemoBlock>

    <DemoBlock title="自定义图标" description="icon 传 iconfont 名覆盖默认图标；传空字符串隐藏图标" :code="iconsCode">
      <IconsDemo />
    </DemoBlock>

    <DemoBlock title="自定义样式" description="通过 customClass 追加到消息体根节点做样式定制" :code="customClassCode">
      <CustomClassDemo />
    </DemoBlock>

    <DemoBlock title="多条消息" description="支持同时显示多条消息，自动堆叠" :code="multipleCode">
      <MultipleDemo />
    </DemoBlock>

    <DemoBlock title="超出限制" description="最多同时显示 5 条，超出时最早的消息被移除（并触发其 onClose）" :code="overflowCode">
      <OverflowDemo />
    </DemoBlock>

    <DemoBlock title="手动清除" description="调用 message.clear() 清除所有消息" :code="clearCode">
      <ClearDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="message-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>

    <KMessage />
  </section>
</template>

<style scoped lang="scss">
.message-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
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
