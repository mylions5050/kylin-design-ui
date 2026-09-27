import {
  defineComponent,
  computed,
  watch,
  onBeforeUnmount,
  Transition,
  type PropType,
} from 'vue'
import KOverlay, { type KOverlayMaskType } from '@/components/overlay/index'
import './index.scss'

export type KLoadingType = 'spinner' | 'circle' | 'arc'
export type KLoadingSemanticType = 'primary' | 'success' | 'info' | 'warning' | 'error'
export type KLoadingTheme = 'auto' | 'light' | 'dark'

/** type 语义 → 主题色变量（菊花 + 文字随 type 颜色） */
function semanticColor(type: KLoadingSemanticType): string {
  const map: Record<KLoadingSemanticType, string> = {
    primary: 'var(--k-color-primary)',
    success: 'var(--k-color-success)',
    info: 'var(--k-color-info)',
    warning: 'var(--k-color-warning)',
    error: 'var(--k-color-error)',
  }
  return map[type]
}

export default defineComponent({
  name: 'KLoading',
  props: {
    /** 是否显示 loading（v-model） */
    modelValue: { type: Boolean, default: false },
    /** type 语义色：primary / success / info / warning / error（菊花与文字随此颜色） */
    type: { type: String as PropType<KLoadingSemanticType>, default: 'primary' },
    /** 菊花样式：spinner 双弧咬合 / circle 圆点脉冲 / arc 弧形粗细呼吸旋转（区别于 type 语义色） */
    spinnerType: { type: String as PropType<KLoadingType>, default: 'spinner' },
    /** 底部加载文案 */
    text: { type: String, default: undefined },
    /** 自定义菊花/文字颜色（覆盖 type 语义色） */
    color: { type: String, default: undefined },
    /** 菊花尺寸（px） */
    size: { type: Number, default: 32 },
    /** 遮罩背景色（配合 opacity 合成 rgba；缺省时按主题默认：light=白 / dark=黑） */
    background: { type: String, default: undefined },
    /** 遮罩背景透明度（0-1） */
    opacity: { type: Number, default: 0.5 },
    /** 遮罩类型：dimmed 暗色/纯色蒙层（默认）/ blur 毛玻璃（透传 KOverlay，local 模式同样生效） */
    maskType: { type: String as PropType<KOverlayMaskType>, default: 'dimmed' },
    /** 主题：auto 跟随系统/当前 / 强制 light / dark */
    theme: { type: String as PropType<KLoadingTheme>, default: 'auto' },
    /** 自定义 class */
    customClass: { type: String, default: undefined },
    /** 层级 z-index */
    zIndex: { type: Number, default: undefined },
    /** 是否 teleport 到 body */
    teleported: { type: Boolean, default: true },
    /** 是否锁定页面滚动 */
    lock: { type: Boolean, default: true },
    /** 过渡时长（ms） */
    duration: { type: Number, default: 250 },
    /** 点击遮罩关闭 */
    closeOnClick: { type: Boolean, default: false },
    /** 自定义 SVG（覆盖默认菊花） */
    svg: { type: String, default: undefined },
    /** 局部分块模式：absolute 覆盖父容器（父需 position:relative），不 teleport 不锁页面滚动 */
    local: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],

  setup(props, { emit, slots }) {
    const DOT_COUNT = 6

    // 当前生效的菊花/文字主色：color prop 优先，否则用 type 语义色
    const activeColor = computed(() => props.color ?? semanticColor(props.type))

    // 解析最终生效的主题
    const effectiveTheme = computed<'light' | 'dark'>(() => {
      if (props.theme === 'light') return 'light'
      if (props.theme === 'dark') return 'dark'
      const isDark =
        typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      return isDark ? 'dark' : 'light'
    })

    // 遮罩背景：background + opacity → 带透明度的 rgba；未传 background 时按主题用默认色
    const maskBackground = computed(() => {
      const baseColor = props.background ?? (effectiveTheme.value === 'dark' ? '#000000' : '#ffffff')
      if (!baseColor) return undefined
      // 已带透明度的 rgba 直接使用
      if (baseColor.startsWith('rgba')) return baseColor
      // rgb(r,g,b) → 补透明度
      const rgbMatch = baseColor.match(/^(rgb)a?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
      if (rgbMatch) {
        return `rgba(${rgbMatch[2]}, ${rgbMatch[3]}, ${rgbMatch[4]}, ${props.opacity})`
      }
      // hex → rgba
      const hex = baseColor.replace('#', '')
      const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex
      const r = parseInt(full.slice(0, 2), 16)
      const g = parseInt(full.slice(2, 4), 16)
      const b = parseInt(full.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${props.opacity})`
    })

    // 锁定滚动（仅全局模式；local 局部加载不锁页面滚动）
    let prevBodyOverflow = ''
    watch(
      () => props.modelValue,
      (val) => {
        if (props.lock && !props.local) {
          if (val) {
            prevBodyOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = prevBodyOverflow
          }
        }
      },
    )
    onBeforeUnmount(() => {
      if (props.lock && !props.local) document.body.style.overflow = prevBodyOverflow
    })

    // 渲染菊花内容
    const indicator = () => {
      // 1) 显式 #default 插槽：最灵活，可放任意 icon / 图片 / 自定义内容
      if (slots.default) {
        return <span class="k-loading__custom">{slots.default()}</span>
      }
      // 2) 自定义 svg
      if (props.svg) {
        return <span class="k-loading__icon" v-html={props.svg} />
      }
      // 3) circle 圆点脉冲：6 颗圆点沿轨道依次胀缩，形成绕圈传播的呼吸波
      if (props.spinnerType === 'circle') {
        return (
          <div class="k-loading__circle" style={{ width: `${props.size}px`, height: `${props.size}px` }}>
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                class="k-loading__dot"
                style={{
                  ['--dot-rotate' as string]: `${(i * 360) / DOT_COUNT}deg`,
                  ['--radius' as string]: `${Math.max(props.size / 2 - 2, 2)}px`,
                  animationDelay: `${(i * 0.2).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        )
      }
      // 3) arc 经典弧线追逐（Element Plus 风格）：整体匀速旋转 + 弧长与相位同时变化
      if (props.spinnerType === 'arc') {
        return (
          <span class="k-loading__spinner" style={{ width: `${props.size}px`, height: `${props.size}px` }}>
            <svg viewBox="0 0 50 50" class="k-loading__spinner-svg is-rotating">
              <circle
                class="k-loading__spinner-growth"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </span>
        )
      }
      // 4) spinner：双弧咬合（外弧伸缩旋转 + 内弧反向旋转，独有造型）
      return (
        <span class="k-loading__spinner" style={{ width: `${props.size}px`, height: `${props.size}px` }}>
          <svg viewBox="0 0 50 50" class="k-loading__spinner-svg">
            <circle
              class="k-loading__spinner-arc"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
            />
            <circle
              class="k-loading__spinner-inner"
              cx="25"
              cy="25"
              r="11"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              opacity="0.45"
            />
          </svg>
        </span>
      )
    }

    // theme 修饰 class：effectiveTheme 决定 light/dark 文案颜色
    const themeClass = computed(() => (effectiveTheme.value === 'dark' ? 'k-loading--dark' : 'k-loading--light'))

    return () => {
      const maskContent = (
        <div class="k-loading__mask" style={{ color: activeColor.value }}>
          {indicator()}
          {slots.text || props.text != null
            ? <div class="k-loading__text">{slots.text?.() ?? props.text}</div>
            : null}
        </div>
      )

      // 局部分块模式：不 teleport、absolute 铺满父容器，淡入淡出
      if (props.local) {
        return (
          <Transition name="k-loading-local-fade">
            {props.modelValue ? (
              <div
                class={['k-loading__local', themeClass.value, props.customClass].filter(Boolean).join(' ') || undefined}
                style={{
                  background: maskBackground.value,
                  zIndex: props.zIndex,
                  ...(props.maskType === 'blur'
                    ? { backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }
                    : {}),
                }}
              >
                {maskContent}
              </div>
            ) : null}
          </Transition>
        )
      }

      // 全局模式：复用 KOverlay（fixed 全屏 + teleport + 过渡）
      return (
        <KOverlay
          modelValue={props.modelValue}
          onUpdate:modelValue={(v: boolean) => emit('update:modelValue', v)}
          duration={props.duration}
          teleported={props.teleported}
          closeOnClick={props.closeOnClick}
          customClass={['k-loading', themeClass.value, props.customClass].filter(Boolean).join(' ') || undefined}
          zIndex={props.zIndex}
          background={maskBackground.value}
          maskType={props.maskType}
          onOpen={() => emit('open')}
          onOpened={() => emit('opened')}
          onClose={() => emit('close')}
          onClosed={() => emit('closed')}
        >
          {maskContent}
        </KOverlay>
      )
    }
  },
})
