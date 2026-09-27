import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'

const [b] = createBem('k-aside')

/** Aside — side area of a `<KContainer>` (its presence makes the container horizontal). */
export default defineComponent({
  name: 'KAside',
  props: {
    width: { type: String, default: '220px' },
  },
  setup(props, { slots }) {
    return () => (
      <aside class={b()} style={{ width: props.width }}>
        {slots.default?.()}
      </aside>
    )
  },
})
