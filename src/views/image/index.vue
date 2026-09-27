<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import fitCode from './demos/fit.vue?raw'
import errorCode from './demos/error.vue?raw'
import placeholderCode from './demos/placeholder.vue?raw'
import lazyCode from './demos/lazy.vue?raw'
import progressiveCode from './demos/progressive.vue?raw'
import previewCode from './demos/preview.vue?raw'

import BasicDemo from './demos/basic.vue'
import FitDemo from './demos/fit.vue'
import ErrorDemo from './demos/error.vue'
import PlaceholderDemo from './demos/placeholder.vue'
import LazyDemo from './demos/lazy.vue'
import ProgressiveDemo from './demos/progressive.vue'
import PreviewDemo from './demos/preview.vue'
</script>

<template>
  <section class="image-demo">
    <h1>Image 组件用例</h1>
    <p>展示一张图片，支持 object-fit 填充模式、shimmer 微光加载占位、失败回退与视口懒加载，图片加载完成后淡入显示。</p>

    <DemoBlock title="基础用法" description="width / height 控制容器尺寸，图片按容器自适应缩放，加载完成后淡入显示" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="填充模式 fit" description="fit 同原生 object-fit，决定图片在固定尺寸容器内的裁剪与缩放方式" :code="fitCode">
      <FitDemo />
    </DemoBlock>

    <DemoBlock title="加载失败" description="加载失败默认展示图标与“加载失败”文案，可通过 #error 插槽自定义；load / error 事件可监听加载结果" :code="errorCode">
      <ErrorDemo />
    </DemoBlock>

    <DemoBlock title="占位内容" description="加载完成前展示占位内容，默认为 shimmer 微光扫过动画，可通过 #placeholder 插槽自定义" :code="placeholderCode">
      <PlaceholderDemo />
    </DemoBlock>

    <DemoBlock title="懒加载" description="开启 lazy 后，图片进入视口（或 scroll-container 指定容器）才发起真实请求" :code="lazyCode">
      <LazyDemo />
    </DemoBlock>

    <DemoBlock title="渐进加载" description="通过 #placeholder 插槽自定义占位内容，可放水彩动画、文字或 KProgress 进度条；点击开始生成模拟进度完成后展示图片" :code="progressiveCode">
      <ProgressiveDemo />
    </DemoBlock>

    <DemoBlock title="图片预览" description="通过 preview-src-list 开启点击预览，预览器支持缩放、1:1、旋转、多图切换、滚轮缩放与键盘操作" :code="previewCode">
      <PreviewDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="image-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.image-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin-bottom: 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 24px;

    h2 {
      margin-bottom: 12px;
    }
  }
}
</style>
