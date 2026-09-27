import type { ApiPropRow, ApiEventRow } from '@/components/api-table/types'

/** KSwitch Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '开关绑定值，支持 v-model。',
  },
  {
    name: 'size',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
    required: false,
    desc: '开关尺寸。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用，禁用后不可点击。',
  },
  {
    name: 'activeColor',
    type: 'string',
    default: "'#0D9CE7'",
    required: false,
    desc: '打开时的背景色。',
  },
  {
    name: 'inactiveColor',
    type: 'string',
    default: "'#C4D2E6'",
    required: false,
    desc: '关闭时的背景色。',
  },
  {
    name: 'showLabel',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示标签文本。',
  },
  {
    name: 'activeText',
    type: 'string',
    default: "'On'",
    required: false,
    desc: '打开时的标签文本（showLabel 为 true 时显示）。',
  },
  {
    name: 'inactiveText',
    type: 'string',
    default: "'Off'",
    required: false,
    desc: '关闭时的标签文本（showLabel 为 true 时显示）。',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "''",
    required: false,
    desc: '无障碍标签，供屏幕阅读器描述开关用途。',
  },
]

/** KSwitch Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: '绑定值变化时触发（v-model）。',
  },
  {
    name: 'change',
    desc: '开关状态切换时触发，参数为切换后的 boolean 值。',
  },
]
