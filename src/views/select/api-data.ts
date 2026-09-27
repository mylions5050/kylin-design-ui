import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'v-model', type: 'string / number / string[] / number[]', default: "''", required: false, desc: '选中值。单选为 string/number，多选为数组。支持 .trim / .lazy / .number 修饰符。' },
  { name: 'options', type: 'SelectOption[]', default: '[]', required: false, desc: '选项列表，每项含 label、value、disabled、tooltip、group 等字段。' },
  { name: 'placeholder', type: 'string', default: "'请选择'", required: false, desc: '占位文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '是否只读。' },
  { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", required: false, desc: '尺寸预设。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否可清除。' },
  { name: 'filterable', type: 'boolean', default: 'false', required: false, desc: '是否可搜索过滤。' },
  { name: 'filterMethod', type: '(keyword: string, option: SelectOption) => boolean', default: '-', required: false, desc: '自定义过滤方法。接收输入关键词和选项，返回 true 表示匹配。' },
  { name: 'multiple', type: 'boolean', default: 'false', required: false, desc: '是否多选。多选时 modelValue 为数组。' },
  { name: 'maxTags', type: 'number', default: '-1', required: false, desc: '多选时最多显示的标签数，-1 表示不限。' },
  { name: 'collapseTags', type: 'boolean', default: 'false', required: false, desc: '多选时超出 maxTags 的标签是否折叠为 +N 显示。' },
  { name: 'collapseTooltip', type: 'boolean', default: 'true', required: false, desc: '折叠标签是否显示 tooltip 提示完整列表。' },
  { name: 'remote', type: 'boolean', default: 'false', required: false, desc: '是否远程搜索。需配合 remoteMethod 使用。' },
  { name: 'remoteMethod', type: '(query: string) => Promise<SelectOption[]>', default: '-', required: false, desc: '远程搜索方法，输入关键词后返回 Promise<SelectOption[]>。' },
  { name: 'reserveKeyword', type: 'boolean', default: 'false', required: false, desc: '远程搜索时是否保留关键词。' },
  { name: 'loading', type: 'boolean', default: 'false', required: false, desc: '是否显示加载中状态。' },
  { name: 'valueKey', type: 'string', default: "'value'", required: false, desc: '值唯一标识字段名。' },
  { name: 'prefixIcon', type: 'string', default: '-', required: false, desc: '前置图标名（KIcon name）。' },
  { name: 'suffixIcon', type: 'string', default: "'arrow-down'", required: false, desc: '后置图标名（KIcon name）。' },
  { name: 'clearIcon', type: 'string', default: "'close-bold'", required: false, desc: '清除图标名（KIcon name）。' },
  { name: 'placement', type: 'PopperPlacement', default: "'bottom-start'", required: false, desc: '下拉面板弹出方向，支持 12 种方向（top/bottom/left/right + start/end）。' },
  { name: 'maxHeight', type: 'string / number', default: "'240px'", required: false, desc: '下拉面板最大高度。' },
  { name: 'fitInputWidth', type: 'boolean', default: 'true', required: false, desc: '下拉宽度是否跟随输入框宽度。' },
  { name: 'noMatchText', type: 'string', default: "'无匹配数据'", required: false, desc: '搜索无匹配数据时显示的文本。' },
  { name: 'noDataText', type: 'string', default: "'无数据'", required: false, desc: '选项列表为空时显示的文本。' },
  { name: 'defaultFirstOption', type: 'boolean', default: 'false', required: false, desc: '是否默认高亮第一项。配合 filterable 使用，可按 Enter 快速选中。' },
  { name: 'effect', type: "'light' | 'dark'", default: "'light'", required: false, desc: '主题效果。' },
  { name: 'teleported', type: 'boolean', default: 'true', required: false, desc: '下拉面板是否使用 Teleport 渲染到 body。' },
  { name: 'popperClass', type: 'string', default: '-', required: false, desc: '下拉面板自定义类名。' },
  { name: 'name', type: 'string', default: '-', required: false, desc: '原生 name 属性。' },
  { name: 'nativeId', type: 'string', default: '-', required: false, desc: '原生 id 属性。' },
  { name: 'ariaLabel', type: 'string', default: '-', required: false, desc: 'aria-label 无障碍标签。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'change', desc: '选中值变化时触发，参数为新的 value。' },
  { name: 'visible-change', desc: '下拉面板展开/收起时触发，参数为 visible: boolean。' },
  { name: 'remove-tag', desc: '多选模式下删除标签时触发，参数为被删除选项的 value。' },
  { name: 'clear', desc: '清空值时触发。' },
  { name: 'focus', desc: '获取焦点时触发。' },
  { name: 'blur', desc: '失去焦点时触发。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '用于放置 KOption 和 KOptionGroup 组件。' },
]