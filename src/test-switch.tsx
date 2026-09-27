import { defineComponent } from 'vue'
import KSwitch from './components/switch/index'

export default defineComponent({
  setup() {
    return () => (
      <div style={{ padding: '20px' }}>
        <h3>TSX Test</h3>
        <KSwitch modelValue={true} />
      </div>
    )
  }
})