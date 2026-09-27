import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KPagination Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'currentPage',
    type: 'number',
    default: '—',
    required: true,
    desc: '当前页码（从 1 开始）。',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '—',
    required: true,
    desc: '每页条数。',
  },
  {
    name: 'total',
    type: 'number',
    default: '—',
    required: true,
    desc: '数据总条数。',
  },
  {
    name: 'entityLabel',
    type: 'string',
    default: "'条'",
    required: false,
    desc: '总览信息中的数据条目名称（如 "users"）。',
  },
  {
    name: 'showQuickJumper',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示快速跳转（第一页 / 最后一页）。',
  },
  {
    name: 'showSizeChanger',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否显示每页条数切换器。',
  },
  {
    name: 'simple',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '极简模式：仅「< 输入页码 / 总页数 >」，适合穿梭框等窄空间场景；输入后回车或失焦跳转，超范围自动夹取。',
  },
  {
    name: 'size',
    type: "'default' | 'small'",
    default: "'default'",
    required: false,
    desc: '尺寸：default 32px 按钮 / small 24px 按钮，适合表格、穿梭框等紧凑场景。',
  },
  {
    name: 'pageSizeOptions',
    type: 'number[]',
    default: '[10, 20, 50, 100]',
    required: false,
    desc: '每页条数选项（showSizeChanger 时生效）。',
  },
]

/** KPagination Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'change',
    desc: '页码或每页条数变化时触发，参数：{ page, pageSize }；切换每页条数时 page 重置为 1。',
  },
  {
    name: 'pageChange',
    desc: '页码变化时触发，参数为目标页码（number）。',
  },
  {
    name: 'update:pageSize',
    desc: '每页条数变化（v-model:page-size），参数为新的 pageSize。',
  },
]

/** KPagination Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  {
    name: 'summary',
    desc: '自定义左侧总览信息，替换默认的「x - y / total 条」文案。',
  },
]
