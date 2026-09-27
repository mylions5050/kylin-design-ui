import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string | Dayjs | null', default: 'null', required: false, desc: '绑定值（单选）。支持 Dayjs 或日期字符串。' },
  { name: 'start', type: 'Dayjs | string | null', default: 'null', required: false, desc: '选中开始日期（范围选择用）。' },
  { name: 'end', type: 'Dayjs | string | null', default: 'null', required: false, desc: '选中结束日期（范围选择用）。' },
  { name: 'segment', type: 'boolean', default: 'false', required: false, desc: '分段范围模式（仅 type: date 生效，与 multiple / isRange 互斥）。两步点选成段（重复点同一日取消）；点已有段内日期则截断移除该天；新段与已有段重叠或首尾相接时自动合并。' },
  { name: 'ranges', type: 'DateSegment[]（[Dayjs, Dayjs][]）', default: '[]', required: false, desc: '分段模式已选段数组（segment 时的高亮来源），每项 [start, end]，支持 Dayjs 或日期字符串。' },
  { name: 'placeholder', type: 'string', default: "'选择日期'", required: false, desc: '占位文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '下拉面板弹出方向。' },
  { name: 'format', type: 'string', default: "'YYYY-MM-DD'", required: false, desc: '日期显示格式。' },
  { name: 'minDate', type: 'Dayjs', default: '-', required: false, desc: '最小可选日期。' },
  { name: 'maxDate', type: 'Dayjs', default: '-', required: false, desc: '最大可选日期。' },
  { name: 'showYearNav', type: 'boolean', default: 'true', required: false, desc: '是否显示年导航按钮。' },
  { name: 'showOtherMonth', type: 'boolean', default: 'true', required: false, desc: '是否展示上/下月剩余日期。' },
  { name: 'shadow', type: "'always' | 'hover' | 'never'", default: "'always'", required: false, desc: '面板阴影模式。' },
  { name: 'paneSize', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '面板尺寸。' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: '面板边框。' },
  { name: 'paneWidth', type: 'string', default: "'340px'", required: false, desc: '面板宽度。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'change', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'select', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'update:start', desc: '范围选择开始日期变化时触发。' },
  { name: 'update:end', desc: '范围选择结束日期变化时触发。' },
  { name: 'update:ranges', desc: '分段模式下分段集合变化时触发，参数为 DateSegment[]（[start, end][]，Dayjs）。' },
]

export const apiSlots: ApiSlotRow[] = []