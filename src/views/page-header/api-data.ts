import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export const apiProps: ApiPropRow[] = [
  { name: 'icon', type: 'string', default: "'direction-left'", required: false, desc: '返回图标（iconfont 名称，不带 icon- 前缀），传空字符串隐藏图标。' },
  { name: 'title', type: 'string', default: "'返回'", required: false, desc: '左侧主标题文案。' },
  { name: 'content', type: 'string', default: "''", required: false, desc: '页头主内容文案，复杂内容建议用 #content 插槽。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'back', desc: '点击左侧区域（返回图标 / 标题）时触发。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'breadcrumb', desc: '面包屑导航内容，置于页头最上方。' },
  { name: 'icon', desc: '自定义返回图标。' },
  { name: 'title', desc: '自定义左侧标题内容。' },
  { name: 'content', desc: '自定义页头主内容。' },
  { name: 'extra', desc: '右侧扩展操作区，通常放按钮。' },
  { name: 'default', desc: '页头下方正文内容。' },
]
