import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
  watch,
  type PropType,
  type CSSProperties,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import {
  formContextKey,
  type FormFieldContext,
  type FormItemRule,
} from './types'
import { getPropValue, normalizeRules, runRules, setPropValue } from './utils'

const [, e] = createBem('k-form')

/**
 * KFormItem —— 表单项（label + 控件 + 校验信息）。
 *
 * 通过 prop 关联 KForm 的 model 字段（支持点路径，如 'profile.age'）：
 * 控件在默认插槽里直接 v-model 绑定 model 字段，值变化即触发本字段校验
 * （校验规则 = 本项 rules 与 Form 级 rules[prop] 的合并，item 级优先）。
 *
 * - required：为 true 时显示星号并校验非空；rules 里含 required 也自动显示星号；
 * - error：手动指定错误信息（覆盖自动校验结果）；showMessage 关闭错误展示；
 * - 默认插槽放任意表单控件（KInput / KSelect / KDatePicker ...）；
 * - label 插槽自定义标签内容，error 插槽自定义错误展示。
 */
export default defineComponent({
  name: 'KFormItem',
  props: {
    /** 对应 KForm model 的字段路径（支持点路径）；不传则只做布局不校验 */
    prop: { type: String, default: '' },
    /** 标签文本 */
    label: { type: String, default: '' },
    /** 覆盖 Form 的 labelWidth */
    labelWidth: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 必填（无 rules 时也显示星号并校验非空） */
    required: { type: Boolean, default: false },
    /** 本项校验规则（与 Form 级 rules[prop] 合并，本项优先） */
    rules: { type: [Object, Array] as PropType<FormItemRule | FormItemRule[]>, default: undefined },
    /** 手动指定错误信息（非空时覆盖自动校验结果） */
    error: { type: String, default: '' },
    /** 是否显示校验错误信息 */
    showMessage: { type: Boolean, default: true },
  },
  emits: [
    /** 本项校验完成：(isValid, message) */
    'validate',
  ],
  setup(props, { slots, emit, expose }) {
    const form = inject(formContextKey)
    const validateMessage = ref('')
    const validating = ref(false)

    /** 初始值快照（resetField 恢复用） */
    const initialValue = ref<any>()

    const mergedRules = computed<FormItemRule[]>(() => {
      if (!form || !props.prop) return []
      const own = normalizeRules(props.rules)
      const fromForm = normalizeRules(form.rules[props.prop])
      // item 级优先：同字段下 item rules 与 form rules 都生效，item 在前
      return [...own, ...fromForm]
    })

    const isRequired = computed(
      () => props.required || mergedRules.value.some((r) => !!r.required)
    )

    const validate = async (): Promise<true> => {
      if (!form || !props.prop || !mergedRules.value.length) return true
      const value = getPropValue(form.model, props.prop)
      validating.value = true
      try {
        await runRules(props.prop, mergedRules.value, value)
        validateMessage.value = ''
        form.emitValidate(props.prop, true, '')
        emit('validate', true, '')
        return true
      } catch (e: any) {
        const message: string = e?.errors?.[0]?.message ?? '校验未通过'
        validateMessage.value = message
        form.emitValidate(props.prop, false, message)
        emit('validate', false, message)
        throw e
      } finally {
        validating.value = false
      }
    }

    const clearValidate = () => {
      validateMessage.value = ''
    }

    const resetField = () => {
      clearValidate()
      if (!form || !props.prop) return
      if (initialValue.value !== undefined || getPropValue(form.model, props.prop) !== undefined) {
        setPropValue(form.model, props.prop, initialValue.value)
      }
    }

    onMounted(() => {
      if (!form || !props.prop) return
      initialValue.value = getPropValue(form.model, props.prop)
      form.registerField({ prop: props.prop, validate, clearValidate, resetField } satisfies FormFieldContext)
    })
    onBeforeUnmount(() => {
      form?.unregisterField({ prop: props.prop, validate, clearValidate, resetField })
    })

    // 值变化即校验（change 语义）
    watch(
      () => (form && props.prop ? getPropValue(form.model, props.prop) : undefined),
      (val, oldVal) => {
        if (!form || !props.prop) return
        // 初始赋值 / reset 触发的不校验
        if (val === initialValue.value || oldVal === undefined) return
        validate().catch(() => {})
      }
    )

    // 手动 error 覆盖自动校验信息
    watch(
      () => props.error,
      (val) => {
        validateMessage.value = val
      }
    )

    expose({ validate, clearValidate, resetField })

    const labelStyle = computed<CSSProperties>(() => {
      if (form?.labelPosition === 'top') return {}
      const w = props.labelWidth || form?.labelWidth
      if (!w) return {}
      const width = typeof w === 'number' ? `${w}px` : w
      return { width, minWidth: width }
    })

    return () => {
      const position = form?.labelPosition ?? 'right'
      const showError =
        (props.showMessage && form?.showMessage !== false && validateMessage.value) ||
        props.error

      const label = (
        <label class={e('label')} style={labelStyle.value}>
          {isRequired.value && !form?.hideRequiredAsterisk && position !== 'right' && (
            <span class={[e('asterisk'), `${e('asterisk')}--before`]}>*</span>
          )}
          {slots.label?.() ?? props.label}
          {isRequired.value && !form?.hideRequiredAsterisk && position === 'right' && (
            <span class={[e('asterisk'), `${e('asterisk')}--after`]}>*</span>
          )}
        </label>
      )

      return (
        <div
          class={[
            e('item'),
            showError && 'is-error',
            validating.value && 'is-validating',
            form?.disabled && 'is-disabled',
          ]}
          data-k-form-field={props.prop || undefined}
        >
          {(props.label || slots.label) && label}
          <div class={e('content')}>
            {slots.default?.()}
            {showError && (
              <div class={e('error')}>{slots.error?.({ error: showError }) ?? showError}</div>
            )}
          </div>
        </div>
      )
    }
  },
})
