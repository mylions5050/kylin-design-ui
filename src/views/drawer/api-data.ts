import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'modelValue', type: 'boolean', default: 'false', required: false, desc: '显隐（v-model）。' },
  { name: 'title', type: 'string', default: "''", required: false, desc: '标题（也可用 title 插槽）。' },
  { name: 'placement', type: "'right' | 'left' | 'top' | 'bottom'", default: "'right'", required: false, desc: '弹出方向；打开期间方向被锁定，关闭动画不受外部 placement 变化影响。' },
  { name: 'size', type: "'default' | 'large'", default: "'default'", required: false, desc: '预设尺寸（与 AntD 一致）：default 378px / large 736px，水平方向为宽度、垂直方向为高度。' },
  { name: 'width', type: 'number | string', default: '-', required: false, desc: '自定义面板宽度（仅 right/left 生效，覆盖 size），支持数字或任意 CSS 长度。' },
  { name: 'height', type: 'number | string', default: '-', required: false, desc: '自定义面板高度（仅 top/bottom 生效，覆盖 size）。' },
  { name: 'closable', type: 'boolean', default: 'true', required: false, desc: '是否显示标题栏关闭按钮。' },
  { name: 'closeOnClickOverlay', type: 'boolean', default: 'true', required: false, desc: '点击遮罩是否关闭。' },
  { name: 'closeOnPressEscape', type: 'boolean', default: 'true', required: false, desc: 'ESC 是否关闭；多层抽屉叠加时只有最上层响应。' },
  { name: 'push', type: 'boolean | number', default: 'true', required: false, desc: '同方向多层抽屉叠加时，本层是否被后打开的抽屉推开：true 推开 180px（AntD 默认值）/ 数字自定义距离 / false 关闭推开效果。' },
  { name: 'loading', type: 'boolean', default: 'false', required: false, desc: '内容加载中，body 被局部加载态覆盖（组合复用 KLoading local 模式）。' },
  { name: 'loadingText', type: 'string', default: '-', required: false, desc: '加载提示文案（配合 loading）。' },
  { name: 'teleported', type: 'boolean', default: 'true', required: false, desc: '是否 teleport 到 body。' },
  { name: 'overlayBackground', type: 'string', default: '-', required: false, desc: '遮罩背景色（透传 KOverlay）。' },
  { name: 'maskType', type: "'dimmed' | 'blur'", default: "'dimmed'", required: false, desc: '遮罩类型（透传 KOverlay）：dimmed 暗色蒙层（默认）/ blur 毛玻璃（背景不变 + backdrop-filter: blur(4px)）。' },
  { name: 'overlayZIndex', type: 'number', default: '-', required: false, desc: '遮罩层级（透传 KOverlay）；多层抽屉需手动递增。' },
  { name: 'customClass', type: 'string', default: '-', required: false, desc: '自定义 class（追加到面板上）。' },
  { name: 'headerStyle', type: 'CSSProperties', default: '-', required: false, desc: '标题栏自定义样式。' },
  { name: 'bodyStyle', type: 'CSSProperties', default: '-', required: false, desc: '内容区自定义样式。' },
  { name: 'footerStyle', type: 'CSSProperties', default: '-', required: false, desc: '页脚自定义样式。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '显隐变化（关闭按钮 / ESC / 点击遮罩均触发）。' },
  { name: 'open', desc: '打开动画开始。' },
  { name: 'opened', desc: '打开动画结束（相当于 AntD afterOpenChange(true)）。' },
  { name: 'close', desc: '关闭动画开始。' },
  { name: 'closed', desc: '关闭动画结束（相当于 AntD afterOpenChange(false)）。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '面板内容区（KScroll 接管滚动）。注意：关闭即销毁内容（遮罩 v-if 卸载），组件内部状态不保留，需持久化的数据请存父组件。' },
  { name: 'title', desc: '自定义标题。' },
  { name: 'extra', desc: '标题栏右侧区域（关闭按钮左侧），放次要操作。' },
  { name: 'footer', desc: '底部操作区，通常放确认/取消按钮组。' },
]
