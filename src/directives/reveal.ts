import type { Directive } from 'vue'

/**
 * v-reveal 滚动入场指令：元素滚动进入视口时播放上浮淡入动画。
 *
 * 用法：
 *   <div v-reveal>...</div>            — 进入视口即播
 *   <div v-reveal="200">...</div>      — 延迟 200ms 播放（用于同屏卡片错峰）
 *
 * 实现细节：
 *   - 挂载时打上 .reveal 初始隐藏类，并加入待触发集合
 *   - 模块级单例监听 scroll/resize，rAF 节流后批量检查待触发元素是否进入视口
 *     （比 IntersectionObserver 更稳：瞬间锚点跳转/极快甩动也不会漏触发）
 *   - 触发后加 .is-revealed 播放一次性动画并移出集合，不重复触发
 *   - 动画本体在全局样式的 .reveal / @keyframes reveal-in 中定义
 *   - prefers-reduced-motion 用户由全局样式兜底直接显示
 */

/** 尚未进入视口的元素集合 */
const pending = new Set<HTMLElement>()

/** 是否已挂载全局监听 */
let listening = false

/** rAF 合帧标记 */
let ticking = false

/** 上次检查时的滚动位置（用于把瞬移扫过的区域也算作"经过"） */
let lastY = 0

/** 触发单个元素入场 */
const reveal = (el: HTMLElement) => {
  el.classList.add('is-revealed')
  pending.delete(el)
}

/**
 * 批量检查：取上次与本次滚动位置扫过的区间（含视口高度），
 * 元素只要与该区间相交即触发——连续滚动与瞬间跳转都能覆盖。
 */
const check = () => {
  ticking = false
  const y = window.scrollY
  const viewportH = window.innerHeight
  const scanTop = Math.min(lastY, y)
  const scanBottom = Math.max(lastY, y) + viewportH
  lastY = y

  for (const el of pending) {
    const rect = el.getBoundingClientRect()
    const elTop = rect.top + y
    const elBottom = elTop + rect.height
    if (elTop < scanBottom - viewportH * 0.04 && elBottom > scanTop) {
      reveal(el)
    }
  }
  if (pending.size === 0) {
    stopListening()
  }
}

/** rAF 节流的滚动回调 */
const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(check)
  }
}

const startListening = () => {
  if (listening) return
  listening = true
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
}

const stopListening = () => {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) {
      el.style.animationDelay = `${binding.value}ms`
    }

    pending.add(el)
    startListening()

    // 首屏元素：挂载后下一帧立即检查一次，不等用户滚动
    requestAnimationFrame(onScroll)
  },

  unmounted(el) {
    pending.delete(el)
    if (pending.size === 0) {
      stopListening()
    }
  },
}
