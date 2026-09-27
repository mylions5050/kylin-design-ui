<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import ThemeDemo from './demos/theme.vue'
import themeCode from './demos/theme.vue?raw'
import ClosableDemo from './demos/closable.vue'
import closableCode from './demos/closable.vue?raw'
import IconDemo from './demos/icon.vue'
import iconCode from './demos/icon.vue?raw'
import RoundedDemo from './demos/rounded.vue'
import roundedCode from './demos/rounded.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import disabledCode from './demos/disabled.vue?raw'
import CustomColorDemo from './demos/custom-color.vue'
import customColorCode from './demos/custom-color.vue?raw'
import ClickEventDemo from './demos/click-event.vue'
import clickEventCode from './demos/click-event.vue?raw'
import SlotsDemo from './demos/slots.vue'
import slotsCode from './demos/slots.vue?raw'
import CombinationDemo from './demos/combination.vue'
import combinationCode from './demos/combination.vue?raw'
</script>

<template>
  <section class="tag-demo">
    <h1>Tag 组件用例</h1>
    <p>用于标记和选择的标签组件。支持多种类型、尺寸、状态和自定义样式。适合用于分类、标签选择、状态标记等场景。</p>

    <DemoBlock title="基础用法" description="type 类型：default / primary / success / info / warning / error" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock
      title="尺寸"
      description="size：small（紧凑）、default（标准）、large（大标签）；可通过 sizeNum 自定义字体大小"
      :code="sizeCode"
    >
      <SizeDemo />
    </DemoBlock>

    <DemoBlock
      title="主题模式"
      description="dark（实心）、plain（线框）、默认（浅底白字）"
      :code="themeCode"
    >
      <ThemeDemo />
    </DemoBlock>

    <DemoBlock
      title="可关闭标签"
      description="closable 属性开启关闭功能，右上角显示关闭图标，点击时触发 close 事件"
      :code="closableCode"
    >
      <ClosableDemo />
    </DemoBlock>

    <DemoBlock
      title="带图标"
      description="icon 属性传 iconfont 名称，通过 slot + KIcon 组件展示"
      :code="iconCode"
    >
      <IconDemo />
    </DemoBlock>

    <DemoBlock
      title="圆角"
      description="rounded 属性开启圆角，使标签呈现更圆润的视觉效果"
      :code="roundedCode"
    >
      <RoundedDemo />
    </DemoBlock>

    <DemoBlock
      title="禁用状态"
      description="disabled 设置为 true，标签变透明、不可交互，禁用 close 和 click"
      :code="disabledCode"
    >
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock
      title="自定义颜色"
      description="color 文字颜色，backgroundColor 背景色，适合自定义主题或品牌色"
      :code="customColorCode"
    >
      <CustomColorDemo />
    </DemoBlock>

    <DemoBlock
      title="点击事件"
      description="click 事件处理交互，点击 Tag 时触发，disabled 时不会触发"
      :code="clickEventCode"
    >
      <ClickEventDemo />
    </DemoBlock>

    <DemoBlock
      title="自定义内容（Slots）"
      description="支持使用 slots 添加自定义内容，prefix 和 suffix slot 用于在主内容前后添加额外元素"
      :code="slotsCode"
    >
      <SlotsDemo />
    </DemoBlock>

    <DemoBlock
      title="标签组合展示"
      description="综合运用不同属性，展示多种风格的标签，适配各类设计场景"
      :code="combinationCode"
    >
      <CombinationDemo />
    </DemoBlock>

    <section class="tag-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.tag-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  .tag-demo__api {
    margin-top: 32px;
  }

  > p {
    margin: 0 0 24px;
    color: #666;
  }

  :deep(.demo-block__body) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
