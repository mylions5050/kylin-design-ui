import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KBadge Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'count',
    type: 'number',
    default: '0',
    required: false,
    desc: '展示的数字；大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏。',
  },
  {
    name: 'overflowCount',
    type: 'number',
    default: '99',
    required: false,
    desc: '封顶数字，超过显示为 `${overflowCount}+`。',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '不展示数字，只有一个小红点。',
  },
  {
    name: 'showZero',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '数值为 0 时是否展示徽标。',
  },
  {
    name: 'status',
    type: "'success' | 'processing' | 'default' | 'error' | 'warning'",
    default: '-',
    required: false,
    desc: '设置为状态点（processing 带扩散光环动画）。',
  },
  {
    name: 'color',
    type: 'string',
    default: '-',
    required: false,
    desc: '自定义小圆点 / 徽标颜色。',
  },
  {
    name: 'text',
    type: 'string',
    default: '-',
    required: false,
    desc: '状态点右侧的说明文字（status / color 模式下生效）。',
  },
  {
    name: 'offset',
    type: '[number, number]',
    default: '-',
    required: false,
    desc: '位置偏移 [x, y]：相对默认位置向右 / 向上偏移的像素。',
  },
  {
    name: 'size',
    type: "'default' | 'small'",
    default: "'default'",
    required: false,
    desc: '数字徽标的大小，小号适用于数字较短的场景。',
  },
  {
    name: 'title',
    type: 'string',
    default: '-',
    required: false,
    desc: '鼠标悬停在徽标上时显示的原生 title。',
  },
]

/** KBadge Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    params: '-',
    desc: '包裹的子元素，徽标附着在其右上角。',
  },
  {
    name: 'count',
    params: '-',
    desc: '自定义徽标内容（完全替换数字，如换成图标）。',
  },
]

/** KBadge Events 表格数据 */
export const apiEvents: ApiEventRow[] = []
