<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import DisabledDemo from './demos/disabled.vue'
import disabledCode from './demos/disabled.vue?raw'
import SizesDemo from './demos/sizes.vue'
import sizesCode from './demos/sizes.vue?raw'
import LabelDemo from './demos/label.vue'
import labelCode from './demos/label.vue?raw'
import ColorDemo from './demos/color.vue'
import colorCode from './demos/color.vue?raw'
import ChangeEventDemo from './demos/change-event.vue'
import changeEventCode from './demos/change-event.vue?raw'
import AccessibilityDemo from './demos/accessibility.vue'
import accessibilityCode from './demos/accessibility.vue?raw'
import CombinationsDemo from './demos/combinations.vue'
import combinationsCode from './demos/combinations.vue?raw'
import { apiProps, apiEvents } from './api-data'
</script>

<template>
  <section class="switch-demo">
    <h1>Switch 组件用例</h1>
    <p>开关选择器。用于在两个互斥的状态之间进行切换。
      支持不同尺寸、禁用状态、自定义颜色、标签文本等丰富的配置选项。</p>

    <DemoBlock title="基础用法" description="v-model 双向绑定，最简单的开关用法。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="禁用状态" description="disabled 为 true 时，开关不可点击，显示为灰色禁用状态。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="不同尺寸" description="size 属性提供 small（小）、default（默认）、large（大）三种尺寸，适配不同的使用场景。" :code="sizesCode">
      <SizesDemo />
    </DemoBlock>

    <DemoBlock
      title="显示标签"
      description="showLabel 控制是否显示标签文本，通过 activeText 和 inactiveText 自定义标签内容。"
      :code="labelCode"
    >
      <LabelDemo />
    </DemoBlock>

    <DemoBlock
      title="自定义颜色"
      description="通过 activeColor 和 inactiveColor 自定义开关的背景颜色，创造个性化的主题效果。"
      :code="colorCode"
    >
      <ColorDemo />
    </DemoBlock>

    <DemoBlock title="change 事件" description="switch 状态改变时触发 change 事件，可以通过事件处理器响应用户的切换操作。" :code="changeEventCode">
      <ChangeEventDemo />
    </DemoBlock>

    <DemoBlock
      title="无障碍访问"
      description="Switch 组件支持 aria-checked 和 aria-label 属性，为屏幕阅读器用户提供更好的无障碍体验。"
      :code="accessibilityCode"
    >
      <AccessibilityDemo />
    </DemoBlock>

    <DemoBlock
      title="不同组合展示"
      description="各种属性和状态的组合效果，展示 Switch 组件的灵活性和多样性。"
      :code="combinationsCode"
    >
      <CombinationsDemo />
    </DemoBlock>

    <section class="switch-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.switch-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  .switch-demo__api {
    margin-top: 32px;
  }

  > p {
    margin: 0 0 24px;
    color: #666;
  }

  :deep(.demo-block__body) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
