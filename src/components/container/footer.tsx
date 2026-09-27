import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'

const [b] = createBem('k-footer')

/** Footer — bottom area of a `<KContainer>`. */
export default defineComponent({
  name: 'KFooter',
  props: {
    height: { type: String, default: '50px' },
  },
  setup(props, { slots }) {
    return () => (
      <footer class={b()} style={{ height: props.height }}>
        {slots.default?.()}
      </footer>
    )
  },
})
