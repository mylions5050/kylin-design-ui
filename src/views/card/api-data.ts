import type { ApiPropRow, ApiSlotRow } from '@/components/api-table/types'

/** KCard Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'header',
    type: 'string',
    default: '—',
    required: false,
    desc: '卡片标题（也可以通过 #header slot 自定义）。',
  },
  {
    name: 'footer',
    type: 'string',
    default: '—',
    required: false,
    desc: '卡片页脚（也可以通过 #footer slot 自定义）。',
  },
  {
    name: 'bodyStyle',
    type: 'Record<string, string>',
    default: '—',
    required: false,
    desc: 'body 区域的自定义 CSS 样式。',
  },
  {
    name: 'headerClass',
    type: 'string',
    default: '—',
    required: false,
    desc: 'header 区域自定义类名。',
  },
  {
    name: 'bodyClass',
    type: 'string',
    default: '—',
    required: false,
    desc: 'body 区域自定义类名。',
  },
  {
    name: 'footerClass',
    type: 'string',
    default: '—',
    required: false,
    desc: 'footer 区域自定义类名。',
  },
  {
    name: 'shadow',
    type: 'CardShadow',
    default: "'always'",
    required: false,
    desc: '阴影显示时机，可选 always（始终显示）/ hover（悬停时显示）/ never（从不显示）。',
  },
  {
    name: 'size',
    type: 'CardSize',
    default: "'default'",
    required: false,
    desc: '尺寸，可选 small / default / large，主要影响内边距。',
  },
  {
    name: 'border',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示边框。',
  },
  {
    name: 'customClass',
    type: 'string',
    default: '—',
    required: false,
    desc: '附加到根元素的自定义类名。',
  },
]

/** KCard Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '卡片主体内容。',
  },
  {
    name: 'header',
    desc: '自定义标题区域，传入后覆盖 header prop。',
  },
  {
    name: 'footer',
    desc: '自定义页脚区域，传入后覆盖 footer prop。',
  },
]
