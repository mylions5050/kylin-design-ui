import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string | Dayjs | null', default: 'null', required: false, desc: '绑定值。支持 Dayjs 或时间字符串（如 "14:30:00"，将按 format 解析）。' },
  { name: 'placeholder', type: 'string', default: "'选择时间'", required: false, desc: '占位文本。' },
  { name: 'format', type: 'string', default: "'HH:mm:ss'", required: false, desc: '时间显示格式，同时决定面板渲染哪些列：含秒标记（ss/SSS）则渲染秒列，含分标记（mm）则渲染分列，小时列始终渲染。如 HH:mm 仅时+分列、HH 仅小时列。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸，与 KInput/KSelect 保持一致。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '是否只读。开启后禁止手动输入，面板仍可点选。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除（有值时显示清除按钮）。' },
  { name: 'confirm', type: 'boolean', default: 'false', required: false, desc: '手动确认模式。开启后面板选择只记录草稿、不立即生效，并显示底部操作栏（此刻 | 确认），须点“确认”才提交生效；关闭则为即时模式（选择即生效并关闭面板）。' },
  { name: 'previewOnHover', type: 'boolean', default: 'true', required: false, desc: 'hover / 滚动实时预览。开启后鼠标悬停或滚动到时/分/秒值时，触发框以浅灰实时预览该值，但不产生提交；点选/确认才落定。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '下拉面板弹出方向。' },
  { name: 'prefixIcon', type: 'string', default: '-', required: false, desc: '触发框前缀图标名。' },
  { name: 'suffixIcon', type: 'string', default: "'time'", required: false, desc: '触发框后缀图标名，默认时钟 time 图标。' },
  { name: 'clearIcon', type: 'string', default: "'close-bold'", required: false, desc: '清除按钮图标名。' },
  { name: 'panelHeight', type: 'string | number', default: '256', required: false, desc: '面板时/分/秒列的可滑滚动区域高度（px），默认 256 即天然容纳 8 个小时。' },
  { name: 'teleported', type: 'boolean', default: 'true', required: false, desc: '面板是否 Teleport 到 body。' },
  { name: 'popperClass', type: 'string', default: '-', required: false, desc: '自定义面板类名。' },
  { name: 'minWidth', type: 'string | number', default: '-', required: false, desc: '面板最小宽度。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '选中时间时触发，参数为 Dayjs。' },
  { name: 'change', desc: '选中时间时触发，参数为 Dayjs。' },
  { name: 'visible-change', desc: '面板展开/收起时触发，参数为 boolean。' },
  { name: 'clear', desc: '点击清除按钮时触发。' },
  { name: 'focus', desc: '触发框聚焦（面板展开）时触发。' },
  { name: 'blur', desc: '触发框失焦（面板收起）时触发。' },
]

export const apiSlots: ApiSlotRow[] = []