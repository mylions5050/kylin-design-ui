import type { ApiPropRow, ApiSlotRow } from '@/components/api-table/types'

/** InfoPopover Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'title',
    type: 'string',
    default: '—',
    required: false,
    desc: '信息卡片标题，不传则只显示描述内容。',
  },
  {
    name: 'description',
    type: 'string',
    default: '—',
    required: true,
    desc: '信息卡片的描述文本。',
  },
  {
    name: 'placement',
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    required: false,
    desc: '卡片对齐方式：left 与触发元素左对齐 / center 居中（默认）/ right 与触发元素右对齐。',
  },
  {
    name: 'trigger',
    type: "'hover' | 'click'",
    default: "'hover'",
    required: false,
    desc: '触发方式：hover 悬停显示（默认）/ click 点击显示，点击外部关闭。',
  },
]

/** InfoPopover Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '触发元素，即悬停或点击后弹出信息卡片的内容。',
  },
]
