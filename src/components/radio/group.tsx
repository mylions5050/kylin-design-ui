import { defineComponent, type PropType, provide, computed, ref, type ComputedRef } from 'vue'
import type { InjectionKey } from 'vue'

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('KRadioGroup')
export interface RadioGroupContext {
  modelValue: ComputedRef<any>
  disabled: ComputedRef<boolean>
  size: ComputedRef<'small' | 'default' | 'large'>
  name: ComputedRef<string>
  onChange: (value: any) => void
}

export default defineComponent({
  name: 'KRadioGroup',
  props: {
    modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
    disabled: { type: Boolean, default: false },
    size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    // 唯一 name，避免多 Group 冲突
    const uid = ref(`k-radio-group-${Math.random().toString(36).slice(2)}`)

    // 提供给 KRadio 的上下文
    provide(radioGroupKey, {
      modelValue: computed(() => props.modelValue),
      disabled: computed(() => props.disabled),
      size: computed(() => props.size),
      name: computed(() => uid.value),
      onChange: (value: any) => {
        emit('update:modelValue', value)
        emit('change', value)
      },
    })

    return () => <div class="k-radio-group">{slots.default?.()}</div>
  },
})