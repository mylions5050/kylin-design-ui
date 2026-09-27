import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'

const [b] = createBem('k-header')

/** Header — top area of a `<KContainer>`. */
export default defineComponent({
  name: 'KHeader',
  props: {
    height: { type: String, default: '60px' },
  },
  setup(props, { slots }) {
    return () => (
      <header class={b()} style={{ height: props.height }}>
        {slots.default?.()}
      </header>
    )
  },
})
