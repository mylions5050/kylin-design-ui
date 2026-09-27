import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'items', type: 'KDescriptionsItem[]', default: '[]', required: false, desc: '数据驱动的描述项列表，元素为 { key, label, children, span }。' },
  { name: 'title', type: 'string', default: 'undefined', required: false, desc: '描述列表的标题（也可用 #title 插槽自定义）。' },
  { name: 'extra', type: 'string', default: 'undefined', required: false, desc: '标题右侧的额外内容（也可用 #extra 插槽自定义），通常放操作按钮。' },
  { name: 'bordered', type: 'boolean', default: 'false', required: false, desc: '是否显示边框：标签列浅色背景加粗 + 单元格边框（Element Plus 同款 8px 11px 内边距）。' },
  { name: 'column', type: 'number', default: '3', required: false, desc: '一行放几组「标签 + 内容」；最后一行不满时末位自动补满。' },
  { name: 'size', type: "'default' | 'middle' | 'small'", default: "'default'", required: false, desc: '尺寸，主要影响单元格内边距。' },
  { name: 'layout', type: "'horizontal' | 'vertical'", default: "'horizontal'", required: false, desc: '布局：horizontal 标签与内容同行 / vertical 标签在内容上方。' },
  { name: 'colon', type: 'boolean', default: 'true', required: false, desc: '是否在标签后显示冒号。' },
]

export const apiEmits: ApiEventRow[] = []

export const apiSlots: ApiSlotRow[] = [
  { name: 'title', desc: '自定义标题内容。' },
  { name: 'extra', desc: '自定义标题右侧的额外内容。' },
  { name: 'default', desc: '作用域插槽：items 未提供 children 时的内容兜底，参数 { item }。' },
]
