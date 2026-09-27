<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import { apiProps } from './api-data'
</script>

<template>
  <section class="supper-table-demo">
    <h1>SupperTable 组件用例</h1>
    <p>超级表格组件，集成分页、筛选与列配置等增强能力。</p>

    <DemoBlock
      title="超级表格"
      description="内置分页、筛选、列配置、右键菜单、树形子行、框选填充、撤销重做等增强能力，直接渲染开箱即用。"
      :code="basicCode"
    >
      <BasicDemo />
    </DemoBlock>

    <section class="supper-table-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" />
    </section>
  </section>
</template>

<style scoped>
.supper-table-demo {
  padding: 24px;
}

.supper-table-demo :deep(.demo-block__body) {
  width: 100%;
}

.supper-table-demo__api {
  margin-top: 32px;
}
</style>
