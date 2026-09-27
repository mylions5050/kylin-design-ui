<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import { iconNames } from './icon-names'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents } from './api-data'
// 各用例 SFC 与其源码（?raw），供 DemoBlock 展示/复制
import BasicUsageDemo from './demos/basic-usage.vue'
import basicUsageCode from './demos/basic-usage.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import ColorDemo from './demos/color.vue'
import colorCode from './demos/color.vue?raw'
import IconGridDemo from './demos/icon-grid.vue'
import iconGridCode from './demos/icon-grid.vue?raw'
import FigmaIconsDemo from './demos/figma-icons.vue'
import figmaIconsCode from './demos/figma-icons.vue?raw'
</script>

<template>
  <section class="icon-demo">
    <h1>Icon 组件用例</h1>
    <p>语义化图标组件，支持自定义尺寸、颜色与图标集检索。</p>
    <DemoBlock title="基础用法" description='<KIcon name="check-item-filling" />，默认跟随文字大小和颜色。' :code="basicUsageCode">
      <BasicUsageDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 控制字号（px 数字或任意 font-size 字符串）。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="颜色" description="color 控制颜色；不传则 currentColor 跟随文字色。" :code="colorCode">
      <ColorDemo />
    </DemoBlock>

    <DemoBlock
      :title="`图标集（共 ${iconNames.length} 个）`"
      description="输入关键词过滤图标名，点击单元格复制名字。"
      :code="iconGridCode"
    >
      <IconGridDemo />
    </DemoBlock>

    <DemoBlock
      title="特色图标（Figma 导入）"
      description="把 Figma 导出的 .svg 放进 src/assets/icons-figma/ 自动识别；原色保留，如需跟随 color 把 svg 的 fill 改成 currentColor。示例 sample-star 可删。"
      :code="figmaIconsCode"
    >
      <FigmaIconsDemo />
    </DemoBlock>

    <section class="icon-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.icon-demo {
  padding: 24px;

  code {
    padding: 1px 4px;
    background: #f0f5fc;
    border-radius: 3px;
    font-size: 12px;
  }

  &__api {
    margin-top: 32px;
  }
}
</style>
