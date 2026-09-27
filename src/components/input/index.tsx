import { defineComponent, type PropType, computed, ref, nextTick } from 'vue'
import KIcon from '@/components/icon/index'
import './index.scss'

export default defineComponent({
  name: 'KInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    /** v-model 修饰符（Vue 自动注入：trim/lazy/number） */
    modelModifiers: {
      type: Object as PropType<Record<string, boolean>>,
      default: () => ({}),
    },
    type: {
      type: String as PropType<'text' | 'password' | 'textarea' | 'number'>,
      default: 'text',
    },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    size: {
      type: String as PropType<'small' | 'default' | 'large'>,
      default: 'default',
    },
    clearable: { type: Boolean, default: false },
    showPassword: { type: Boolean, default: false },
    prefixIcon: { type: String, default: undefined },
    suffixIcon: { type: String, default: undefined },
    maxlength: { type: [String, Number], default: undefined },
    minLength: { type: [String, Number], default: undefined },
    autoFocus: { type: Boolean, default: false },
    autoComplete: { type: String, default: 'off' },
    rows: { type: Number, default: 3 },
    resize: {
      type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
      default: 'vertical',
    },
    showWordLimit: { type: Boolean, default: false },
    formatter: {
      type: Function as PropType<(v: string) => string>,
      default: undefined,
    },
    parser: {
      type: Function as PropType<(v: string) => string>,
      default: undefined,
    },
    clearIcon: { type: String, default: undefined },
    /** 是否 trim 首尾空格（对应 v-model.trim），默认 true */
    trim: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear', 'compositionstart', 'compositionend'],

  setup(props, { emit, slots }) {
    const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const isPasswordVisible = ref(false)
    const isFocused = ref(false)
    const composing = ref(false)

    const safeMaxLen = computed(() =>
      props.maxlength == null ? Infinity : Number(props.maxlength),
    )

    const currentValue = computed({
      get() {
        return props.modelValue
      },
      set(v: string | number) {
        emit('update:modelValue', v)
        emit('input', v)
      },
    })

    const inputType = computed(() =>
      props.type === 'password' && isPasswordVisible.value ? 'text' : props.type,
    )

    const displayValue = computed(() => {
      const v = String(currentValue.value ?? '')
      return props.formatter ? props.formatter(v) : v
    })

    const hasPrepend = computed(() => !!slots.prepend)
    const hasAppend = computed(() => !!slots.append)
    const hasPrependCustom = computed(() => !!slots.prependCustom)
    const hasAppendCustom = computed(() => !!slots.appendCustom)

    /* ================= 输入控制 ================= */

    function syncValue(raw: string) {
      let parsed = props.parser ? props.parser(raw) : raw
      // 支持 v-model.trim 和自定义 trim prop
      if (props.trim || props.modelModifiers?.trim) {
        parsed = parsed.trim()
      }
      if (props.modelModifiers?.number) {
        const num = Number(parsed)
        if (!isNaN(num)) parsed = String(num)
      }
      if (safeMaxLen.value < Infinity) {
        parsed = parsed.slice(0, safeMaxLen.value)
      }
      currentValue.value = parsed
      return parsed
    }

    let compositionTimer: ReturnType<typeof setTimeout> | null = null

    function handleInput(e: Event) {
      if (composing.value) {
        // 兜底：如果 composition 超过 1s 没有结束，强制重置
        // 解决某些浏览器在中文输入法输入单个 ASCII 字符后不触发 compositionend 的 bug
        if (!compositionTimer) {
          compositionTimer = setTimeout(() => {
            composing.value = false
            compositionTimer = null
            handleInput(e)
          }, 1000)
        }
        return
      }
      if (compositionTimer) {
        clearTimeout(compositionTimer)
        compositionTimer = null
      }
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      // v-model.lazy 模式：不触发 update:modelValue，由 change 事件处理
      if (props.modelModifiers?.lazy) {
        target.value = props.formatter ? props.formatter(target.value) : target.value
        return
      }
      const parsed = syncValue(target.value)
      target.value = props.formatter ? props.formatter(parsed) : parsed
    }

    function handleCompositionStart(e: CompositionEvent) {
      composing.value = true
      if (compositionTimer) {
        clearTimeout(compositionTimer)
        compositionTimer = null
      }
      emit('compositionstart', e)
    }

    function handleCompositionEnd(e: CompositionEvent) {
      composing.value = false
      if (compositionTimer) {
        clearTimeout(compositionTimer)
        compositionTimer = null
      }
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      if (target) {
        const raw = target.value
          .normalize('NFKC')
          .replace(/[\u200B-\u200D\uFEFF]/g, '')
          .trim()
        const parsed = syncValue(raw)
        target.value = props.formatter ? props.formatter(parsed) : parsed
      }
      emit('compositionend', e)
    }

    function handleChange(e: Event) {
      const target = e.target as HTMLInputElement
      const raw = props.parser ? props.parser(target.value) : target.value
      const value = props.trim || props.modelModifiers?.trim ? raw.trim() : raw
      const finalValue = props.modelModifiers?.number ? Number(value) : value
      emit('change', finalValue)
      // v-model.lazy 模式：在 change 时触发 update:modelValue
      if (props.modelModifiers?.lazy) {
        emit('update:modelValue', finalValue)
      }
    }

    function handleFocus(e: FocusEvent) {
      isFocused.value = true
      emit('focus', e)
    }

    function handleBlur(e: FocusEvent) {
      isFocused.value = false
      emit('blur', e)
    }

    function handleClear() {
      emit('change', '')
      emit('clear')
      currentValue.value = ''
      nextTick(() => inputRef.value?.focus())
    }

    function togglePasswordVisibility(e: MouseEvent) {
      e.stopPropagation()
      e.preventDefault()
      const input = inputRef.value as HTMLInputElement | null
      const pos = input
        ? { start: input.selectionStart, end: input.selectionEnd }
        : null

      isPasswordVisible.value = !isPasswordVisible.value
      nextTick(() => {
        if (input && pos) {
          input.focus()
          input.setSelectionRange(pos.start, pos.end)
        }
      })
    }

    const isOverLimit = computed(
      () =>
        props.maxlength != null &&
        String(currentValue.value).length >= Number(props.maxlength),
    )

    const limitStyle = computed(() => ({
      color: isOverLimit.value ? '#ff0000' : undefined,
    }))

    const showClear = computed(
      () =>
        props.clearable &&
        !props.disabled &&
        !props.readonly &&
        currentValue.value !== '',
    )
    const showPwdToggle = computed(
      () =>
        props.type === 'password' &&
        props.showPassword &&
        !props.disabled &&
        !props.readonly,
    )

    const wrapperClass = computed(() => [
      'k-input',
      props.size !== 'default' && `k-input--${props.size}`,
      props.disabled && 'is-disabled',
      props.readonly && 'is-readonly',
      isFocused.value && 'is-focused',
      (hasPrepend.value || hasAppend.value || hasPrependCustom.value || hasAppendCustom.value) &&
        'k-input--group',
      props.showWordLimit && 'k-input--has-count',
    ])

    /* ================= render ================= */

    return () => {
      const nativeMaxLength =
        !props.formatter && props.maxlength ? Number(props.maxlength) : undefined

      if (props.type === 'textarea') {
        const textareaClass = [
          'k-textarea',
          props.size !== 'default' && `k-input--${props.size}`,
          props.disabled && 'is-disabled',
          props.readonly && 'is-readonly',
          isFocused.value && 'is-focused',
        ].filter(Boolean).join(' ')

        return (
          <div class={textareaClass}>
            <textarea
              ref={inputRef}
              class="k-textarea__inner"
              value={displayValue.value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              readonly={props.readonly}
              maxlength={nativeMaxLength}
              minlength={props.minLength}
              autofocus={props.autoFocus}
              autocomplete={props.autoComplete}
              rows={props.rows}
              style={{ resize: props.resize }}
              onInput={handleInput}
              onCompositionstart={handleCompositionStart}
              onCompositionend={handleCompositionEnd}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {props.showWordLimit && props.maxlength && (
              <span class="k-textarea__count" style={limitStyle.value}>
                {String(currentValue.value).length}/{props.maxlength}
              </span>
            )}
          </div>
        )
      }

      return (
        <div class={wrapperClass.value}>
          {hasPrepend.value && (
            <div class="k-input-group__prepend">{slots.prepend?.()}</div>
          )}
          {hasPrependCustom.value && (
            <div class="k-input-group__prependCustom">{slots.prependCustom?.()}</div>
          )}

          <div class="k-input__wrapper">
            {props.prefixIcon && (
              <span class="k-input__prefix">
                <KIcon name={props.prefixIcon} class="k-input__icon" />
              </span>
            )}
            {slots.prefix?.()}

            <input
              ref={inputRef}
              class="k-input__inner"
              type={inputType.value}
              value={displayValue.value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              readonly={props.readonly}
              maxlength={nativeMaxLength}
              minlength={props.minLength}
              autofocus={props.autoFocus}
              autocomplete={props.autoComplete}
              onInput={handleInput}
              onCompositionstart={handleCompositionStart}
              onCompositionend={handleCompositionEnd}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {(slots.suffix || props.suffixIcon || showClear.value || showPwdToggle.value) && (
              <span class="k-input__suffix">
                {slots.suffix?.()}
                {props.suffixIcon && <KIcon name={props.suffixIcon} class="k-input__icon" />}
                {showPwdToggle.value && (
                  <KIcon
                    name={isPasswordVisible.value ? 'browse' : 'hide'}
                    class={['k-input__icon', 'k-input__password-toggle']}
                    onClick={togglePasswordVisibility}
                  />
                )}
                {showClear.value && (
                  <KIcon
                    name={props.clearIcon ?? 'close-bold'}
                    class={['k-input__icon', 'k-input__clear']}
                    onClick={handleClear}
                  />
                )}
              </span>
            )}

            {props.showWordLimit && props.maxlength && (
              <span class="k-input__count" style={limitStyle.value}>
                {String(currentValue.value).length}/{props.maxlength}
              </span>
            )}
          </div>

          {hasAppend.value && (
            <div class="k-input-group__append">{slots.append?.()}</div>
          )}
          {hasAppendCustom.value && (
            <div class="k-input-group__appendCustom">{slots.appendCustom?.()}</div>
          )}
        </div>
      )
    }
  },
})