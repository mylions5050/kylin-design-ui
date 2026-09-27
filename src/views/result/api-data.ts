import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'icon', type: "'success' | 'warning' | 'info' | 'error'", default: "'info'", required: false, desc: '结果状态图标类型，图标颜色随状态语义色；用 icon 插槽可完全自定义。' },
  { name: 'title', type: 'string', default: '-', required: false, desc: '主标题文字。' },
  { name: 'subTitle', type: 'string', default: '-', required: false, desc: '副标题文字（灰色说明文字）。' },
]

export const apiEmits: ApiEventRow[] = []

export const apiSlots: ApiSlotRow[] = [
  { name: 'icon', desc: '自定义图标区域，替换默认的语义状态图标。' },
  { name: 'title', desc: '自定义主标题内容。' },
  { name: 'sub-title', desc: '自定义副标题内容。' },
  { name: 'extra', desc: '操作区，通常放主/次按钮组。' },
]
