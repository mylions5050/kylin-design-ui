import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KCascader Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'options',
    type: 'CascaderOption[]',
    default: '—',
    required: true,
    desc: '级联数据源，嵌套结构；默认字段为 label / value / disabled / children，可用 fieldNames 定制。',
  },
  {
    name: 'modelValue',
    type: 'string | number | (string | number)[]',
    default: "''",
    required: false,
    desc: '当前选中值，支持 v-model；单选为叶子节点（或 changeOnSelect 下任意级）的 value，多选为 value 数组。',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否多选：面板内以 KCheckbox 勾选（父级联动子树、支持半选），点击父级展开下一级、点击 checkbox 勾选子树；触发器以 KTag 回显路径。',
  },
  {
    name: 'changeOnSelect',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '单选模式下是否可选任意一级；点击父级即完成选择，面板保持展开继续展示下一级，选项前置 KRadio。',
  },
  {
    name: 'fieldNames',
    type: '{ label?, value?, children? }',
    default: '—',
    required: false,
    desc: '自定义 options 的字段名。',
  },
  {
    name: 'displayRender',
    type: '(labels: string[]) => string',
    default: '—',
    required: false,
    desc: '单选回显格式化：入参为各级 label 数组，返回展示文本（默认以 " / " 连接）。',
  },
  {
    name: 'size',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
    required: false,
    desc: '尺寸，作用于触发器输入框 / 多选 tag 容器。',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'请选择'",
    required: false,
    desc: '占位文本。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用整个选择器。',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否可清空，悬浮触发器时出现清除图标。',
  },
  {
    name: 'filterable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否可搜索：触发器可输入关键字，面板平铺展示匹配叶子的完整路径（不区分大小写）。',
  },
  {
    name: 'prefixIcon',
    type: 'string',
    default: '—',
    required: false,
    desc: '触发器前缀图标（KIcon name）。',
  },
  {
    name: 'suffixIcon',
    type: 'string',
    default: "'arrow-down'",
    required: false,
    desc: '触发器后缀展开箭头图标（KIcon name），如 arrow-down-filling / arrow-up-filling。',
  },
  {
    name: 'expandTrigger',
    type: "'click' | 'hover'",
    default: "'click'",
    required: false,
    desc: '下一级展开的触发方式；叶子节点始终点击选择。',
  },
  {
    name: 'maxTagCount',
    type: 'number',
    default: '—',
    required: false,
    desc: '多选时触发器最多展示的 tag 数，超出折叠为 +N。',
  },
  {
    name: 'maxHeight',
    type: 'string | number',
    default: "'240px'",
    required: false,
    desc: '下拉面板每列的最大高度（KScroll），超出滚动。',
  },
]

/** KCascader Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: 'v-model：选中值变化时触发，单选载荷为标量、多选为标量数组。',
  },
  {
    name: 'change',
    desc: '选中值变化时触发，载荷同 update:modelValue。',
  },
  {
    name: 'select',
    desc: '单选选中节点时触发，载荷为完整路径选项数组（根 → 选中节点）。',
  },
  {
    name: 'check',
    desc: '多选勾选变化时触发，载荷为（根 → 叶）路径选项数组的数组。',
  },
  {
    name: 'visibleChange',
    desc: '下拉面板展开 / 收起时触发（visible: boolean）。',
  },
  {
    name: 'clear',
    desc: '点击清空图标时触发。',
  },
]

/** KCascader Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = []
