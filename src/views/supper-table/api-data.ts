import type { ApiPropRow } from '@/components/api-table/types'

/** KSupTable Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'defaultColumns',
    type: 'Column[]',
    default: 'DEFAULT_COLUMNS',
    required: false,
    desc: '初始列定义，结构为 { name, type }；type 支持 text / number / percent / currency / radio / checkbox / date。',
  },
  {
    name: 'defaultRows',
    type: 'number',
    default: '7',
    required: false,
    desc: '初始数据行数。组件为全交互式：单元格编辑 + 方向键导航、行 / 列右键菜单、子行树形展开、列宽拖拽、单元格框选与填充拖拽、行 / 列勾选与全选、Ctrl+Z 撤销、新增 / 编辑列弹窗等能力均内置，无对外 Props / Emits / Slots。',
  },
]
