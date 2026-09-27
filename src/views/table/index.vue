<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import BasicTable from './demos/BasicTable.vue'
import basicTableCode from './demos/BasicTable.vue?raw'
import ZebraTable from './demos/ZebraTable.vue'
import zebraTableCode from './demos/ZebraTable.vue?raw'
import BorderedTable from './demos/BorderedTable.vue'
import borderedTableCode from './demos/BorderedTable.vue?raw'
import DarkThemeTable from './demos/DarkThemeTable.vue'
import darkThemeTableCode from './demos/DarkThemeTable.vue?raw'
import OverflowTooltipTable from './demos/OverflowTooltipTable.vue'
import overflowTooltipTableCode from './demos/OverflowTooltipTable.vue?raw'
import FixedHeaderTable from './demos/FixedHeaderTable.vue'
import fixedHeaderTableCode from './demos/FixedHeaderTable.vue?raw'
import FixedColumnTable from './demos/FixedColumnTable.vue'
import fixedColumnTableCode from './demos/FixedColumnTable.vue?raw'
import FixedBothTable from './demos/FixedBothTable.vue'
import fixedBothTableCode from './demos/FixedBothTable.vue?raw'
import FluidHeightTable from './demos/FluidHeightTable.vue'
import fluidHeightTableCode from './demos/FluidHeightTable.vue?raw'
import GroupHeaderTable from './demos/GroupHeaderTable.vue'
import groupHeaderTableCode from './demos/GroupHeaderTable.vue?raw'
import CustomHeaderTable from './demos/CustomHeaderTable.vue'
import customHeaderTableCode from './demos/CustomHeaderTable.vue?raw'
import ResizableTable from './demos/ResizableTable.vue'
import resizableTableCode from './demos/ResizableTable.vue?raw'
import CustomIndexTable from './demos/CustomIndexTable.vue'
import customIndexTableCode from './demos/CustomIndexTable.vue?raw'
import SummaryTable from './demos/SummaryTable.vue'
import summaryTableCode from './demos/SummaryTable.vue?raw'
import SpanTable from './demos/SpanTable.vue'
import spanTableCode from './demos/SpanTable.vue?raw'
import SelectableTable from './demos/SelectableTable.vue'
import selectableTableCode from './demos/SelectableTable.vue?raw'
import MultiSelectTable from './demos/MultiSelectTable.vue'
import multiSelectTableCode from './demos/MultiSelectTable.vue?raw'
import SelectionTable from './demos/SelectionTable.vue'
import selectionTableCode from './demos/SelectionTable.vue?raw'
import SortTable from './demos/SortTable.vue'
import sortTableCode from './demos/SortTable.vue?raw'
import PaginationTable from './demos/PaginationTable.vue'
import paginationTableCode from './demos/PaginationTable.vue?raw'
import StatusTable from './demos/StatusTable.vue'
import statusTableCode from './demos/StatusTable.vue?raw'
import CustomStyleTable from './demos/CustomStyleTable.vue'
import customStyleTableCode from './demos/CustomStyleTable.vue?raw'
import CellStyleByData from './demos/CellStyleByData.vue'
import cellStyleByDataCode from './demos/CellStyleByData.vue?raw'
import CustomColumnTable from './demos/CustomColumnTable.vue'
import customColumnTableCode from './demos/CustomColumnTable.vue?raw'
import LoadingTable from './demos/LoadingTable.vue'
import loadingTableCode from './demos/LoadingTable.vue?raw'
import EmptyTable from './demos/EmptyTable.vue'
import emptyTableCode from './demos/EmptyTable.vue?raw'
import EditableCellTable from './demos/EditableCellTable.vue'
import editableCellTableCode from './demos/EditableCellTable.vue?raw'
import ExpandableTable from './demos/ExpandableTable.vue'
import expandableTableCode from './demos/ExpandableTable.vue?raw'
import TreeTableDemo from './demos/TreeTableDemo.vue'
import treeTableDemoCode from './demos/TreeTableDemo.vue?raw'
import VirtualScrollTable from './demos/VirtualScrollTable.vue'
import virtualScrollTableCode from './demos/VirtualScrollTable.vue?raw'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="index">
    <h1>Table 组件用例</h1>
    <p>基于 admin-school-dashboard 的 BaseTable，参考 Element 官网 Table 风格的演示。</p>

    <DemoBlock title="基础表格" description="最简用法，columns + data。" :code="basicTableCode">
      <BasicTable />
    </DemoBlock>

    <DemoBlock title="带斑马纹表格" description="zebra 属性，行交替底色。" :code="zebraTableCode">
      <ZebraTable />
    </DemoBlock>

    <DemoBlock title="带边框表格" description="border prop，所有单元格四边边框。" :code="borderedTableCode">
      <BorderedTable />
    </DemoBlock>

    <DemoBlock title="深色模式表格" description="完整的深色主题支持，展示在深色和浅色模式下的表格效果。" :code="darkThemeTableCode">
      <DarkThemeTable />
    </DemoBlock>

    <DemoBlock title="显示溢出工具提示的表格" description="show-overflow-tooltip，单元格内容溢出时 hover 显示完整 tooltip。" :code="overflowTooltipTableCode">
      <OverflowTooltipTable />
    </DemoBlock>

    <DemoBlock title="固定表头" description="height 固定容器高度，表头 sticky，内容滚动。" :code="fixedHeaderTableCode">
      <FixedHeaderTable />
    </DemoBlock>

    <DemoBlock title="固定列" description="fixed left/right，列宽超出横向滚动，首尾列固定。" :code="fixedColumnTableCode">
      <FixedColumnTable />
    </DemoBlock>

    <DemoBlock title="固定列和表头" description="fixed 首尾列 + max-height，表头和列同时固定。" :code="fixedBothTableCode">
      <FixedBothTable />
    </DemoBlock>

    <DemoBlock title="流体高度" description="max-height，内容少不撑高，多则滚动 + 表头固定。" :code="fluidHeightTableCode">
      <FluidHeightTable />
    </DemoBlock>

    <DemoBlock title="多级表头" description="children 两层表头 + 3 组列，照 admin Educator Usage。外层 div 演示只设外边框。" :code="groupHeaderTableCode">
      <GroupHeaderTable />
    </DemoBlock>

    <DemoBlock title="自定义表头" description="#header-{field} slot 替换表头内容（如图标、徽标）。" :code="customHeaderTableCode">
      <CustomHeaderTable />
    </DemoBlock>

    <DemoBlock title="拖动表头调整列宽" description="resizable 启用，拖动表头右边缘调列宽（内存态，刷新恢复）。" :code="resizableTableCode">
      <ResizableTable />
    </DemoBlock>

    <DemoBlock title="自定义索引" description="cell slot 自定义序号列（默认从 1、可设起点从 0）。" :code="customIndexTableCode">
      <CustomIndexTable />
    </DemoBlock>

    <DemoBlock title="表尾合计行" description="summary prop 传 { field: text } 显示合计行（外部预算好文本）。" :code="summaryTableCode">
      <SummaryTable />
    </DemoBlock>

    <DemoBlock
      title="合并行或列"
      description="span-method 返回 [rowspan, colspan]，被覆盖单元格跳过。role 列连续相同合并行，第 3 行 status+age 合并列。"
      :code="spanTableCode"
    >
      <SpanTable />
    </DemoBlock>

    <DemoBlock title="单选" description="selectable + v-model:selected-key，点击行触发 rowClick。" :code="selectableTableCode">
      <SelectableTable />
    </DemoBlock>

    <DemoBlock title="多选" description="multiple + v-model:selectedKeys，首列 cell slot 自建 checkbox（admin svg），表头全选支持部分态。" :code="multiSelectTableCode">
      <MultiSelectTable />
    </DemoBlock>

    <DemoBlock title="简化多选表格" description="基于 BaseTable 的 selection-column 属性，自动生成多选列，减少 60% 代码量。" :code="selectionTableCode">
      <SelectionTable />
    </DemoBlock>

    <DemoBlock title="排序" description="三态循环：默认 → 正序 → 逆序 → 默认。defaultSort 设默认正序，点列头切换，Shift 多列。" :code="sortTableCode">
      <SortTable />
    </DemoBlock>

    <DemoBlock title="分页" description="pagination + total，受控分页，监听 pageChange 切片数据。" :code="paginationTableCode">
      <PaginationTable />
    </DemoBlock>

    <DemoBlock title="自定义行样式" description="row-class-name 函数返回 class，CSS 里定义行级样式（整行变色）。" :code="statusTableCode">
      <StatusTable />
    </DemoBlock>

    <DemoBlock title="自定义列样式" description="column.cellStyle 传样式对象，随心所欲设置列样式（背景 + 文字色 + 加粗，应用到 th + td）。" :code="customStyleTableCode">
      <CustomStyleTable />
    </DemoBlock>

    <DemoBlock
      title="按数据动态单元格样式"
      description="column.cellStyle 传函数 (row) => style，基于行数据动态渲染单元格（state=success 浅蓝蓝粗，state=danger 浅红红粗）。"
      :code="cellStyleByDataCode"
    >
      <CellStyleByData />
    </DemoBlock>

    <DemoBlock title="自定义列内容" description="#cell-{field} slot 自定义单元格：状态 Tag + 操作按钮（编辑/删除）。" :code="customColumnTableCode">
      <CustomColumnTable />
    </DemoBlock>

    <DemoBlock title="加载中骨架屏" description="loading prop，骨架条 shimmer 动画（admin Analytics 同款样式）。" :code="loadingTableCode">
      <LoadingTable />
    </DemoBlock>

    <DemoBlock title="暂无数据" description="data 为空时显示空态。" :code="emptyTableCode">
      <EmptyTable />
    </DemoBlock>

    <DemoBlock title="可编辑单元格" description="#cell-{field} slot 渲染 input/select，v-model 直接改行数据。" :code="editableCellTableCode">
      <EditableCellTable />
    </DemoBlock>

    <DemoBlock title="展开行" description="expandable + v-model:expandedKeys，cell slot toggle 按钮，#expand slot 展开内容（colspan 跨整行）。" :code="expandableTableCode">
      <ExpandableTable />
    </DemoBlock>

    <DemoBlock
      title="树形数据与懒加载"
      description="另开 tree-table 组件（BaseTable 不支持树形）。flatten 树 + toggle + 层级缩进 + lazy load（分公司A 异步加载子节点）。"
      :code="treeTableDemoCode"
    >
      <TreeTableDemo />
    </DemoBlock>

    <DemoBlock title="虚拟滚动（大表格）" description="另开 virtual-table 组件。1000 行只渲染可见区（固定行高 + scrollTop 切片 + spacer 占位）。" :code="virtualScrollTableCode">
      <VirtualScrollTable />
    </DemoBlock>

    <section class="index__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.index {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  .index__api {
    margin-top: 32px;
  }

  > p {
    margin: 0 0 24px;
    color: #666;
  }
}
</style>
