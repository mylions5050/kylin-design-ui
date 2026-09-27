import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KScrollBar Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'height',
    type: 'number | string',
    default: '—',
    required: false,
    desc: '容器固定高度，数字默认 px，超出时显示垂直滚动条。',
  },
  {
    name: 'maxHeight',
    type: 'number | string',
    default: '—',
    required: false,
    desc: '最大高度，内容少时自适应、内容多时出现滚动条。',
  },
  {
    name: 'minHeight',
    type: 'number | string',
    default: '—',
    required: false,
    desc: '容器最小高度。',
  },
  {
    name: 'hideDelay',
    type: 'number',
    default: '400',
    required: false,
    desc: '鼠标离开后滚动条隐藏的延迟时间（ms）。',
  },
  {
    name: 'thumbColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义滚动条滑块颜色，设置后优先于 type 对应的主题色。',
  },
  {
    name: 'type',
    type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
    default: "'default'",
    required: false,
    desc: '滚动条主题色类型，快速切换滑块配色。',
  },
]

/** KScrollBar Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'scroll',
    desc: '滚动时触发，参数为 { scrollTop, scrollLeft, scrollHeight, clientHeight, scrollWidth, clientWidth }。',
  },
]

/** KScrollBar Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '滚动区内容。',
  },
]
