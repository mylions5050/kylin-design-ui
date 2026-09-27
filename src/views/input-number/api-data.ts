import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'number | null', default: 'undefined', required: false, desc: '绑定值；清空输入框时为 null。' },
  { name: 'min', type: 'number', default: '-Infinity', required: false, desc: '允许的最小值，失焦与步进时收敛，到达边界后减号按钮禁用。' },
  { name: 'max', type: 'number', default: 'Infinity', required: false, desc: '允许的最大值，失焦与步进时收敛，到达边界后加号按钮禁用。' },
  { name: 'step', type: 'number', default: '1', required: false, desc: '步长，可以是小数；空值时从 0（有 min 则从 min）起步。' },
  { name: 'precision', type: 'number', default: 'undefined', required: false, desc: '数值精度（小数位数），展示与步进结果都按它取齐。' },
  { name: 'controls', type: 'boolean', default: 'true', required: false, desc: '是否显示增减按钮。' },
  { name: 'controls-position', type: "'default' | 'right'", default: "'default'", required: false, desc: '按钮位置：default 左右两侧灰底按钮；right 右侧上下箭头，hover 或聚焦时出现。' },
  { name: 'formatter', type: '(value: number) => string', default: 'undefined', required: false, desc: '格式化展示（非输入态生效），如千分位。' },
  { name: 'parser', type: '(value: string) => number', default: 'undefined', required: false, desc: '解析用户输入为数值，与 formatter 搭配使用。' },
  { name: 'status', type: "'' | 'primary' | 'error' | 'warning' | 'success' | 'info'", default: "''", required: false, desc: '状态：控制边框与聚焦阴影颜色，适合表单校验场景。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸，按钮宽度随尺寸收窄。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '是否只读（隐藏增减按钮，输入框不可编辑）。' },
  { name: 'placeholder', type: 'string', default: "''", required: false, desc: '输入框占位文本。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'change', desc: '绑定值变化时触发（输入、失焦、步进），参数 (value: number | null)。' },
  { name: 'blur', desc: '输入框失焦时触发，此时对输入值做收敛（clamp / precision / 回退）。' },
  { name: 'focus', desc: '输入框聚焦时触发。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'prefix', desc: '输入框前缀内容，如货币符号 ¥。' },
  { name: 'suffix', desc: '输入框后缀内容，如单位 kg。' },
]
