import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KTransfer Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'dataSource',
    type: 'TransferItem[]',
    default: '[]',
    required: true,
    desc: '全量数据源，结构为 { key, label, disabled? }；数组顺序即两栏展示顺序。',
  },
  {
    name: 'modelValue',
    type: '(string | number)[]',
    default: '[]',
    required: false,
    desc: '目标列表（右栏）的 key 集合，支持 v-model；输出始终按 dataSource 原始顺序排列。',
  },
  {
    name: 'titles',
    type: 'string[]',
    default: "['列表 1', '列表 2']",
    required: false,
    desc: '两栏标题，[源列表, 目标列表]。',
  },
  {
    name: 'actions',
    type: '(string | VNodeChild)[]',
    default: '[]',
    required: false,
    desc: '自定义操作按钮，[右移, 左移]：字符串用默认按钮显示文字；元素（VNode）直接作为按钮渲染，组件注入 disabled / onClick，可做带 loading 的自定义按钮；不传只显示箭头。',
  },
  {
    name: 'showSearch',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否在两栏顶部显示搜索框。',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'请输入搜索内容'",
    required: false,
    desc: '搜索框占位文本。',
  },
  {
    name: 'filterOption',
    type: '(inputValue, item) => boolean',
    default: '—',
    required: false,
    desc: '自定义搜索过滤；默认按 label 不区分大小写 includes 匹配。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用整个穿梭框。',
  },
  {
    name: 'listHeight',
    type: 'number',
    default: '240',
    required: false,
    desc: '列表可滚动区域高度（px），两栏列表体固定此高度保证对齐。',
  },
  {
    name: 'equalWidth',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '两栏均分剩余宽度（各 50% 扣除中间按钮列），适合表格穿梭框等宽内容场景；listStyle.width 设置后忽略此项。',
  },
  {
    name: 'showSelectAll',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示表头全选框。',
  },
  {
    name: 'status',
    type: "'' | 'error' | 'warning'",
    default: "''",
    required: false,
    desc: '状态样式：面板边框着色（error 红 / warning 橙）。',
  },
  {
    name: 'listStyle',
    type: '{ width?, height? }',
    default: '—',
    required: false,
    desc: '面板宽高定制；设置 height 后列表体自动撑满剩余空间，height 100% 时根元素同步撑满外层容器（适合固定高度内容区）。',
  },
  {
    name: 'showPagination',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否分页（大数据量场景，复用 KPagination），两栏各自独立翻页。',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '10',
    required: false,
    desc: '每页条数（showPagination 时生效）。',
  },
  {
    name: 'classNames',
    type: 'Record<string, string>',
    default: '—',
    required: false,
    desc: '语义化结构类名，key 为 root / list / operation / item。',
  },
  {
    name: 'styles',
    type: 'Record<string, CSSProperties>',
    default: '—',
    required: false,
    desc: '语义化结构样式，key 为 root / list / operation / item。',
  },
]

/** KTransfer Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: '目标 key 集合变化（v-model）。',
  },
  {
    name: 'change',
    desc: '穿梭完成时触发，参数：(targetKeys, direction, moveKeys)，direction 为 left / right。',
  },
  {
    name: 'selectChange',
    desc: '任一栏勾选项变化时触发，参数：(sourceChecked, targetChecked)。',
  },
  {
    name: 'search',
    desc: '搜索关键字变化时触发，参数：(direction, value)。',
  },
]

/** KTransfer Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'item',
    desc: '自定义数据项渲染，作用域：{ item }（TransferItem）。',
  },
  {
    name: 'footer',
    desc: '自定义面板底部，作用域：{ direction }（left / right）。',
  },
  {
    name: 'default',
    desc: '完全接管列表体（表格 / 树穿梭框），作用域：{ direction, filteredItems, selectedKeys, onItemSelect, onItemSelectAll, disabled }。',
  },
]
