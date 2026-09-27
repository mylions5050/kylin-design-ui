import type { ApiPropRow, ApiSlotRow } from '@/components/api-table/types'

/** KContainer / KHeader / KAside / KMain / KFooter Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: '自动检测',
    required: false,
    desc: '布局方向；不传时根据子组件自动判断：含 KHeader / KFooter 为纵向，含 KAside 为横向。',
  },
  {
    name: 'height',
    type: 'string',
    default: "'60px'",
    required: false,
    desc: 'KHeader 的高度。',
  },
  {
    name: 'width',
    type: 'string',
    default: "'220px'",
    required: false,
    desc: 'KAside 的宽度。',
  },
  {
    name: 'height',
    type: 'string',
    default: "'50px'",
    required: false,
    desc: 'KFooter 的高度；KMain 无 Props，自动撑满剩余空间。',
  },
]

/** KContainer Slots 表格数据（KHeader / KAside / KMain / KFooter 均为 default） */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: 'KContainer 的子内容；放置 KHeader / KAside / KMain / KFooter，可嵌套 KContainer 组合复杂布局。',
  },
  {
    name: 'default',
    desc: 'KHeader / KAside / KMain / KFooter 的内容区域。',
  },
]
