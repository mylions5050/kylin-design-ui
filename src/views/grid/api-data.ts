import type { ApiPropRow, ApiSlotRow } from '@/components/api-table/types'

/** KRow / KCol Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'gutter',
    type: 'number',
    default: '0',
    required: false,
    desc: '（KRow）列间距（px），行取负 margin、列加 padding 实现。',
  },
  {
    name: 'rowGutter',
    type: 'number',
    default: '0',
    required: false,
    desc: '（KRow）行间距（px），通过 rowGap 实现。',
  },
  {
    name: 'justify',
    type: "'start' | 'end' | 'center' | 'space-around' | 'space-between'",
    default: "'start'",
    required: false,
    desc: '（KRow）水平排列方式，映射 flex justify-content。',
  },
  {
    name: 'align',
    type: "'top' | 'middle' | 'bottom'",
    default: "'top'",
    required: false,
    desc: '（KRow）垂直对齐方式。',
  },
  {
    name: 'span',
    type: 'number | string',
    default: '—',
    required: false,
    desc: '（KCol）栅格占据的列数，共 24 等分。',
  },
  {
    name: 'offset',
    type: 'number | string',
    default: '0',
    required: false,
    desc: '（KCol）栅格左侧的间隔列数。',
  },
  {
    name: 'push / pull',
    type: 'number | string',
    default: '0',
    required: false,
    desc: '（KCol）通过 position 对栅格进行右移 / 左移的列数。',
  },
  {
    name: 'xs / sm / md / lg / xl',
    type: 'number | { span?, offset? }',
    default: '—',
    required: false,
    desc: '（KCol）五个响应式断点的列配置，如 :md="8" 或 :md="{ span: 8, offset: 4 }"。',
  },
]

/** KRow / KCol Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: 'KRow 放置 KCol；KCol 放置内容，gutter 由父级 KRow 自动注入。',
  },
]
