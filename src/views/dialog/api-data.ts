import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KDialog Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '对话框是否可见，支持 v-model。',
  },
  {
    name: 'title',
    type: 'string',
    default: "'提示'",
    required: false,
    desc: '对话框标题（也可以通过 #title slot 自定义）。',
  },
  {
    name: 'size',
    type: 'DialogSize',
    default: "'default'",
    required: false,
    desc: '尺寸，可选 small / default / large，控制内边距大小。',
  },
  {
    name: 'width',
    type: 'string',
    default: '—',
    required: false,
    desc: '对话框宽度，支持任意 CSS 单位。',
  },
  {
    name: 'height',
    type: 'string',
    default: '—',
    required: false,
    desc: '对话框高度（全屏时失效），支持任意 CSS 单位。',
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '—',
    required: false,
    desc: '最大高度（全屏时失效）。',
  },
  {
    name: 'minHeight',
    type: 'string',
    default: '—',
    required: false,
    desc: '最小高度（全屏时失效）。',
  },
  {
    name: 'maxWidth',
    type: 'string',
    default: '—',
    required: false,
    desc: '最大宽度。',
  },
  {
    name: 'minWidth',
    type: 'string',
    default: '—',
    required: false,
    desc: '最小宽度。',
  },
  {
    name: 'top',
    type: 'string',
    default: '—',
    required: false,
    desc: 'align 为 top 时的顶部间距（margin-top）。',
  },
  {
    name: 'align',
    type: 'DialogAlign',
    default: "'center'",
    required: false,
    desc: '垂直对齐方式，可选 center（垂直居中）/ top（顶部对齐）。',
  },
  {
    name: 'showClose',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示右上角关闭按钮。',
  },
  {
    name: 'closeOnClickOverlay',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '点击遮罩层是否关闭对话框。',
  },
  {
    name: 'closeOnPressEscape',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '按 Esc 键是否关闭对话框。',
  },
  {
    name: 'teleported',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否将对话框传送到 body，避免被父级 overflow / transform 影响。',
  },
  {
    name: 'customClass',
    type: 'string',
    default: '—',
    required: false,
    desc: '附加到对话框 wrapper 的自定义类名，配合 CSS var 覆盖外观。',
  },
  {
    name: 'confirmText',
    type: 'string',
    default: "'确 认'",
    required: false,
    desc: '确认按钮文案。',
  },
  {
    name: 'cancelText',
    type: 'string',
    default: "'取 消'",
    required: false,
    desc: '取消按钮文案。',
  },
  {
    name: 'showCancel',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示取消按钮。',
  },
  {
    name: 'confirmLoading',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '确认按钮是否处于 loading 状态，用于异步提交。',
  },
  {
    name: 'confirmDisabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '确认按钮是否禁用。',
  },
  {
    name: 'overlayBackground',
    type: 'string',
    default: '—',
    required: false,
    desc: '自定义遮罩层背景色，支持亮色遮罩等场景。',
  },
  {
    name: 'maskType',
    type: 'KOverlayMaskType',
    default: "'dimmed'",
    required: false,
    desc: '遮罩类型：dimmed 暗色遮罩（默认）/ blur 毛玻璃遮罩。',
  },
  {
    name: 'overlayZIndex',
    type: 'number',
    default: '—',
    required: false,
    desc: '遮罩层 z-index，用于多层弹窗层级控制。',
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否可拖拽，拖拽头部移动对话框（全屏时禁用）。',
  },
  {
    name: 'fullscreen',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示全屏切换按钮，可进入/退出全屏。',
  },
  {
    name: 'animation',
    type: 'DialogAnimation',
    default: "'scale'",
    required: false,
    desc: '动画类型，可选 scale（缩放）/ slide（滑入）/ bounce（弹性）。',
  },
]

/** KDialog Emits 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:modelValue',
    desc: '对话框可见性变化时触发，支持 v-model。',
  },
  {
    name: 'open',
    desc: '对话框开始打开时触发。',
  },
  {
    name: 'opened',
    desc: '对话框打开动画结束后触发。',
  },
  {
    name: 'close',
    desc: '对话框开始关闭时触发。',
  },
  {
    name: 'closed',
    desc: '对话框关闭动画结束后触发。',
  },
  {
    name: 'confirm',
    desc: '点击确认按钮时触发（不会自动关闭，需自行控制 v-model）。',
  },
  {
    name: 'cancel',
    desc: '点击取消按钮时触发。',
  },
  {
    name: 'fullscreen-change',
    desc: '全屏状态切换时触发，参数为是否进入全屏。',
  },
]

/** KDialog Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '对话框内容区域，超出时自动滚动。',
  },
  {
    name: 'title',
    desc: '自定义标题区域，传入后覆盖 title prop。',
  },
  {
    name: 'footer',
    desc: '自定义底部按钮区域，传入后覆盖默认的取消/确认按钮。',
  },
]
