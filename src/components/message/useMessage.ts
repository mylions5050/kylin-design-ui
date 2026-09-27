/**
 * useMessage — KMessage 的全局消息队列
 *
 * 编程式调用：message.success('xxx', options) / message.error / warning / info / loading。
 * 单例队列（模块级 ref），KMessage 组件负责渲染。
 *
 * 参考 Ant Design message：
 * - 默认 3 秒自动关闭（duration: 0 表示不自动关闭）
 * - 默认不显示关闭按钮（closable: true 开启）
 * - 最多同时展示 MAX 条，超出时移除最早的一条
 */
import { ref } from 'vue'
import type { VNode } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading'
export type MessageEffect = 'light' | 'plain' | 'dark'

export interface MessageItem {
  id: number
  type: MessageType
  /** 消息内容：纯文本或 VNode */
  content: string | VNode
  duration: number
  /** 效果：light=白色背景+浅边框（AntD 默认），plain=type 浅色背景，dark=type 深色背景 */
  effect: MessageEffect
  /** 是否显示关闭按钮（默认 false，与 AntD 一致） */
  closable: boolean
  /** 自定义图标（iconfont 名）；传 '' 表示不显示图标 */
  icon?: string
  customClass?: string
  /** 点击消息体的回调 */
  onClick?: () => void
  /** 关闭回调（手动关闭 / 自动关闭 / 超限移除均触发） */
  onClose?: () => void
}

const MAX = 5
const DEFAULT_DURATION = 3000

const messages = ref<MessageItem[]>([])
let seq = 0
const timers = new Map<number, ReturnType<typeof setTimeout>>()

function clearTimer(id: number) {
  const t = timers.get(id)
  if (t) {
    clearTimeout(t)
    timers.delete(id)
  }
}

function dismiss(id: number) {
  const idx = messages.value.findIndex((n) => n.id === id)
  if (idx < 0) return
  const item = messages.value[idx]
  messages.value.splice(idx, 1)
  clearTimer(id)
  item.onClose?.()
}

function startTimer(id: number) {
  const item = messages.value.find((n) => n.id === id)
  if (!item || item.duration <= 0) return
  clearTimer(id)
  timers.set(id, setTimeout(() => dismiss(id), item.duration))
}

export interface MessageOptions {
  /** 显示时长（毫秒），0 表示不自动关闭，默认 3000 */
  duration?: number
  /** 关闭回调 */
  onClose?: () => void
  /** 点击消息体的回调 */
  onClick?: () => void
  /** 效果：light=白色背景（默认）/ plain=type 浅色背景 / dark=type 深色背景 */
  effect?: MessageEffect
  /** 自定义图标（iconfont 名）；传 '' 表示不显示图标 */
  icon?: string
  /** 自定义 class */
  customClass?: string
  /** 是否显示关闭按钮（默认 false） */
  closable?: boolean
}

function push(
  type: MessageType,
  content: string | VNode,
  options?: MessageOptions,
) {
  const id = ++seq
  const duration = options?.duration ?? DEFAULT_DURATION
  messages.value.push({
    id,
    type,
    content,
    duration,
    effect: options?.effect ?? 'light',
    closable: options?.closable ?? false,
    icon: options?.icon,
    customClass: options?.customClass,
    onClick: options?.onClick,
    onClose: options?.onClose,
  })
  // FIFO cap：超出上限时移除最早的一条（同样触发其 onClose）
  while (messages.value.length > MAX) {
    const oldest = messages.value[0]
    if (!oldest) break
    dismiss(oldest.id)
  }
  if (duration > 0) startTimer(id)
  return id
}

/** 清除所有消息（不触发各条 onClose） */
function clear() {
  messages.value.forEach((m) => clearTimer(m.id))
  messages.value = []
}

export const message = {
  success: (content: string | VNode, options?: MessageOptions) => push('success', content, options),
  error: (content: string | VNode, options?: MessageOptions) => push('error', content, options),
  warning: (content: string | VNode, options?: MessageOptions) => push('warning', content, options),
  info: (content: string | VNode, options?: MessageOptions) => push('info', content, options),
  loading: (content: string | VNode, options?: MessageOptions) => push('loading', content, options),
  dismiss,
  clear,
}

export function useMessages() {
  return { messages, dismiss }
}
