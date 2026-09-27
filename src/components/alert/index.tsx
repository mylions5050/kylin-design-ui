import { computed, defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import './index.scss'

export type AlertType = 'primary' | 'info' | 'warning' | 'success' | 'error'
export type AlertSize = 'mini' | 'small' | 'medium' | 'large'
export type AlertEffect = 'light' | 'plain' | 'dark' | 'custom'

const [b, e, , v] = createBem('alert')

/** Map type → iconfont name (passed to <KIcon>). */
const TYPE_ICON: Record<AlertType, string> = {
  primary: 'prompt-filling',
  info: 'prompt-filling',
  success: 'success-filling',
  warning: 'warning-filling',
  error: 'delete-filling',
}

/**
 * Alert — inline banner: type-colored bg + `<KIcon>` + content (+ optional
 * action / arrow / close). `closable` shows an X (`close-bold`) and emits
 * `close`. Reused by `<Message>` (toast) which renders Alerts in a teleported
 * stack.
 *
 * Usage: `<Alert type="success" closable @close="...">Saved.</Alert>`
 */
export default defineComponent({
  name: 'KAlert',
  props: {
    type: { type: String as PropType<AlertType>, default: 'primary' },
    size: { type: String as PropType<AlertSize>, default: 'medium' },
    effect: { type: String as PropType<AlertEffect>, default: 'light' },
    border: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    showArrow: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    /** Override the type icon (iconfont name, e.g. "check-item-filling"). */
    icon: { type: String, default: undefined },
    /** Custom class appended to the root for consumer styling overrides. */
    customClass: { type: String, default: undefined },
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const iconName = computed(() => props.icon ?? TYPE_ICON[props.type])
    return () => (
      <div
        class={[
          b(),
          v(props.type, true),
          v(props.size, true),
          v(props.effect, true),
          v('border', props.border),
          v('center', props.center),
          props.customClass,
        ]}
      >
        <span class={e('icon')}>
          <KIcon name={iconName.value} size={16} />
        </span>
        <div class={e('content')}>{slots.default?.()}</div>
        {slots.action && <div class={e('action')}>{slots.action()}</div>}
        {props.showArrow && <KIcon class={e('arrow')} name="arrow-right-bold" size={16} />}
        {props.closable && (
          <button type="button" class={e('close')} aria-label="Close" onClick={() => emit('close')}>
            <KIcon name="close-bold" size={16} />
          </button>
        )}
      </div>
    )
  },
})
