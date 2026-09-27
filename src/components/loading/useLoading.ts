/**
 * KLoading 服务方式 — 命令式创建全屏 Loading。
 *
 * 用法：
 *   import { useLoading } from '@/components/loading/useLoading'
 *   const loading = useLoading().open({ text: '加载中…' })
 *   loading.close()
 *
 * 动画设计：
 *   - 打开时：先 modelValue=false 再 setTimeout(0) 后 modelValue=true 渲染，触发 enter 过渡
 *   - 关闭时：先 modelValue=false 触发 leave 过渡，等 duration 后销毁
 *
 * 单例：
 *   - 重复 open 返回同一实例，避免遮罩叠加
 *   - 提供 Loading._reset() 用于测试/HMR 环境
 */
import { createVNode, render, type VNode } from 'vue'
import KLoading, {
  type KLoadingType,
  type KLoadingSemanticType,
  type KLoadingTheme,
} from './index'
import type { KOverlayMaskType } from '@/components/overlay/index'

export interface LoadingOptions {
  text?: string | VNode
  lock?: boolean
  type?: KLoadingType
  themeType?: KLoadingSemanticType
  color?: string
  size?: number
  background?: string
  opacity?: number
  /** 遮罩类型：dimmed（默认）/ blur 毛玻璃 */
  maskType?: KOverlayMaskType
  theme?: KLoadingTheme
  customClass?: string
  children?: VNode
  duration?: number
}

export interface LoadingInstance {
  close: () => void
  isClosed: () => boolean
}

let singleton: LoadingInstance | null = null

function createLoading(options: LoadingOptions): LoadingInstance {
  let closed = false
  const container = document.createElement('div')
  document.body.appendChild(container)

  const slots: Record<string, () => VNode> = {}
  if (options.children) slots.default = () => options.children as VNode

  const baseProps = {
    text: options.text as string,
    spinnerType: options.type ?? 'spinner',
    type: options.themeType ?? 'primary',
    color: options.color,
    size: options.size,
    background: options.background,
    opacity: options.opacity ?? 0.5,
    maskType: options.maskType,
    theme: options.theme ?? 'auto',
    customClass: options.customClass,
    duration: options.duration ?? 250,
    teleported: false,
    lock: options.lock ?? true,
  }

  // 第一步：渲染 modelValue=false，让 KOverlay 的 Transition 处于"就绪"状态
  let vnode = createVNode(KLoading as any, { ...baseProps, modelValue: false }, options.children ? slots : undefined)
  render(vnode, container)

  // 第二步：setTimeout(0) 后重新渲染 modelValue=true，触发 enter 过渡
  setTimeout(() => {
    if (closed) return
    vnode = createVNode(KLoading as any, { ...baseProps, modelValue: true }, options.children ? slots : undefined)
    render(vnode, container)
  }, 0)

  const instance: LoadingInstance = {
    close: () => {
      if (closed) return
      closed = true

      // 先渲染 modelValue=false 触发 leave 过渡
      vnode = createVNode(KLoading as any, { ...baseProps, modelValue: false }, options.children ? slots : undefined)
      render(vnode, container)

      // 等 leave 过渡完成后销毁
      const duration = options.duration ?? 250
      setTimeout(() => {
        render(null, container)
        if (container.parentNode) container.parentNode.removeChild(container)
      }, duration + 50)
    },
    isClosed: () => closed,
  }

  singleton = instance
  return instance
}

function open(options: LoadingOptions = {}): LoadingInstance {
  if (singleton && !singleton.isClosed()) return singleton
  return createLoading(options)
}

export function useLoading() {
  return {
    open,
    close: () => singleton?.close(),
  }
}

export const Loading = {
  open,
  service: open,
  close: () => singleton?.close(),
  /** 重置单例状态（仅测试/HMR 环境使用） */
  _reset() {
    if (singleton && !singleton.isClosed()) {
      singleton.close()
    }
    singleton = null
  },
}