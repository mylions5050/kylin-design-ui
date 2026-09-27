<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import UncontrolledDemo from './demos/uncontrolled.vue'
import DataDrivenDemo from './demos/data-driven.vue'
import SettingsDemo from './demos/settings.vue'
import ScrollableDemo from './demos/scrollable.vue'
import EditableDemo from './demos/editable.vue'
import CustomDemo from './demos/custom.vue'
import basicCode from './demos/basic.vue?raw'
import uncontrolledCode from './demos/uncontrolled.vue?raw'
import dataDrivenCode from './demos/data-driven.vue?raw'
import settingsCode from './demos/settings.vue?raw'
import scrollableCode from './demos/scrollable.vue?raw'
import editableCode from './demos/editable.vue?raw'
import customCode from './demos/custom.vue?raw'
import { apiProps, apiEmits, apiSlots, paneProps } from './api-data'
</script>

<template>
  <section class="tab-demo">
    <h1>Tab 组件用例</h1>
    <p>传统普通选项卡：选中项文字高亮并带有下划线指示条，点击即可切换。支持 v-model 受控、default-key 非受控与 items 数据驱动三种用法。</p>

    <DemoBlock
      title="基础用法"
      description="v-model 受控当前激活项，选中项文字高亮，底部下划线指示条平滑滑动跟随。"
      :code="basicCode"
    >
      <BasicDemo />
    </DemoBlock>

    <DemoBlock
      title="非受控"
      description="default-key 指定初始激活项，由组件内部自行维护激活状态。"
      :code="uncontrolledCode"
    >
      <UncontrolledDemo />
    </DemoBlock>

    <DemoBlock
      title="数据驱动"
      description="通过 :items 数组定义选项卡，配合 #pane 插槽渲染面板内容。"
      :code="dataDrivenCode"
    >
      <DataDrivenDemo />
    </DemoBlock>

    <DemoBlock
      title="均分 / 内外边距 / 指示条宽度"
      description="stretch 均分局内宽度；item-padding / item-margin 控制选项内、外边距；indicator 控制下划线指示条宽度（整条 or 跟随文字）。"
      :code="settingsCode"
    >
      <SettingsDemo />
    </DemoBlock>

    <DemoBlock
      title="溢出滚动"
      description="选项卡过多超出宽度时，可通过前后箭头或鼠标拖拽滚动查看。"
      :code="scrollableCode"
    >
      <ScrollableDemo />
    </DemoBlock>

    <DemoBlock
      title="可添加 / 可关闭"
      description="addable 显示“+”添加按钮，closable 在每个选项卡头显示关闭按钮；通过 add / tab-remove 事件动态增删。"
      :code="editableCode"
    >
      <EditableDemo />
    </DemoBlock>

    <DemoBlock
      title="自定义标题与动画"
      description="#label 插槽自定义标题（加粗/换色）；active-color 自定义 hover/激活颜色与下划线；indicator-transition 控制滑行动画；indicator-style 自定义下划线的颜色/高度/圆角。"
      :code="customCode"
    >
      <CustomDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="tab-demo__api">
      <h2>API</h2>

      <h3>KTab Props</h3>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />

      <h3 class="api-sub" >KTabPane Props</h3>
      <APITable :props="paneProps" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.tab-demo {
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

    .api-sub {
      margin: 28px 0 12px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
