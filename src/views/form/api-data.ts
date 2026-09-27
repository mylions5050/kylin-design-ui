import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KForm Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'model',
    type: 'Record<string, any>',
    default: '—',
    required: true,
    desc: '表单数据对象，字段与 KFormItem 的 prop 一一对应（控件直接 v-model 绑定字段）。',
  },
  {
    name: 'rules',
    type: 'FormRules',
    default: '{}',
    required: false,
    desc: '校验规则集合（async-validator，兼容 antd / Element Plus 写法），key 为字段 prop（支持点路径）。',
  },
  {
    name: 'labelPosition',
    type: "'left' | 'right' | 'top'",
    default: "'right'",
    required: false,
    desc: '标签位置：left / right（水平定宽）/ top（标签在上）。',
  },
  {
    name: 'labelWidth',
    type: 'string | number',
    default: "''",
    required: false,
    desc: '标签宽度（水平布局生效），数字按 px。',
  },
  {
    name: 'inline',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '行内布局，表单项横向排列（适合搜索栏）。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '整表禁用状态（provide 下发）。',
  },
  {
    name: 'hideRequiredAsterisk',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否隐藏必填星号。',
  },
  {
    name: 'showMessage',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示校验错误信息。',
  },
  {
    name: 'validateOnRuleChange',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: 'rules 变化时是否立即触发整表校验。',
  },
]

/** KForm Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  { name: 'validate', desc: '任一字段校验完成：(prop, isValid, message)。' },
]

/** KForm Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '表单项（KFormItem）内容。' },
]

/** KFormItem Props 表格数据 */
export const apiItemProps: ApiPropRow[] = [
  {
    name: 'prop',
    type: 'string',
    default: "''",
    required: false,
    desc: '对应 model 的字段路径（支持点路径）；不传则只做布局不校验。',
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    required: false,
    desc: '标签文本。',
  },
  {
    name: 'labelWidth',
    type: 'string | number',
    default: "''",
    required: false,
    desc: '覆盖 Form 的 labelWidth。',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '必填；无 rules 时也显示星号并校验非空。',
  },
  {
    name: 'rules',
    type: 'FormItemRule | FormItemRule[]',
    default: '—',
    required: false,
    desc: '本项校验规则，与 Form 级 rules[prop] 合并，本项优先。',
  },
  {
    name: 'error',
    type: 'string',
    default: "''",
    required: false,
    desc: '手动指定错误信息（覆盖自动校验结果）。',
  },
  {
    name: 'showMessage',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示本校验错误信息。',
  },
]

/** KFormItem Slots 表格数据 */
export const apiItemSlots: ApiSlotRow[] = [
  { name: 'default', desc: '表单控件（KInput / KSelect / KDatePicker 等，直接 v-model 绑定 model 字段）。' },
  { name: 'label', desc: '自定义标签内容。' },
  { name: 'error', desc: '自定义错误信息展示。' },
]
