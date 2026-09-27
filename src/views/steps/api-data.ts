import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

/** KSteps 组件 Props */
export const apiProps: ApiPropRow[] = [
  {
    name: 'items',
    type: 'KStepItem[]',
    default: '[]',
    required: false,
    desc: '步骤数据源，{ title, description?, subTitle?, icon?, fill?, status?, disabled?, tooltip? }[]。\nfill 为 true 时圆点填充背景色，图标/文字白色。\ntooltip 支持字符串或 { content, theme? } 对象，theme 可选 light/dark。',
  },
  {
    name: 'current',
    type: 'Number',
    default: 'undefined',
    required: false,
    desc: '当前步骤索引（0 起），支持 v-model:current 双向绑定；缺省使用 defaultCurrent。',
  },
  {
    name: 'defaultCurrent',
    type: 'Number',
    default: '0',
    required: false,
    desc: '非受控模式下初始步骤索引。',
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    desc: '布局方向：horizontal（横向）| vertical（纵向）。',
  },
  {
    name: 'status',
    type: "'process' | 'finish' | 'success' | 'error' | 'warning'",
    default: "'process'",
    required: false,
    desc: '全局步骤状态。process（默认）只影响当前步骤；设为 finish/success/error/warning 时覆盖所有步骤。',
  },
  {
    name: 'size',
    type: "'default' | 'small' | 'mini'",
    default: "'default'",
    required: false,
    desc: '尺寸大小，small 缩小圆点并隐藏 description；mini 进一步缩小圆点（20px）并精简间距。',
  },
  {
    name: 'clickable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否支持点击步骤切换，配合 v-model:current 使用。',
  },
  {
    name: 'type',
    type: "'default' | 'inline'",
    default: "'default'",
    required: false,
    desc: '类型：default 上下结构（圆点在上、文本在下）| inline 左右结构（圆点居左、文本在右侧）。',
  },
  {
    name: 'iconSize',
    type: 'Number',
    default: '20',
    required: false,
    desc: '步骤图标尺寸（px），用于 items[].icon 图标模式。',
  },
  {
    name: 'minHeight',
    type: 'Number',
    default: '120',
    required: false,
    desc: '纵向布局时每个步骤的最小高度（px），仅 direction="vertical" 时生效。',
  },
]

/** KSteps 组件 Emits */
export const apiEmits: ApiEventRow[] = [
  {
    name: 'update:current',
    desc: 'v-model:current 双向绑定，点击可点击步骤时更新当前索引。',
  },
  {
    name: 'step-click',
    desc: '点击可点击步骤时触发，载荷为 { index, item }。',
  },
  {
    name: 'current-change',
    desc: '当前步骤改变后触发，载荷为 { index, item }。',
  },
]

/** KSteps 组件 Slots */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'icon',
    desc: '自定义每个步骤的图标，作用域 { index, item, status, active }。',
  },
]