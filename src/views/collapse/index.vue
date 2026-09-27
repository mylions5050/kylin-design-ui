<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import accordionCode from './demos/accordion.vue?raw'
import ghostCode from './demos/ghost.vue?raw'
import nestedCode from './demos/nested.vue?raw'
import extraCode from './demos/extra.vue?raw'
import customIconCode from './demos/custom-icon.vue?raw'
import iconPlacementCode from './demos/icon-placement.vue?raw'
import noIconCode from './demos/no-icon.vue?raw'
import iconCollapsibleCode from './demos/icon-collapsible.vue?raw'

import BasicDemo from './demos/basic.vue'
import AccordionDemo from './demos/accordion.vue'
import GhostDemo from './demos/ghost.vue'
import NestedDemo from './demos/nested.vue'
import ExtraDemo from './demos/extra.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import IconPlacementDemo from './demos/icon-placement.vue'
import NoIconDemo from './demos/no-icon.vue'
import IconCollapsibleDemo from './demos/icon-collapsible.vue'
</script>

<template>
  <section class="collapse-demo">
    <h1>Collapse 组件用例</h1>
    <p>对复杂区域进行分组和隐藏，保持页面的整洁。items 数据驱动，v-model 支持多开与手风琴两种模式；内容区高度平滑过渡，交互样式与 Ant Design Collapse 对齐。</p>

    <DemoBlock title="基础用法" description="items 数据驱动，v-model 绑定 key 数组允许多个面板同时展开；item 支持 disabled 禁用" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="手风琴模式" description="accordion 开启后同一时刻最多展开一个面板，v-model 为单个 key（全部收起时为 ''）" :code="accordionCode">
      <AccordionDemo />
    </DemoBlock>

    <DemoBlock title="幽灵折叠面板" description="ghost 模式下根节点与面板分割线全部无边框、完全透明，适合嵌在有背景色的容器里" :code="ghostCode">
      <GhostDemo />
    </DemoBlock>

    <DemoBlock title="面板嵌套" description="面板内容里再放一层 KCollapse；外层 items 不传 children 时可用默认作用域插槽按 item 渲染" :code="nestedCode">
      <NestedDemo />
    </DemoBlock>

    <DemoBlock title="面板额外内容" description="extra 渲染在标题栏右侧（箭头之前），交互元素记得阻止点击冒泡" :code="extraCode">
      <ExtraDemo />
    </DemoBlock>

    <DemoBlock title="自定义图标" description="expandIcon 作用域插槽自定义切换图标，参数 { item, active }" :code="customIconCode">
      <CustomIconDemo />
    </DemoBlock>

    <DemoBlock title="图标位置" description="expandIconPlacement 控制箭头位置：start 标题左侧（AntD 默认）/ end 整行最右（extra 之后）" :code="iconPlacementCode">
      <IconPlacementDemo />
    </DemoBlock>

    <DemoBlock title="无图标" description="showExpandIcon 为 false 时不渲染切换图标（默认箭头与 expandIcon 插槽都受控制）" :code="noIconCode">
      <NoIconDemo />
    </DemoBlock>

    <DemoBlock title="仅点击图标折叠" description="collapsible 为 icon 时点击标题栏无效，仅点击箭头才展开/收起；disabled 则完全不可交互折叠" :code="iconCollapsibleCode">
      <IconCollapsibleDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="collapse-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.collapse-demo {
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
