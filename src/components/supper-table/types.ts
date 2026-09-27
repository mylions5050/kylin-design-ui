/** Column value types supported by the table. */
export type ColumnType =
  | 'text'
  | 'number'
  | 'percent'
  | 'currency'
  | 'radio'
  | 'checkbox'
  | 'date'

/** A column definition: a name plus its value type. */
export interface Column {
  name: string
  type: ColumnType
}

/** A row in the tree. `children` enables nested (child) rows. */
export interface RowNode {
  id: number
  cells: string[]
  children: RowNode[]
}

/** A row flattened for rendering, with hierarchy metadata. */
export interface FlatRow {
  node: RowNode
  depth: number
  label: string
  siblings: RowNode[]
}

/** Arrow-key navigation direction. */
export type NavDirection = 'up' | 'down' | 'left' | 'right'

/** The currently bordered (active) cell. */
export interface ActiveCell {
  rowId: number
  col: number
}

export type ColModalMode = 'create' | 'edit'

/** State of the add/edit column modal. */
export interface ColModal {
  mode: ColModalMode
  name: string
  type: ColumnType
  submit: (name: string, type: ColumnType) => void
}

/** State of the right-click context menu (row or column variant). */
export type MenuState =
  | { type: 'row'; x: number; y: number; row: FlatRow; batch: boolean }
  | { type: 'col'; x: number; y: number; col: number }
  | null

/** Public props of the SupperTable component. */
export interface SupperTableProps {
  defaultColumns?: Column[]
  defaultRows?: number
}
