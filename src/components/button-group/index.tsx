import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'
import './index.scss'

const [b] = createBem('k-btn-group')

/** Wrapper that groups KButton children: merges adjacent borders, rounds only the outer corners. */
export default defineComponent({
  name: 'KButtonGroup',
  setup(_, { slots }) {
    return () => <div class={b()}>{slots.default?.()}</div>
  },
})
