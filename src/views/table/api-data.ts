import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** BaseTable Props 表格数据（挑选常用核心属性） */
export const apiProps: ApiPropRow[] = [
  {
    name: 'columns',
    type: 'BaseTableColumn[]',
    default: '—',
    required: true,
    desc: '列配置，含 field / title / width / fixed / sortable / formatter / cellStyle / children（多级表头）等。',
  },
  {
    name: 'data',
    type: 'any[]',
    default: '—',
    required: true,
    desc: '表格数据源。',
  },
  {
    name: 'rowKey',
    type: 'string | (row) => string | number',
    default: "'id'",
    required: false,
    desc: '行 key 字段名或取值函数，用于选中 / 展开状态追踪。',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '加载中状态，行内容显示骨架条动画。',
  },
  {
    name: 'zebra',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示斑马纹（偶数行交替底色）。',
  },
  {
    name: 'border',
    type: 'boolean',
    default: 'undefined',
    required: false,
    desc: '是否显示所有单元格四边边框。',
  },
  {
    name: 'height / maxHeight / minHeight',
    type: 'number',
    default: '—',
    required: false,
    desc: '容器固定 / 最大 / 最小高度（px），超出滚动时表头固定。',
  },
  {
    name: 'pagination',
    type: 'BaseTablePagination | false',
    default: 'false',
    required: false,
    desc: '分页配置 { pageSize, current? }；total 未传时自动前端切片分页。',
  },
  {
    name: 'total',
    type: 'number',
    default: '—',
    required: false,
    desc: '数据总条数，设置后为服务端分页模式（不自动切片）。',
  },
  {
    name: 'summary',
    type: 'BaseTableSummary',
    default: '—',
    required: false,
    desc: '表尾合计行，key 为列 field，value 为展示文本（外部预算好）。',
  },
  {
    name: 'selectable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '单选模式，点击行更新 selectedKey。',
  },
  {
    name: 'selectedKey',
    type: 'string | number',
    default: '—',
    required: false,
    desc: '单选模式选中的行 key，支持 v-model:selectedKey。',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '多选模式，自动生成首列勾选框与表头全选（含半选态）。',
  },
  {
    name: 'selectedKeys',
    type: '(string | number)[]',
    default: '—',
    required: false,
    desc: '多选模式选中的行 key 集合，支持 v-model:selectedKeys。',
  },
  {
    name: 'expandable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '开启展开行功能，配合 expandedKeys 与 #expand 插槽使用。',
  },
  {
    name: 'expandedKeys',
    type: '(string | number)[]',
    default: '—',
    required: false,
    desc: '展开行的 key 集合，支持 v-model:expandedKeys。',
  },
  {
    name: 'defaultSort',
    type: 'SortItem | SortItem[]',
    default: '[]',
    required: false,
    desc: '默认排序（可多列），如 { field, order }。',
  },
  {
    name: 'manualSort',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '只发 sortChange 事件、不在组件内部排序（服务端排序）。',
  },
  {
    name: 'resizable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '开启拖动表头右缘调整列宽（内存态）。',
  },
  {
    name: 'showOverflowTooltip',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '单元格内容溢出时 hover 显示完整 tooltip。',
  },
  {
    name: 'emptyText',
    type: 'string',
    default: "'-'",
    required: false,
    desc: '空单元格兜底文案，可被列级 emptyText 覆盖。',
  },
  {
    name: 'rowClassName',
    type: 'string | (row, index) => string',
    default: '—',
    required: false,
    desc: '自定义行 class，可做行级高亮等样式。',
  },
  {
    name: 'spanMethod',
    type: '(params) => [number, number] | undefined',
    default: '—',
    required: false,
    desc: '合并行 / 列，返回 [rowspan, colspan]，被覆盖单元格跳过。',
  },
  {
    name: 'rowClickable',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '点击行是否触发 rowClick 事件（hover 高亮样式随之开关）。',
  },
]

/** BaseTable Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'rowClick',
    desc: '点击行时触发，参数：(row, index)。',
  },
  {
    name: 'sortChange',
    desc: '排序变化时触发，参数：{ sorts: SortItem[] }。',
  },
  {
    name: 'pageChange',
    desc: '翻页时触发，参数：{ page, pageSize }。',
  },
  {
    name: 'update:selectedKey',
    desc: '单选选中行变化时触发（v-model:selectedKey）。',
  },
  {
    name: 'update:selectedKeys',
    desc: '多选选中集合变化时触发（v-model:selectedKeys）。',
  },
  {
    name: 'select',
    desc: '勾选单行时触发，参数：{ row, selected, selectedKeys }。',
  },
  {
    name: 'selectAll',
    desc: '点击表头全选时触发，参数：{ selected, selectedKeys, allSelected }。',
  },
  {
    name: 'update:expandedKeys',
    desc: '展开行集合变化时触发（v-model:expandedKeys）。',
  },
  {
    name: 'clearSearch',
    desc: '空态为「无搜索结果」时点击 Clear Search 按钮触发。',
  },
  {
    name: 'resetFilters',
    desc: '空态为「暂无数据」时点击 Reset Filters 按钮触发。',
  },
]

/** BaseTable Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'cell-<field>',
    desc: '自定义单元格渲染，作用域：{ row, value, index }。',
  },
  {
    name: 'header-<field>',
    desc: '自定义表头渲染，作用域：{ col, index }。',
  },
  {
    name: 'expand',
    desc: '展开行内容，作用域：{ row, index }，单元格跨整行（colspan）。',
  },
  {
    name: 'empty',
    desc: '自定义空态内容（emptyEntityLabel 未设置时生效）。',
  },
]
