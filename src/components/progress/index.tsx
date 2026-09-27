/**
 * KProgress — 进度条
 *
 * 对齐 Element Plus 的 Progress：percentage 表示当前进度（0-100），
 * type 支持 line（直线）/ circle（环形）/ dashboard（仪表盘）三种形态。
 * status 改变整体色彩语义；color 支持字符串、分档数组与函数三种自定义方式；
 * format 自定义文字，默认插槽可完全替换文字区域（作用域 { percentage }）。
 */
import { defineComponent, computed, ref, watch, onBeforeUnmount, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import KTooltip from '@/components/tooltip/index'
import './index.scss'

const [b, e, m] = createBem('k-progress')

/** 分档颜色项：到达 percentage 后切换为 color */
export interface ProgressColorStop {
  color: string
  percentage: number
}

/** 打点项：在 line 进度条的 percentage 位置打点，label 为详情文字 */
export interface ProgressMark {
  percentage: number
  label: string
}

/** status 对应的语义色 */
const STATUS_COLOR: Record<string, string> = {
  success: 'var(--k-color-success)',
  warning: 'var(--k-color-warning)',
  exception: 'var(--k-color-error)',
}

/** status 对应的环形中心图标（iconfont 名） */
const STATUS_ICON: Record<string, string> = {
  success: 'success-filling',
  warning: 'warning-filling',
  exception: 'error',
}

// 渐变 id 全页唯一计数器（SVG url 引用按 id 查找，多实例不能重名）
let gradientSeq = 0

export default defineComponent({
  name: 'KProgress',
  props: {
    /** 进度百分比（0-100，超出自动截断） */
    percentage: { type: Number, default: 0 },
    /** 进度条类型 */
    type: { type: String as PropType<'line' | 'circle' | 'dashboard'>, default: 'line' },
    /** 进度条粗细（line 为条高，circle/dashboard 为环宽，单位 px） */
    strokeWidth: { type: Number, default: 6 },
    /** 百分比文字是否内嵌在进度条中（仅 line 生效，需配合较大的 strokeWidth） */
    textInside: { type: Boolean, default: false },
    /** 状态：success / warning / exception，决定条与文字的语义色 */
    status: { type: String as PropType<'' | 'success' | 'warning' | 'exception'>, default: '' },
    /**
     * 自定义颜色：
     * - 字符串：单一颜色，也支持直接传 CSS 渐变串（如 'linear-gradient(90deg, #108ee9, #87d068)'）
     * - 对象：百分比键的渐变色（如 { '0%': '#108ee9', '100%': '#87d068' }）；
     *   line 生成 CSS 渐变，circle/dashboard 生成 SVG linearGradient
     * - 数组：分档 [{ color, percentage }]，按当前进度取最后一条命中的档位色
     * - 函数：(percentage) => color
     */
    color: {
      type: [String, Function, Array, Object] as PropType<
        string | ((p: number) => string) | ProgressColorStop[] | Record<string, string>
      >,
      default: '',
    },
    /** 环形的整体尺寸（直径，单位 px，仅 circle/dashboard 生效） */
    width: { type: Number, default: 126 },
    /** 是否展示进度文字 */
    showText: { type: Boolean, default: true },
    /** 环形端点形状（仅 circle/dashboard 生效） */
    strokeLinecap: { type: String as PropType<'butt' | 'round' | 'square'>, default: 'round' },
    /** 文字格式化函数；不传展示 `${percentage}%` */
    format: { type: Function as PropType<(p: number) => string>, default: undefined },
    /** 是否启用直线进度条的流动动画（仅 line 生效，适合未知进度的加载场景） */
    indeterminate: { type: Boolean, default: false },
    /** 流动动画一轮时长（秒） */
    duration: { type: Number, default: 3 },
    /** 环形中心状态图标尺寸（px，仅 circle/dashboard 生效）；不传时按 width 自适应（约 width/5.25） */
    iconSize: { type: Number, default: 0 },
    /** 打点列表（仅 line 生效），如 [{ percentage: 60, label: '及格' }] */
    marks: { type: Array as PropType<ProgressMark[]>, default: () => [] },
    /** 打点详情展示方式：tooltip 悬浮提示 / top 打点上方文字 / bottom 打点下方文字 */
    markPlacement: { type: String as PropType<'tooltip' | 'top' | 'bottom'>, default: 'tooltip' },
    /** 步骤数（>0 时启用步骤模式）：line 变为分断步骤条，circle 变为步骤进度圈 */
    steps: { type: Number, default: 0 },
    /** 步骤条相邻两段的间隔（px，仅 steps 模式 line 生效） */
    gap: { type: Number, default: 4 },
    /** 步骤圈相邻两段的角度间隔（deg，仅 steps 模式 circle 生效） */
    gapDegree: { type: Number, default: 0 },
  },
  emits: [],
  setup(props, { slots }) {
    // 进度截断到 0-100，非法输入回落 0
    const pct = computed(() => {
      const v = Number(props.percentage)
      if (Number.isNaN(v)) return 0
      return Math.min(100, Math.max(0, v))
    })

    // 实际填充色：color 字符串 / 分档数组 / 函数，均优先于 status 语义色
    const barColor = computed(() => {
      const c = props.color
      if (typeof c === 'string' && c) return c
      if (typeof c === 'function') return c(pct.value)
      if (Array.isArray(c) && c.length) {
        const stops = [...c].sort((a, x) => a.percentage - x.percentage)
        let hit = stops[0].color
        for (const s of stops) {
          if (pct.value >= s.percentage) hit = s.color
        }
        return hit
      }
      if (props.status) return STATUS_COLOR[props.status]
      return 'var(--k-color-primary)'
    })

    /* ========== 渐变色（color 为百分比键对象） ========== */
    // 渐变停点：[[0, '#108ee9'], [100, '#87d068']]，按百分比升序
    const gradientStops = computed<[number, string][] | null>(() => {
      const c = props.color as unknown
      if (c && typeof c === 'object' && !Array.isArray(c) && typeof c !== 'function') {
        const stops = Object.entries(c as Record<string, string>)
          .map(([k, v]) => [parseFloat(k), v] as [number, string])
          .filter(([p]) => !Number.isNaN(p))
          .sort((a, b) => a[0] - b[0])
        return stops.length ? stops : null
      }
      return null
    })

    // 渐变 id 需全页唯一（SVG url 引用按 id 查找）
    const gradId = `k-progress-gradient-${++gradientSeq}`

    // 直线填充背景：渐变对象 → CSS 渐变串；其余走 barColor（渐变字符串本身可直接作 background）
    const lineFill = computed(() => {
      if (gradientStops.value) {
        const stops = gradientStops.value.map(([p, c]) => `${c} ${p}%`).join(', ')
        return `linear-gradient(90deg, ${stops})`
      }
      return barColor.value
    })

    // 环形描边：渐变对象 → SVG linearGradient 引用（CSS 渐变串对 SVG stroke 无效）
    const circleStroke = computed(() =>
      gradientStops.value ? `url(#${gradId})` : barColor.value,
    )

    const renderGradientDefs = () => {
      if (!gradientStops.value) return null
      return (
        <defs>
          <linearGradient id={gradId} x1="100%" y1="0%" x2="0%" y2="100%">
            {gradientStops.value.map(([p, c]) => (
              <stop key={p} offset={`${p}%`} stop-color={c} />
            ))}
          </linearGradient>
        </defs>
      )
    }

    // 展示文字：format 优先，否则 "xx%"；indeterminate 时用流动百分比（下方 flowPct）
    const text = computed(() =>
      props.format ? props.format(displayPct.value) : `${displayPct.value}%`,
    )

    /* ========== indeterminate 流动百分比 ==========
     * 条宽恒为 100% 由 CSS 动画循环滑动，文字无法跟随真实进度，
     * 这里用一个与动画同周期的定时器让数字 0→99 循环递增，
     * 与流动动画保持一致的节奏，避免“条在动、数字钉死”的违和感 */
    const flowPct = ref(0)
    let flowTimer: ReturnType<typeof setInterval> | null = null
    const stopFlowTimer = () => {
      if (flowTimer) {
        clearInterval(flowTimer)
        flowTimer = null
      }
    }
    watch(
      () => [props.indeterminate, props.duration] as const,
      ([on, dur]) => {
        stopFlowTimer()
        if (!on) return
        const period = Math.max(0.1, dur) * 1000
        const started = Date.now()
        flowPct.value = 0
        flowTimer = setInterval(() => {
          const ratio = ((Date.now() - started) % period) / period
          flowPct.value = Math.min(99, Math.floor(ratio * 100))
        }, 100)
      },
      { immediate: true },
    )
    onBeforeUnmount(stopFlowTimer)

    // 文字使用的进度值：indeterminate 时取流动百分比，否则取真实进度
    const displayPct = computed(() => (props.indeterminate ? flowPct.value : pct.value))

    /* ========== 环形（circle / dashboard）几何 ========== */
    const radius = computed(() => (props.width - props.strokeWidth) / 2)
    const circumference = computed(() => 2 * Math.PI * radius.value)
    // dashboard 只画 3/4 圆弧，circle 画整圆
    const trackArc = computed(() =>
      props.type === 'dashboard' ? circumference.value * 0.75 : circumference.value,
    )
    // 进度弧长 = 轨道弧长 * 百分比
    const progressArc = computed(() => trackArc.value * (pct.value / 100))
    // circle 从正上方起始（-90°），dashboard 从左下 135° 起始顺时针画 3/4
    const startAngle = computed(() =>
      props.type === 'dashboard' ? 135 : -90,
    )
    const center = computed(() => props.width / 2)

    const renderTrack = () => (
      <circle
        cx={center.value}
        cy={center.value}
        r={radius.value}
        fill="none"
        stroke="var(--k-color-bg-tertiary)"
        stroke-width={props.strokeWidth}
        stroke-dasharray={`${trackArc.value} ${circumference.value}`}
        stroke-linecap={props.strokeLinecap}
        transform={`rotate(${startAngle.value} ${center.value} ${center.value})`}
      />
    )

    const renderProgress = () => (
      <circle
        class="k-progress__svg-progress"
        cx={center.value}
        cy={center.value}
        r={radius.value}
        fill="none"
        stroke={circleStroke.value}
        stroke-width={props.strokeWidth}
        stroke-dasharray={`${progressArc.value} ${circumference.value}`}
        stroke-linecap={props.strokeLinecap}
        transform={`rotate(${startAngle.value} ${center.value} ${center.value})`}
      />
    )

    // 环形中心状态图标的实际尺寸：iconSize 优先，否则按环形宽度自适应
    const statusIconSize = computed(() =>
      props.iconSize || Math.round(props.width * 0.19),
    )

    // 环形中心内容：插槽 > 状态图标 > 百分比文字（indeterminate 仅 line 生效，不涉及环形）
    const renderCircleCenter = () => {
      const custom = slots.default?.({ percentage: pct.value, status: props.status })
      if (custom) return <div class={e('text')}>{custom}</div>
      if (props.status && STATUS_ICON[props.status]) {
        return (
          <div class={[e('text'), m(props.status, true)]}>
            <KIcon name={STATUS_ICON[props.status]} style={{ fontSize: `${statusIconSize.value}px` }} />
          </div>
        )
      }
      if (!props.showText) return null
      return <div class={e('text')}>{text.value}</div>
    }

    // 直线右侧文字：插槽 > 百分比
    const renderLineText = () => {
      const custom = slots.default?.({ percentage: displayPct.value, status: props.status })
      if (custom) return <div class={[e('text'), props.status && m(props.status, true)]}>{custom}</div>
      if (!props.showText) return null
      return (
        <div
          class={[e('text'), props.status && m(props.status, true)]}
          style={{ color: barColor.value }}
        >
          {text.value}
        </div>
      )
    }

    // textInside 模式的条内文字：插槽 > 百分比
    const renderInnerText = () => {
      if (!props.textInside || !props.showText || props.indeterminate) return null
      const custom = slots.default?.({ percentage: displayPct.value, status: props.status })
      return <span class={e('inner-text')}>{custom ?? text.value}</span>
    }

    // 打点层（仅 line 生效）：进度条上按 percentage 位置打点，
    // tooltip 模式用 KTooltip 悬浮详情，top/bottom 模式在打点上方/下方展示文字
    const renderMarks = () => {
      if (!props.marks.length) return null
      return (
        <div class={[e('marks'), m(`marks-${props.markPlacement}`, true)]}>
          {props.marks.map((mk) => {
            const pos = Math.min(100, Math.max(0, Number(mk.percentage) || 0))
            const reached = pos <= pct.value
            // 白色空心圆：底色恒白，达到后仅边框染进度色
            const dotStyle: Record<string, string> = {}
            if (reached) dotStyle.borderColor = barColor.value
            const dot = <span class={[e('mark-dot'), reached && m('reached', true)]} style={dotStyle} />
            return (
              <div class={e('mark')} key={`${pos}-${mk.label}`} style={{ left: `${pos}%` }}>
                {props.markPlacement === 'tooltip' ? (
                  <KTooltip content={mk.label} placement="top">{dot}</KTooltip>
                ) : (
                  <>
                    {dot}
                    <span class={e('mark-label')}>{mk.label}</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )
    }

    // 步骤模式的填充段数：向下取整（50% / 5 步 → 2 段亮）
    const stepFilled = computed(() => {
      const n = Math.max(0, Math.floor(props.steps))
      if (!n) return 0
      return Math.min(n, Math.floor((n * pct.value) / 100 + 1e-6))
    })

    return () => {
      // 直线形态
      if (props.type === 'line') {
        const innerStyle: Record<string, string> = {
          width: props.indeterminate ? '100%' : `${pct.value}%`,
          background: lineFill.value,
        }
        if (props.indeterminate) {
          innerStyle.animationDuration = `${props.duration}s`
        }
        // 步骤模式：bar-outer 变为分断排列，已填充段染进度色
        const stepCount = Math.max(0, Math.floor(props.steps))
        const stepSegs =
          stepCount > 0
            ? Array.from({ length: stepCount }, (_, i) => (
                <div
                  key={i}
                  class={e('step')}
                  style={{ background: i < stepFilled.value ? lineFill.value : 'var(--k-color-bg-tertiary)' }}
                />
              ))
            : null
        return (
          <div
            class={[
              b(),
              m('line', true),
              props.indeterminate && m('indeterminate', true),
              props.status && m(props.status, true),
              props.marks.length && props.markPlacement === 'bottom' && m('marks-bottom', true),
              props.marks.length && props.markPlacement === 'top' && m('marks-top', true),
            ]}
          >
            <div
              class={e('bar')}
              style={{ height: `${props.strokeWidth}px` }}
            >
              <div
                class={e('bar-outer')}
                style={stepSegs ? { display: 'flex', gap: `${props.gap}px` } : undefined}
              >
                {stepSegs ?? (
                  <div class={e('bar-inner')} style={innerStyle}>
                    {renderInnerText()}
                  </div>
                )}
              </div>
              {renderMarks()}
            </div>
            {!props.textInside && renderLineText()}
          </div>
        )
      }

      // 环形 / 仪表盘形态（steps > 0 时为步骤进度圈：整圈分为 steps 段，段间留 gapDegree 角度）
      const circleStepCount = Math.max(0, Math.floor(props.steps))
      const renderCircleSteps = () => {
        const segAngle = (360 - props.gapDegree * circleStepCount) / circleStepCount
        const segArc = (circumference.value * segAngle) / 360
        const circles = []
        for (let i = 0; i < circleStepCount; i++) {
          const angle = startAngle.value + i * (segAngle + props.gapDegree)
          const isFilled = i < stepFilled.value
          circles.push(
            <circle
              key={i}
              cx={center.value}
              cy={center.value}
              r={radius.value}
              fill="none"
              stroke={isFilled ? circleStroke.value : 'var(--k-color-bg-tertiary)'}
              stroke-width={props.strokeWidth}
              stroke-dasharray={`${segArc} ${circumference.value - segArc}`}
              stroke-linecap={props.strokeLinecap}
              transform={`rotate(${angle} ${center.value} ${center.value})`}
            />,
          )
        }
        return circles
      }
      return (
        <div
          class={[
            b(),
            m(props.type, true),
            props.status && m(props.status, true),
          ]}
          style={{ width: `${props.width}px`, height: `${props.width}px` }}
        >
          <svg class={e('svg')} width={props.width} height={props.width} viewBox={`0 0 ${props.width} ${props.width}`}>
            {renderGradientDefs()}
            {circleStepCount > 0 ? renderCircleSteps() : (
              <>
                {renderTrack()}
                {renderProgress()}
              </>
            )}
          </svg>
          {renderCircleCenter()}
        </div>
      )
    }
  },
})
