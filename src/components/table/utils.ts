import type { BaseTableColumn } from './types'

/**
 * Shared table helpers. Pure functions reusable across base-table, tree-table
 * and virtual-table — no Vue reactivity, no component-specific assumptions.
 */

/** Convert a width/minWidth prop to a pixel number. '120px' -> 120, 80 -> 80, anything else -> 0. */
export function toPx(w?: number | string): number {
  if (typeof w === 'number') return w
  if (typeof w === 'string') {
    const m = /^(\d+(?:\.\d+)?)px$/.exec(w.trim())
    if (m) return Number(m[1])
  }
  return 0
}

/** True when a column declares `children` (a group header spanning sub-columns). */
export function hasChildren(col: BaseTableColumn<any>): boolean {
  return !!(col.children && col.children.length)
}

/** Flatten one level of grouped columns into their leaf children (group headers are skipped). */
export function flattenColumns<T = Record<string, any>>(
  cols: BaseTableColumn<T>[],
): BaseTableColumn<T>[] {
  const result: BaseTableColumn<T>[] = []
  for (const c of cols) {
    if (c.children && c.children.length) result.push(...c.children)
    else result.push(c)
  }
  return result
}

/**
 * Effective pixel width of a column. Prefers a runtime-resized width (from the
 * column resize handle), falls back to `width` then `minWidth`. Shared so
 * virtual-table / tree-table can reuse the same clamping logic.
 */
export function colWidthPx(
  col: BaseTableColumn<any>,
  resizedWidths: Record<string, number> = {},
): number {
  const field = col.field
  if (field && resizedWidths[field] != null) return resizedWidths[field]!
  return Math.max(toPx(col.width), toPx(col.minWidth))
}

/** CSS `width` string (e.g. '120px') for the column's width style, honoring resize state. */
export function widthStyleOf(
  col: BaseTableColumn<any>,
  resizedWidths: Record<string, number> = {},
): string | undefined {
  const field = col.field
  if (field && resizedWidths[field] != null) return `${resizedWidths[field]!}px`
  return col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : undefined
}

/** CSS `min-width` string (e.g. '80px') for the column's min-width style. */
export function minWidthStyleOf(col: BaseTableColumn<any>): string | undefined {
  return col.minWidth
    ? typeof col.minWidth === 'number'
      ? `${col.minWidth}px`
      : col.minWidth
    : undefined
}

/** Per-leaf-column precomputed style + sticky-offset metadata, ready to spread onto a <th>/<td>. */
export interface LeafMeta {
  col: BaseTableColumn<any>
  widthStyle?: string
  minWidthStyle?: string
  background?: string
  stickyLeft?: number
  stickyRight?: number
}

/**
 * Inline style for a header/body/summary cell: width, sticky position, column
 * background, and the column's `cellStyle` prop override (function form receives
 * the row). Pure / shared so other tables can build a LeafMeta and reuse it.
 */
export function cellStyle(m: LeafMeta, row?: any): Record<string, string> {
  const s: Record<string, string> = {}
  if (m.widthStyle) s.width = m.widthStyle
  if (m.minWidthStyle) s.minWidth = m.minWidthStyle
  if (m.background) s.background = m.background
  if (m.stickyLeft !== undefined) {
    s.position = 'sticky'
    s.left = `${m.stickyLeft}px`
  }
  if (m.stickyRight !== undefined) {
    s.position = 'sticky'
    s.right = `${m.stickyRight}px`
  }
  if (m.col.cellStyle) {
    const style =
      typeof m.col.cellStyle === 'function' ? (row ? m.col.cellStyle(row) : {}) : m.col.cellStyle
    Object.assign(s, style)
  }
  return s
}
