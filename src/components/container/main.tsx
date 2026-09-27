import { defineComponent } from 'vue'
import { createBem } from '@/utils/create-bem'

const [b] = createBem('k-main')

/** Main — central content area of a `<KContainer>` (flex: 1). */
export default defineComponent({
  name: 'KMain',
  setup(_, { slots }) {
    return () => <main class={b()}>{slots.default?.()}</main>
  },
})
