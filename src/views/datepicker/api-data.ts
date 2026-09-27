import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string | Dayjs | null', default: 'null', required: false, desc: '绑定值（单选）。支持 Dayjs 或日期字符串。' },
  { name: 'start', type: 'Dayjs | string | null', default: 'null', required: false, desc: '选中开始日期（范围选择用）。' },
  { name: 'end', type: 'Dayjs | string | null', default: 'null', required: false, desc: '选中结束日期（范围选择用）。' },
  { name: 'placeholder', type: 'string', default: "'选择日期'", required: false, desc: '占位文本。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸，与 KInput/KSelect 保持一致。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '下拉面板弹出方向。' },
  { name: 'format', type: 'string', default: "'YYYY-MM-DD'", required: false, desc: '日期显示格式。' },
  { name: 'type', type: "'date' | 'week' | 'month' | 'year' | 'quarter'", default: "'date'", required: false, desc: '选择类型。date 选择日，week 选择周，month 选择月，year 选择年，quarter 选择季度。' },
  { name: 'range', type: 'boolean', default: 'false', required: false, desc: '是否开启日期范围选择（类似 Element Plus 的 daterange / monthrange / yearrange）。开启后弹出两个联动面板，配合 v-model:start / v-model:end 使用。支持 type="date"（日范围：2026-01-01 ~ 2026-02-01）、type="month"（月范围：1 ~ 7 显示）、type="year"（年范围：2026 ~ 2029 显示）。' },
  { name: 'unlinkPanels', type: 'boolean', default: 'false', required: false, desc: '范围选择时是否改为单个独立面板。默认 false 时弹出左右两块联动面板；设为 true 时只显示单个面板，同样可以依次选择开始与结束日期。' },
  { name: 'minDate', type: 'Dayjs', default: '-', required: false, desc: '最小可选日期。' },
  { name: 'maxDate', type: 'Dayjs', default: '-', required: false, desc: '最大可选日期。' },
  { name: 'showYearNav', type: 'boolean', default: 'true', required: false, desc: '是否显示年导航按钮。' },
  { name: 'showOtherMonth', type: 'boolean', default: 'true', required: false, desc: '是否展示上/下月剩余日期。' },
  { name: 'shadow', type: "'always' | 'hover' | 'never'", default: "'always'", required: false, desc: '面板阴影模式。' },
  { name: 'paneSize', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '面板尺寸。' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: '面板边框。' },
  { name: 'paneWidth', type: 'string', default: "'340px'", required: false, desc: '面板宽度。' },
  { name: 'renderDate', type: '(day: Dayjs) => VNodeChild', default: '-', required: false, desc: '自定义日期格子的渲染函数，接收 Dayjs，返回 VNode 或 null。可配合 KTooltip 实现标记提示，或直接返回文字/图标。' },
  { name: 'dateMarks', type: 'DateMark[]', default: '[]', required: false, desc: '日期标记数组。支持单日 (date: "MM-DD") 和范围 (date: ["MM-DD", "MM-DD"])，支持 dot（小红点）和 label（文字）两种展示方式，支持 color（颜色）和 style（自定义行内样式，优先级高于 color），支持 tooltip（hover 提示）。' },
  { name: 'renderHeaderPrev', type: '(viewMonth: Dayjs, type) => VNodeChild', default: '-', required: false, desc: '自定义面板头部“上一月/上一档”单箭头图标，接收 (viewMonth, type)，返回非空则替换默认箭头图标；返回 null/undefined 回落默认。' },
  { name: 'renderHeaderNext', type: '(viewMonth: Dayjs, type) => VNodeChild', default: '-', required: false, desc: '自定义面板头部“下一月/下一档”单箭头图标，接收 (viewMonth, type)，返回非空则替换默认箭头图标；返回 null/undefined 回落默认。' },
  { name: 'renderHeaderPrevYear', type: '(viewMonth: Dayjs, type) => VNodeChild', default: '-', required: false, desc: '自定义面板头部“上一年”双箭头图标（常与 renderHeaderPrev 组合：双箭头跨年 + 单箭头跨月），接收 (viewMonth, type)，返回非空则替换默认双箭头；返回 null/undefined 回落默认。' },
  { name: 'renderHeaderNextYear', type: '(viewMonth: Dayjs, type) => VNodeChild', default: '-', required: false, desc: '自定义面板头部“下一年”双箭头图标（常与 renderHeaderNext 组合：单箭头跨月 + 双箭头跨年），接收 (viewMonth, type)，返回非空则替换默认双箭头；返回 null/undefined 回落默认。' },
  { name: 'renderHeaderTitle', type: '(label: string, viewMonth: Dayjs, type) => VNodeChild', default: '-', required: false, desc: '自定义面板头部标题内容，接收 (label, viewMonth, type)，返回非空则替换默认标题文字；返回 null/undefined 回落默认。' },
  { name: 'prefixIcon', type: 'string', default: '-', required: false, desc: '触发框前缀图标名。单选与范围模式均生效。' },
  { name: 'suffixIcon', type: 'string', default: "'calendar'", required: false, desc: '触发框后缀图标名。传了 suffix 插槽时插槽优先渲染。' },
  { name: 'clearIcon', type: 'string', default: "'close-bold'", required: false, desc: '清除按钮图标名。' },
  { name: 'shortcuts', type: 'Shortcut[]', default: '[]', required: false, desc: '快捷选项数组，每项 { text: string; value: () => Dayjs }。结合 cardPanel 时作为左侧快捷导航列，否则渲染在面板底部；点击后复用选中逻辑，当值与当前选中日期同一天时会高亮该快捷项。' },
  { name: 'cardPanel', type: 'boolean', default: 'false', required: false, desc: '卡片式面板布局：最外层为带阴影的卡片（padding 10px、宽度随内容自适应），内部左侧为快捷选项导航、右侧为 2px 蓝色边框的日期面板。' },
  { name: 'multiple', type: 'boolean', default: 'false', required: false, desc: '多选模式（type 支持 date / month / year，与 range 互斥）。在面板中点击多个日期/月/年，选中项独立高亮、可再次点击取消；触发框只读展示已选列表，搭配 v-model:values 双向绑定。' },
  { name: 'values', type: '(Dayjs | string)[]', default: '[]', required: false, desc: '多选已选值数组（v-model:values），支持 Dayjs 或日期字符串；date 用日期、month 用月份、year 用年份。多选与 confirm 组合时，点选写入草稿，点“确定”才提交更新。' },
  { name: 'confirm', type: 'boolean', default: 'false', required: false, desc: '手动确认模式（需配合 cardPanel 使用）。开启后底部显示“确定/取消”按钮，选择日期或快捷项不会立即生效，需点“确定”才提交生效、点“取消”则回滚丢弃；关闭（默认）时选择日期即时生效、无确定/取消按钮。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'change', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'select', desc: '选中日期时触发，参数为 Dayjs。' },
  { name: 'update:start', desc: '范围选择开始日期变化时触发。' },
  { name: 'update:end', desc: '范围选择结束日期变化时触发。' },
  { name: 'update:values', desc: '多选已选日期集合变化时触发，参数为新数组 Dayjs[]。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'prefix', desc: '触发框前缀自定义内容（图标或文字）。单选模式透传 KInput，范围模式渲染进整体选择框。' },
  { name: 'suffix', desc: '触发框后缀自定义内容，优先于 suffixIcon（传了则不再渲染默认 calendar 图标）。' },
  { name: 'top', desc: '面板顶部自定义内容（渲染在日历标题栏上方）。' },
  { name: 'bottom', desc: '面板底部自定义内容（渲染在日历下方，与 shortcuts 快捷项并存）。' },
  { name: 'cell', desc: '自定义单元格作用域插槽。接收 { date: Dayjs; text: number; disabled; isToday; isSelected; inRange; isCurrentMonth }，返回的自定义内容替换默认日期数字（月/年/季同理替换默认 label）。text 对齐 Element Plus：date 为号数、month/quarter 为 0 起始索引、year 为年份。可配合 .k-date-picker-pane__cell-custom 容器类对齐默认格子尺寸。' },
]