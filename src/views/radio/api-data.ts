import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KRadio / KRadioGroup Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'string | number | boolean',
    default: '—',
    required: false,
    desc: '选中值，支持 v-model（KRadio 与 KRadioGroup 均支持）。',
  },
  {
    name: 'value',
    type: 'string | number | boolean',
    default: '—',
    required: false,
    desc: 'KRadio 单选项的取值。',
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    required: false,
    desc: 'KRadio 文案；不传时可使用 default 插槽自定义。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用；KRadioGroup 设置后统一禁用所有子 Radio，子级 own 设置优先。',
  },
  {
    name: 'size',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
    required: false,
    desc: '尺寸；KRadioGroup 设置后统一应用到所有子 Radio，子级 own 设置优先。',
  },
]

/** KRadio / KRadioGroup Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: '选中值变化（v-model），参数为选中项的 value。',
  },
  {
    name: 'change',
    desc: '切换选中项时触发，参数为选中项的 value。',
  },
]

/** KRadio Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '自定义单选项文案，优先级高于 label 属性。',
  },
]
