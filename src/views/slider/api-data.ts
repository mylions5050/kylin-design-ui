import type { ApiPropRow, ApiSlotRow } from '@/components/api-table/types'

/** KSlider Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'number | number[]',
    default: '0',
    required: false,
    desc: '当前值，支持 v-model 双向绑定；range / editable 时为 number 数组。',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    desc: '最小值。',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    desc: '最大值。',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    required: false,
    desc: '步长，取值按步长对齐。',
  },
  {
    name: 'range',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '双滑块模式，modelValue 为 number 数组。',
  },
  {
    name: 'editable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '动态增减节点（需配合 range）：点击轨道添加节点，把节点拖出轨道两端或按 Delete/Backspace 删除。',
  },
  {
    name: 'minCount',
    type: 'number',
    default: '2',
    required: false,
    desc: 'editable 时最少节点数。',
  },
  {
    name: 'maxCount',
    type: 'number',
    default: 'Infinity',
    required: false,
    desc: 'editable 时最多节点数。',
  },
  {
    name: 'disabled',
    type: 'Boolean | boolean[]',
    default: 'false',
    required: false,
    desc: 'Boolean 整体禁用；boolean[]（range）单独禁用指定下标的滑块，被禁用的滑块作为移动边界，其他滑块无法越过。',
  },
  {
    name: 'dots',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否按 step 在轨道上显示刻度点。',
  },
  {
    name: 'tooltipOpen',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: 'tooltip 是否常显；默认悬浮 / 拖动时显示。',
  },
  {
    name: 'formatTooltip',
    type: '(value: number) => string | number',
    default: '—',
    required: false,
    desc: '自定义 tooltip 内容格式化函数。',
  },
  {
    name: 'marks',
    type: 'Record<number, string | { label, style }>',
    default: '—',
    required: false,
    desc: '刻度标记，key 为数值位置；点击标签可定位（range 取最近滑块），标签可用 style 自定义样式。',
  },
  {
    name: 'markStyle',
    type: 'StyleValue',
    default: '—',
    required: false,
    desc: '统一自定义 marks 标签样式（单个标签可用 marks 的 style 覆盖）。',
  },
  {
    name: 'color',
    type: 'string | (value) => string',
    default: '—',
    required: false,
    desc: '主色：已滑过轨道 / 滑块边框 / 激活光圈 / 激活刻度点；支持按当前值取色的函数（分阶段变色）。',
  },
  {
    name: 'railColor',
    type: 'string',
    default: '—',
    required: false,
    desc: '轨道背景色。',
  },
  {
    name: 'vertical',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '垂直模式，需在外部给组件设置高度。',
  },
]

/** KSlider Emits 表格数据 */
export const apiEmits: { name: string; desc: string }[] = [
  {
    name: 'update:modelValue',
    desc: 'v-model：值变化时触发（拖动过程中持续触发），载荷为当前值。',
  },
  {
    name: 'change',
    desc: '值变化时触发（拖动过程中持续触发），载荷为当前值。',
  },
  {
    name: 'afterChange',
    desc: '拖动结束 / 键盘调整后触发，载荷为最终值，适合此时提交表单。',
  },
]

/** KSlider Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = []
