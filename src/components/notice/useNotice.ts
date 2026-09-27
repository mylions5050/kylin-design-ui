import { ref } from 'vue'

export type NoticeType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export interface NoticeAction {
  label: string
  onClick?: () => void
}

export interface NoticeOptions {
  icon?: string
  iconSpin?: boolean
  iconSize?: number
  class?: string
}

export interface NoticeItem {
  id: number
  type: NoticeType
  message: string
  description?: string
  duration: number
  action?: NoticeAction
  icon?: string
  iconSpin?: boolean
  iconSize?: number
  class?: string
}

const MAX = 5
const DEFAULT_DURATION = 3000

const notices = ref<NoticeItem[]>([])
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
  const idx = notices.value.findIndex((n) => n.id === id)
  if (idx >= 0) notices.value.splice(idx, 1)
  clearTimer(id)
}

function update(id: number, type: NoticeType, message: string, description?: string) {
  const idx = notices.value.findIndex((n) => n.id === id)
  const prev = notices.value[idx]
  if (idx < 0 || !prev) return
  const duration = type === 'loading' ? 0 : DEFAULT_DURATION
  notices.value[idx] = { ...prev, type, message, description, duration }
  clearTimer(id)
  if (duration > 0) startTimer(id)
}

function startTimer(id: number) {
  const item = notices.value.find((n) => n.id === id)
  if (!item || item.duration <= 0) return
  clearTimer(id)
  timers.set(id, setTimeout(() => dismiss(id), item.duration))
}

function pause(id: number) {
  clearTimer(id)
}

function resume(id: number) {
  startTimer(id)
}

function push(
  type: NoticeType,
  message: string,
  description?: string,
  duration = type === 'loading' ? 0 : DEFAULT_DURATION,
  action?: NoticeAction,
  options?: NoticeOptions,
) {
  const id = ++seq
  notices.value.push({
    id,
    type,
    message,
    description,
    duration,
    action,
    icon: options?.icon,
    iconSpin: options?.iconSpin,
    iconSize: options?.iconSize,
    class: options?.class,
  })
  // FIFO cap: drop oldest when over the limit (queue behavior)
  while (notices.value.length > MAX) {
    const oldest = notices.value[0]
    if (!oldest) break
    dismiss(oldest.id)
  }
  startTimer(id)
  return id
}

function clear() {
  notices.value.forEach((n) => clearTimer(n.id))
  notices.value = []
}

export const notice = {
  success: (
    message: string,
    description?: string,
    duration?: number,
    action?: NoticeAction,
    options?: NoticeOptions,
  ) => push('success', message, description, duration, action, options),
  error: (
    message: string,
    description?: string,
    duration?: number,
    action?: NoticeAction,
    options?: NoticeOptions,
  ) => push('error', message, description, duration, action, options),
  info: (
    message: string,
    description?: string,
    duration?: number,
    action?: NoticeAction,
    options?: NoticeOptions,
  ) => push('info', message, description, duration, action, options),
  warning: (
    message: string,
    description?: string,
    duration?: number,
    action?: NoticeAction,
    options?: NoticeOptions,
  ) => push('warning', message, description, duration, action, options),
  loading: (message: string, description?: string, duration?: number, options?: NoticeOptions) =>
    push('loading', message, description, duration, undefined, options),
  dismiss,
  update,
  clear,
}

export function useNotices() {
  return { notices, dismiss, pause, resume }
}
