import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

/** KTree 组件 Props */
export const apiProps: ApiPropRow[] = [
  {
    name: 'data',
    type: 'TreeNodeData[]',
    default: '—',
    required: true,
    desc:
      '树数据源（嵌套结构），数组项字段说明：\n' +
      '· id：节点唯一标识\n' +
      '· label：显示文本\n' +
      '· icon：节点图标（iconfont 名称，可选）\n' +
      '· disabled：是否禁用（可选）\n' +
      '· children：子节点数组，空数组或 undefined 视为叶子节点\n' +
      '· leaf：是否叶子节点（仅 load 模式有意义，标记后展开不再发起请求）',
  },
  {
    name: 'modelValue',
    type: 'String',
    default: "''",
    required: false,
    desc: '当前选中叶子节点的 id，配合 v-model 使用。',
  },
  {
    name: 'fieldProps',
    type: 'TreeFieldProps',
    default: '—',
    required: false,
    desc:
      '字段映射配置，后端返回字段名与默认结构不一致时使用：\n' +
      '· id（默认 \'id\'）\n· label（默认 \'label\'）\n· children（默认 \'children\'）\n' +
      '· icon（默认 \'icon\'）\n· disabled（默认 \'disabled\'）',
  },
  {
    name: 'defaultExpandAll',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc: '默认展开所有含子节点的节点。',
  },
  {
    name: 'defaultExpandedKeys',
    type: 'string[]',
    default: '[]',
    required: false,
    desc: '默认展开的节点 id 列表。',
  },
  {
    name: 'showCheckbox',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否显示复选框（基于 KCheckbox）。开启后支持父子级联多选：\n' +
      '· 勾选父节点 → 子孙全部勾选\n' +
      '· 子节点全部勾选时父节点自动勾上\n' +
      '· 部分勾选时父节点呈现半选态（indeterminate）\n' +
      '· 半选或未全选的父节点点击后统一变为全选\n' +
      '· 禁用节点不可勾选，也不参与级联计算的限制（子孙仍可独立勾选）',
  },
  {
    name: 'checkedKeys',
    type: 'string[]',
    default: '[]',
    required: false,
    desc: '勾选中的节点 id 列表（v-model:checked-keys），包含父节点与叶子节点。',
  },
  {
    name: 'load',
    type: '(node: TreeNodeData | null) => Promise<TreeNodeData[]>',
    default: '—',
    required: false,
    desc:
      '异步加载函数，传入后进入懒加载模式（此时 data 可传空数组）：\n' +
      '· 挂载时调用 load(null) 加载根层数据\n' +
      '· 展开未携带子级且非 leaf 的节点时调用 load(node) 加载其子级\n' +
      '· 节点自带 children 时不会发起请求\n' +
      '· 加载失败不写缓存，收起再展开即可重试\n' +
      '· 已加载的子级会缓存，重复展开不重复请求',
  },
  {
    name: 'draggable',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否可拖拽。开启后每个节点最前面展示 drag 把手图标，按住可拖动：\n' +
      '· 落在目标上 1/4 区域 → 插到目标之前\n' +
      '· 落在中间区域 → 变为目标节点的子级（自动展开）\n' +
      '· 落在下 1/4 区域 → 插到目标之后\n' +
      '· 禁止落到自己或自己的子孙节点（防环）\n' +
      '· 基于 Pointer Events 自实现，鼠标/触屏通用；老浏览器自动回退 mouse 事件',
  },
  {
    name: 'expandedIcon',
    type: 'String',
    default: "''",
    required: false,
    desc:
      '展开状态下展示的图标名（iconfont），如 \'minus-bold\'。\n' +
      '未单独配置时沿用 collapsedIcon；两者都未配置时使用默认箭头（旋转动画）。',
  },
  {
    name: 'collapsedIcon',
    type: 'String',
    default: "''",
    required: false,
    desc:
      '收起状态下展示的图标名（iconfont），如 \'add-bold\'。\n' +
      '未单独配置时沿用 expandedIcon；配置后取消默认箭头的旋转动画。',
  },
  {
    name: 'showLine',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否显示层级连接线。\n' +
      '纵向参考线与上一级展开图标的垂直中线对齐；每个子级节点还会从所属父级的竖线\n' +
      '引一段横向短线连到节点内容前。收起子树后对应线条自动消失。',
  },
]

/** KTree 组件 Emits */
export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '选中节点变化时触发，载荷为节点 id（string）。' },
  { name: 'select', desc: '叶子节点被选中时触发，载荷为该节点原始数据对象。' },
  { name: 'toggle', desc: '节点展开/收起时触发，载荷 { node, expanded }。' },
  { name: 'update:checkedKeys', desc: '勾选项变化时触发（v-model:checked-keys），载荷为全量勾选中的节点 id 数组。' },
  { name: 'check', desc: '节点被勾选/取消勾选时触发，载荷 { node, checked }。' },
  { name: 'load', desc: '异步加载完成时触发，载荷 { node, data }；node 为 null 表示根层加载完成。' },
  { name: 'drop', desc: '拖拽落下并完成移动后触发，载荷 { dragNode, targetNode, type }，type 为 before / after / inner。可在监听中把新的树结构同步给后端。' },
]

/** KTree 组件 Slots */
export const apiSlots: ApiSlotRow[] = []
