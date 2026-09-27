import { defineComponent, provide } from 'vue'

// Symbol for group context
const GROUP_CTX = Symbol('KOptionGroupContext')

export default defineComponent({
  name: 'KOptionGroup',
  props: {
    label: { type: String, required: true },
  },
  setup(props, { slots }) {
    // Provide group context for child KOption components
    provide(GROUP_CTX, {
      label: props.label
    })
    
    return () => {
      // Render the slot content normally
      return slots.default?.()
    }
  },
})

// Export for KOption to inject
export { GROUP_CTX }