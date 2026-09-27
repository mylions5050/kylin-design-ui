import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KDropdown Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'menu',
    type: 'DropdownOption[]',
    default: '[]',
    required: false,
    desc: '菜单项配置，支持 key / label / icon / disabled / danger / divided；使用 #overlay 插槽时忽略。',
  },
  {
    name: 'trigger',
    type: "'hover' | 'click' | 'contextmenu'",
    default: "'hover'",
    required: false,
    desc: '触发方式；contextmenu 在触发元素上右键弹出，面板定位到鼠标位置。',
  },
  {
    name: 'placement',
    type: 'PopperPlacement（12 方向）',
    default: "'bottom'",
    required: false,
    desc: '弹出方向，空间不足时自动翻转到对侧。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用，禁用后不响应任何触发方式。',
  },
  {
    name: 'arrow',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '面板是否显示指向触发元素的小箭头。',
  },
  {
    name: 'gap',
    type: 'number',
    default: '4',
    required: false,
    desc: '面板与触发元素的距离（px）。',
  },
]

/** KDropdown Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'click',
    desc: '点击菜单项时触发（key: string | number），禁用项不触发；点击后面板自动收起。',
  },
  {
    name: 'openChange',
    desc: '菜单展开 / 收起时触发（visible: boolean）。',
  },
]

/** KDropdown Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '触发元素，建议放 KButton 等可聚焦元素。',
  },
  {
    name: 'overlay',
    desc: '自定义下拉面板内容，传入后忽略 menu 配置。',
  },
]
