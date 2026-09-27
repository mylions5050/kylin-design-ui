import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KAlert Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'type',
    type: 'AlertType',
    default: "'primary'",
    required: false,
    desc: '类型，决定图标与配色，可选 primary / info / success / warning / error。',
  },
  {
    name: 'size',
    type: 'AlertSize',
    default: "'medium'",
    required: false,
    desc: '尺寸，可选 mini / small / medium / large。',
  },
  {
    name: 'effect',
    type: 'AlertEffect',
    default: "'light'",
    required: false,
    desc: '风格，可选 light（白底+阴影）/ plain（浅底+深字）/ dark（实色+白字）/ custom（无类型背景）。',
  },
  {
    name: 'border',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示边框。',
  },
  {
    name: 'center',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '内容是否水平居中。',
  },
  {
    name: 'showArrow',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否在右侧显示向右箭头，常用于可跳转的提示。',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示关闭按钮（X），点击后触发 close 事件。',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义图标（iconfont 名称），不传则按 type 使用默认图标。',
  },
  {
    name: 'customClass',
    type: 'string',
    default: '—',
    required: false,
    desc: '附加到根元素的自定义类名，便于外部覆盖样式。',
  },
]

/** KAlert Emits 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'close',
    desc: '点击关闭按钮（closable 时显示）时触发。',
  },
]

/** KAlert Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '提示内容，可自行组合标题（alert__title）与描述（alert__description）两行式结构。',
  },
  {
    name: 'action',
    desc: '自定义操作区域，显示在内容右侧，常用于放链接或按钮。',
  },
]
