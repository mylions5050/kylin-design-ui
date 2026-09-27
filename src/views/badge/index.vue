<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import StandaloneDemo from './demos/standalone.vue'
import standaloneCode from './demos/standalone.vue?raw'
import StatusDemo from './demos/status.vue'
import statusCode from './demos/status.vue?raw'
import DynamicDemo from './demos/dynamic.vue'
import dynamicCode from './demos/dynamic.vue?raw'
</script>

<template>
  <section class="badge-demo">
    <h1>Badge 徽标数</h1>
    <p>
      图标右上角的圆形徽标数字，一般出现在通知图标或头像的右上角，
      用于显示需要处理的消息条数。支持封顶数字（99+）、小红点、
      状态点（processing 带光环动画）、位置偏移与独立使用。
    </p>

    <DemoBlock
      title="基本"
      description="count 为 0 默认隐藏（showZero 显示）；超过 overflowCount 显示 99+；dot 小红点；offset 偏移；size 小号；count 插槽可完全自定义徽标内容"
      :code="basicCode"
    >
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="独立使用" description="不包裹任何元素即是独立展示，color / style 自定义颜色" :code="standaloneCode">
      <StandaloneDemo />
    </DemoBlock>

    <DemoBlock title="状态点" description="status 表示不同状态，配 text 显示说明文字；processing 有扩散光环动画" :code="statusCode">
      <StatusDemo />
    </DemoBlock>

    <DemoBlock title="动态" description="展示数字与红点的动态变化效果" :code="dynamicCode">
      <DynamicDemo />
    </DemoBlock>

    <section class="badge-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped>
.badge-demo {
  padding: 24px;
}

.badge-demo h1 {
  margin-bottom: 8px;
}

.badge-demo > p {
  margin: 0 0 24px;
  color: #666;
}

.badge-demo__api {
  margin-top: 32px;
}
</style>
