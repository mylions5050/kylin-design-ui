<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import MaxHeightDemo from './demos/max-height.vue'
import basicCode from './demos/basic.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import eventsCode from './demos/events.vue?raw'
import maxHeightCode from './demos/max-height.vue?raw'
import { apiProps, apiEmits } from './api-data'
</script>

<template>
  <section class="treeselect-demo">
    <h1>TreeSelect 组件用例</h1>
    <p>
      触发器外观与 Select 一致，下拉面板内嵌 Tree：点击叶子节点完成选择并收起面板，
      点击父节点按 Tree 约定展开/收起。
    </p>

    <DemoBlock title="基础用法" description="v-model 绑定选中节点 id，触发器回显节点标签；clearable 开启后悬浮可清空；default-expand-all 控制面板内树默认展开。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 后触发器不可交互，无论是否有选中值均无法展开面板。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="事件" description="选中节点时依次触发 select（载荷为节点原始数据）与 change（载荷为节点 id）；面板展开/收起触发 visibleChange；点击清空图标触发 clear。" :code="eventsCode">
      <EventsDemo />
    </DemoBlock>

    <DemoBlock title="面板最大高度" description="通过 max-height 限制下拉面板最大高度，节点超出时面板内部滚动。" :code="maxHeightCode">
      <MaxHeightDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="treeselect-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="[]" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.treeselect-demo {
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
.treeselect-demo .demo-treeselect {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
