import { computed, type ComputedRef, type Ref } from 'vue'
import type { BaseTableColumn } from '../types'
import {
  cellStyle,
  colWidthPx,
  flattenColumns,
  hasChildren,
  minWidthStyleOf,
  widthStyleOf,
  type LeafMeta,
} from '../utils'

export interface UseTableColumnsOptions {
  /** Top-level column list (may include group columns with `children`). */
  columns: ComputedRef<BaseTableColumn<any>[]> | Ref<BaseTableColumn<any>[]>
  /** Runtime-resized column widths keyed by field (from the column resize handle). */
  resizedWidths: Ref<Record<string, number>>
}

/**
 * Column geometry for base-table (and any future table that needs fixed/sticky
 * columns + leaf metadata). Computes:
 *  - flat leaf list (group headers removed)
 *  - per-leaf width/minWidth/background style strings (honors resize state)
 *  - sticky-left / sticky-right offsets for fixed columns
 *  - aggregated fixed-left / fixed-right widths (for shadow overlays)
 *
 * `cellStyle` is imported from `../utils` (shared, pure) — callers use it directly.
 */
export function useTableColumns(options: UseTableColumnsOptions) {
  const { columns, resizedWidths } = options

  const hasGroups = computed(() => columns.value.some(hasChildren))

  const flatColumns = computed(() => flattenColumns(columns.value))

  const lastLeafCol = computed(() => {
    const leaves = flatColumns.value
    return leaves.length ? leaves[leaves.length - 1] : undefined
  })

  // Build per-leaf metadata: width/minWidth style strings, inherited background,
  // then accumulate sticky offsets for fixed-left and fixed-right columns.
  const leafMeta = computed<LeafMeta[]>(() => {
    const meta: LeafMeta[] = []
    for (const col of columns.value) {
      if (col.children?.length) {
        for (const child of col.children) {
          meta.push({
            col: child,
            widthStyle: widthStyleOf(child, resizedWidths.value),
            minWidthStyle: minWidthStyleOf(child),
            background: child.background ?? col.background,
          })
        }
      } else {
        meta.push({
          col,
          widthStyle: widthStyleOf(col, resizedWidths.value),
          minWidthStyle: minWidthStyleOf(col),
          background: col.background,
        })
      }
    }
    // Sticky-left: walk left→right, accumulate offsets among fixed='left' columns.
    let acc = 0
    for (const m of meta) {
      if (m.col.fixed === 'left') {
        m.stickyLeft = acc
        acc += colWidthPx(m.col, resizedWidths.value)
      }
    }
    // Sticky-right: walk right→left, accumulate offsets among fixed='right' columns.
    acc = 0
    for (let i = meta.length - 1; i >= 0; i--) {
      const m = meta[i]!
      if (m.col.fixed === 'right') {
        m.stickyRight = acc
        acc += colWidthPx(m.col, resizedWidths.value)
      }
    }
    return meta
  })

  const leafMetaByField = computed(() => {
    const map = new Map<BaseTableColumn<any>, LeafMeta>()
    for (const m of leafMeta.value) map.set(m.col, m)
    return map
  })

  /** Index of a leaf column within the flat (group-stripped) leaf list. */
  const leafIndexOf = (col: BaseTableColumn<any>) => flatColumns.value.indexOf(col)

  const lastLeftFixed = computed(() => {
    let idx = -1
    flatColumns.value.forEach((c, i) => {
      if (c.fixed === 'left') idx = i
    })
    return idx
  })

  const firstRightFixed = computed(() => flatColumns.value.findIndex((c) => c.fixed === 'right'))

  const fixedLeftWidth = computed(() => {
    let acc = 0
    for (const m of leafMeta.value) {
      if (m.col.fixed === 'left') acc += colWidthPx(m.col, resizedWidths.value)
    }
    return acc
  })
  const hasFixedLeft = computed(() => fixedLeftWidth.value > 0)

  const fixedRightWidth = computed(() => {
    let acc = 0
    for (const m of leafMeta.value) {
      if (m.col.fixed === 'right') acc += colWidthPx(m.col, resizedWidths.value)
    }
    return acc
  })
  const hasFixedRight = computed(() => fixedRightWidth.value > 0)

  /** Inline style for a leaf column by identity — looks up the precomputed leafMeta entry. */
  const leafStyle = (col: BaseTableColumn<any>) => {
    if (!col.field) return {}
    const m = leafMetaByField.value.get(col)
    return m ? cellStyle(m) : {}
  }

  const totalMinWidth = computed(() =>
    leafMeta.value.reduce((sum, m) => sum + colWidthPx(m.col, resizedWidths.value), 0),
  )

  const tableStyle = computed(() => ({ minWidth: `${totalMinWidth.value}px` }))

  return {
    hasGroups,
    hasChildren,
    flatColumns,
    lastLeafCol,
    leafMeta,
    leafMetaByField,
    leafIndexOf,
    lastLeftFixed,
    firstRightFixed,
    fixedLeftWidth,
    hasFixedLeft,
    fixedRightWidth,
    hasFixedRight,
    leafStyle,
    totalMinWidth,
    tableStyle,
  }
}
