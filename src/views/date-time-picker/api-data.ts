import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'Dayjs | string | null', default: 'null', required: false, desc: '绑定值（单选）。支持 Dayjs 或日期时间字符串（如 "2026-09-10 08:30:00"）。' },
  { name: 'start', type: 'Dayjs | string | null', default: 'null', required: false, desc: '范围选择的开始日期时间（v-model:start，range 时使用）。' },
  { name: 'end', type: 'Dayjs | string | null', default: 'null', required: false, desc: '范围选择的结束日期时间（v-model:end，range 时使用）。' },
  { name: 'range', type: 'boolean', default: 'false', required: false, desc: '是否为日期时间范围选择（datetimerange），配合 start / end 使用。' },
  { name: 'placeholder', type: 'string', default: "'选择日期时间'", required: false, desc: '占位文本。' },
  { name: 'format', type: 'string', default: "'YYYY-MM-DD HH:mm:ss'", required: false, desc: '展示格式：日期段 + 空格 + 时间段；时间段决定时/分/秒列渲染。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸，与 KInput/KSelect 保持一致。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '弹出方向。' },
  { name: 'prefixIcon', type: 'string', default: '-', required: false, desc: '前缀图标名（触发框左侧）。' },
  { name: 'suffixIcon', type: 'string', default: "'calendar'", required: false, desc: '后缀图标名（触发框右侧）。' },
  { name: 'clearIcon', type: 'string', default: "'close-bold'", required: false, desc: '清除按钮图标名。' },
  { name: 'panelHeight', type: 'string | number', default: '256', required: false, desc: '面板时/分/秒列的可滑滚动高度（px）。' },
  { name: 'minDate', type: 'Dayjs', default: '-', required: false, desc: '最小可选日期（透传日历面板）。' },
  { name: 'maxDate', type: 'Dayjs', default: '-', required: false, desc: '最大可选日期（透传日历面板）。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '单选模式点击"确定"提交时触发，参数为 Dayjs。' },
  { name: 'update:start', desc: '范围模式点击"确定"提交时触发，参数为开始时间 Dayjs。' },
  { name: 'update:end', desc: '范围模式点击"确定"提交时触发，参数为结束时间 Dayjs。' },
  { name: 'change', desc: '提交生效时触发；单选参数为 Dayjs，范围参数为 [start, end] 数组。' },
  { name: 'visible-change', desc: '面板出现/隐藏时触发，参数为 boolean。' },
  { name: 'clear', desc: '点击清除按钮时触发。' },
]

export const apiSlots: ApiSlotRow[] = []
