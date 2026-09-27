<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import EchoDemo from './demos/echo.vue'
import MultipleDemo from './demos/multiple.vue'
import ChangeOnSelectDemo from './demos/change-on-select.vue'
import HoverDemo from './demos/hover.vue'
import FieldNamesDemo from './demos/field-names.vue'
import DisplayRenderDemo from './demos/display-render.vue'
import SizeDemo from './demos/size.vue'
import DisabledDemo from './demos/disabled.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import SearchableDemo from './demos/searchable.vue'
import basicCode from './demos/basic.vue?raw'
import echoCode from './demos/echo.vue?raw'
import multipleCode from './demos/multiple.vue?raw'
import changeOnSelectCode from './demos/change-on-select.vue?raw'
import hoverCode from './demos/hover.vue?raw'
import fieldNamesCode from './demos/field-names.vue?raw'
import displayRenderCode from './demos/display-render.vue?raw'
import sizeCode from './demos/size.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import prefixSuffixCode from './demos/prefix-suffix.vue?raw'
import searchableCode from './demos/searchable.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="cascader-demo">
    <h1>Cascader 组件用例</h1>
    <p>
    多级联动选择器；触发器与 KSelect 外观一致，面板按列逐级展开，
    选中后触发器回显路径；支持单选 / 多选、可选任意级与自定义字段名。
    </p>

    <DemoBlock title="基础用法" description="点击选项逐级下钻，点击叶子节点完成选择；触发器显示当前值。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="回显与清空" description="设置默认值后触发器回显完整路径（label 以 / 连接）；clearable 悬浮出现清空图标。" :code="echoCode">
      <EchoDemo />
    </DemoBlock>

    <DemoBlock title="多选" description="multiple 开启后面板内以 KCheckbox 勾选（父级联动子树、半选态）：点击父级展开下一级、点击 checkbox 勾选子树；触发器以 KTag 回显路径，maxTagCount 超出折叠为 +N，tag 可单独移除。" :code="multipleCode">
      <MultipleDemo />
    </DemoBlock>

    <DemoBlock title="选择任意一级" description="changeOnSelect 开启后，点击任意一级即完成选择并回显完整路径，面板保持展开继续展示下一级；选项前置 KRadio 提示单选语义。" :code="changeOnSelectCode">
      <ChangeOnSelectDemo />
    </DemoBlock>

    <DemoBlock title="悬浮展开" description="expand-trigger 设置为 hover 时，悬浮选项即展开下一级，点击叶子节点完成选择。" :code="hoverCode">
      <HoverDemo />
    </DemoBlock>

    <DemoBlock title="自定义字段名" description="fieldNames 指定 label / value / children 对应的字段名，适配既有数据结构。" :code="fieldNamesCode">
      <FieldNamesDemo />
    </DemoBlock>

    <DemoBlock title="自定义回显格式" description="displayRender 接收各级 label 数组，返回自定义回显文本。" :code="displayRenderCode">
      <DisplayRenderDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size 支持 small / default / large。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="自定义前后缀" description="prefixIcon / suffixIcon 自定义触发器前后缀图标，如 arrow-down-filling、arrow-up-filling。" :code="prefixSuffixCode">
      <PrefixSuffixDemo />
    </DemoBlock>

    <DemoBlock title="可搜索" description="filterable 开启后触发器可输入关键字，面板平铺展示匹配叶子的完整路径（不区分大小写），无匹配时显示空状态；多选模式下勾选后面板保持展开可继续输入。" :code="searchableCode">
      <SearchableDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 禁用整个选择器；数据项设置 disabled 后在面板中置灰不可选。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="cascader-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.cascader-demo {
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
