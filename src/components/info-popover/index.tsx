/**
 * InfoPopover —— 基于 KPopper 的信息弹出卡片
 *
 * 职责：
 *  - 触发方式（hover / click）
 *  - 面板样式（标题、描述、卡片外观）
 *  - 全局互斥：同一时刻只展开一个 InfoPopover
 *
 * 定位/Teleport/click outside/视口保护 → 委托给 KPopper
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
import { activeId, nextId } from './active-state'
import './index.scss'

const [b, e] = createBem('info-popover')

export default defineComponent({
  name: 'InfoPopover',
  props: {
    title: { type: String, default: undefined },
    description: { type: String, required: true },
    placement: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center',
    },
    trigger: { type: String as PropType<'hover' | 'click'>, default: 'hover' },
  },
  setup(props, { slots }) {
    const id = nextId()
    const rootRef = ref<HTMLElement | null>(null)
    const positioned = ref(false)

    const open = computed(() => activeId.value === id)

    // 将 left/center/right 映射为 KPopper 的 placement
    const popperPlacement = computed<PopperPlacement>(() => {
      if (props.placement === 'left') return 'bottom-start'
      if (props.placement === 'right') return 'bottom-end'
      return 'bottom'
    })

    function onTriggerClick() {
      if (props.trigger !== 'click') return
      activeId.value = activeId.value === id ? null : id
    }

    function onRootEnter() {
      if (props.trigger !== 'hover') return
      activeId.value = id
    }

    function onRootLeave() {
      if (props.trigger !== 'hover') return
      if (activeId.value === id) activeId.value = null
    }

    function onDocClick(e: MouseEvent) {
      if (props.trigger !== 'click') return
      if (activeId.value !== id) return
      if (!rootRef.value) return
      if (!rootRef.value.contains(e.target as Node)) {
        activeId.value = null
      }
    }

    const popperClass = computed(() => e('panel'))

    onMounted(() => {
      document.addEventListener('click', onDocClick)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', onDocClick)
      if (activeId.value === id) activeId.value = null
    })

    return () => (
      <div
        ref={rootRef}
        class={b()}
        onMouseenter={onRootEnter}
        onMouseleave={onRootLeave}
      >
        <div
          class={e('trigger')}
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            onTriggerClick()
          }}
        >
          {slots.default?.()}
        </div>
        <KPopper
          visible={open.value}
          placement={popperPlacement.value}
          triggerRef={rootRef}
          gap={8}
          margin={8}
          arrow={false}
          autoFlip={true}
          zIndex={20}
          transition="zoom-fade"
          closeOnClickOutside={false}
          popperClass={popperClass.value}
          maxWidth="90vw"
        >
          {props.title && <div class={e('title')}>{props.title}</div>}
          <div class={e('content')}>{props.description}</div>
        </KPopper>
      </div>
    )
  },
})