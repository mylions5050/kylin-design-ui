import { ref, computed } from 'vue'
import type { Column, ColumnType, FlatRow, RowNode } from './types'
import { BASE_COL_WIDTH } from './constants'
import { newRow, cloneRow, forEachNode } from './utils'

export interface TreeRowsOptions {
  defaultColumns: Column[]
  defaultRows: number
}

/**
 * Data layer: owns the row tree, columns, and all structural operations
 * (insert / copy / delete rows & columns, child rows). Pure data — it knows
 * nothing about selection, menus, or rendering.
 */
export function useTreeRows(options: TreeRowsOptions) {
  const columns = ref<Column[]>(options.defaultColumns.map((c) => ({ ...c })))
  const rows = ref<RowNode[]>(
    Array.from({ length: options.defaultRows }, () =>
      newRow(options.defaultColumns.length),
    ),
  )
  const columnWidths = ref<number[]>(
    options.defaultColumns.map(() => BASE_COL_WIDTH),
  )

  const colCount = computed(() => columns.value.length)

  const flatRows = computed<FlatRow[]>(() => {
    const out: FlatRow[] = []
    const walk = (list: RowNode[], depth: number, prefix: string) => {
      list.forEach((node, i) => {
        const label = prefix ? `${prefix}.${i + 1}` : `${i + 1}`
        out.push({ node, depth, label, siblings: list })
        if (node.children.length) walk(node.children, depth + 1, label)
      })
    }
    walk(rows.value, 0, '')
    return out
  })

  function setCell(node: RowNode, c: number, value: string) {
    node.cells[c] = value
  }

  // ---- row operations ----
  function insertAbove(fr: FlatRow) {
    const idx = fr.siblings.indexOf(fr.node)
    fr.siblings.splice(idx, 0, newRow(colCount.value))
  }
  function insertBelow(fr: FlatRow) {
    const idx = fr.siblings.indexOf(fr.node)
    fr.siblings.splice(idx + 1, 0, newRow(colCount.value))
  }
  function copyRow(fr: FlatRow) {
    const idx = fr.siblings.indexOf(fr.node)
    fr.siblings.splice(idx + 1, 0, cloneRow(fr.node))
  }
  function addChild(fr: FlatRow) {
    fr.node.children.push(newRow(colCount.value))
  }
  function deleteRow(fr: FlatRow) {
    const idx = fr.siblings.indexOf(fr.node)
    fr.siblings.splice(idx, 1)
  }
  function addRow() {
    rows.value.push(newRow(colCount.value))
  }
  function copyCheckedRows(checkedRows: Set<number>) {
    const checked = flatRows.value.filter((fr) => checkedRows.has(fr.node.id))
    for (let i = checked.length - 1; i >= 0; i--) {
      const fr = checked[i]
      const idx = fr.siblings.indexOf(fr.node)
      fr.siblings.splice(idx + 1, 0, cloneRow(fr.node))
    }
  }
  function deleteCheckedRows(checkedRows: Set<number>) {
    const checked = flatRows.value.filter((fr) => checkedRows.has(fr.node.id))
    for (let i = checked.length - 1; i >= 0; i--) {
      const fr = checked[i]
      const idx = fr.siblings.indexOf(fr.node)
      fr.siblings.splice(idx, 1)
    }
  }

  // ---- column operations ----
  function appendColumn(name: string, type: ColumnType) {
    columns.value.push({ name, type })
    columnWidths.value.push(BASE_COL_WIDTH)
    forEachNode(rows.value, (n) => n.cells.push(''))
  }
  function insertColumnAt(index: number, name: string, type: ColumnType) {
    columns.value.splice(index, 0, { name, type })
    columnWidths.value.splice(index, 0, BASE_COL_WIDTH)
    forEachNode(rows.value, (n) => n.cells.splice(index, 0, ''))
  }
  function copyColumn(c: number) {
    columns.value.splice(c + 1, 0, { ...columns.value[c] })
    columnWidths.value.splice(c + 1, 0, columnWidths.value[c])
    forEachNode(rows.value, (n) => n.cells.splice(c + 1, 0, n.cells[c]))
  }
  function deleteCol(c: number) {
    if (columns.value.length <= 1) return
    columns.value.splice(c, 1)
    columnWidths.value.splice(c, 1)
    forEachNode(rows.value, (n) => n.cells.splice(c, 1))
  }

  return {
    columns,
    columnWidths,
    rows,
    colCount,
    flatRows,
    setCell,
    insertAbove,
    insertBelow,
    copyRow,
    addChild,
    deleteRow,
    addRow,
    copyCheckedRows,
    deleteCheckedRows,
    appendColumn,
    insertColumnAt,
    copyColumn,
    deleteCol,
  }
}

export type TreeRows = ReturnType<typeof useTreeRows>
