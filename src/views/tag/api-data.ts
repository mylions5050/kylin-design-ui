import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KTag Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'type',
    type: "'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'",
    default: "'default'",
    required: false,
    desc: '标签类型，决定配色。',
  },
  {
    name: 'size',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
    required: false,
    desc: '标签尺寸。',
  },
  {
    name: 'sizeNum',
    type: 'number',
    default: '0',
    required: false,
    desc: '自定义字体大小（px），大于 0 时覆盖 size 对应的字号。',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否圆角显示。',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否可关闭，显示关闭图标，点击触发 close 事件。',
  },
  {
    name: 'dark',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '实心（深色底）主题。',
  },
  {
    name: 'plain',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '线框（空心）主题。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用，禁用后标签变透明，close / click 均不触发。',
  },
  {
    name: 'color',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义文字颜色。',
  },
  {
    name: 'backgroundColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义背景色。',
  },
  {
    name: 'borderColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义边框颜色。',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    required: false,
    desc: 'iconfont 图标名称，显示在内容前。',
  },
]

/** KTag Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'close',
    desc: '点击关闭图标时触发（disabled 时不触发）。',
  },
  {
    name: 'click',
    desc: '点击标签时触发（disabled 时不触发）。',
  },
]

/** KTag Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '标签主体内容。',
  },
  {
    name: 'prefix',
    desc: '主内容前缀区域，适合放图标等附加元素。',
  },
  {
    name: 'suffix',
    desc: '主内容后缀区域，适合放图标等附加元素。',
  },
]
