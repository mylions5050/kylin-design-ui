import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'modelValue', type: 'string | number | (string | number)[]', default: '-', required: false, desc: '当前激活面板的 key（v-model）：手风琴模式下为单个 key，否则为 key 数组；undefined / \'\'. 表示全部收起。' },
  { name: 'defaultValue', type: 'string | number | (string | number)[]', default: '-', required: false, desc: '非受控模式下的初始激活 key（语义同 modelValue）。' },
  { name: 'items', type: 'KCollapseItem[]', default: '[]', required: false, desc: '数据驱动的折叠面板列表，元素为 { key, label, children, extra, disabled }。' },
  { name: 'accordion', type: 'boolean', default: 'false', required: false, desc: '手风琴模式：同一时刻最多展开一个面板，展开新面板时自动收起旧面板。' },
  { name: 'expandIconPlacement', type: "'start' | 'end'", default: "'start'", required: false, desc: '切换图标位置：start 标题左侧（AntD 默认）/ end 整行最右（extra 之后）。' },
  { name: 'showExpandIcon', type: 'boolean', default: 'true', required: false, desc: '是否显示切换图标（同时控制默认箭头与 expandIcon 插槽）。' },
  { name: 'collapsible', type: "'header' | 'icon' | 'disabled'", default: "'header'", required: false, desc: '触发折叠的方式：header 点击整行（默认）/ icon 仅点击图标才折叠 / disabled 不可通过交互折叠（语义同 AntD collapsible）。' },
  { name: 'ghost', type: 'boolean', default: 'false', required: false, desc: '幽灵模式：无边框背景全透明（与 AntD ghost 一致，无任何分割线），适合嵌在有背景色的容器里。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '激活 key 变化（v-model），手风琴模式为单个 key（全部收起时为 \'\'）。' },
  { name: 'change', desc: '切换面板的回调，参数同 update:modelValue（AntD onChange 语义）。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '作用域插槽：items 未提供 children 时的面板内容兜底，参数 { item }。' },
  { name: 'expandIcon', desc: '自定义切换图标，参数 { item, active }；不传使用默认右箭头（展开旋转 90°）。' },
]
