import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string', default: "''", required: false, desc: '绑定值，"HH:mm" 格式的时间字符串。' },
  { name: 'start', type: 'string', default: "'09:00'", required: false, desc: '开始时间（"HH:mm"）。' },
  { name: 'end', type: 'string', default: "'18:00'", required: false, desc: '结束时间（"HH:mm"），默认不包含在选项中。' },
  { name: 'step', type: 'string', default: "'00:30'", required: false, desc: '步长间隔（"HH:mm"，取分钟差）。' },
  { name: 'includeEndTime', type: 'boolean', default: 'true', required: false, desc: '是否在选项中包含 end 本身。' },
  { name: 'minTime', type: 'string', default: "''", required: false, desc: '最早可选时间，早于该时间的选项置灰。' },
  { name: 'maxTime', type: 'string', default: "''", required: false, desc: '最晚可选时间，晚于该时间的选项置灰。' },
  { name: 'format', type: 'string', default: "'HH:mm'", required: false, desc: '下拉项与触发框的展示格式（dayjs format）。' },
  { name: 'placeholder', type: 'string', default: "'选择时间'", required: false, desc: '占位文本。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸，与 KSelect 保持一致。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'clearable', type: 'boolean', default: 'true', required: false, desc: '是否可清除。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '下拉面板弹出方向。' },
  { name: 'prefixIcon', type: 'string', default: "'clock'", required: false, desc: '前缀图标名。' },
  { name: 'clearIcon', type: 'string', default: "'close-bold'", required: false, desc: '清除按钮图标名。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '选中时间变化时触发，参数为 "HH:mm" 字符串。' },
  { name: 'change', desc: '选中时间变化时触发，参数为 "HH:mm" 字符串。' },
  { name: 'clear', desc: '点击清除按钮时触发。' },
  { name: 'focus', desc: '获得焦点时触发。' },
  { name: 'blur', desc: '失去焦点时触发。' },
  { name: 'visible-change', desc: '下拉面板出现/隐藏时触发，参数为 boolean。' },
]

export const apiSlots: ApiSlotRow[] = []
