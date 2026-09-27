import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

/** KTab 组件 Props */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'String',
    default: "''",
    required: false,
    desc: '当前激活 tab 的 key，配合 v-model 受控使用。',
  },
  {
    name: 'defaultKey',
    type: 'String',
    default: "''",
    required: false,
    desc: '非受控模式下的初始激活 key；配合 KTabPane 的 k 或 items 的 key 使用。',
  },
  {
    name: 'items',
    type: 'KTabItem[]',
    default: '[]',
    required: false,
    desc: '数据驱动的选项卡配置数组（{ key, label }[]）；提供后无需再使用默认插槽。',
  },
  {
    name: 'stretch',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否均分：每个选项卡平分局内宽度（默认 false 按内容自适应，选项横向排列）。',
  },
  {
    name: 'closable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否允许关闭选项卡（在每个选项卡头显示关闭按钮）；也可通过 KTabPane 的 closable 单独控制。系统会自动保留至少一个选项卡——当仅剩一个时隐藏关闭按钮、不可关闭。',
  },
  {
    name: 'addable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否显示“添加选项卡”按钮（+），点击触发 add 事件。',
  },
  {
    name: 'beforeRemove',
    type: '() => boolean | Promise<boolean>',
    default: 'undefined',
    required: false,
    desc: '关闭前的拦截钩子：返回 false 或 reject 的 Promise 可阻止本次关闭。',
  },
  {
    name: 'itemPadding',
    type: 'String',
    default: "'10px 16px'",
    required: false,
    desc: '每个选项的内边距，例如 "8px 16px"；缺省使用内置默认值。',
  },
  {
    name: 'itemMargin',
    type: 'String',
    default: "''",
    required: false,
    desc: '每个选项的外边距，例如 "0 4px"，用于调整选项之间的间距。',
  },
  {
    name: 'scrollable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '选项卡过多超出宽度时，支持通过左右箭头或鼠标拖拽滚动查看。',
  },
  {
    name: 'indicator',
    type: "'full' | 'label'",
    default: "'full'",
    required: false,
    desc: "下划线指示条宽度策略：'full' 覆盖整条 item 宽（默认）；'label' 精确跟随文字宽度（横线与文字同宽，仿若文字级下划线）。",
  },
  {
    name: 'indicatorTransition',
    type: 'Boolean',
    default: 'true',
    required: false,
    desc: '下划线指示条是否带滑动动画（默认 true）；设为 false 时横线切换无滑动过渡效果。',
  },
  {
    name: 'indicatorStyle',
    type: 'Record<string, string>',
    default: '{}',
    required: false,
    desc: '自定义下划线指示条的内联样式（如 background 颜色、height 高度、borderRadius 圆角等）。',
  },
  {
    name: 'indicatorClass',
    type: 'String',
    default: "''",
    required: false,
    desc: '叠加到下划线指示条上的自定义类名，便于通过 CSS 覆盖默认样式。',
  },
  {
    name: 'activeColor',
    type: 'String',
    default: "''（默认 primary）",
    required: false,
    desc: '主题色：控制鼠标 hover 时的文字颜色、激活项文字颜色及下划线指示条颜色；缺省使用默认主题色（蓝色）。',
  },
  {
    name: 'ariaLabel',
    type: 'String',
    default: "'选项卡'",
    required: false,
    desc: 'tablist 的可访问标签（无障碍）。',
  },
]

/** KTab 组件 Emits */
export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '点击切换时触发，载荷为新的激活 key。' },
  { name: 'tab-click', desc: '点击某个 tab 时触发，载荷为 { key, label }。' },
  { name: 'tab-change', desc: '激活项切换生效后触发，载荷为 { key, label }。' },
  { name: 'tab-remove', desc: '点击关闭按钮时触发，载荷为 { key, label }。' },
  { name: 'add', desc: '点击添加按钮时触发，无载荷。' },
]

/** KTab 组件 Slots */
export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '默认插槽：放置一组 <KTabPane> 定义选项卡与面板内容。' },
  { name: 'label', desc: '自定义每个 tab 头部文字；作用域参数含 { key, label, closable, active }，可基于激活态自定义样式（加粗/换色等）。' },
  { name: 'pane', desc: '自定义面板内容区；作用域参数为当前项 { key, label }（配合 items 使用）。' },
  { name: 'add', desc: '自定义“添加选项卡”按钮内容（配合 addable）。' },
]

/** KTabPane 子组件 Props */
export const paneProps: ApiPropRow[] = [
  {
    name: 'k',
    type: 'String',
    default: '—',
    required: true,
    desc: '唯一标识，v-model 的值需与之对应。',
  },
  {
    name: 'label',
    type: 'String',
    default: "''",
    required: false,
    desc: '选项卡头部显示文案。',
  },
  {
    name: 'closable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '该项是否可关闭（显示关闭按钮）。',
  },
]
