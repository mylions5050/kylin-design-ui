import { defineComponent, type PropType, inject, computed } from 'vue'
import { radioGroupKey, type RadioGroupContext } from './group'
import './index.scss'

export default defineComponent({
  name: 'KRadio',
  props: {
    modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
    value: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    // 1) 注入 Group 的上下文，没有则undefined
    const group = inject<RadioGroupContext | null>(radioGroupKey, null)

    // 2) 判断选中：在 group 里，看 group.modelValue === props.value；不在 group 里，看 props.modelValue === props.value
    const checked = computed(() => {
      if (group) {
        return group.modelValue.value === props.value
      }
      return props.modelValue === props.value
    })

    // 3) 合并属性：group 里的 size/disabled 优先生效（只在没有本级时fall back）
    const size = computed(() => props.size || group?.size.value || 'default')
    const disabled = computed(() => props.disabled || group?.disabled.value || false)

    // 4) class 数组，直接拼接
    const classes = computed(() => {
      const list: string[] = ['k-radio']
      if (size.value !== 'default') list.push('k-radio--' + size.value)
      if (checked.value) list.push('is-checked')
      if (disabled.value) list.push('is-disabled')
      return list
    })

    // 5) 切换逻辑：在 group 里调用 group.onChange，不在则emit
    function onChange(e: Event) {
      if (disabled.value) return
      e.stopPropagation()
      if (group) {
        group.onChange(props.value)
      } else {
        emit('update:modelValue', props.value)
        emit('change', props.value)
      }
    }

    // 6) name 属性，group 里统一用一个随机字符串，避免多实例冲突；否则用 label
    const name = computed(() => group?.name.value || String(props.value ?? props.label ?? 'k-radio'))

    return () => (
      <label class={classes.value.join(' ')}>
        <span class="k-radio__input">
          <input
            type="radio"
            name={name.value}
            checked={checked.value}
            disabled={disabled.value}
            onChange={onChange}
          />
          <span class="k-radio__inner" />
        </span>
        {(props.label || slots.default) && (
          <span class="k-radio__label">{props.label || slots.default?.()}</span>
        )}
      </label>
    )
  },
})