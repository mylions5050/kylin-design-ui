<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import ErrorDemo from './demos/error.vue'
import errorCode from './demos/error.vue?raw'
import VerticalDemo from './demos/vertical.vue'
import verticalCode from './demos/vertical.vue?raw'
import ClickableDemo from './demos/clickable.vue'
import clickableCode from './demos/clickable.vue?raw'
import IconDemo from './demos/icon.vue'
import iconCode from './demos/icon.vue?raw'
import InlineDemo from './demos/inline.vue'
import inlineCode from './demos/inline.vue?raw'
import MiniDemo from './demos/mini.vue'
import miniCode from './demos/mini.vue?raw'
import GlobalStatusDemo from './demos/global-status.vue'
import globalStatusCode from './demos/global-status.vue?raw'
import { apiProps, apiEmits, apiSlots } from './api-data'
</script>

<template>
  <section class="steps-demo">
    <h1>Steps 组件用例</h1>
    <p>引导用户按照流程完成任务的导航条，参考 Ant Design Steps 设计。</p>

    <DemoBlock
      title="基础用法"
      description="通过 :items 传入步骤数据，v-model:current 双向绑定当前步骤。"
      :code="basicCode"
    >
      <BasicDemo />
    </DemoBlock>

    <DemoBlock
      title="步骤运行错误"
      description="某一步出现错误时，将该项的 status 设为 error 即可。"
      :code="errorCode"
    >
      <ErrorDemo />
    </DemoBlock>

    <DemoBlock
      title="竖直方向的步骤条"
      description="direction 设为 vertical，圆点居左、文本在右侧，适合描述较长步骤信息。"
      :code="verticalCode"
    >
      <VerticalDemo />
    </DemoBlock>

    <DemoBlock
      title="可点击"
      description="clickable 开启后可直接点击任一步骤切换，配合 v-model:current 使用。"
      :code="clickableCode"
    >
      <ClickableDemo />
    </DemoBlock>

    <DemoBlock
      title="带图标的步骤条"
      description="items[].icon 指定 iconfont 图标名渲染在圆点内。"
      :code="iconCode"
    >
      <IconDemo />
    </DemoBlock>

    <DemoBlock
      title="左右结构"
      description="type 设为 inline，圆点居左、文本在右侧的水平排列。"
      :code="inlineCode"
    >
      <InlineDemo />
    </DemoBlock>

    <DemoBlock
      title="紧凑尺寸"
      description="size 设为 mini，圆形缩小到 20px，间距更紧凑。"
      :code="miniCode"
    >
      <MiniDemo />
    </DemoBlock>

    <DemoBlock
      title="全局状态"
      description="status 设为 success/error/warning 时，所有步骤统一为该状态，用于展示整体流程结果。"
      :code="globalStatusCode"
    >
      <GlobalStatusDemo />
    </DemoBlock>

    <section class="steps-demo__api">
      <h2>API</h2>
      <h3>KSteps Props</h3>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.steps-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  :deep(.demo-block) {
    border: none;
    box-shadow: none;
  }

  &__api {
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid var(--k-color-border);

    h2 {
      margin: 0 0 20px;
      font-size: 20px;
      font-weight: 600;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>