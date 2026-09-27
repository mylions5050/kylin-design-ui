import { computed, defineComponent, type PropType, type VNode } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import KTooltip from '@/components/tooltip/index'
import type { KStepItem, KStepStatus, KStepTooltip } from './types'
import './index.scss'

const [b, e] = createBem('k-steps')

export type { KStepItem, KStepStatus, KStepsProps, KStepsEmits } from './types'

/** 状态 → 内置图标名 */
const statusIconMap: Record<string, string> = {
  finish: 'select-bold',
  error: 'close',
  success: 'success',
  warning: 'warning',
}

/**
 * KSteps —— 步骤条。
 *
 * 参考 Ant Design Steps 设计，用于引导用户按流程完成任务的导航条。
 */
export default defineComponent({
  name: 'KSteps',
  props: {
    /** 步骤数据源 */
    items: { type: Array as PropType<KStepItem[]>, default: () => [] },
    /** 当前步骤索引（0 起），支持 v-model:current */
    current: { type: Number, default: undefined },
    /** 非受控模式下初始步骤索引 */
    defaultCurrent: { type: Number, default: 0 },
    /** 布局方向 */
    direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
    /** 全局步骤状态：process（默认）| finish | error | success | warning。设置后所有步骤覆盖为此状态 */
    status: { type: String as PropType<'process' | 'finish' | 'error' | 'success' | 'warning'>, default: 'process' },
    /** 尺寸：default | small | mini */
    size: { type: String as PropType<'default' | 'small' | 'mini'>, default: 'default' },
    /** 是否支持点击步骤切换 */
    clickable: { type: Boolean, default: false },
    /** 类型：default 上下结构 | inline 左右结构（圆点居左、文本在右侧） */
    type: { type: String as PropType<'default' | 'inline'>, default: 'default' },
    /** 图标尺寸（px） */
    iconSize: { type: Number, default: 20 },
    /** 纵向布局时每个步骤的最小高度（px），缺省 120 */
    minHeight: { type: Number, default: 120 },
  },
  emits: ['update:current', 'step-click', 'current-change'],
  setup(props, { slots, emit }) {
    // 当前激活索引
    const current = computed(() => {
      const raw = props.current !== undefined ? props.current : props.defaultCurrent
      return Math.max(0, Math.min(raw, props.items.length - 1))
    })

    /** 计算第 index 步的状态 */
    function resolveStatus(index: number, item: KStepItem): KStepStatus {
      if (item.status) return item.status
      // 全局 status 设置后，所有步骤都应用该状态（默认 process 只影响当前步骤）
      if (props.status !== 'process') {
        // 非 process 的全局状态覆盖所有步骤
        return props.status
      }
      if (index < current.value) return 'finish'
      if (index === current.value) return props.status
      return 'wait'
    }

    function handleStepClick(index: number, item: KStepItem) {
      if (!props.clickable || item.disabled) return
      emit('update:current', index)
      emit('step-click', { index, item })
      emit('current-change', { index, item })
    }

    /** 标准化 tooltip：字符串直接作为 content，对象展开 */
    function normalizeTooltip(item: KStepItem): { content?: string; disabled: boolean; theme?: 'light' | 'dark' } {
      if (!item.tooltip) return { disabled: true }
      if (typeof item.tooltip === 'string') return { content: item.tooltip, disabled: false, theme: 'dark' }
      return { content: item.tooltip.content, disabled: false, theme: item.tooltip.theme ?? 'dark' }
    }

    /** 渲染图标 */
    function renderIcon(index: number, item: KStepItem, status: KStepStatus) {
      // 插槽优先
      const iconNode: VNode[] = slots.icon?.({ index, item, status, active: index === current.value }) ?? []
      if (iconNode.length) return iconNode
      // items[].icon
      if (item.icon) return <KIcon name={item.icon} size={props.iconSize} />
      // 状态内置图标
      const statusIcon = statusIconMap[status]
      if (statusIcon) return <KIcon name={statusIcon} size={Math.max(12, props.iconSize - 4)} />
      // 序号
      return <span class={e('num')}>{index + 1}</span>
    }

    const rootStyle = computed<Record<string, string> | undefined>(() => {
      if (props.direction === 'vertical' && props.minHeight !== 120) {
        return { '--k-steps-min-height': `${props.minHeight}px` }
      }
      return undefined
    })

    return () => {
      const nodes: VNode[] = []
      props.items.forEach((item, index) => {
        const status = resolveStatus(index, item)
        const isActive = index === current.value
        const isLast = index === props.items.length - 1
        // tail 连接当前节点到下一个节点：当前步骤已完成或进行中则蓝色
        const tailActive = status === 'finish' || status === 'process' || status === 'success'
        nodes.push(
          <div
            key={index}
            class={[
              e('node'),
              `is-${status}`,
              {
                'is-active': isActive,
                'is-clickable': props.clickable && !item.disabled,
                'is-disabled': item.disabled,
                'is-last': isLast,
              },
            ]}
            onClick={() => handleStepClick(index, item)}
          >
            {props.type === 'inline' ? (
              <>
                <div class={e('header')}>
                  <KTooltip content={normalizeTooltip(item).content} theme={normalizeTooltip(item).theme} disabled={normalizeTooltip(item).disabled}>
                    <div class={[e('icon'), { 'is-fill': item.fill }]}>{renderIcon(index, item, status)}</div>
                  </KTooltip>
                  <div class={e('title')}>
                    <span class={e('title-text')}>{item.title}</span>
                    {item.subTitle && <span class={e('subtitle')}>{item.subTitle}</span>}
                  </div>
                  {!isLast && <span class={[e('tail'), { 'is-active': tailActive, [`is-${status}`]: true }]} />}
                </div>
                {item.description && <div class={e('desc')}>{item.description}</div>}
              </>) : (
              <>
                <KTooltip content={normalizeTooltip(item).content} theme={normalizeTooltip(item).theme} disabled={normalizeTooltip(item).disabled}>
                  <div class={[e('icon'), { 'is-fill': item.fill }]}>{renderIcon(index, item, status)}</div>
                </KTooltip>
                <div class={e('content')}>
                  <div class={e('title')}>
                    <span class={e('title-text')}>{item.title}</span>
                    {item.subTitle && <span class={e('subtitle')}>{item.subTitle}</span>}
                  </div>
                  {item.description && <div class={e('desc')}>{item.description}</div>}
                </div>
              </>)}
            {props.type !== 'inline' && !isLast && <span class={[e('tail'), { 'is-active': tailActive, [`is-${status}`]: true }]} />}
          </div>,
        )
      })

      return (
        <div
          class={[
            b(),
            `is-${props.direction}`,
            `is-${props.size}`,
            `is-${props.type}`,
          ]}
          style={rootStyle.value}
        >
          {nodes}
        </div>
      )
    }
  },
})