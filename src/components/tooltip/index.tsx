/**
 * KTooltip —— 基于 KPopper 的文字提示组件
 *
 * 职责：
 *  - 触发方式（hover / click / manual）
 *  - 面板样式（主题、尺寸、圆角、模糊）
 *  - 暴露 adjustPosition 方法
 *
 * 定位/Teleport/click outside/视口保护/箭头 → 委托给 KPopper
 */
import {
  defineComponent,
  ref,
  computed,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KPopper from '@/components/popper/index'
import type { PopperPlacement } from '@/components/popper/index'
import './index.scss'

const [b, e] = createBem('tooltip')

export default defineComponent({
  name: 'KTooltip',
  props: {
    content: { type: String, default: undefined },
    theme: { type: String as PropType<'light' | 'dark'>, default: 'light' },
    placement: {
      type: String as PropType<PopperPlacement>,
      default: 'top',
    },
    size: { type: String as PropType<'small' | 'middle' | 'large'>, default: 'middle' },
    disabled: { type: Boolean, default: false },
    trigger: { type: String as PropType<'hover' | 'click' | 'manual'>, default: 'hover' },
    visible: { type: Boolean, default: false },
    anchorRect: { type: Object as PropType<DOMRect | null>, default: null },
    borderRadius: { type: [String, Number], default: undefined },
    /** 是否启用自动翻转，默认 true */
    autoFlip: { type: Boolean, default: true },
  },
  emits: ['update:visible'],
  setup(props, { slots, expose, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const isHovering = ref(false)
    const isClickVisible = ref(props.visible)
    let hideTimer: ReturnType<typeof setTimeout> | null = null

    const shouldShow = computed(() => {
      if (props.disabled) return false
      if (props.trigger === 'hover') return isHovering.value
      if (props.trigger === 'click') return isClickVisible.value
      return props.visible // manual
    })

    function clearHideTimer() {
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
    }

    function onEnter() {
      if (props.trigger !== 'hover') return
      clearHideTimer()
      isHovering.value = true
    }

    function onLeave() {
      if (props.trigger !== 'hover') return
      clearHideTimer()
      hideTimer = setTimeout(() => {
        isHovering.value = false
      }, 80)
    }

    function onClick() {
      if (props.trigger !== 'click') return
      isClickVisible.value = !isClickVisible.value
      if (isClickVisible.value) clearHideTimer()
      emit('update:visible', isClickVisible.value)
    }

    watch(() => props.visible, (v) => {
      if (props.trigger === 'click' || props.trigger === 'manual') {
        isClickVisible.value = v
      }
    })

    const panelStyle = computed(() => {
      const style: Record<string, any> = {}
      if (props.borderRadius !== undefined) {
        style['--tt-radius'] = typeof props.borderRadius === 'number'
          ? `${props.borderRadius}px`
          : props.borderRadius
      }
      return style
    })

    // 将 tooltip 的样式类组合到 popperClass 上
    const popperClass = computed(() => {
      return [
        e('panel'),
        e(`panel--${props.placement}`),
        e(`panel--${props.theme}`),
        e(`panel--${props.size}`),
      ].join(' ')
    })

    expose({ adjustPosition: () => {} })

    return () => {
      const triggerNode = props.trigger === 'hover' ? (
        <div ref={rootRef} class={b()} onMouseenter={onEnter} onMouseleave={onLeave}>
          {slots.default?.()}
        </div>
      ) : props.trigger === 'click' ? (
        <div ref={rootRef} class={b()} onClick={onClick}>
          {slots.default?.()}
        </div>
      ) : (
        <div ref={rootRef} class={b()}>
          {slots.default?.()}
        </div>
      )

      return (
        <>
          {triggerNode}
          <KPopper
            visible={shouldShow.value}
            placement={props.placement}
            triggerRef={rootRef}
            anchorRect={props.anchorRect}
            gap={8}
            margin={8}
            arrow={true}
            arrowSize={10}
            autoFlip={props.autoFlip}
            zIndex={2200}
            transition="zoom-fade"
            closeOnClickOutside={props.trigger === 'click'}
            popperClass={popperClass.value}
            onUpdate:visible={(v) => {
              if (props.trigger === 'click') {
                isClickVisible.value = v
                emit('update:visible', v)
              }
            }}
          >
            <div style={panelStyle.value}>{slots.content?.() ?? props.content}</div>
          </KPopper>
        </>
      )
    }
  },
})