import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

/** KBreadcrumb 组件 Props */
export const apiProps: ApiPropRow[] = [
  {
    name: 'items',
    type: 'KBreadcrumbItem[]',
    default: '[]',
    required: false,
    desc:
      '面包屑数据源，数组项每个字段说明：\n' +
      '· label：文案\n' +
      '· to：vue-router 目标（string 或对象），优先于 path\n' +
      '· path：简单路由字符串\n' +
      '· href：外部链接（优先级最高）\n' +
      '· target：新窗口打开方式，如 _blank\n' +
      '· replace：该项跳转是否不留历史记录\n' +
      '· icon：前缀图标\n' +
      '· show：是否显示（默认 true，可动态隐藏）\n' +
      '· disabled：是否禁用',
  },
  {
    name: 'separator',
    type: 'String',
    default: "'/'",
    required: false,
    desc: '分隔符内容，缺省为斜杠 / ；传 iconfont 图标名并配合 iconSeparator 可渲染为图标分隔符。',
  },
  {
    name: 'iconSeparator',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: 'true 时 separator 按 iconfont 图标名渲染（经 KIcon）。',
  },
  {
    name: 'maxItems',
    type: 'Number',
    default: '0',
    required: false,
    desc: '超过该数量时折叠隐藏中间项并显示省略占位（0 = 永不折叠）。',
  },
  {
    name: 'itemsBeforeCollapse',
    type: 'Number',
    default: '1',
    required: false,
    desc: '折叠后保留的前段项数量。',
  },
  {
    name: 'itemsAfterCollapse',
    type: 'Number',
    default: '1',
    required: false,
    desc: '折叠后保留的后段项数量（至少保留当前页）。',
  },
  {
    name: 'clickable',
    type: 'Boolean',
    default: 'true',
    required: false,
    desc: '是否允许点击跳转总开关；false 时所有项均不可点击。',
  },
  {
    name: 'replace',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '路由跳转是否不留历史记录：true 用 router.replace，false 用 router.push；单个 item 的 replace 属性可覆盖该默认值。',
  },
]

/** KBreadcrumb 组件 Emits */
export const apiEmits: ApiEventRow[] = [
  { name: 'click-item', desc: '点击可点击项时触发，载荷为 { item, index, e }；配合 path/href 之外的自定义跳转使用。' },
]

/** KBreadcrumb 组件 Slots */
export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '（保留）无内置默认；主要通过 :items 数据驱动。' },
  { name: 'item', desc: '自定义每个单项；作用域 { item, index }。' },
  { name: 'separator', desc: '自定义每个分隔符；作用域 { index }。' },
  { name: 'more', desc: '自定义折叠省略占位；作用域 { from, to }（被隐藏的项索引区间，数量 = to - from）。' },
]
