<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import EventDemo from './demos/event.vue'
import TooltipDemo from './demos/tooltip.vue'
import MarksDemo from './demos/marks.vue'
import VerticalDemo from './demos/vertical.vue'
import DifficultyDemo from './demos/difficulty.vue'
import EditableDemo from './demos/editable.vue'
import DisabledHandleDemo from './demos/disabled-handle.vue'
import DisabledDemo from './demos/disabled.vue'
import basicCode from './demos/basic.vue?raw'
import eventCode from './demos/event.vue?raw'
import tooltipCode from './demos/tooltip.vue?raw'
import marksCode from './demos/marks.vue?raw'
import verticalCode from './demos/vertical.vue?raw'
import difficultyCode from './demos/difficulty.vue?raw'
import editableCode from './demos/editable.vue?raw'
import disabledHandleCode from './demos/disabled-handle.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import { apiProps, apiEmits, apiSlots } from './api-data'
</script>

<template>
  <section class="slider-demo">
    <h1>Slider 组件用例</h1>
    <p>
      滑动型输入器，在数值区间内通过拖动滑块选取值；支持单值 / 双滑块、步长对齐、
      刻度标记、值提示与垂直方向。
    </p>

    <DemoBlock title="基础用法" description="v-model 绑定当前值，拖动滑块或点击轨道直接定位；悬浮 / 拖动时显示当前值提示。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="事件" description="拖动过程中持续触发 change，松手后触发 afterChange —— 表单提交时机建议放在 afterChange。" :code="eventCode">
      <EventDemo />
    </DemoBlock>

    <DemoBlock title="自定义提示" description="formatTooltip 自定义 tooltip 内容；tooltipOpen 让气泡常显（配合 range 双滑块）；step 步长下取值自动对齐。" :code="tooltipCode">
      <TooltipDemo />
    </DemoBlock>

    <DemoBlock title="带标签的滑块" description="marks 在指定数值位置显示刻度点与标签，点击标签可定位；dots 按 step 在轨道上铺开刻度点（已选区间内高亮）。" :code="marksCode">
      <MarksDemo />
    </DemoBlock>

    <DemoBlock title="分阶段配色" description="color 支持按当前值取色的函数，轨道 / 滑块 / 激活刻度点随阶段变色；marks 每个标签可用 style 单独配色。" :code="difficultyCode">
      <DifficultyDemo />
    </DemoBlock>

    <DemoBlock title="动态增减节点" description="editable（配合 range）开启后：点击轨道添加节点，把节点拖出轨道两端、或对节点按 Delete / Backspace 删除；minCount / maxCount 限制节点数量。" :code="editableCode">
      <EditableDemo />
    </DemoBlock>

    <DemoBlock title="禁用指定滑块" description="disabled 传 boolean 数组可单独禁用 range 下指定下标的滑块；被禁用的滑块不可拖动，作为移动边界存在，其他滑块无法越过。" :code="disabledHandleCode">
      <DisabledHandleDemo />
    </DemoBlock>

    <DemoBlock title="垂直" description="vertical 开启垂直模式，需显式给组件设置高度；与 range 组合可做双端区间选择。" :code="verticalCode">
      <VerticalDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 后不可拖动、点击与键盘调整，仅展示当前值。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="slider-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.slider-demo {
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
