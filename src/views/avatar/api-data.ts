import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KAvatar Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'src',
    type: 'string',
    default: '-',
    required: false,
    desc: '图片类头像的资源地址。',
  },
  {
    name: 'srcSet',
    type: 'string',
    default: '-',
    required: false,
    desc: '图片响应式资源地址（原生 srcset）。',
  },
  {
    name: 'alt',
    type: 'string',
    default: '-',
    required: false,
    desc: '图片加载失败时的替代文本。',
  },
  {
    name: 'icon',
    type: 'string',
    default: '-',
    required: false,
    desc: '自定义图标（iconfont 名称），也是图片加载失败的第一回退。',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    required: false,
    desc: '指定头像的形状。',
  },
  {
    name: 'size',
    type: 'number | "small" | "default" | "large"',
    default: "'default'",
    required: false,
    desc: '头像大小：预设尺寸或数字（px）。',
  },
  {
    name: 'gap',
    type: 'number',
    default: '4',
    required: false,
    desc: '字符型头像中字符距左右两侧边界的单位像素。',
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '图片是否允许拖动。',
  },
  {
    name: 'crossOrigin',
    type: '"anonymous" | "use-credentials"',
    default: '-',
    required: false,
    desc: '图片 CORS 属性设置。',
  },
  {
    name: 'backgroundColor',
    type: 'string',
    default: '-',
    required: false,
    desc: '背景色（icon / 字符型使用），也可通过 style 自定义。',
  },
  {
    name: 'color',
    type: 'string',
    default: '-',
    required: false,
    desc: '文字 / 图标颜色。',
  },
  {
    name: 'onError',
    type: '() => boolean',
    default: '-',
    required: false,
    desc: '图片加载失败回调；返回 false 时关闭组件内置回退行为。',
  },
]

/** KAvatar Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'error',
    params: '(event: Event)',
    desc: '图片加载失败时触发（onError 回调返回 false 可关闭内置回退）。',
  },
]

/** KAvatar Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    params: '-',
    desc: '字符型头像内容；超出宽度时自动缩放字号。',
  },
]

/** AvatarGroup Props 表格数据 */
export const groupApiProps: ApiPropRow[] = [
  {
    name: 'maxCount',
    type: 'number',
    default: '-',
    required: false,
    desc: '最多显示的头像数量，超出折叠为 "+N" 气泡。',
  },
  {
    name: 'maxStyle',
    type: 'CSSProperties',
    default: '-',
    required: false,
    desc: '"+N" 溢出块的自定义样式。',
  },
  {
    name: 'maxPopoverPlacement',
    type: "'top' | 'bottom'",
    default: "'top'",
    required: false,
    desc: '溢出气泡的弹出方向。',
  },
  {
    name: 'size',
    type: 'number | "small" | "default" | "large"',
    default: '-',
    required: false,
    desc: '组内头像大小，子 Avatar 未显式设置时继承。',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: '-',
    required: false,
    desc: '组内头像形状，子 Avatar 未显式设置时继承。',
  },
]
