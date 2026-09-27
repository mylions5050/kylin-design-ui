export type InputType = 'text' | 'password' | 'textarea' | 'number'
export type InputSize = 'small' | 'default' | 'large'
export type ResizeType = 'none' | 'both' | 'horizontal' | 'vertical'

export interface InputProps {
  modelValue?: string | number
  type?: InputType
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  size?: InputSize
  clearable?: boolean
  showPassword?: boolean
  prefixIcon?: string
  suffixIcon?: string
  maxlength?: string | number
  minlength?: string | number
  autofocus?: boolean
  autocomplete?: string
  rows?: number
  resize?: ResizeType
  showWordLimit?: boolean
  formatter?: (value: string) => string
  parser?: (value: string) => string
  clearIcon?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}