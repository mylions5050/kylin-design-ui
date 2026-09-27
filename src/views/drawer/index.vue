<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import placementCode from './demos/placement.vue?raw'
import sizeCode from './demos/size.vue?raw'
import extraFooterCode from './demos/extra-footer.vue?raw'
import pushCode from './demos/push.vue?raw'
import loadingCode from './demos/loading.vue?raw'
import maskCode from './demos/mask.vue?raw'

import PlacementDemo from './demos/placement.vue'
import SizeDemo from './demos/size.vue'
import ExtraFooterDemo from './demos/extra-footer.vue'
import PushDemo from './demos/push.vue'
import LoadingDemo from './demos/loading.vue'
import MaskDemo from './demos/mask.vue'
</script>

<template>
  <section class="drawer-demo">
    <h1>Drawer 组件用例</h1>
    <p>从屏幕四边滑出的浮层面板，适合表单编辑、详情查看等需要较大承载空间又不完全遮挡页面的场景。遮罩、teleport、点击遮罩关闭复用 KOverlay；面板滑入滑出与 KDialog 采用同一套双 rAF 动画模式，关闭时向原方向收起（打开期间方向锁定，不受外部状态变化影响）。</p>

    <DemoBlock title="基础用法" description="placement 控制四个方向弹出：right（默认）/ left / top / bottom" :code="placementCode">
      <PlacementDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 预设 default 378px / large 736px（与 AntD 一致）；width / height 自定义厚度，支持数字或任意 CSS 长度" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="extra 与 footer" description="extra 放标题栏右侧的次要操作；footer 放底部按钮组（表单类抽屉的典型形态）；headerStyle / bodyStyle / footerStyle 可做样式定制" :code="extraFooterCode">
      <ExtraFooterDemo />
    </DemoBlock>

    <DemoBlock title="多层抽屉（push 推开）" description="同方向叠加时，底层抽屉被自动推开（默认 180px，push 数字可自定义 / false 关闭）；ESC 与点遮罩只关闭最上层" :code="pushCode">
      <PushDemo />
    </DemoBlock>

    <DemoBlock title="加载态" description="loading 为 true 时内容区被局部加载态覆盖（组合复用 KLoading 的 local 模式）" :code="loadingCode">
      <LoadingDemo />
    </DemoBlock>

    <DemoBlock title="遮罩类型" description="maskType 控制遮罩类型：dimmed 暗色蒙层（默认）/ blur 毛玻璃（AntD v6 遮罩 demo 同款，蒙层背景不变 + backdrop-filter: blur(4px)）" :code="maskCode">
      <MaskDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="drawer-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.drawer-demo {
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
