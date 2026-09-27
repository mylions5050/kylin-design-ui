<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import insideCode from './demos/inside.vue?raw'
import colorsCode from './demos/colors.vue?raw'
import circleCode from './demos/circle.vue?raw'
import customCode from './demos/custom.vue?raw'
import marksCode from './demos/marks.vue?raw'
import batteryCode from './demos/battery.vue?raw'
import gradientCode from './demos/gradient.vue?raw'
import stepsCode from './demos/steps.vue?raw'

import BasicDemo from './demos/basic.vue'
import InsideDemo from './demos/inside.vue'
import ColorsDemo from './demos/colors.vue'
import CircleDemo from './demos/circle.vue'
import CustomDemo from './demos/custom.vue'
import MarksDemo from './demos/marks.vue'
import BatteryDemo from './demos/battery.vue'
import GradientDemo from './demos/gradient.vue'
import StepsDemo from './demos/steps.vue'
</script>

<template>
  <section class="progress-demo">
    <h1>Progress 组件用例</h1>
    <p>展示操作进度，告知用户当前状态和预期。percentage 必填（0-100），支持直线、环形、仪表盘三种形态。</p>

    <DemoBlock title="基础用法" description="percentage 控制进度；format 自定义文字；status 切换 success / warning / exception 语义色" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="进度条内显示百分比" description="text-inside 内嵌文字，不占额外空间，适合文件上传等场景；需配合较大的 strokeWidth" :code="insideCode">
      <InsideDemo />
    </DemoBlock>

    <DemoBlock title="自定义颜色" description="color 支持字符串、按进度分档的数组与函数三种方式，优先于 status 语义色" :code="colorsCode">
      <ColorsDemo />
    </DemoBlock>

    <DemoBlock title="环形与仪表盘" description="type 切换 circle / dashboard；width 控制直径、strokeWidth 控制环宽；status 时中心显示状态图标" :code="circleCode">
      <CircleDemo />
    </DemoBlock>

    <DemoBlock title="自定义内容与流动动画" description="默认插槽替换文字区域（作用域 { percentage }）；indeterminate 开启流动动画，适合未知进度的加载" :code="customCode">
      <CustomDemo />
    </DemoBlock>

    <DemoBlock title="打点" description="marks 在直线进度条上标记档位（如 60 及格、80 良好）；markPlacement 控制详情展示方式：hover 悬浮 / 打点上、下方文字；已达到的打点自动染进度色" :code="marksCode">
      <MarksDemo />
    </DemoBlock>

    <DemoBlock title="电量示例" description="color 函数按电量分档绿/黄/红，textInside 内嵌文字；充电中的电池用插槽把闪电图标替换进条内" :code="batteryCode">
      <BatteryDemo />
    </DemoBlock>

    <DemoBlock title="渐变色" description="color 传百分比键对象：line 生成 CSS 渐变、circle/dashboard 生成 SVG linearGradient；也支持直接传 CSS 渐变串（仅 line）" :code="gradientCode">
      <GradientDemo />
    </DemoBlock>

    <DemoBlock title="步骤进度" description="steps 开启步骤模式：line 变为分断步骤条（gap 控制间隔），circle 变为步骤进度圈（gapDegree 控制段间角度）；填充段数 = floor(steps × 百分比 / 100)" :code="stepsCode">
      <StepsDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="progress-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.progress-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  :deep(.demo-block__body) {
    display: flex;
    flex-direction: column;
    gap: 16px;
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
