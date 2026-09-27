<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import IconBarDemo from './demos/icon-bar.vue'
import SeparatorDemo from './demos/separator.vue'
import CollapseDemo from './demos/collapse.vue'
import NavigationDemo from './demos/navigation.vue'
import ShowDemo from './demos/show.vue'
import SlotsDemo from './demos/slots.vue'
import ClickDemo from './demos/click.vue'
import basicCode from './demos/basic.vue?raw'
import iconBarCode from './demos/icon-bar.vue?raw'
import separatorCode from './demos/separator.vue?raw'
import collapseCode from './demos/collapse.vue?raw'
import navigationCode from './demos/navigation.vue?raw'
import showCode from './demos/show.vue?raw'
import slotsCode from './demos/slots.vue?raw'
import clickCode from './demos/click.vue?raw'
import { apiProps, apiEmits, apiSlots } from './api-data'
</script>

<template>
  <section class="breadcrumb-demo">
    <h1>Breadcrumb 组件用例</h1>
    <p>显示当前页面在系统层级结构中的位置，并能逐级返回到各上级页面。支持数据驱动、自定义分隔符、图标与折叠省略。</p>

    <DemoBlock title="基础用法" description="通过 :items 传入面包屑数据，末项自动高亮为当前页，其余带 path 的项可点击跳转。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="带图标" description="使用 items[].icon（iconfont 名称）为每个面包屑项添加前缀图标。" :code="iconBarCode">
      <IconBarDemo />
    </DemoBlock>

    <DemoBlock title="自定义分隔符" description="separator 支持任意字符串；iconSeparator 开启后按 iconfont 图标渲染分隔符。" :code="separatorCode">
      <SeparatorDemo />
    </DemoBlock>

    <DemoBlock title="折叠省略" description="maxItems 超过指定数量时折叠隐藏中间项；items-before-collapse / items-after-collapse 控制保留数量。" :code="collapseCode">
      <CollapseDemo />
    </DemoBlock>

    <DemoBlock title="插槽定制" description="#item 完全自定义单项、#separator 自定义分隔符、#more 定制折叠占位；作用域均透出对应数据。" :code="slotsCode">
      <SlotsDemo />
    </DemoBlock>

    <DemoBlock title="路由跳转 & 外部链接" description="to 支持 vue-router 路由对象（string 或 { path }/{ name, query }…），优先于 path 字符串；replace 控制跳转是否不留历史记录；href 跳转外部页面（原生链接，优先级最高）；target 支持新窗口打开（对 href 与对 to/path 内部路由均生效）。" :code="navigationCode">
      <NavigationDemo />
    </DemoBlock>

    <DemoBlock title="动态隐藏（show）" description="items[].show 控制是否显示该项（默认 true）。业务中按权限/状态把 show 设为 false 即可隐藏，隐藏项及其分隔符不渲染，后项顺延、末页高亮保持正确。" :code="showCode">
      <ShowDemo />
    </DemoBlock>

    <DemoBlock title="点击事件" description="点击可点击项触发 click-item，载荷 { item, index, e }；可在监听中阻止默认的路由跳转而改用自定义逻辑。" :code="clickCode">
      <ClickDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="breadcrumb-demo__api">
      <h2>API</h2>
      <h3>KBreadcrumb Props</h3>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.breadcrumb-demo {
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
      margin: 0 0 20px;
      font-size: 20px;
      font-weight: 600;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
