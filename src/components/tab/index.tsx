import {
  cloneVNode,
  computed,
  defineComponent,
  Fragment,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type PropType,
  type VNode,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import type { KTabItem } from './types'
import './index.scss'

const [, e] = createBem('k-tab')

/** 兜底生成不重复的 tab key（避免依赖模块级计数器；主键优先用 <KTabPane> 的 k 或 instance.uid） */
function genKey() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/** 面板元信息：key + label + 是否可关闭 + 原始 vnode */
interface TabPaneInfo {
  key: string
  label: string
  closable: boolean
  vnode: VNode
}

export default defineComponent({
  name: 'KTab',
  props: {
    /** v-model 当前激活项 key */
    modelValue: { type: String, default: '' },
    /** 非受控模式下的初始激活 key */
    defaultKey: { type: String, default: '' },
    /** 数据驱动的选项卡列表（也可用默认插槽放 <KTabPane>） */
    items: { type: Array as PropType<KTabItem[]>, default: () => [] },
    /** 是否均分：每个选项卡平分局内宽度（默认 false 按内容自适应） */
    stretch: { type: Boolean, default: false },
    /** 全局可关闭：开启后所有选项卡头上显示关闭按钮（也可通过 KTabPane 的 closable 单独控制） */
    closable: { type: Boolean, default: false },
    /** 是否显示“添加选项卡”按钮（+） */
    addable: { type: Boolean, default: false },
    /** 关闭前钩子：返回 false 或 reject 的 Promise 可阻止关闭 */
    beforeRemove: { type: Function as PropType<() => boolean | Promise<boolean>>, default: undefined },
    /** 选项内边距，例如 "8px 16px"；缺省使用默认值 */
    itemPadding: { type: String, default: '' },
    /** 选项外边距，例如 "0 4px"；缺省使用默认 gap */
    itemMargin: { type: String, default: '' },
    /** 选项卡过多时是否支持滚动（前后箭头 + 鼠标拖拽） */
    scrollable: { type: Boolean, default: false },
    /** 下划线指示条宽度策略：\'full\' 整条 item 宽（默认）；\'label\' 精确跟随文字宽度并居中 */
    indicator: {
      type: String as PropType<'full' | 'label'>,
      default: 'full',
    },
    /** 指示条是否带滑动动画（默认 true）；设 false 时横线切换无滑动过渡 */
    indicatorTransition: { type: Boolean, default: true },
    /** 自定义下划线指示条样式（追加内联样式：颜色/高度/圆角等） */
    indicatorStyle: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
    /** 自定义下划线指示条追加的类名（便于覆盖样式） */
    indicatorClass: { type: String, default: '' },
    /** 主题色：控制 hover / 激活文字颜色及下划线指示条颜色；缺省用 primary（默认蓝） */
    activeColor: { type: String, default: '' },
    /** 控件的可访问标签 */
    ariaLabel: { type: String, default: '选项卡' },
  },
  emits: ['update:modelValue', 'tab-click', 'tab-change', 'tab-remove', 'add'],
  setup(props, { slots, emit }) {
    const instance = getCurrentInstance()
    const hasModel = computed(() => instance?.vnode.props?.modelValue !== undefined)

    // 内部激活键（非受控时使用）
    const internalKey = ref(props.modelValue || props.defaultKey || '')

    const activeKey = computed(() => (hasModel.value ? props.modelValue : internalKey.value))

    // 解析数据源：优先 items，否则解析默认插槽里的 KTabPane。
    const panes = computed<TabPaneInfo[]>(() => {
      if (props.items.length) {
        return props.items.map((it, i) => ({
          key: String(it.key ?? it.value ?? it.label ?? i),
          label: String(it.label ?? it.value ?? ''),
          closable: Boolean(it.closable ?? props.closable),
          vnode: undefined as unknown as VNode,
        }))
      }
      const nodes = flattenPanes(slots.default?.() ?? [])
      const result: TabPaneInfo[] = []
      for (const vnode of nodes) {
        const compName = (vnode.type as { name?: string } | null)?.name
        if (typeof vnode.type === 'object' && compName === 'KTabPane') {
          const p = (vnode.props ?? {}) as Record<string, unknown>
          const key =
            (typeof vnode.key === 'string' ? vnode.key : (p.k as string)) ||
            `tab-${result.length}-${genKey()}`
          result.push({
            key,
            label: (p.label as string) ?? '',
            closable: Boolean(p.closable ?? props.closable),
            vnode,
          })
        }
      }
      return result
    })

    // 实际激活的 key；若无效则回退到第一项。
    const currentActive = computed(() => {
      const raw = activeKey.value
      const keys = panes.value.map((p) => p.key)
      if (raw && keys.includes(raw)) return raw
      return panes.value[0]?.key ?? ''
    })

    function select(key: string) {
      if (key === currentActive.value) return
      const pane = panes.value.find((p) => p.key === key)
      const label = pane?.label ?? ''
      internalKey.value = key
      if (hasModel.value) emit('update:modelValue', key)
      emit('tab-click', { key, label })
      emit('tab-change', { key, label })
    }

    // 关闭选项卡：emit tab-remove，具体删除交由父组件（移除对应 items 项或 KTabPane）。
    // 若关闭的是当前激活项，父组件更新 v-model 后 currentActive 会自动回退到第一项。
    function handleRemove(key: string, event?: Event) {
      event?.stopPropagation()
      event?.preventDefault()
      const pending = props.beforeRemove?.() ?? true
      const done = () => emit('tab-remove', { key, label: panes.value.find((p) => p.key === key)?.label ?? '' })
      if (pending instanceof Promise) {
        pending.then((r) => r && done()).catch(() => {})
      } else if (pending !== false) {
        done()
      }
    }

    // 点击添加按钮
    function handleAdd(event: Event) {
      event?.stopPropagation()
      emit('add')
    }

    // ===== 下划线指示条：测量激活项位置，让滑块平滑跟随 =====
    const navRef = ref<HTMLElement | null>(null)
    const scrollRef = ref<HTMLElement | null>(null)
    const indicatorStyle = ref<{ left: string; width: string }>({ left: '0px', width: '0px' })

    function updateIndicator() {
      nextTick(() => {
        const nav = navRef.value
        const scrollEl = scrollRef.value
        if (!nav) return
        const activeKeyNow = currentActive.value
        const activeItem = Array.from(nav.children).find(
          (el) => el instanceof HTMLElement && el.dataset.key === activeKeyNow,
        ) as HTMLElement | undefined
        if (!activeItem) {
          indicatorStyle.value = { left: '0px', width: '0px' }
          return
        }
        // 注意减去 scroll 容器当前的滚动偏移
        const scrollLeft = scrollEl ? scrollEl.scrollLeft : 0
        const itemLeft = activeItem.offsetLeft - scrollLeft

        if (props.indicator === 'label') {
          // “跟随文字”模式：横线左端与文字左端对齐，宽度精确等于文字宽度（实现文字级横线）
          const label = activeItem.querySelector<HTMLElement>('.k-tab__label')
          if (!label) {
            indicatorStyle.value = { left: `${itemLeft}px`, width: `${activeItem.offsetWidth}px` }
            return
          }
          indicatorStyle.value = {
            left: `${itemLeft + label.offsetLeft}px`,
            width: `${label.offsetWidth}px`,
          }
          return
        }

        // 默认模式：整条 item 宽
        indicatorStyle.value = {
          left: `${itemLeft}px`,
          width: `${activeItem.offsetWidth}px`,
        }
      })
    }

    // ===== 溢出滚动：判断是否超出、前后箭头、拖拽 =====
    const overflow = ref(false)

    function checkOverflow() {
      nextTick(() => {
        const el = scrollRef.value
        if (!el || !props.scrollable) {
          overflow.value = false
          return
        }
        overflow.value = el.scrollWidth > el.clientWidth + 1
      })
    }

    // 箭头项级定位：围绕“当前激活项(activeKey)”步进。
    //  - 右箭头：切换到激活项的下一个 tab 并滚动聚焦
    //  - 左箭头：切换到激活项的上一个 tab 并滚动聚焦
    // 例如激活“标签 12”时按左箭头 → 切换到“标签 11”并使其可见。
    // 激活切换交给 select()（触发 v-model / tab-click / tab-change），
    // 滚动聚焦由 watch(currentActive) 中的 scrollTo 居中逻辑自动完成。
    function scrollArrow(dir: 1 | -1) {
      const nav = navRef.value
      if (!nav) return
      const itemCount = nav.children.length
      if (itemCount === 0) return

      let activeIndex = -1
      for (let i = 0; i < itemCount; i++) {
        if ((nav.children[i] as HTMLElement).dataset.key === currentActive.value) {
          activeIndex = i
          break
        }
      }
      if (activeIndex === -1) return

      const targetIndex = activeIndex + dir
      if (targetIndex < 0 || targetIndex >= itemCount) return

      const targetKey = (nav.children[targetIndex] as HTMLElement).dataset.key
      if (targetKey) select(targetKey)
    }

    // 拖拽逻辑（pointer events）
    const dragState = ref<{ startX: number; startLeft: number; dragging: boolean } | null>(null)

    function onPointerDown(ev: PointerEvent) {
      if (!props.scrollable) return
      const el = scrollRef.value
      if (!el) return
      // 只响应主键
      if (ev.button !== 0) return
      dragState.value = { startX: ev.clientX, startLeft: el.scrollLeft, dragging: true }
    }

    function onPointerMove(ev: PointerEvent) {
      const st = dragState.value
      const el = scrollRef.value
      if (!st?.dragging || !el) return
      const dx = ev.clientX - st.startX
      el.scrollLeft = st.startLeft - dx
      // 拖拽时实时更新指示条
      updateIndicator()
    }

    function onPointerUp() {
      const st = dragState.value
      if (st?.dragging) updateIndicator()
      dragState.value = null
    }

    // 监听 nav 尺寸变化以更新溢出态与指示条
    let resizeObserver: ResizeObserver | null = null
    // 用 rAF 节流的统一刷新：滚动 / resize 都走这里，一帧内只重算一次
    const rafPending = ref(false)
    function refresh() {
      if (rafPending.value) return
      rafPending.value = true
      requestAnimationFrame(() => {
        rafPending.value = false
        checkOverflow()
        updateIndicator()
      })
    }

    onMounted(() => {
      updateIndicator()
      checkOverflow()
      // 监听滚动，横向滚动时实时跟随（解决“滚动后指示条偏移”问题）
      if (scrollRef.value) {
        scrollRef.value.addEventListener('scroll', refresh)
      }
      // 同时观察 scroll 容器与 nav，任一尺寸变化（含窗口缩放、stretch、内外边距）都重算
      const targets: (HTMLElement | null)[] = [scrollRef.value, navRef.value]
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(refresh)
        for (const el of targets) {
          if (el) resizeObserver.observe(el)
        }
      }
    })

    onBeforeUnmount(() => {
      resizeObserver?.disconnect()
      resizeObserver = null
      scrollRef.value?.removeEventListener('scroll', refresh)
    })

    // 切换激活项后同步重算（受控/非受控都覆盖）
    watch(currentActive, () => {
      updateIndicator()
      if (props.scrollable) {
        nextTick(() => {
          const el = scrollRef.value
          if (!el) return
          const activeEl = el.querySelector<HTMLElement>('[data-key="' + currentActive.value + '"]')
          if (activeEl) {
            const target = activeEl.offsetLeft - (el.clientWidth - activeEl.offsetWidth) / 2
            el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
          }
        })
      }
    })

    // 尺寸相关 props 变化时强制重算指示条与溢出态
    watch(
      () => [props.stretch, props.itemPadding, props.itemMargin, props.indicator, props.scrollable],
      () => {
        updateIndicator()
        checkOverflow()
      },
    )

    // ===== 渲染 =====
    const render = () => {
      // 通过 CSS 变量统一注入（避免在 N 个 item 上内联 style 膨胀）
      const rootStyle: Record<string, string> = {}
      if (props.activeColor) rootStyle['--k-tab-active-color'] = props.activeColor
      if (props.itemPadding) rootStyle['--k-tab-item-padding'] = props.itemPadding
      if (props.itemMargin) rootStyle['--k-tab-item-margin'] = props.itemMargin
      // 最少保留一个：仅剩一个 tab 时禁止关闭（隐藏关闭按钮）
      const canClose = panes.value.length > 1

      // 真正的 nav（横向 flex 项列表），供两端复用
      const navEl = (
        <div
          ref={navRef}
          class={[e('nav'), { 'is-stretch': props.stretch }]}
          role="tablist"
          aria-label={props.ariaLabel}
        >
          {panes.value.map((p) => {
            const isActive = p.key === currentActive.value
            // label 插槽：传 key/label/closable + active（激活态），便于自定义标题样式
            const labelNode = (slots.label?.({ ...p, active: isActive }) as unknown) ?? null
            return (
              <div
                key={p.key}
                data-key={p.key}
                class={[e('item'), { 'is-active': isActive }]}
                role="tab"
                aria-selected={isActive}
                tabindex={0}
                onClick={() => select(p.key)}
                onKeydown={(ev: KeyboardEvent) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault()
                    select(p.key)
                  }
                }}
              >
                <span class={e('label')}>{labelNode ?? p.label}</span>
                {p.closable && canClose && (
                  <span
                    class={e('close')}
                    role="button"
                    aria-label={`关闭 ${p.label}`}
                    tabindex={-1}
                    onClick={(ev: MouseEvent) => handleRemove(p.key, ev)}
                  >
                    <KIcon name="close" size={12} />
                  </span>
                )}
              </div>
            )
          })}
          {/* 添加选项卡按钮 */}
          {(props.addable || slots.add) && (
            <div class={e('add')} role="button" aria-label="添加选项卡" tabindex={0} onClick={handleAdd}>
              {slots.add ? slots.add() : <KIcon name="add" size={14} />}
            </div>
          )}
        </div>
      )

      // scrollable：外层套滚动容器（支持拖拽），并在溢出时显示前后箭头
      const navContent = props.scrollable ? (
        <div
          ref={scrollRef}
          class={e('scroll')}
          onPointerdown={onPointerDown}
          onPointermove={onPointerMove}
          onPointerup={onPointerUp}
          onPointerleave={onPointerUp}
        >
          {navEl}
        </div>
      ) : (
        navEl
      )

      const headContent = props.scrollable ? (
        <>
          {overflow.value && (
            <button
              type="button"
              class={[e('arrow'), e('arrow--prev'), 'is-rotated']}
              aria-label="上一个"
              onClick={() => scrollArrow(-1)}
            >
              {/* 左向箭头：复用右向图标并旋转 180° */}
              <KIcon name="arrow-right" size={12} />
            </button>
          )}
          {navContent}
          {overflow.value && (
            <button
              type="button"
              class={[e('arrow'), e('arrow--next')]}
              aria-label="下一个"
              onClick={() => scrollArrow(1)}
            >
              <KIcon name="arrow-right" size={12} />
            </button>
          )}
        </>
      ) : (
        navContent
      )

      return (
        <div class={e('wrap')} style={Object.keys(rootStyle).length ? rootStyle : undefined}>
          <div class={[e('head'), { 'is-scrollable': props.scrollable }]}>
            {headContent}
            <span
              class={[e('indicator'), { 'is-no-anim': !props.indicatorTransition }, props.indicatorClass]}
              style={{ ...indicatorStyle.value, ...props.indicatorStyle }}
            />
          </div>

          <div class={e('content')}>
            {panes.value.map((p) => {
              const isActive = p.key === currentActive.value
              // KTabPane 场景：cloneVNode 注入 active，由 KTabPane 内部渲染面板内容
              // （不手调 children.default，交给组件自身与 Vue 运行时管理）
              if (p.vnode) {
                return cloneVNode(p.vnode, { active: isActive, key: p.key })
              }
              // items 数据驱动场景：无 KTabPane vnode，用 #pane 插槽渲染
              const paneContent = slots.pane?.(p) as unknown
              return paneContent ? (
                <div key={p.key} class={e('pane')} style={{ display: isActive ? undefined : 'none' }}>
                  {isActive ? paneContent : undefined}
                </div>
              ) : null
            })}
          </div>
        </div>
      )
    }

    return render
  },
})

/**
 * 把默认插槽返回的 vnode 树展平为一层的 KTabPane vnode 数组。
 * 处理 v-for / 条件渲染等会生成 Fragment 的情况（Fragment 的 children 里才是真正的面板）。
 */
function flattenPanes(nodes: VNode[]): VNode[] {
  const result: VNode[] = []
  const walk = (list: VNode[]) => {
    for (const vnode of list) {
      if (!vnode) continue
      if (vnode.type === Fragment) {
        const children = vnode.children
        const nested = Array.isArray(children) ? (children as VNode[]) : []
        walk(nested)
      } else {
        result.push(vnode)
      }
    }
  }
  walk(nodes)
  return result
}
