export type SortOrder = 'asc' | 'desc' | null

export interface SortItem {
  field: string
  order: Exclude<SortOrder, null>
}

// 默认排序：单列（向后兼容 { field, order }）或多列数组
export type DefaultSort = SortItem | SortItem[]

export interface BaseTableColumn<T = Record<string, any>> {
  // Omitted for group columns (columns with `children`); required for leaf columns.
  field?: string
  title: string
  width?: number | string
  minWidth?: number | string
  fixed?: 'left' | 'right'
  type?: 'selection'
  sortable?: boolean
  // 该列的默认排序方向；与 prop defaultSort 合并，prop 对同列的声明优先
  defaultSort?: { order: SortOrder }
  align?: 'left' | 'center' | 'right'
  sorter?: (a: T, b: T) => number
  formatter?: (value: unknown, row: T) => string
  // Custom class applied to each body cell of this column (e.g. 'is-cell-bold').
  cellClass?: string
  cellStyle?: Record<string, string> | ((row: T) => Record<string, string>)
  // Fallback text shown when the cell value is empty (null/undefined/'').
  // Defaults to the table's `emptyText` prop ('-'). Set to `false` to opt out
  // for columns whose slot renders its own content regardless of value
  // (e.g. action buttons, cover images).
  emptyText?: string | false
  // When set, renders a group header spanning the children (one level of sub-columns).
  children?: BaseTableColumn<T>[]
  // Background applied to this column's cells (header + body + summary). On a group
  // column, inherited by all children unless a child overrides it.
  background?: string
  // Renders an info icon next to the header title with a popover. Only rendered on
  // non-sortable headers (sortable headers keep their sort button).
  headerInfo?: {
    title?: string
    description: string
    placement?: 'left' | 'center' | 'right'
    trigger?: 'hover' | 'click'
  }
}

export interface BaseTableSortState {
  field: string
  order: SortOrder
}

export interface BaseTablePagination {
  pageSize: number
  current?: number
}

export interface BaseTablePageChange {
  page: number
  pageSize: number
}

// Bottom summary row: key = leaf column field, value = displayed text.
// Missing fields render as empty cells.
export type BaseTableSummary = Record<string, string>
