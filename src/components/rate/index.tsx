import { defineComponent, ref, computed, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import './index.scss'

const [b, e] = createBem('k-rate')

/**
 * Rate 评分。
 *
 * 用于快捷的星级评价：v-model 绑定当前评分（Number），悬浮预览效果，
 * 点击图标完成评分。选中态为 favorite-filling 实心图标，未选态用
 * 灰色呈现同一实心图标。
 */
export default defineComponent({
  name: 'KRate',
  props: {
    /** 当前评分（1 起，允许 0.5 步进；支持 v-model） */
    modelValue: { type: Number, default: 0 },
    /** 星星总数 */
    count: { type: Number, default: 5 },
    /** 是否禁用：整体变灰降透明、显示禁用光标 */
    disabled: { type: Boolean, default: false },
    /**
     * 是否只读：保持完整颜色视觉，仅不可交互（无悬浮预览与点击），
     * 常用于详情页展示历史评分；与 disabled 的区别是不改变外观
     */
    readonly: { type: Boolean, default: false },
    /** 图标尺寸（px） */
    size: { type: Number, default: 18 },
    /** 是否允许半星选择：悬浮/点击图标前半部分记 0.5 分 */
    allowHalf: { type: Boolean, default: false },
    /** 星星选中填充色；不传时使用默认金黄 */
    color: { type: String, default: '' },
    /**
     * 自定义字符：传入后以该字符替代星星图标展示（如 'A'、'好'），
     * 与 allowHalf / color / size 能力完全兼容
     */
    character: { type: String, default: '' },
    /**
     * 自定义 iconfont 图标名（如 'good'、'fabulous'）；
     * 未传时使用默认的 favorite-filling；character 优先级更高
     */
    icon: { type: String, default: '' },
    /**
     * 按等级排列的自定义字符/文案数组（如 ['差', '中', '良', '优']），
     * 第 value 级展示 texts[value - 1]；传入后覆盖 character 与 icon
     */
    texts: { type: Array as PropType<string[]>, default: () => [] },
    /**
     * 按等级排列的填充色数组（如 ['#ff4d4f', '#faad14', '#52c41a']），
     * 第 value 级选中时使用 colors[value - 1]；超出长度时沿用最后一个
     */
    colors: { type: Array as PropType<string[]>, default: () => [] },
  },
  emits: [
    /** v-model：评分变化时触发，载荷为当前评分数值 */
    'update:modelValue',
    /** 评分变化时触发，载荷为当前评分数值 */
    'change',
  ],
  setup(props, { emit }) {
    /** 悬浮预览的评分；离开整体后为 null，回落显示 modelValue */
    const hoverValue = ref<number | null>(null)

    /** 悬浮时用悬浮值预览，否则显示当前评分 */
    const displayValue = computed(() => hoverValue.value ?? props.modelValue)

    /**
     * 依据鼠标在图标上的横向落点解析实际评分：
     * 开启 allowHalf 时，落在图标左半部分记 0.5 分。
     * 用 clientX 与元素矩形计算（offsetX 会因事件源是内层图标而偏移）
     */
    const resolveValue = (value: number, ev: MouseEvent): number => {
      if (!props.allowHalf) return value
      const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect()
      return ev.clientX - rect.left < rect.width / 2 ? value - 0.5 : value
    }

    const handleMove = (value: number, ev: MouseEvent) => {
      if (props.disabled || props.readonly) return
      hoverValue.value = resolveValue(value, ev)
    }

    const handleLeave = () => {
      hoverValue.value = null
    }

    const handleClick = (value: number, ev: MouseEvent) => {
      if (props.disabled || props.readonly) return
      const next = resolveValue(value, ev)
      emit('update:modelValue', next)
      emit('change', next)
    }

    const items = computed(() =>
      Array.from({ length: props.count }, (_, i) => i + 1),
    )

    /** 当前星星的填充百分比：整星 100、半星 50、未选 0 */
    const fillPercent = (value: number): number => {
      const diff = displayValue.value - (value - 1)
      if (diff <= 0) return 0
      if (diff >= 1) return 100
      return Math.round(diff * 100)
    }

    /** 自定义颜色经由 CSS 变量下传到填充层 */
    const rootStyle = computed<Record<string, string>>(() =>
      props.color ? { '--k-rate-color': props.color } : {},
    )

    /** 第 value 级的展示内容：texts 优先，其次 character，最后是图标 */
    const itemContent = (value: number) => {
      const text = props.texts[value - 1] ?? props.character
      if (text) {
        return <span class={e('char')}>{text}</span>
      }
      return <KIcon name={props.icon || 'favorite-filling'} class={e('star')} />
    }

    /** 第 value 级的填充色：colors 数组优先，超出长度沿用最后一个，否则走默认变量 */
    const levelColor = (value: number): string | undefined => {
      if (!props.colors.length) return undefined
      return props.colors[Math.min(value - 1, props.colors.length - 1)]
    }

    return () => (
      <div
        class={[
          b(),
          props.disabled && e('disabled'),
          props.readonly && e('readonly'),
        ]}
        style={rootStyle.value}
        onMouseleave={handleLeave}
      >
        {items.value.map((value) => {
          const percent = fillPercent(value)
          return (
            <span
              key={value}
              class={e('item')}
              style={{ fontSize: `${props.size}px` }}
              onMousemove={(ev: MouseEvent) => handleMove(value, ev)}
              onClick={(ev: MouseEvent) => handleClick(value, ev)}
            >
              {/* 底层灰色内容；上层按宽度截取的主题色内容表达整星/半星 */}
              {itemContent(value)}
              {percent > 0 && (
                <span
                  class={e('fill')}
                  style={{
                    width: `${percent}%`,
                    ...(levelColor(value)
                      ? { color: levelColor(value) }
                      : null),
                  }}
                >
                  {itemContent(value)}
                </span>
              )}
            </span>
          )
        })}
      </div>
    )
  },
})
