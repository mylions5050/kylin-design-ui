import {
  computed,
  defineComponent,
  ref,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import type { KCollapseItem } from './types'
import './index.scss'

const [b, e, m, v] = createBem('k-collapse')

type Key = string | number

/** 把 modelValue / defaultValue 归一成数组：手风琴取第一个，undefined 归空 */
function normalizeKeys(value: Key | Key[] | undefined, accordion: boolean): Key[] {
  if (value == null || value === ('' as Key)) return []
  const arr = Array.isArray(value) ? value : [value]
  return accordion ? arr.slice(0, 1) : arr
}

export default defineComponent({
  name: 'KCollapse',
  props: {
    /**
     * v-model 当前激活面板的 key：手风琴模式下为单个 key（string | number），
     * 否则为 key 数组；传 undefined / '' 表示全部收起
     */
    modelValue: {
      type: [String, Number, Array] as PropType<Key | Key[]>,
      default: undefined,
    },
    /** 非受控模式下的初始激活 key（语义同 modelValue） */
    defaultValue: {
      type: [String, Number, Array] as PropType<Key | Key[]>,
      default: undefined,
    },
    /** 数据驱动的折叠面板列表 */
    items: { type: Array as PropType<KCollapseItem[]>, default: () => [] },
    /** 手风琴模式：同一时刻最多展开一个面板，展开新面板时自动收起旧面板 */
    accordion: { type: Boolean, default: false },
    /** 切换图标位置：start 标题左侧（AntD 默认）/ end 整行最右（extra 之后） */
    expandIconPlacement: {
      type: String as PropType<'start' | 'end'>,
      default: 'start',
    },
    /** 是否显示展开图标（同时控制默认箭头与 expandIcon 插槽） */
    showExpandIcon: { type: Boolean, default: true },
    /** 触发折叠的方式：header 点击整行 / icon 仅点击图标 / disabled 不可交互折叠（语义同 AntD collapsible） */
    collapsible: {
      type: String as PropType<'header' | 'icon' | 'disabled'>,
      default: 'header',
    },
    /** 幽灵模式：透明无边框，适合嵌在有背景色的容器里 */
    ghost: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit, slots }) {
    /* ====================== 激活 key 管理（半受控） ====================== */

    const innerKeys = ref<Key[]>(normalizeKeys(props.modelValue ?? props.defaultValue, props.accordion))

    // 外部受控值变化时同步内部（undefined 时不回写，保留内部状态）
    watch(
      () => props.modelValue,
      (val) => {
        if (val != null) innerKeys.value = normalizeKeys(val, props.accordion)
      },
    )

    /** 展开状态收口：无论外部怎么传，激活集合永远合法（手风琴最多一个） */
    const activeKeys = computed(() => {
      const legal = innerKeys.value.filter((k) => props.items.some((it) => it.key === k))
      return props.accordion ? legal.slice(0, 1) : legal
    })

    const toggle = (item: KCollapseItem) => {
      if (item.disabled) return
      const active = activeKeys.value.includes(item.key)
      const next = props.accordion
        ? active
          ? []
          : [item.key]
        : active
          ? activeKeys.value.filter((k) => k !== item.key)
          : [...activeKeys.value, item.key]

      innerKeys.value = next
      const out = props.accordion ? (next[0] ?? '') : next
      emit('update:modelValue', out)
      emit('change', out)
    }

    /* ====================== 渲染 ====================== */

    const renderHeader = (item: KCollapseItem) => {
      const active = activeKeys.value.includes(item.key)
      const headerTrigger = props.collapsible === 'header'
      const canToggle = props.collapsible !== 'disabled' && !item.disabled

      const arrow = slots.expandIcon ? (
        slots.expandIcon({ item, active })
      ) : (
        <KIcon class={[e('arrow'), m('active', active)]} name="arrow-right" />
      )

      const onIconClick = (ev: MouseEvent) => {
        // 阻止冒泡：header 模式下避免触发两次 toggle，icon 模式下避免误触标题栏
        ev.stopPropagation()
        if (canToggle) toggle(item)
      }

      const renderIcon = () =>
        props.showExpandIcon && (
          <span class={[e('icon'), m('disabled', !canToggle)]} onClick={onIconClick}>
            {arrow}
          </span>
        )

      return (
        <div
          class={[e('header'), m('disabled', item.disabled)]}
          role={headerTrigger ? 'button' : undefined}
          tabindex={headerTrigger && !item.disabled ? 0 : -1}
          aria-expanded={active}
          aria-disabled={item.disabled || undefined}
          onClick={() => headerTrigger && toggle(item)}
          onKeydown={(ev: KeyboardEvent) => {
            if (headerTrigger && (ev.key === 'Enter' || ev.key === ' ')) {
              ev.preventDefault()
              toggle(item)
            }
          }}
        >
          {props.expandIconPlacement === 'start' && renderIcon()}
          <span class={e('title')}>{item.label}</span>
          {item.extra != null && <span class={e('extra')}>{item.extra}</span>}
          {props.expandIconPlacement === 'end' && renderIcon()}
        </div>
      )
    }

    const renderItem = (item: KCollapseItem) => {
      const active = activeKeys.value.includes(item.key)
      return (
        <div class={[e('item'), m('active', active), m('disabled', item.disabled)]}>
          {renderHeader(item)}
          <div class={[e('content-wrap'), m('active', active)]}>
            <div class={e('content')}>
              <div class={e('content-inner')}>
                {item.children != null ? item.children : slots.default?.({ item })}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return () => (
      <div
        class={[
          b(),
          v('ghost', props.ghost),
          v('icon-trigger', props.collapsible === 'icon'),
          v('disabled-trigger', props.collapsible === 'disabled'),
        ]}
      >
        {props.items.map(renderItem)}
      </div>
    )
  },
})
