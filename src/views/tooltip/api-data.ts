import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KTooltip Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'content',
    type: 'string',
    default: '—',
    required: false,
    desc: '提示文字内容；优先级低于 content 插槽。',
  },
  {
    name: 'theme',
    type: "'light' | 'dark'",
    default: "'light'",
    required: false,
    desc: '面板主题：light 白底 / dark 深色。',
  },
  {
    name: 'placement',
    type: 'PopperPlacement',
    default: "'top'",
    required: false,
    desc: '显示方位，支持 top / bottom / left / right 及 start / end 变体共 12 个。',
  },
  {
    name: 'size',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
    required: false,
    desc: '面板尺寸。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用，禁用后不显示提示。',
  },
  {
    name: 'trigger',
    type: "'hover' | 'click' | 'manual'",
    default: "'hover'",
    required: false,
    desc: '触发方式；manual 下完全由 visible 控制。',
  },
  {
    name: 'visible',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '手动 / 点击触发时的显示状态，支持 v-model:visible。',
  },
  {
    name: 'anchorRect',
    type: 'DOMRect | null',
    default: 'null',
    required: false,
    desc: '锚点矩形（manual 模式用），可基于表格单元格、图表等任意元素定位，无需包裹触发节点。',
  },
  {
    name: 'borderRadius',
    type: 'string | number',
    default: '—',
    required: false,
    desc: '面板圆角，数字按 px 处理，也可传 "50%" 等字符串。',
  },
  {
    name: 'autoFlip',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否启用自动翻转，靠近视口边缘时 placement 自动反向（委托 KPopper，定位 / Teleport / 视口保护均由其处理）。',
  },
]

/** KTooltip Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:visible',
    desc: '显示状态变化时触发（trigger 为 click / manual 时），参数为新的 visible 布尔值。',
  },
]

/** KTooltip Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '触发元素（hover / click 模式下绑定触发事件）。',
  },
  {
    name: 'content',
    desc: '自定义提示内容，支持任意 HTML / 组件；不传则渲染 content 属性。',
  },
]
