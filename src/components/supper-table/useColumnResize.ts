import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { MIN_COL_WIDTH } from './constants'

/**
 * Drag the right edge of a column header to resize it. Mutates the shared
 * `widths` ref and exposes `guideX` — the viewport-relative x of a full-height
 * resize guide line (null when not resizing).
 */
export function useColumnResize(
  widths: Ref<number[]>,
  containerRef: Ref<HTMLElement | null>,
) {
  let resizing: { c: number; startX: number; startW: number } | null = null
  const guideX = ref<number | null>(null)

  function updateGuide(clientX: number) {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    guideX.value = clientX - rect.left - 1 // -1px for border
  }

  function startResize(e: MouseEvent, c: number) {
    e.preventDefault()
    e.stopPropagation()
    resizing = { c, startX: e.clientX, startW: widths.value[c] ?? 120 }
    updateGuide(e.clientX)
  }

  function onMousemove(e: MouseEvent) {
    if (!resizing) return
    const w = Math.max(
      MIN_COL_WIDTH,
      resizing.startW + (e.clientX - resizing.startX),
    )
    const arr = [...widths.value]
    arr[resizing.c] = w
    widths.value = arr
    updateGuide(e.clientX)
  }
  function onMouseup() {
    resizing = null
    guideX.value = null
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  })

  return { startResize, guideX }
}
