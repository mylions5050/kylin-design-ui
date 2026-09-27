import { defineComponent, ref, computed, onMounted, onBeforeUnmount, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import './index.scss'

const [b, e, m] = createBem('scrollbar')

/**
 * Methods ScrollBar exposes to parents via `expose()`. vue-tsc doesn't reliably
 * surface `expose()` calls on `InstanceType<typeof ScrollBar>` when setup
 * returns a render function, so consumers should type refs as
 * `Ref<ScrollBarExposed | null>` rather than `InstanceType<typeof ScrollBar>`.
 */
export interface ScrollBarExposed {
  /** Recompute thumb sizes/positions and re-emit the scroll payload. */
  update: () => void
  /** Programmatically set the wrap element's scroll position. */
  scrollTo: (top?: number, left?: number) => void
  /** Access to the wrapped scroll element for advanced operations. */
  wrapRef: HTMLElement | null
}

export type ScrollBarType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export default defineComponent({
  name: 'ScrollBar',
  props: {
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    maxHeight: { type: [Number, String] as PropType<number | string>, default: undefined },
    minHeight: { type: [Number, String] as PropType<number | string>, default: undefined },
    hideDelay: { type: Number, default: 400 },
    thumbColor: { type: String, default: undefined }, // 允许用户自定义颜色
    type: { type: String as PropType<ScrollBarType>, default: 'default' },
  },
  emits: ['scroll'],
  setup(props, { emit, slots, expose }) {
    const wrapRef = ref<HTMLElement | null>(null)
    const vThumbRef = ref<HTMLElement | null>(null)
    const hThumbRef = ref<HTMLElement | null>(null)
    const visible = ref(false)
    const noVScroll = ref(false)
    const noHScroll = ref(false)
    let hideTimer: number | undefined

    // 根据 type 计算滚动条颜色
    const typeColorMap: Record<ScrollBarType, string> = {
      default: 'rgba(60, 75, 98, 0.3)',
      primary: 'rgba(10, 150, 230, 0.6)',
      success: 'rgba(178, 211, 56, 0.6)',
      warning: 'rgba(250, 192, 4, 0.6)',
      error: 'rgba(226, 25, 93, 0.6)',
    }

    const effectiveThumbColor = computed(() => {
      // 如果用户指定了 thumbColor，优先使用
      if (props.thumbColor) {
        return props.thumbColor
      }
      // 否则根据 type 使用对应颜色
      return typeColorMap[props.type]
    })

    // Corner reserved at the bottom-right when both axes scroll, so the two
    // thumbs meet as an L instead of crossing. The thumbs have a 3px border
    // radius, so a small geometric overlap here reads as the rounded tips
    // just touching — tune up if the tips visibly overlap. The track element
    // is an invisible positioning container with no overflow clipping, so the
    // thumb range is enforced in JS — updateThumbs and onThumbMove must share
    // this length or dragging the thumb won't map to the full scroll range.
    const CORNER = 4
    const vTrackLen = (el: HTMLElement, both: boolean) => el.clientHeight - 4 - (both ? CORNER : 0)
    const hTrackLen = (el: HTMLElement, both: boolean) => el.clientWidth - 4 - (both ? CORNER : 0)

    const showBar = () => {
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = undefined
      }
      visible.value = true
    }
    // Bar persists while the pointer stays inside the root (table or track);
    // it only fades out shortly after the pointer leaves, so moving between
    // the content and the track never blinks the bar.
    const scheduleHide = () => {
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        visible.value = false
      }, props.hideDelay)
    }

    const updateThumbs = () => {
      const el = wrapRef.value
      if (!el) return
      const vRatio = el.clientHeight / el.scrollHeight
      const hRatio = el.clientWidth / el.scrollWidth
      const willV = vRatio < 1
      const willH = hRatio < 1
      const both = willV && willH
      const vLen = vTrackLen(el, both)
      const hLen = hTrackLen(el, both)

      if (!willV) {
        noVScroll.value = true
      } else {
        noVScroll.value = false
        const vThumb = vThumbRef.value
        if (vThumb) {
          const h = Math.min(Math.max(vRatio * vLen, 24), vLen)
          const maxTop = Math.max(vLen - h, 0)
          const top =
            el.scrollHeight === el.clientHeight
              ? 0
              : (el.scrollTop / (el.scrollHeight - el.clientHeight)) * maxTop
          vThumb.style.height = `${h}px`
          vThumb.style.transform = `translateY(${top}px)`
        }
      }
      if (!willH) {
        noHScroll.value = true
      } else {
        noHScroll.value = false
        const hThumb = hThumbRef.value
        if (hThumb) {
          const w = Math.min(Math.max(hRatio * hLen, 24), hLen)
          const maxLeft = Math.max(hLen - w, 0)
          const left =
            el.scrollWidth === el.clientWidth
              ? 0
              : (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * maxLeft
          hThumb.style.width = `${w}px`
          hThumb.style.transform = `translateX(${left}px)`
        }
      }
    }

    const emitScroll = () => {
      const el = wrapRef.value
      if (!el) return
      emit('scroll', {
        scrollTop: el.scrollTop,
        scrollLeft: el.scrollLeft,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      })
    }

    const onScroll = () => {
      showBar()
      updateThumbs()
      emitScroll()
    }

    const update = () => {
      updateThumbs()
      emitScroll()
    }

    const scrollTo = (top?: number, left?: number) => {
      const el = wrapRef.value
      if (!el) return
      if (top !== undefined) el.scrollTop = top
      if (left !== undefined) el.scrollLeft = left
    }

    expose({ update, scrollTo, wrapRef })

    let dragging = false
    let dragStart = 0
    let dragStartScroll = 0
    let isVertical = false

    const startDrag = (e: MouseEvent, vertical: boolean) => {
      e.preventDefault()
      dragging = true
      isVertical = vertical
      const el = wrapRef.value!
      dragStart = vertical ? e.clientY : e.clientX
      dragStartScroll = vertical ? el.scrollTop : el.scrollLeft
      document.body.style.userSelect = 'none'
      window.addEventListener('mousemove', onThumbMove)
      window.addEventListener('mouseup', onThumbUp)
    }

    const onVThumbDown = (e: MouseEvent) => startDrag(e, true)
    const onHThumbDown = (e: MouseEvent) => startDrag(e, false)

    // Click on the track (not the thumb) jumps the thumb's nearest edge to the
    // click point. Unlike jump-to-center, this has no dead zone when the thumb
    // is large (a big thumb's empty track is shorter than half the thumb, so
    // center-to-click would just clamp to the extremes). The thumb moves toward
    // the click by exactly the click distance — never overshooting.
    const onVTrackClick = (e: MouseEvent) => {
      const el = wrapRef.value
      const thumb = vThumbRef.value
      if (!el || !thumb) return
      if (e.target === thumb || thumb.contains(e.target as Node)) return
      e.preventDefault()
      const trackEl = e.currentTarget as HTMLElement
      const trackTop = trackEl.getBoundingClientRect().top
      const clickY = e.clientY - trackTop
      const thumbTop = thumb.getBoundingClientRect().top - trackTop
      const h = thumb.offsetHeight
      const both = !noVScroll.value && !noHScroll.value
      const maxTop = Math.max(vTrackLen(el, both) - h, 0)
      const targetTop = clickY < thumbTop ? clickY : clickY - h
      const clamped = Math.max(0, Math.min(targetTop, maxTop))
      const range = el.scrollHeight - el.clientHeight
      if (range > 0 && maxTop > 0) el.scrollTop = (clamped / maxTop) * range
    }
    const onHTrackClick = (e: MouseEvent) => {
      const el = wrapRef.value
      const thumb = hThumbRef.value
      if (!el || !thumb) return
      if (e.target === thumb || thumb.contains(e.target as Node)) return
      e.preventDefault()
      const trackEl = e.currentTarget as HTMLElement
      const trackLeft = trackEl.getBoundingClientRect().left
      const clickX = e.clientX - trackLeft
      const thumbLeft = thumb.getBoundingClientRect().left - trackLeft
      const w = thumb.offsetWidth
      const both = !noVScroll.value && !noHScroll.value
      const maxLeft = Math.max(hTrackLen(el, both) - w, 0)
      const targetLeft = clickX < thumbLeft ? clickX : clickX - w
      const clamped = Math.max(0, Math.min(targetLeft, maxLeft))
      const range = el.scrollWidth - el.clientWidth
      if (range > 0 && maxLeft > 0) el.scrollLeft = (clamped / maxLeft) * range
    }

    const onThumbMove = (e: MouseEvent) => {
      if (!dragging) return
      const el = wrapRef.value
      if (!el) return
      const both = !noVScroll.value && !noHScroll.value
      if (isVertical) {
        const thumb = vThumbRef.value
        if (!thumb) return
        const h = thumb.offsetHeight
        const maxTop = Math.max(vTrackLen(el, both) - h, 0)
        if (maxTop <= 0) return
        const dy = e.clientY - dragStart
        const range = el.scrollHeight - el.clientHeight
        el.scrollTop = dragStartScroll + (dy / maxTop) * range
      } else {
        const thumb = hThumbRef.value
        if (!thumb) return
        const w = thumb.offsetWidth
        const maxLeft = Math.max(hTrackLen(el, both) - w, 0)
        if (maxLeft <= 0) return
        const dx = e.clientX - dragStart
        const range = el.scrollWidth - el.clientWidth
        el.scrollLeft = dragStartScroll + (dx / maxLeft) * range
      }
    }

    const onThumbUp = () => {
      dragging = false
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onThumbMove)
      window.removeEventListener('mouseup', onThumbUp)
    }

    const sizeStyle = (v?: number | string, prop?: string) => {
      if (v === undefined) return {}
      const val = typeof v === 'number' ? `${v}px` : v
      return prop ? { [prop]: val } : {}
    }

    const wrapStyle = computed(() => ({
      ...sizeStyle(props.height, 'height'),
      ...sizeStyle(props.maxHeight, 'maxHeight'),
      ...sizeStyle(props.minHeight, 'minHeight'),
    }))

    onMounted(() => {
      updateThumbs()
      window.addEventListener('resize', updateThumbs)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateThumbs)
      window.removeEventListener('mousemove', onThumbMove)
      window.removeEventListener('mouseup', onThumbUp)
      if (hideTimer) clearTimeout(hideTimer)
    })

    return () => (
      <div class={b()} onMouseenter={showBar} onMouseleave={scheduleHide}>
        <div ref={wrapRef} class={e('wrap')} style={wrapStyle.value} onScroll={onScroll}>
          {slots.default?.()}
        </div>
        {!noVScroll.value && (
          <div
            class={[e('track'), e('track--vertical'), m('visible', visible.value)]}
            onClick={onVTrackClick}
          >
              <div
                ref={vThumbRef}
                class={e('thumb')}
                style={{ background: effectiveThumbColor.value }}
                onMousedown={onVThumbDown}
              />
          </div>
        )}
        {!noHScroll.value && (
          <div
            class={[e('track'), e('track--horizontal'), m('visible', visible.value)]}
            onClick={onHTrackClick}
          >
            <div
              ref={hThumbRef}
              class={e('thumb')}
              style={{ background: effectiveThumbColor.value }}
              onMousedown={onHThumbDown}
            />
          </div>
        )}
      </div>
    )
  },
})
