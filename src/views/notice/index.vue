<script setup lang="ts">
import Notice from '@/components/notice/index.tsx'
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicTypesDemo from './demos/basic-types.vue'
import basicTypesCode from './demos/basic-types.vue?raw'
import WithDescriptionDemo from './demos/with-description.vue'
import withDescriptionCode from './demos/with-description.vue?raw'
import DurationDemo from './demos/duration.vue'
import durationCode from './demos/duration.vue?raw'
import ActionsDemo from './demos/actions.vue'
import actionsCode from './demos/actions.vue?raw'
import BatchControlDemo from './demos/batch-control.vue'
import batchControlCode from './demos/batch-control.vue?raw'
import GlobalUsageDemo from './demos/global-usage.vue'
import globalUsageCode from './demos/global-usage.vue?raw'
import { apiEvents } from './api-data'
</script>

<template>
  <section class="notice-demo">
    <h1>Notice 组件用例</h1>
    <p>右上角通知提醒，支持队列管理和多种类型。</p>

    <DemoBlock title="基础类型" description="success / error / info / warning / loading 五种基础类型。" :code="basicTypesCode">
      <BasicTypesDemo />
    </DemoBlock>

    <DemoBlock title="带描述的通知" description="支持 title + description 的两段式结构。" :code="withDescriptionCode">
      <WithDescriptionDemo />
    </DemoBlock>

    <DemoBlock title="自定义时长" description="duration 控制显示时间，0 表示不会自动消失。" :code="durationCode">
      <DurationDemo />
    </DemoBlock>

    <DemoBlock title="带操作按钮" description="action 配置操作按钮，点击后自动关闭通知。" :code="actionsCode">
      <ActionsDemo />
    </DemoBlock>

    <DemoBlock title="批量控制" description="队列最多显示5条，可批量清除所有通知。" :code="batchControlCode">
      <BatchControlDemo />
    </DemoBlock>

    <DemoBlock title="KNotice 全局用法" description="通过全局 KNotice，在任何组件中调用通知。" :code="globalUsageCode">
      <GlobalUsageDemo />
    </DemoBlock>

    <Notice />

    <section class="notice-demo__api">
      <h2>API</h2>
      <APITable :emits="apiEvents" />
    </section>
  </section>
</template>

<style scoped>
.notice-demo {
  padding: 24px;
}

.notice-demo__api {
  margin-top: 32px;
}

h1 {
  margin-bottom: 8px;
}

.notice-demo > p {
  margin: 0 0 24px;
  color: var(--k-color-text-secondary);
}

/* 让 DemoBlock 内的按钮横向排列 */
:deep(.demo-block__body) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
