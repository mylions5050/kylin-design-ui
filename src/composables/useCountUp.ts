import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 数字滚动计数 composable：绑定的元素进入视口后，从 0 缓动计数到目标值。
 *
 * 用法：
 *   const { display, elRef } = useCountUp(139)
 *   <div :ref="(el) => (elRef.value = el)">{{ display }}</div>
 *
 *   注意：在 v-for 中绑定 ref 对象会被 Vue 收集为数组导致 observe 失败，
 *   必须用上面的函数 ref 形式。
 *
 * 细节：
 *   - easeOutCubic 缓动，前快后慢，观感自然
 *   - IntersectionObserver 检测进入视口才开播；极端瞬移跳转漏触发时由
 *     3 秒兜底定时器强制计数，保证最终一定显示终值
 *   - prefers-reduced-motion 用户直接显示终值，不播动画
 *
 * @param target 目标数值
 * @param duration 动画时长 ms，默认 1600
 */
export function useCountUp(target: number, duration = 1600) {
  /** 当前显示值（模板绑定） */
  const display = ref(0)

  /** 触发检测元素：绑定到包含数字的容器上 */
  const elRef = ref<HTMLElement | null>(null)

  let started = false
  let io: IntersectionObserver | undefined
  let raf = 0
  let timer = 0

  /** 前快后慢缓动 */
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  /** 开始计数（幂等） */
  const start = () => {
    if (started) return
    started = true
    io?.disconnect()
    window.clearTimeout(timer)
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      display.value = Math.round(easeOutCubic(p) * target)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = target
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) start()
      },
      { threshold: 0 },
    )
    if (elRef.value) io.observe(elRef.value)

    // 兜底：观察器在极端瞬移跳转下可能漏触发，超时后强制计数保证显示终值
    timer = window.setTimeout(start, 3000)
  })

  onUnmounted(() => {
    io?.disconnect()
    cancelAnimationFrame(raf)
    window.clearTimeout(timer)
  })

  return { display, elRef }
}
