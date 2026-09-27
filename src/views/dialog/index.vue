<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'

import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import CustomContentDemo from './demos/custom-content.vue'
import customContentCode from './demos/custom-content.vue?raw'
import NoFooterDemo from './demos/no-footer.vue'
import noFooterCode from './demos/no-footer.vue?raw'
import NoCloseDemo from './demos/no-close.vue'
import noCloseCode from './demos/no-close.vue?raw'
import PersistentDemo from './demos/persistent.vue'
import persistentCode from './demos/persistent.vue?raw'
import AsyncCloseDemo from './demos/async-close.vue'
import asyncCloseCode from './demos/async-close.vue?raw'
import NestedDemo from './demos/nested.vue'
import nestedCode from './demos/nested.vue?raw'
import LongContentDemo from './demos/long-content.vue'
import longContentCode from './demos/long-content.vue?raw'
import BlurMaskDemo from './demos/blur-mask.vue'
import blurMaskCode from './demos/blur-mask.vue?raw'
import CustomOverlayDemo from './demos/custom-overlay.vue'
import customOverlayCode from './demos/custom-overlay.vue?raw'
import CustomSizeDemo from './demos/custom-size.vue'
import customSizeCode from './demos/custom-size.vue?raw'
import TopAlignDemo from './demos/top-align.vue'
import topAlignCode from './demos/top-align.vue?raw'
import CustomStyleDemo from './demos/custom-style.vue'
import customStyleCode from './demos/custom-style.vue?raw'
import CustomHeaderDemo from './demos/custom-header.vue'
import customHeaderCode from './demos/custom-header.vue?raw'
import CustomPaddingDemo from './demos/custom-padding.vue'
import customPaddingCode from './demos/custom-padding.vue?raw'
import DraggableDemo from './demos/draggable.vue'
import draggableCode from './demos/draggable.vue?raw'
import FullscreenDemo from './demos/fullscreen.vue'
import fullscreenCode from './demos/fullscreen.vue?raw'
import AnimationDemo from './demos/animation.vue'
import animationCode from './demos/animation.vue?raw'
import OverlayDemo from './demos/overlay.vue'
import overlayCode from './demos/overlay.vue?raw'
</script>

<template>
  <section class="dialog-demo">
    <h1>Dialog 组件用例</h1>
    <p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>

    <DemoBlock title="基础用法" description="v-model 控制显示/隐藏，支持 open / close / confirm / cancel 事件" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="不同尺寸" description="small / default / large 三种尺寸，尺寸控制内边距大小，配合 width 统一宽度" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="自定义内容" description="支持自定义标题、内容和底部按钮" :code="customContentCode">
      <CustomContentDemo />
    </DemoBlock>

    <DemoBlock title="无底部按钮" description="仅展示内容，不需要确认/取消操作" :code="noFooterCode">
      <NoFooterDemo />
    </DemoBlock>

    <DemoBlock title="不显示关闭按钮" description="隐藏右上角的 X 关闭按钮" :code="noCloseCode">
      <NoCloseDemo />
    </DemoBlock>

    <DemoBlock title="禁止点击遮罩关闭" description="close-on-click-overlay 设为 false，遮罩点击不关闭" :code="persistentCode">
      <PersistentDemo />
    </DemoBlock>

    <DemoBlock title="异步关闭" description="confirm 按钮 loading 状态，模拟异步请求后关闭" :code="asyncCloseCode">
      <AsyncCloseDemo />
    </DemoBlock>

    <DemoBlock title="嵌套 Dialog" description="在 Dialog 内再打开一个 Dialog" :code="nestedCode">
      <NestedDemo />
    </DemoBlock>

    <DemoBlock title="长内容滚动" description="内容过长时 body 区域自动滚动" :code="longContentCode">
      <LongContentDemo />
    </DemoBlock>

    <DemoBlock title="遮罩类型（毛玻璃）" description="mask-type 控制遮罩类型：dimmed 暗色蒙层（默认）/ blur 毛玻璃（AntD v6 遮罩 demo 同款，蒙层背景不变 + backdrop-filter: blur(4px)）" :code="blurMaskCode">
      <BlurMaskDemo />
    </DemoBlock>

    <DemoBlock title="自定义遮罩背景" description="overlay-background 自定义遮罩颜色，支持亮色遮罩等场景" :code="customOverlayCode">
      <CustomOverlayDemo />
    </DemoBlock>

    <DemoBlock title="自定义宽高" description="通过 width / height 自定义尺寸，支持任意 CSS 单位" :code="customSizeCode">
      <CustomSizeDemo />
    </DemoBlock>

    <DemoBlock title="顶部对齐" description="align 设为 top，配合 top 属性控制顶部间距" :code="topAlignCode">
      <TopAlignDemo />
    </DemoBlock>

    <DemoBlock title="自定义样式" description="通过 customClass 和 CSS var 自定义对话框外观，如 --k-dialog-bg、--k-dialog-radius 等" :code="customStyleCode">
      <CustomStyleDemo />
    </DemoBlock>

    <DemoBlock title="自定义头部" description="通过 #title slot 自定义标题区域，支持任意内容" :code="customHeaderCode">
      <CustomHeaderDemo />
    </DemoBlock>

    <DemoBlock title="自定义内边距" description="通过 padding 属性统一设置对话框整体内边距" :code="customPaddingCode">
      <CustomPaddingDemo />
    </DemoBlock>

    <DemoBlock title="可拖拽" description="draggable 属性开启，拖拽头部移动对话框" :code="draggableCode">
      <DraggableDemo />
    </DemoBlock>

    <DemoBlock title="可全屏" description="fullscreen 属性开启，头部显示全屏切换按钮" :code="fullscreenCode">
      <FullscreenDemo />
    </DemoBlock>

    <DemoBlock title="动画效果" description="animation 属性支持 scale（默认）/ slide / bounce 三种动画" :code="animationCode">
      <AnimationDemo />
    </DemoBlock>

    <DemoBlock title="KOverlay 单独使用" description="KOverlay 是独立的遮罩组件，可被 Dialog / Drawer 等组件复用，也支持单独使用" :code="overlayCode">
      <OverlayDemo />
    </DemoBlock>

    <section class="dialog-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.dialog-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 32px;
  }
}
</style>
