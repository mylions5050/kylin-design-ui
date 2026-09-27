import { defineComponent, type PropType, computed } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import { useButtonClasses } from './composables/useButtonClasses'
import type { ButtonType, ButtonSize, ButtonNativeType } from './types'
import './index.scss'

const [, e] = createBem('k-btn')

export default defineComponent({
  name: 'KButton',
  props: {
    type: { type: String as PropType<ButtonType>, default: 'default' },
    size: { type: String as PropType<ButtonSize>, default: 'middle' },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    /** 纯正方形按钮：精简样式，默认边长 20px，可用 width/height 单独设置 */
    square: { type: Boolean, default: false },
    /** 方形按钮宽度（px 数字或 CSS 值），缺省 20px */
    width: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** 方形按钮高度（px 数字或 CSS 值），缺省与 width 相同（保持正方形） */
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    text: { type: Boolean, default: false },
    link: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    nativeType: { type: String as PropType<ButtonNativeType>, default: 'button' },
    /** Icon 图标（iconfont 名称），通过 <KIcon> 渲染在文字之前。 */
    icon: { type: String, default: undefined },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const classes = useButtonClasses(props)

    // Computed interactive state: effectively disabled when either disabled or loading.
    const isInteractiveDisabled = computed(() => props.disabled || props.loading)

    // 方形按钮尺寸：默认 20px，width/height 可单独设置（缺省保持正方形）
    const squareStyle = computed<Record<string, string> | undefined>(() => {
      if (!props.square) return undefined
      const toVal = (v: number | string | undefined): string => {
        if (v == null) return ''
        if (typeof v === 'number') return `${v}px`
        const s = String(v).trim()
        // 纯数字字符串补 px；含单位的字符串（如 '2.5rem'）原样
        return /^\d+(\.\d+)?$/.test(s) ? `${s}px` : s
      }
      const w = props.width ?? 20
      const h = props.height ?? props.width ?? 20
      return {
        width: toVal(w),
        height: toVal(h),
      }
    })

    return () => (
      <button
        class={classes.value}
        type={props.nativeType}
        disabled={isInteractiveDisabled.value}
        aria-disabled={isInteractiveDisabled.value}
        aria-busy={props.loading}
        style={squareStyle.value}
        onClick={(e) => !isInteractiveDisabled.value && emit('click', e)}
      >
        {props.loading && <span class={e('loading')} />}
        {slots.icon ? slots.icon() : props.icon ? <KIcon name={props.icon} /> : undefined}
        {!props.circle && <span class={e('text')}>{slots.default?.()}</span>}
      </button>
    )
  },
})
