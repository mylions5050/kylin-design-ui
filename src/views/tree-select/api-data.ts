import type { ApiPropRow } from '@/components/api-table/types'

/** KTreeSelect Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'data',
    type: 'TreeNodeData[]',
    default: '—',
    required: true,
    desc: '树数据源（嵌套结构，字段同 KTree 默认约定：id / label / children）。',
  },
  {
    name: 'modelValue',
    type: 'String',
    default: "''",
    required: false,
    desc: '当前选中节点 id，支持 v-model 双向绑定。',
  },
  {
    name: 'placeholder',
    type: 'String',
    default: "'请选择'",
    required: false,
    desc: '占位文本。',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否禁用。',
  },
  {
    name: 'clearable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '是否可清空；有选中值时悬浮触发器出现清除图标。',
  },
  {
    name: 'defaultExpandAll',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '面板内树默认展开所有节点。',
  },
  {
    name: 'maxHeight',
    type: 'String | Number',
    default: "'264px'",
    required: false,
    desc: '下拉面板最大高度。',
  },
]

/** KTreeSelect Emits 表格数据 */
export const apiEmits: { name: string; desc: string }[] = [
  {
    name: 'update:modelValue',
    desc: 'v-model：选中节点变化时触发，载荷为节点 id。',
  },
  {
    name: 'change',
    desc: '选中节点变化时触发，载荷为节点 id。',
  },
  {
    name: 'select',
    desc: '选中节点时触发，载荷为该节点原始数据。',
  },
  {
    name: 'visibleChange',
    desc: '下拉面板展开/收起时触发，载荷为布尔值。',
  },
  {
    name: 'clear',
    desc: '点击清空图标时触发。',
  },
]
