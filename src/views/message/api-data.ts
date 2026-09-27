import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

/** message 为函数式调用，这里用 props 表描述 message.xxx(content, options) 的 options 参数 */
export const apiProps: ApiPropRow[] = [
  { name: 'content', type: 'string | VNode', default: '-', required: true, desc: '消息内容，支持纯文本或 VNode（作为第一个参数传入）。' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: '自动关闭时长（毫秒），0 表示不自动关闭。' },
  { name: 'effect', type: "'light' | 'plain' | 'dark'", default: "'light'", required: false, desc: '视觉效果：light 白色背景 + 浅边框 / plain type 浅色背景 / dark type 深色背景。' },
  { name: 'closable', type: 'boolean', default: 'false', required: false, desc: '是否显示关闭按钮（与 Ant Design 一致，默认不显示）。' },
  { name: 'icon', type: 'string', default: '随 type 自动', required: false, desc: '自定义图标（iconfont 名）；传空字符串表示不显示图标。' },
  { name: 'customClass', type: 'string', default: '-', required: false, desc: '自定义 class。' },
  { name: 'onClick', type: '() => void', default: '-', required: false, desc: '点击消息体的回调。' },
  { name: 'onClose', type: '() => void', required: false, default: '-', desc: '关闭回调（手动关闭 / 自动关闭 / 超限移除均触发）。' },
]

export const apiEmits: ApiEventRow[] = []

export const apiSlots: ApiSlotRow[] = []
