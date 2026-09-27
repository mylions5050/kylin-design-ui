import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KMenu Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'items',
    type: 'MenuItem[]',
    default: '—',
    required: true,
    desc: '菜单数据源，结构为 { id, label, value?, icon?, disabled?, suffix?, path?, children? }。',
  },
  {
    name: 'modelValue',
    type: 'string',
    default: "''",
    required: false,
    desc: '当前选中项（value 或 id），支持 v-model。',
  },
  {
    name: 'router',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '路由模式：叶子项按 path 渲染为 router-link，选中值与路由路径匹配（支持前缀匹配）。',
  },
  {
    name: 'accordion',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '手风琴模式：同一级子菜单同时只能展开一个。',
  },
  {
    name: 'defaultOpenKeys',
    type: 'string[]',
    default: '[]',
    required: false,
    desc: '默认展开的子菜单 id 列表。',
  },
  {
    name: 'itemStyle',
    type: 'Record<string, string>',
    default: '—',
    required: false,
    desc: '菜单项内联样式覆盖（如 paddingLeft）。',
  },
  {
    name: 'iconColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '菜单项图标颜色。',
  },
  {
    name: 'activeBg',
    type: 'string',
    default: '—',
    required: false,
    desc: '选中项背景色。',
  },
  {
    name: 'activeColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '选中项文字颜色。',
  },
  {
    name: 'barColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '选中项左侧装饰条颜色。',
  },
  {
    name: 'customClass',
    type: 'string',
    default: '—',
    required: false,
    desc: '附加到根元素的自定义类名。',
  },
]

/** KMenu Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: '选中项变化（v-model），参数为 item.value ?? item.id。',
  },
  {
    name: 'select',
    desc: '点击叶子菜单项时触发，参数为完整的 item 对象（MenuItem）。',
  },
]

/** KMenu Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '菜单尾部附加内容，渲染在所有菜单项之后。',
  },
]
