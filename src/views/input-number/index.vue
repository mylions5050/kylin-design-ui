<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots } from './api-data'

import basicCode from './demos/basic.vue?raw'
import controlsPositionCode from './demos/controls-position.vue?raw'
import sizeCode from './demos/size.vue?raw'
import stepCode from './demos/step.vue?raw'
import minMaxCode from './demos/min-max.vue?raw'
import precisionCode from './demos/precision.vue?raw'
import formatterCode from './demos/formatter.vue?raw'
import prefixSuffixCode from './demos/prefix-suffix.vue?raw'
import statusCode from './demos/status.vue?raw'
import disabledReadonlyCode from './demos/disabled-readonly.vue?raw'

import BasicDemo from './demos/basic.vue'
import ControlsPositionDemo from './demos/controls-position.vue'
import SizeDemo from './demos/size.vue'
import StepDemo from './demos/step.vue'
import MinMaxDemo from './demos/min-max.vue'
import PrecisionDemo from './demos/precision.vue'
import FormatterDemo from './demos/formatter.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import StatusDemo from './demos/status.vue'
import DisabledReadonlyDemo from './demos/disabled-readonly.vue'
</script>

<template>
  <section class="input-number-demo">
    <h1>InputNumber 组件用例</h1>
    <p>仅允许输入数字，带增减按钮；支持左右灰底按钮与右侧上下箭头两种控件形态、step 步长、min / max 范围收敛、precision 精度、formatter 格式化展示与前缀后缀插槽，基于 KInput 组合实现。</p>

    <DemoBlock title="基础用法" description="v-model 直接绑定 number，可通过按钮或键盘输入；清空时值为 null" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="按钮位置" description="controls-position 为 right 时上下箭头堆叠在右侧，hover 或聚焦时出现；默认左右两侧灰底按钮" :code="controlsPositionCode">
      <ControlsPositionDemo />
    </DemoBlock>

    <DemoBlock title="三种尺寸" description="size 控制整体高度，按钮宽度随尺寸收窄" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="步长 step" description="点击增减按钮按步长变化，支持小数步长" :code="stepCode">
      <StepDemo />
    </DemoBlock>

    <DemoBlock title="范围 min / max" description="输入超出范围时失焦自动收敛回边界，步进到边界后对应按钮禁用" :code="minMaxCode">
      <MinMaxDemo />
    </DemoBlock>

    <DemoBlock title="精度 precision" description="展示与步进结果都按 precision 取齐小数位" :code="precisionCode">
      <PrecisionDemo />
    </DemoBlock>

    <DemoBlock title="格式化展示" description="formatter 只改非输入态的展示，parser 负责把输入还原成数值，适合千分位、百分比等场景" :code="formatterCode">
      <FormatterDemo />
    </DemoBlock>

    <DemoBlock title="前缀后缀" description="#prefix / #suffix 插槽自定义输入框前后缀内容，可与右侧箭头等形态组合" :code="prefixSuffixCode">
      <PrefixSuffixDemo />
    </DemoBlock>

    <DemoBlock title="状态 status" description="status 为 primary / error / warning / success / info 时边框与聚焦阴影变色，适合表单校验场景" :code="statusCode">
      <StatusDemo />
    </DemoBlock>

    <DemoBlock title="禁用 / 只读 / 隐藏按钮" description="disabled 整体禁用；readonly 只读且隐藏增减按钮；controls 为 false 隐藏按钮纯手输" :code="disabledReadonlyCode">
      <DisabledReadonlyDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="input-number-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.input-number-demo {
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
