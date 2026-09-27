<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import SearchDemo from './demos/search.vue'
import DisabledDemo from './demos/disabled.vue'
import CustomRenderDemo from './demos/custom-render.vue'
import AdvancedDemo from './demos/advanced.vue'
import ActionsDemo from './demos/actions.vue'
import PaginationDemo from './demos/pagination.vue'
import StatusDemo from './demos/status.vue'
import TreeTransferDemo from './demos/tree-transfer.vue'
import TableTransferDemo from './demos/table-transfer.vue'
import basicCode from './demos/basic.vue?raw'
import searchCode from './demos/search.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import customRenderCode from './demos/custom-render.vue?raw'
import advancedCode from './demos/advanced.vue?raw'
import actionsCode from './demos/actions.vue?raw'
import paginationCode from './demos/pagination.vue?raw'
import statusCode from './demos/status.vue?raw'
import treeTransferCode from './demos/tree-transfer.vue?raw'
import tableTransferCode from './demos/table-transfer.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="transfer-demo">
    <h1>Transfer 组件用例</h1>
    <p>
    双栏穿梭选择框；左栏为源列表、右栏为目标列表，勾选后通过中间按钮穿梭，
    展示顺序始终按 dataSource 原始顺序；支持搜索、禁用与自定义渲染。
    </p>

    <DemoBlock title="基础用法" description="勾选数据项后点击中间按钮穿梭；表头 KCheckbox 支持全选与半选，标题旁显示已勾选数。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="带搜索框" description="showSearch 开启后每栏顶部显示搜索框，默认按 label 不区分大小写匹配；全选范围是过滤后的可用项。" :code="searchCode">
      <SearchDemo />
    </DemoBlock>

    <DemoBlock title="禁用项" description="数据项 disabled 为 true 时不可勾选、不可穿梭；titles 自定义两栏标题。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="自定义渲染" description="item 插槽自定义行内容，配合 filterOption 自定义过滤（label 或描述命中即可）。" :code="customRenderCode">
      <CustomRenderDemo />
    </DemoBlock>

    <DemoBlock title="高级用法" description="actions 配置操作文案，listStyle 定制宽高，footer 插槽自定义底部渲染。" :code="advancedCode">
      <AdvancedDemo />
    </DemoBlock>

    <DemoBlock title="自定义操作按钮" description="actions 传元素数组时直接作为操作按钮渲染（组件注入 disabled / onClick）。" :code="actionsCode">
      <ActionsDemo />
    </DemoBlock>

    <DemoBlock title="分页" description="showPagination 开启分页适配大数据量，两栏各自独立翻页；搜索后自动回到第一页。" :code="paginationCode">
      <PaginationDemo />
    </DemoBlock>

    <DemoBlock title="自定义状态" description="status 为 error 或 warning 时面板边框着色。" :code="statusCode">
      <StatusDemo />
    </DemoBlock>

    <DemoBlock title="树穿梭框" description="默认作用域插槽完全接管列表体：接收 filteredItems / selectedKeys / onItemSelect，配合 KTree 组装树形穿梭框。" :code="treeTransferCode">
      <TreeTransferDemo />
    </DemoBlock>

    <DemoBlock title="表格穿梭框" description="使用 Table 组件作为自定义渲染列表：勾选列直接对账穿梭勾选（全选用 onItemSelectAll 批量一次同步），equal-width 两栏均分宽度，list-style height 100% 填满外层容器（配合固定高度的内容区），每页 10 条独立翻页，分页贴底。" :code="tableTransferCode">
      <TableTransferDemo />
    </DemoBlock>

    <section class="transfer-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.transfer-demo {
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
