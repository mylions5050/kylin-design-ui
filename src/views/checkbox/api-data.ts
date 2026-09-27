import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KCheckbox Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否选中，支持 v-model:checked。',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '半选态，常用于表头全选框部分选中时；点击半选框会变为全选。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用，禁用后不响应鼠标点击与键盘操作。',
  },
  {
    name: 'size',
    type: 'number | string',
    default: '16',
    required: false,
    desc: '方框尺寸，px 数字或任意 CSS 尺寸字符串；图标比方框小 2px。',
  },
]

/** KCheckbox Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'update:checked',
    desc: '选中状态变化时触发（v-model:checked），参数为新的 checked 布尔值。',
  },
  {
    name: 'change',
    desc: '点击切换时触发，参数为新的 checked 布尔值；点击会 stopPropagation，不冒泡到表格行。',
  },
]

/** KCheckbox Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'default',
    desc: '标签文字；不传则只渲染方框（表格多选场景常用）。',
  },
]
