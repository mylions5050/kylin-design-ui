/**
 * KDropdown — 下拉菜单
 *
 * 职责：
 *  - 触发方式（hover / click / contextmenu）与显隐控制
 *  - 菜单项渲染（icon / danger / divided / disabled）
 *  - 菜单项点击回调与选中后关闭
 *
 * 定位 / Teleport / click outside / 视口翻转保护 / 动画 → 委托给 KPopper
 */
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KPopper from '@/components/popper/index'
import type { PopperPlacement } from '@/components/popper/index'
import KIcon from '@/components/icon/index'
import type { DropdownOption, DropdownTrigger } from './types'
import './index.scss'

const [b, e] = createBem('k-dropdown')

/** hover 移出后延迟关闭，给鼠标从 trigger 移入面板留时间 */
const HOVER_CLOSE_DELAY = 120

export default defineComponent({
  name: 'KDropdown',
  props: {
    /** 菜单项配置；使用 #overlay 插槽时忽略 */
    menu: { type: Array as PropType<DropdownOption[]>, default: () => [] },
    /** 触发方式 */
    trigger: { type: String as PropType<DropdownTrigger>, default: 'hover' },
    /** 弹出方向 */
    placement: { type: String as PropType<PopperPlacement>, default: 'bottom' },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否显示小箭头 */
    arrow: { type: Boolean, default: false },
    /** 面板与触发元素的距离 */
    gap: { type: Number, default: 4 },
  },
  emits: {
    /** 点击菜单项时触发（禁用项不触发） */
    click: (_key: string | number) => true,
    /** 菜单展开 / 收起时触发 */
    openChange: (_visible: boolean) => true,
  },
  setup(props, { emit, slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const open = ref(false)
    /** contextmenu 模式下面板定位在鼠标位置（普通模式由 triggerRef 定位） */
    const contextRect = ref<DOMRect | null>(null)

    const setOpen = (v: boolean) => {
      if (open.value === v) return
      open.value = v
      emit('openChange', v)
    }

    /* ===================== hover 触发 ===================== */

    let closeTimer: ReturnType<typeof setTimeout> | null = null
    const cancelClose = () => {
      if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
    }
    const scheduleClose = () => {
      if (props.trigger !== 'hover') return
      cancelClose()
      closeTimer = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY)
    }
    const onRootEnter = () => {
      if (props.trigger !== 'hover' || props.disabled) return
      cancelClose()
      setOpen(true)
    }

    /* ===================== click / contextmenu 触发 ===================== */

    const onRootClick = () => {
      if (props.trigger !== 'click' || props.disabled) return
      setOpen(!open.value)
    }
    const onRootContextmenu = (ev: MouseEvent) => {
      if (props.trigger !== 'contextmenu' || props.disabled) return
      ev.preventDefault()
      // 定位到鼠标点：构造一个 0×0 的锚点矩形
      contextRect.value = {
        top: ev.clientY, left: ev.clientX, right: ev.clientX, bottom: ev.clientY,
        width: 0, height: 0, x: ev.clientX, y: ev.clientY,
      } as DOMRect
      setOpen(true)
    }

    const onDocKeydown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && open.value) setOpen(false)
    }
    onMounted(() => document.addEventListener('keydown', onDocKeydown))
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onDocKeydown)
      cancelClose()
    })

    /* ===================== 菜单项 ===================== */

    const onItemClick = (item: DropdownOption) => {
      if (item.disabled) return
      emit('click', item.key)
      setOpen(false)
    }

    const renderMenuItems = () =>
      props.menu.map((item) => (
        <div
          key={item.key}
          class={[
            e('item'),
            item.disabled && 'is-disabled',
            item.danger && 'is-danger',
            item.divided && 'is-divided',
          ]}
          onClick={() => onItemClick(item)}
        >
          {item.icon && <KIcon name={item.icon} class={e('item-icon')} />}
          <span class={e('item-label')}>{item.label}</span>
        </div>
      ))

    /* ===================== 渲染 ===================== */

    const popperProps = computed(() => ({
      visible: open.value,
      placement: props.placement,
      triggerRef: rootRef,
      anchorRect: contextRect.value,
      gap: props.gap,
      arrow: props.arrow,
      autoFlip: true,
      scrollFollow: true,
      zIndex: 2200,
      transition: 'zoom-fade' as const,
    }))

    return () => (
      <div
        ref={rootRef}
        class={[b(), props.disabled && 'is-disabled']}
        onMouseenter={onRootEnter}
        onMouseleave={scheduleClose}
        onClick={onRootClick}
        onContextmenu={onRootContextmenu}
      >
        {slots.default?.()}
        <KPopper
          {...popperProps.value}
          onUpdate:visible={(v: boolean) => {
            if (!v) setOpen(false)
          }}
        >
          <div
            class={[e('menu'), slots.overlay && e('menu--overlay')]}
            onMouseenter={cancelClose}
            onMouseleave={scheduleClose}
          >
            {slots.overlay ? slots.overlay() : renderMenuItems()}
          </div>
        </KPopper>
      </div>
    )
  },
})
