import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'
import './index.scss'

const [b, e] = createBem('table-empty-state')

export default defineComponent({
  name: 'TableEmptyState',
  props: {
    icon: { type: String, default: undefined },
    title: { type: String, default: undefined },
    description: { type: String, default: undefined },
    buttonLabel: { type: String, default: undefined },
  },
  emits: ['action'],
  setup(props, { emit }) {
    return () => (
      <div class={b()}>
        {props.icon && (
          <div class={e('icon')}>
            <img src={props.icon} alt="" />
          </div>
        )}
        {props.title && <div class={e('title')}>{props.title}</div>}
        {props.description && <div class={e('desc')}>{props.description}</div>}
        {props.buttonLabel && (
          <button type="button" class={e('btn')} onClick={() => emit('action')}>
            {props.buttonLabel}
          </button>
        )}
      </div>
    )
  },
})
