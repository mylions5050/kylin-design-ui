import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string / number', default: "''", required: false, desc: '绑定值。支持 .trim / .lazy / .number 修饰符。' },
  { name: 'type', type: "'text' | 'password' | 'textarea' | 'number'", default: "'text'", required: false, desc: '输入框类型。' },
  { name: 'placeholder', type: 'string', default: "''", required: false, desc: '占位文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '是否只读。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸预设。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除。' },
  { name: 'showPassword', type: 'boolean', default: 'false', required: false, desc: '密码输入框是否显示切换密码可见性按钮。' },
  { name: 'prefixIcon', type: 'string', default: '-', required: false, desc: '前置图标名（KIcon name）。' },
  { name: 'suffixIcon', type: 'string', default: '-', required: false, desc: '后置图标名（KIcon name）。' },
  { name: 'clearIcon', type: 'string', default: '-', required: false, desc: '清除图标名（KIcon name）。' },
  { name: 'maxlength', type: 'string / number', default: '-', required: false, desc: '最大输入长度。' },
  { name: 'minLength', type: 'string / number', default: '-', required: false, desc: '最小输入长度。' },
  { name: 'showWordLimit', type: 'boolean', default: 'false', required: false, desc: '是否显示字数统计（需配合 maxlength 使用）。' },
  { name: 'autoFocus', type: 'boolean', default: 'false', required: false, desc: '是否自动聚焦。' },
  { name: 'autoComplete', type: 'string', default: "'off'", required: false, desc: '原生 autocomplete 属性。' },
  { name: 'rows', type: 'number', default: '3', required: false, desc: 'textarea 行数。' },
  { name: 'resize', type: "'none' | 'both' | 'horizontal' | 'vertical'", default: "'vertical'", required: false, desc: 'textarea 缩放方向。' },
  { name: 'formatter', type: '(value: string) => string', default: '-', required: false, desc: '输入值格式化函数（用于显示）。' },
  { name: 'parser', type: '(value: string) => string', default: '-', required: false, desc: '格式化值的解析函数（用于取值）。' },
  { name: 'trim', type: 'boolean', default: 'true', required: false, desc: '是否自动 trim 首尾空格。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '值更新时触发，参数为新的 value。' },
  { name: 'input', desc: '输入时触发。' },
  { name: 'change', desc: '值改变时触发（失焦时）。' },
  { name: 'focus', desc: '获取焦点时触发。' },
  { name: 'blur', desc: '失去焦点时触发。' },
  { name: 'clear', desc: '清除时触发。' },
  { name: 'compositionstart', desc: '输入法 composition 开始时触发。' },
  { name: 'compositionend', desc: '输入法 composition 结束时触发。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'prefix', desc: '前置图标插槽（自定义图标内容）。' },
  { name: 'suffix', desc: '后置图标插槽（自定义图标内容）。' },
  { name: 'prepend', desc: '前置文本插槽。' },
  { name: 'append', desc: '后置文本插槽。' },
  { name: 'prependCustom', desc: '前置自定义内容插槽。' },
  { name: 'appendCustom', desc: '后置自定义内容插槽。' },
]