import type { Column, ColumnType, NavDirection } from './types'

/** Display label for each column type (used in the type dropdown + header). */
export const TYPE_LABELS: Record<ColumnType, string> = {
  text: '文本',
  number: '数字',
  percent: '百分比',
  currency: '货币',
  radio: '单选',
  checkbox: '多选',
  date: '日期',
}

/** Type options for the column config <select> (`[value, label]` pairs). */
export const TYPE_OPTIONS = Object.entries(TYPE_LABELS) as [ColumnType, string][]

/** Default columns shown on first render. */
export const DEFAULT_COLUMNS: Column[] = [
  { name: 'Name', type: 'text' },
  { name: 'Select', type: 'radio' },
  { name: 'Date', type: 'date' },
  { name: '百分比', type: 'percent' },
]

/** Default number of content rows on first render. */
export const DEFAULT_ROWS = 7

/** Default / minimum column widths (px) for column resize. */
export const BASE_COL_WIDTH = 120
export const MIN_COL_WIDTH = 40

/** Maps a DOM `KeyboardEvent.key` (Arrow*) to a NavDirection. */
export const ARROW_DIR: Record<string, NavDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}
