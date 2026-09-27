import {
  defineComponent,
  provide,
  reactive,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import {
  formContextKey,
  type FormContext,
  type FormFieldContext,
  type FormInvalidFields,
  type FormLabelPosition,
  type FormRules,
  type FormValidateCallback,
} from './types'
import './index.scss'

const [b, , , v] = createBem('k-form')

/**
 * KForm —— 表单容器（交互参考 Element Plus Form 与 antd Form）。
 *
 * 职责：统一 model 数据域 + rules 校验 + label 布局 + disabled 下发。
 * 与之配套的 KFormItem 通过 prop 关联 model 字段：控件直接 v-model 绑定
 * model 的字段（`<KInput v-model="form.name" />`），值变化即触发该字段校验。
 *
 * 校验基于 async-validator，Rule 写法与 antd / Element Plus 一致：
 * required / type / min / max / len / pattern / validator(rule, value, callback) 等。
 *
 * 布局：labelPosition left / right（水平，label 定宽 labelWidth）/ top（标签在上）；
 * inline 开启后表单项横向排列（常用于搜索栏）。
 *
 * ref 实例方法：
 *  - validate(fields?, callback?)：校验全部或指定字段；Promise 风格通过则 resolve、
 *    失败 reject（invalidFields 按字段归类）；也支持 callback 风格；
 *  - validateField(prop)：校验单个字段；
 *  - resetFields()：所有字段恢复挂载时初始值并清除校验；
 *  - clearValidate(props?)：清除校验状态（不传清全部）；
 *  - scrollToField(prop)：滚动到指定字段。
 */
export default defineComponent({
  name: 'KForm',
  props: {
    /** 表单数据对象（必传，字段与 KFormItem 的 prop 一一对应） */
    model: { type: Object as PropType<Record<string, any>>, required: true },
    /** 校验规则集合，key 为 KFormItem 的 prop（支持点路径） */
    rules: { type: Object as PropType<FormRules>, default: () => ({}) },
    /** 标签位置：left / right / top */
    labelPosition: {
      type: String as PropType<FormLabelPosition>,
      default: 'right',
    },
    /** 标签宽度（horizontal 下生效）；数字按 px */
    labelWidth: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 是否行内布局（表单项横向排列） */
    inline: { type: Boolean, default: false },
    /** 整表禁用（通过 provide 下发，配合控件接入生效） */
    disabled: { type: Boolean, default: false },
    /** 是否隐藏必填星号 */
    hideRequiredAsterisk: { type: Boolean, default: false },
    /** 是否显示校验错误信息 */
    showMessage: { type: Boolean, default: true },
    /** rules 变化时是否立即触发整表校验 */
    validateOnRuleChange: { type: Boolean, default: true },
  },
  emits: [
    /** 任一字段校验完成：(prop, isValid, message) */
    'validate',
  ],
  setup(props, { slots, emit, expose }) {
    const fields: FormFieldContext[] = []

    const context: FormContext = reactive({
      model: props.model,
      rules: props.rules,
      labelPosition: props.labelPosition,
      labelWidth: props.labelWidth,
      disabled: props.disabled,
      hideRequiredAsterisk: props.hideRequiredAsterisk,
      showMessage: props.showMessage,
      registerField: (field) => fields.push(field),
      unregisterField: (field) => {
        const idx = fields.indexOf(field)
        if (idx > -1) fields.splice(idx, 1)
      },
      emitValidate: (prop, isValid, message) => emit('validate', prop, isValid, message),
    })

    provide(formContextKey, context)

    // model 整体被替换（如重置为新对象）时同步上下文
    watch(
      () => [props.model, props.rules, props.labelPosition, props.labelWidth, props.disabled, props.hideRequiredAsterisk, props.showMessage] as const,
      () => {
        context.model = props.model
        context.rules = props.rules
        context.labelPosition = props.labelPosition
        context.labelWidth = props.labelWidth
        context.disabled = props.disabled
        context.hideRequiredAsterisk = props.hideRequiredAsterisk
        context.showMessage = props.showMessage
      }
    )

    const filterFields = (props?: string | string[]) => {
      if (!props) return fields
      const list = Array.isArray(props) ? props : [props]
      return fields.filter((f) => list.includes(f.prop))
    }

    /** 校验一组字段；全部通过 resolve，任一失败 reject invalidFields */
    const doValidate = (list: FormFieldContext[]): Promise<true> =>
      new Promise((resolve, reject) => {
        if (!list.length) {
          resolve(true)
          return
        }
        const invalidFields: FormInvalidFields = {}
        let pending = list.length
        let failed = false
        const settle = () => {
          if (pending > 0) return
          failed ? reject(invalidFields) : resolve(true)
        }
        list.forEach((field) => {
          field.validate().then(
            () => {
              pending--
              settle()
            },
            (invalid: FormInvalidFields) => {
              failed = true
              for (const key of Object.keys(invalid)) {
                invalidFields[key] = invalid[key]
              }
              pending--
              settle()
            }
          )
        })
      })

    expose({
      /** 校验全部字段（可传字段名数组只校验指定字段） */
      validate: async (fields?: string | string[], callback?: FormValidateCallback) => {
        const target = filterFields(fields)
        try {
          const ok = await doValidate(target)
          callback?.(true)
          return ok
        } catch (invalid) {
          callback?.(false, invalid as FormInvalidFields)
          return Promise.reject(invalid)
        }
      },
      /** 校验单个字段 */
      validateField: async (prop: string, callback?: FormValidateCallback) => {
        try {
          const ok = await doValidate(filterFields(prop))
          callback?.(true)
          return ok
        } catch (invalid) {
          callback?.(false, invalid as FormInvalidFields)
          return Promise.reject(invalid)
        }
      },
      /** 所有字段恢复挂载时初始值并清除校验状态 */
      resetFields: () => {
        fields.forEach((f) => f.resetField())
      },
      /** 清除校验状态（不传清全部；不清值） */
      clearValidate: (props?: string | string[]) => {
        filterFields(props).forEach((f) => f.clearValidate())
      },
      /** 滚动到指定字段 */
      scrollToField: (prop: string) => {
        const el = document.querySelector(`[data-k-form-field="${prop}"]`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      },
    })

    // rules 变化时立即校验（校验前先清一次）
    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          fields.forEach((f) => f.clearValidate())
          doValidate(fields).catch(() => {})
        }
      }
    )

    return () => (
      <form
        class={[b(), v(context.labelPosition, true), props.inline && v('inline', true)]}
        onSubmit={(ev) => ev.preventDefault()}
      >
        {slots.default?.()}
      </form>
    )
  },
})
