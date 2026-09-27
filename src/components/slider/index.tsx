import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch, type CSSProperties, type PropType, type StyleValue } from 'vue'
import { createBem } from '@/utils/create-bem'
import KTooltip from '@/components/tooltip/index'
import './index.scss'

const [b, e, m] = createBem('k-slider')

/** 单值模式为 number，range / editable 多滑块模式为 number 数组 */
export type SliderValue = number | number[]

/** 刻度标记：key 为数值位置，value 为标签文字或 { label, style }（style 自定义该标签样式） */
export type SliderMarks = Record<number, string | { label: string; style?: CSSProperties }>

/** 自定义主色：字符串或按当前值取色的函数（用于分阶段变色） */
export type SliderColor = string | ((value: number) => string)

/**
 * KSlider 滑动输入条 —— 在数值区间内通过拖动滑块选取值。
 *
 * 交互对齐 Ant Design Slider：
 *  - 单值模式 v-model 绑定 number；range 模式绑定 number 数组（长度 >= 2）
 *  - 多滑块之间不能互相越过（相邻滑块即边界）；disabled 传数组可单独禁用
 *    range 下指定的滑块，被禁用的滑块不可拖动，作为移动边界存在
 *  - editable（需配合 range）：点击轨道添加节点，把节点拖出轨道两端或对聚焦节点
 *    按 Delete / Backspace 删除；minCount / maxCount 限制节点数
 *  - 点击轨道 / 刻度标记可直接定位（按最近滑块处理）；拖动中持续触发 change
 *  - 松手（或键盘调整 / 增删节点后）触发 afterChange，适合在此时提交表单
 *  - tooltip 默认在悬浮 / 拖动时出现，tooltipOpen 可常显，formatTooltip 自定义内容；
 *    基于 KTooltip（dark 主题，固定朝上不翻转），拖动时逐帧同步锚点
 *  - marks 刻度标记可点击定位（支持每个标签自定义样式）；dots 按 step 显示刻度点，
 *    已选区间内的刻度点高亮
 *  - color 自定义主色（已滑过轨道 / 滑块边框 / 激活光圈 / 激活刻度点），支持按当前值
 *    取色的函数；railColor 自定义轨道背景色；markStyle 统一自定义标签样式
 *  - vertical 垂直模式：底部为 min、顶部为 max，需在外部设置高度（如 style="height: 300px"）
 *
 * 用法：<KSlider v-model="value" range editable :max-count="5" />
 */
export default defineComponent({
  name: 'KSlider',
  props: {
    /** 当前值（v-model）；range / editable 时为 number 数组 */
    modelValue: { type: [Number, Array] as PropType<SliderValue>, default: 0 },
    /** 最小值 */
    min: { type: Number, default: 0 },
    /** 最大值 */
    max: { type: Number, default: 100 },
    /** 步长 */
    step: { type: Number, default: 1 },
    /** 双滑块模式 */
    range: { type: Boolean, default: false },
    /** 动态增减节点（需配合 range）：点击轨道添加节点，拖出两端或按 Delete/Backspace 删除 */
    editable: { type: Boolean, default: false },
    /** editable 时最少节点数 */
    minCount: { type: Number, default: 2 },
    /** editable 时最多节点数 */
    maxCount: { type: Number, default: Infinity },
    /**
     * 是否禁用：
     * - Boolean：整体禁用（轨道不可点击，滑块不可拖动）
     * - boolean[]（range）：单独禁用指定下标的滑块；被禁用的滑块作为移动边界，
     *   其他滑块无法越过（多滑块本身也不能互相越过）
     */
    disabled: { type: [Boolean, Array] as PropType<boolean | boolean[]>, default: false },
    /** 是否在轨道上按 step 显示刻度点 */
    dots: { type: Boolean, default: false },
    /** tooltip 是否常显（默认悬浮 / 拖动时显示） */
    tooltipOpen: { type: Boolean, default: false },
    /** 自定义 tooltip 内容：(value) => string | number */
    formatTooltip: {
      type: Function as PropType<(v: number) => string | number>,
      default: undefined,
    },
    /** 刻度标记：key 为数值位置，value 为标签文字或 { label, style } */
    marks: { type: Object as PropType<SliderMarks>, default: undefined },
    /** 统一自定义 marks 标签样式（单个标签可用 marks 的 style 覆盖） */
    markStyle: { type: [Object, String, Array] as PropType<StyleValue>, default: undefined },
    /** 主色：已滑过轨道 / 滑块边框 / 激活光圈 / 激活刻度点；支持 (value) => color 按当前值取色 */
    color: { type: [String, Function] as PropType<SliderColor>, default: '' },
    /** 轨道背景色 */
    railColor: { type: String, default: '' },
    /** 垂直模式（底部为 min、顶部为 max；需在外部给组件设置高度） */
    vertical: { type: Boolean, default: false },
  },
  emits: [
    /** v-model：值变化时触发（拖动过程中持续触发） */
    'update:modelValue',
    /** 值变化时触发（拖动过程中持续触发），载荷为当前值 */
    'change',
    /** 拖动结束 / 键盘调整 / 增删节点后触发，载荷为最终值，适合此时提交表单 */
    'afterChange',
  ],
  setup(props, { emit }) {
    const railRef = ref<HTMLElement | null>(null)

    /** 气泡锚点（handle 的克隆 DOMRect，KPopper deep watch 逐帧重定位） */
    const anchorRects = ref<(Record<string, number> | null)[]>([])
    /** 拖动期间缓存的轨道矩形（拖动中页面不滚动，可直接算锚点避免逐帧读 DOM） */
    let railRectCache: DOMRect | null = null

    /** 动态增减节点（editable && range） */
    const isEditable = computed(() => props.editable && props.range)

    /** 内部值统一为数组（单值模式长度为 1），拖动期间以内部为准 */
    const inner = ref<number[]>(normalizeArr(props.modelValue))

    /** 每个 handle 是否悬浮 */
    const hovering = ref<boolean[]>([])
    /** 是否正在拖动 */
    const dragging = ref(false)
    /** 当前拖动 / 最后操作的滑块下标 */
    const activeIndex = ref(0)

    /** 按 step 对齐并修正浮点误差 */
    function alignValue(n: number): number {
      const step = props.step > 0 ? props.step : 1
      const snapped = props.min + Math.round((n - props.min) / step) * step
      return Number(snapped.toFixed(6))
    }

    /** 归一化外部值：截断到 [min, max]、按 step 对齐、range 保持升序且至少两个节点 */
    function normalizeArr(v: SliderValue): number[] {
      const arr = (Array.isArray(v) ? v : [Number(v)]).map((x) =>
        alignValue(Math.min(Math.max(Number(x) || props.min, props.min), props.max)),
      )
      if (!props.range) return arr.slice(0, 1)
      const sorted = [...arr].sort((a, b) => a - b)
      while (sorted.length < 2) sorted.push(sorted[sorted.length - 1] ?? props.max)
      return sorted
    }

    watch(
      () => props.modelValue,
      (v) => {
        const next = normalizeArr(v)
        if (JSON.stringify(next) !== JSON.stringify(inner.value)) inner.value = next
      },
    )

    /** 值 → 轨道百分比（0-100，从 min 端算起） */
    const pct = (v: number) => ((v - props.min) / (props.max - props.min)) * 100

    /** 值 → 定位百分比（水平从左算起；垂直 CSS top 从顶部算起，需翻转） */
    const pos = (v: number) => (props.vertical ? 100 - pct(v) : pct(v))

    /** 已选区间的起 / 止值（多滑块取首尾） */
    const span = computed<[number, number]>(() =>
      props.range
        ? [inner.value[0], inner.value[inner.value.length - 1]]
        : [props.min, inner.value[0]],
    )

    /** 轨道 track 的起点 / 长度百分比（水平 left/width，垂直 top/height） */
    const trackStyle = computed(() => {
      const [lo, hi] = span.value
      if (props.vertical) {
        return { top: `${pos(hi)}%`, height: `${pct(hi) - pct(lo)}%` }
      }
      return { left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }
    })

    /** dots 刻度点数值（按 step 铺满轨道） */
    const dotValues = computed<number[]>(() => {
      if (!props.dots || !(props.step > 0)) return []
      const list: number[] = []
      for (let v = props.min; v <= props.max + 1e-9; v += props.step) list.push(v)
      return list
    })

    /** 刻度点是否处于已选区间（高亮显示） */
    const isDotActive = (v: number) => {
      const [lo, hi] = span.value
      return v >= lo - 1e-9 && v <= hi + 1e-9
    }

    /** 刻度标记（marks：按位置升序） */
    const markItems = computed(() =>
      Object.keys(props.marks || {})
        .map(Number)
        .sort((x, y) => x - y)
        .map((key) => {
          const raw = (props.marks as SliderMarks)[key]
          const item = typeof raw === 'string' ? { label: raw } : raw
          return { key, value: key, label: item.label, style: item.style }
        }),
    )

    /** 当前主色（支持按当前值取色，多滑块取当前操作滑块的值） */
    const currentColor = computed(() => {
      if (!props.color) return ''
      if (typeof props.color === 'string') return props.color
      return props.color(inner.value[Math.min(activeIndex.value, inner.value.length - 1)])
    })

    /** 根元素 CSS 变量：color / railColor 注入样式 */
    const rootStyle = computed<CSSProperties>(() => ({
      ...(currentColor.value
        ? ({ '--k-slider-color': currentColor.value } as CSSProperties)
        : null),
      ...(props.railColor
        ? ({ '--k-slider-rail-color': props.railColor } as CSSProperties)
        : null),
    }))

    /** 对外载荷：单值为 number，range / editable 为数组 */
    const payload = () => (props.range ? [...inner.value] : inner.value[0])

    /** 指定滑块是否被禁用（disabled 为数组时按下标判断） */
    const isHandleDisabled = (index: number) =>
      Array.isArray(props.disabled) ? !!props.disabled[index] : props.disabled

    /** 读取 handle 实际位置，克隆为普通对象传入 KPopper（DOMRect 是活对象，deep watch 不触发） */
    const syncAnchorRect = (index: number) => {
      const el = railRef.value?.querySelectorAll('.k-slider__handle')[index] as HTMLElement | undefined
      if (!el) return
      const r = el.getBoundingClientRect()
      anchorRects.value[index] = {
        top: r.top, left: r.left, right: r.right, bottom: r.bottom,
        width: r.width, height: r.height, x: r.x, y: r.y,
      }
    }

    /** 拖动中用轨道缓存矩形 + 当前值直接算锚点（与 handle 渲染位置一致，少一帧读 DOM） */
    const updateAnchorByValue = (index: number) => {
      if (!railRectCache) {
        syncAnchorRect(index)
        return
      }
      const r = railRectCache
      const p = pct(inner.value[index]) / 100
      const cx = props.vertical ? r.left + r.width / 2 : r.left + p * r.width
      const cy = props.vertical ? r.bottom - p * r.height : r.top + r.height / 2
      anchorRects.value[index] = {
        top: cy - 7, left: cx - 7, right: cx + 7, bottom: cy + 7,
        width: 14, height: 14, x: cx - 7, y: cy - 7,
      }
    }

    /** 为所有可见气泡同步锚点（悬浮 / 拖动 / 键盘 / 外部改值 / marks 点击等非拖动路径） */
    const syncVisibleAnchors = () => {
      inner.value.forEach((_, i) => {
        if (props.tooltipOpen || dragging.value || (hovering.value[i] ?? false)) syncAnchorRect(i)
      })
    }

    watch(inner, () => {
      nextTick(syncVisibleAnchors)
    })

    onMounted(() => {
      nextTick(syncVisibleAnchors)
      // 滚动 / 窗口尺寸变化后，可见气泡的视口锚点会失效，需要重新同步
      window.addEventListener('scroll', onViewportChange, true)
      window.addEventListener('resize', onViewportChange)
    })

    const onViewportChange = () => syncVisibleAnchors()

    /** 提交新值：多滑块不能越过相邻滑块（禁用滑块因此天然成为移动边界） */
    const commit = (index: number, v: number) => {
      const arr = [...inner.value]
      if (props.range && arr.length > 1) {
        const prev = index > 0 ? arr[index - 1] : -Infinity
        const next = index < arr.length - 1 ? arr[index + 1] : Infinity
        v = Math.min(Math.max(v, prev), next)
      }
      arr[index] = v
      if (JSON.stringify(arr) === JSON.stringify(inner.value)) return
      inner.value = arr
      emit('update:modelValue', payload())
      emit('change', payload())
    }

    /** 新增节点（editable）：插入到正确位置并返回其下标 */
    const insertHandle = (v: number): number => {
      const arr = [...inner.value, v].sort((a, b) => a - b)
      inner.value = arr
      emit('update:modelValue', payload())
      emit('change', payload())
      return arr.indexOf(v)
    }

    /** 删除节点（editable）：至少保留 minCount 个 */
    const removeHandle = (index: number, fireAfter: boolean) => {
      if (inner.value.length <= props.minCount) return
      dragging.value = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      inner.value = inner.value.filter((_, i) => i !== index)
      activeIndex.value = Math.min(index, inner.value.length - 1)
      emit('update:modelValue', payload())
      emit('change', payload())
      if (fireAfter) emit('afterChange', payload())
    }

    /** 由指针坐标换算轨道上的值（垂直底部为 min、顶部为 max） */
    const valueFromPointer = (clientX: number, clientY: number): number => {
      const rect = railRef.value!.getBoundingClientRect()
      const ratio = props.vertical
        ? (rect.bottom - clientY) / rect.height
        : (clientX - rect.left) / rect.width
      return alignValue(props.min + Math.min(Math.max(ratio, 0), 1) * (props.max - props.min))
    }

    /** 由指针坐标换算轨道原始比例（不截断，用于判断拖出删除） */
    const ratioFromPointer = (clientX: number, clientY: number): number => {
      const rect = railRef.value!.getBoundingClientRect()
      return props.vertical
        ? (rect.bottom - clientY) / rect.height
        : (clientX - rect.left) / rect.width
    }

    /** 按值选最近的滑块下标 */
    const nearestIndexByValue = (v: number): number => {
      let nearest = 0
      let dist = Infinity
      inner.value.forEach((x, i) => {
        const d = Math.abs(x - v)
        if (d < dist) {
          dist = d
          nearest = i
        }
      })
      return nearest
    }

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault()
      // editable：把节点拖出轨道两端即删除
      if (isEditable.value && inner.value.length > props.minCount) {
        const ratio = ratioFromPointer(ev.clientX, ev.clientY)
        if (ratio < -0.04 || ratio > 1.04) {
          removeHandle(activeIndex.value, true)
          return
        }
      }
      commit(activeIndex.value, valueFromPointer(ev.clientX, ev.clientY))
      updateAnchorByValue(activeIndex.value)
    }

    const onUp = () => {
      if (!dragging.value) return
      dragging.value = false
      emit('afterChange', payload())
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    const startDrag = (index: number, clientX: number, clientY: number) => {
      activeIndex.value = index
      dragging.value = true
      railRectCache = railRef.value?.getBoundingClientRect() ?? null
      commit(index, valueFromPointer(clientX, clientY))
      updateAnchorByValue(index)
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    /** 点击轨道：editable 时添加节点并进入拖动，否则定位最近滑块 */
    const onRailPointerDown = (ev: PointerEvent) => {
      if (props.disabled === true) return
      ev.preventDefault()
      const v = valueFromPointer(ev.clientX, ev.clientY)
      if (isEditable.value && inner.value.length < props.maxCount) {
        startDrag(insertHandle(v), ev.clientX, ev.clientY)
        return
      }
      startDrag(nearestIndexByValue(v), ev.clientX, ev.clientY)
    }

    /** 键盘调整（方向键 ±step，Home/End 到边界；Delete/Backspace 删除节点） */
    const onHandleKeydown = (ev: KeyboardEvent, index: number) => {
      if (isHandleDisabled(index)) return
      if (
        (ev.key === 'Delete' || ev.key === 'Backspace') &&
        isEditable.value &&
        inner.value.length > props.minCount
      ) {
        ev.preventDefault()
        removeHandle(index, true)
        return
      }
      const step = props.step > 0 ? props.step : 1
      const current = inner.value[index]
      let next: number | null = null
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') next = current + step
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') next = current - step
      if (ev.key === 'Home') next = props.min
      if (ev.key === 'End') next = props.max
      if (next === null) return
      ev.preventDefault()
      commit(index, alignValue(Math.min(Math.max(next, props.min), props.max)))
      emit('afterChange', payload())
    }

    onBeforeUnmount(() => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onViewportChange, true)
      window.removeEventListener('resize', onViewportChange)
    })

    /** tooltip 是否可见：常显 / 拖动中 / 悬浮 */
    const tooltipVisible = (index: number) =>
      props.tooltipOpen || dragging.value || (hovering.value[index] ?? false)

    /** 单个滑块 + tooltip */
    const renderHandle = (index: number) => {
      const v = inner.value[index]
      const handleDisabled = isHandleDisabled(index)
      return (
        <div
          key={index}
          class={[
            e('handle'),
            (dragging.value || (hovering.value[index] ?? false)) && 'is-active',
            handleDisabled && 'is-disabled',
          ]}
          style={{ [props.vertical ? 'top' : 'left']: `${pos(v)}%` }}
          tabindex={handleDisabled ? -1 : 0}
          onPointerdown={(ev: PointerEvent) => {
            if (handleDisabled) {
              ev.stopPropagation()
              return
            }
            ev.preventDefault()
            ev.stopPropagation()
            startDrag(index, ev.clientX, ev.clientY)
          }}
          onKeydown={(ev: KeyboardEvent) => onHandleKeydown(ev, index)}
          onMouseenter={() => {
            hovering.value[index] = true
            syncAnchorRect(index)
          }}
          onMouseleave={() => (hovering.value[index] = false)}
        >
          {tooltipVisible(index) && anchorRects.value[index] && (
            <KTooltip
              theme="dark"
              placement="top"
              size="small"
              trigger="manual"
              visible={true}
              autoFlip={false}
              anchorRect={anchorRects.value[index] as unknown as DOMRect}
              content={String(props.formatTooltip ? props.formatTooltip(v) : v)}
            />
          )}
        </div>
      )
    }

    return () => (
      <div
        class={[
          b(),
          props.disabled === true && m('disabled', true),
          props.vertical && m('vertical', true),
          markItems.value.length > 0 && m('has-marks', true),
        ]}
        style={rootStyle.value}
      >
        <div ref={railRef} class={e('rail')} onPointerdown={onRailPointerDown}>
          <div class={e('track')} style={trackStyle.value} />
          {dotValues.value.map((v) => (
            <span
              key={v}
              class={[e('dot'), isDotActive(v) && 'is-active']}
              style={{ [props.vertical ? 'top' : 'left']: `${pos(v)}%` }}
            />
          ))}
          {markItems.value.map((mk) => (
            <span
              key={mk.key}
              class={[e('dot'), isDotActive(mk.value) && 'is-active']}
              style={{ [props.vertical ? 'top' : 'left']: `${pos(mk.value)}%` }}
            />
          ))}
          {props.range
            ? inner.value.map((_, i) => renderHandle(i))
            : renderHandle(0)}
        </div>
        {markItems.value.length > 0 && (
          <div class={e('marks')}>
            {markItems.value.map((mk) => (
              <span
                key={mk.key}
                class={e('mark')}
                style={[props.markStyle, mk.style, { [props.vertical ? 'top' : 'left']: `${pos(mk.value)}%` }] as StyleValue}
                onClick={() => props.disabled !== true && commit(nearestIndexByValue(mk.value), mk.value)}
              >
                {mk.label}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
})
