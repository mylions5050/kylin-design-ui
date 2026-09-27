/**
 * KLoading 指令 — 仿 Element Plus 的 v-loading。
 *
 * 全局注册：app.directive('loading', vLoading)
 *
 * 架构设计：
 *   1. mounted 只创建一次 vnode，后续更新通过 render 重新渲染（稳定可靠）
 *   2. 动画 100% 交给 KLoading 内部的 `<Transition>`
 *   3. 全屏模式禁止动态切换（文档说明）
 *   4. originalPosition 保存确切原始值，恢复时还原
 */
import { createVNode, render, type Directive, type DirectiveBinding, type VNode } from 'vue'
import KLoading, { type KLoadingType, type KLoadingSemanticType, type KLoadingTheme } from './index'

export type VLoadingBindingValue =
  | boolean
  | string
  | Partial<{
      text: string
      type: KLoadingSemanticType
      spinnerType: KLoadingType
      color: string
      size: number
      background: string
      opacity: number
      theme: KLoadingTheme
      customClass: string
      fullscreen: boolean
    }>

type VLoadingModifiers = Record<string, true> & { fullscreen?: true }

interface VLoadingInstance {
  el: HTMLElement
  container: HTMLElement
  vnode: VNode | null
  originalPosition: string
  isFullscreen: boolean
}

const INSTANCE_KEY = '__kLoadingInstance'

function parseBinding(binding: DirectiveBinding<VLoadingBindingValue, string, VLoadingModifiers>): {
  visible: boolean
  options: Record<string, unknown>
} {
  const value = binding.value
  const hasFullscreen = !!binding.modifiers?.fullscreen
  if (typeof value === 'boolean' || value == null) return { visible: value === true, options: { fullscreen: hasFullscreen } }
  if (typeof value === 'string') return { visible: true, options: { text: value, fullscreen: hasFullscreen } }
  if (typeof value === 'object') {
    const o = value as Record<string, unknown>
    return {
      visible: o.visible !== false,
      options: { text: o.text, type: o.type, spinnerType: o.spinnerType, color: o.color, size: o.size, background: o.background, opacity: o.opacity, theme: o.theme, customClass: o.customClass, fullscreen: (o.fullscreen as boolean | undefined) ?? hasFullscreen },
    }
  }
  return { visible: false, options: {} }
}

function buildProps(options: Record<string, unknown>, visible: boolean): Record<string, unknown> {
  const props: Record<string, unknown> = { modelValue: visible, local: true, teleported: false, lock: false }
  const keys = ['text', 'type', 'spinnerType', 'color', 'size', 'background', 'opacity', 'theme', 'customClass']
  for (const k of keys) { const v = options[k]; if (v !== undefined) props[k] = v }
  return props
}

function renderLoading(container: HTMLElement, options: Record<string, unknown>, visible: boolean): VNode {
  const vnode = createVNode(KLoading as any, buildProps(options, visible))
  render(vnode, container)
  return vnode
}

function mountLocal(el: HTMLElement, options: Record<string, unknown>, visible: boolean): VLoadingInstance {
  const originalPosition = getComputedStyle(el).position
  if (originalPosition === 'static') el.style.position = 'relative'
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.top = '0'
  container.style.left = '0'
  container.style.right = '0'
  container.style.bottom = '0'
  container.style.zIndex = '1000'
  container.style.pointerEvents = 'none'
  if (!visible) container.style.display = 'none'
  el.appendChild(container)
  const vnode = renderLoading(container, options, visible)
  return { el, container, vnode, originalPosition, isFullscreen: false }
}

function mountFullscreen(options: Record<string, unknown>, visible: boolean): VLoadingInstance {
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.inset = '0'
  container.style.zIndex = '2000'
  if (!visible) container.style.display = 'none'
  document.body.appendChild(container)
  const vnode = renderLoading(container, options, visible)
  return { el: document.body, container, vnode, originalPosition: 'fixed', isFullscreen: true }
}

function destroyInstance(instance: VLoadingInstance) {
  render(null, instance.container)
  if (instance.container.parentNode) instance.container.parentNode.removeChild(instance.container)
  instance.el.style.position = instance.originalPosition
  ;(instance.el as any)[INSTANCE_KEY] = undefined
}

const vLoading: Directive<HTMLElement, VLoadingBindingValue> = {
  mounted(el, binding) {
    const { visible, options } = parseBinding(binding)
    const fullscreen = !!options.fullscreen
    const instance = fullscreen ? mountFullscreen(options, visible) : mountLocal(el, options, visible)
    ;(el as any)[INSTANCE_KEY] = instance
  },
  updated(el, binding) {
    const instance = (el as any)[INSTANCE_KEY] as VLoadingInstance | undefined
    if (!instance) return
    const { visible, options } = parseBinding(binding)
    const wantsFullscreen = !!options.fullscreen
    if (wantsFullscreen !== instance.isFullscreen) {
      console.warn('[KLoading] v-loading fullscreen cannot be changed dynamically.')
      return
    }
    if (instance.isFullscreen) {
      if (visible && !instance.container.parentNode) document.body.appendChild(instance.container)
      else if (!visible && instance.container.parentNode) document.body.removeChild(instance.container)
    } else {
      instance.container.style.display = visible ? '' : 'none'
    }
    instance.vnode = renderLoading(instance.container, options, visible)
  },
  beforeUnmount(el) {
    const instance = (el as any)[INSTANCE_KEY] as VLoadingInstance | undefined
    if (!instance) return
    destroyInstance(instance)
  },
}

export { vLoading }
const KLoadingDirective = { install(app: { directive: (name: string, dir: Directive) => unknown }) { app.directive('loading', vLoading) } }
export default KLoadingDirective