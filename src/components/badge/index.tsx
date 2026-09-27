import { defineComponent, computed, type PropType, type CSSProperties } from 'vue'
import { createBem } from '@/utils/create-bem'
import './index.scss'

const [b, e, m, v] = createBem('k-badge')

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning'
export type BadgeSize = 'default' | 'small'

/**
 * KBadge — 徽标数，出现在图标或头像右上角的圆形徽标数字。
 *
 * 三种用法：
 *  - 包裹元素（默认插槽）：数字角标附着在子元素右上角，`count` 为 0 时
 *    默认隐藏（`showZero` 显示）；超过 `overflowCount`（默认 99）显示为
 *    "99+"；`dot` 只显示小红点不显示数字；`size="small"` 小号徽标；
 *    `offset: [x, y]` 向右/向上微调角标位置；
 *  - 独立数字：不包裹元素直接渲染徽标，`color` 自定义底色；
 *  - 状态点：`status` 设置 success / processing（带扩散光环动画）/
 *    default / error / warning，配 `text` 显示右侧说明文字。
 *
 * 徽标内容可用 `count` 插槽完全自定义（如替换为图标）。
 */
const KBadge = defineComponent({
  name: 'KBadge',
  props: {
    /** 展示的数字；大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏（dot 模式下未传则恒显红点） */
    count: { type: Number, default: undefined },
    /** 封顶数字，超过显示为 `${overflowCount}+` */
    overflowCount: { type: Number, default: 99 },
    /** 不展示数字，只有一个小红点 */
    dot: { type: Boolean, default: false },
    /** 数值为 0 时是否展示徽标 */
    showZero: { type: Boolean, default: false },
    /** 设置为状态点：success / processing / default / error / warning */
    status: { type: String as PropType<BadgeStatus>, default: undefined },
    /** 自定义小圆点/徽标颜色 */
    color: { type: String, default: undefined },
    /** 状态点右侧的说明文字（status / color 模式下生效） */
    text: { type: String, default: undefined },
    /** 位置偏移 [x, y]：相对默认位置向右 / 向上偏移的像素 */
    offset: { type: Array as unknown as PropType<[number, number]>, default: undefined },
    /** 徽标大小：default（默认）/ small（小号），仅 count 徽标有效 */
    size: { type: String as PropType<BadgeSize>, default: 'default' },
    /** 鼠标悬停在徽标上时显示的原生 title */
    title: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    /** 是否包裹了子元素（决定角标附着 or 独立展示） */
    const hasChildren = computed(() => {
      const nodes = slots.default?.() ?? []
      return nodes.some((n) => n.type !== Comment && (n.type !== Text || String(n.children ?? '').trim()))
    })

    const isStatus = computed(() => Boolean(props.status))

    /** 徽标是否可见：状态点恒显；dot 未传 count（或 >0 / showZero）恒显；数字看 count/showZero */
    const visible = computed(() => {
      if (isStatus.value) return true
      if (props.dot) return props.count === undefined || props.count > 0 || props.showZero
      return (props.count ?? 0) > 0 || props.showZero
    })

    /** 徽标文本：封顶后显示 `${overflowCount}+` */
    const countText = computed(() => {
      if (props.dot || isStatus.value) return ''
      const count = props.count ?? 0
      if (count > props.overflowCount) return `${props.overflowCount}+`
      return String(count)
    })

    const supClasses = computed(() => [
      e('sup'),
      m('dot', props.dot || isStatus.value),
      m('custom', Boolean(slots.count)),
      v('small', props.size === 'small' && !props.dot && !isStatus.value),
      props.status ? m(props.status, true) : '',
    ])

    const supStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      if (props.color) style.backgroundColor = props.color
      if (props.offset) {
        const [x, y] = props.offset
        // 附着角标：基础位移(50%, -50%)之上叠加；独立使用在 scss 中覆盖为静态
        style.transform = `translate(50%, -50%) translate(${x || 0}px, ${-(y || 0)}px)`
      }
      return style
    })

    const renderSup = () =>
      visible.value && (
        <sup class={supClasses.value} style={supStyle.value} title={props.title}>
          {slots.count?.() ?? countText.value}
        </sup>
      )

    return () => {
      if (hasChildren.value) {
        return (
          <span class={b()}>
            {slots.default?.()}
            {renderSup()}
          </span>
        )
      }
      // 独立使用：徽标（数字 / 状态点）+ 可选说明文字
      return (
        <span class={[b(), v('standalone', true)]}>
          {renderSup()}
          {(props.status || props.color) && props.text && (
            <span class={e('text')}>{props.text}</span>
          )}
        </span>
      )
    }
  },
})

export { KBadge }
export default KBadge
