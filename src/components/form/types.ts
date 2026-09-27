import type { InjectionKey } from 'vue'

/**
 * 校验规则（基于 async-validator，兼容 antd Form / Element Plus 的 Rule 写法）：
 * 常用字段 required / type / min / max / len / pattern / enum / whitespace /
 * message / validator(rule, value, callback) / trigger。
 */
export interface FormItemRule {
  /** 校验触发时机标识（保留字段；当前为值变化即校验） */
  trigger?: string
  [key: string]: any
}

/** Form 级 rules：key 为 KFormItem 的 prop（支持点路径，如 'profile.age'） */
export type FormRules = Record<string, FormItemRule | FormItemRule[]>

/** 单字段校验失败信息 */
export interface FormValidateError {
  field: string
  message: string
}

/** validate 失败时按字段归类的错误集合 */
export type FormInvalidFields = Record<string, FormValidateError[]>

/** validate 回调风格（也支持 Promise 风格：resolve 全部通过 / reject invalidFields） */
export type FormValidateCallback = (isValid: boolean, invalidFields?: FormInvalidFields) => void

/** 标签位置：left/right（水平，label 定宽）/ top（标签在上） */
export type FormLabelPosition = 'left' | 'right' | 'top'

/** KFormItem 注册到 KForm 的字段上下文 */
export interface FormFieldContext {
  /** 对应 model 的字段路径 */
  prop: string
  /** 触发校验；通过则 resolve，失败则 reject（message 在 error.message） */
  validate: () => Promise<true>
  /** 清除本校验状态 */
  clearValidate: () => void
  /** 恢复为挂载时的初始值并清除校验状态 */
  resetField: () => void
}

/** KForm provide 给 KFormItem 的上下文 */
export interface FormContext {
  model: Record<string, any>
  rules: FormRules
  labelPosition: FormLabelPosition
  labelWidth: string | number
  disabled: boolean
  hideRequiredAsterisk: boolean
  showMessage: boolean
  /** 字段注册 / 注销（动态增减表单项时） */
  registerField: (field: FormFieldContext) => void
  unregisterField: (field: FormFieldContext) => void
  /** 单字段校验完成（成功或失败）后上抛 */
  emitValidate: (prop: string, isValid: boolean, message: string) => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('KFormContext')
