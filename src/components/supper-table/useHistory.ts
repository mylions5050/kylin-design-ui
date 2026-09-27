import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'
import type { Column, RowNode } from './types'

interface Snapshot {
  rows: RowNode[]
  columns: Column[]
  columnWidths: number[]
}

function cloneSnapshot(s: Snapshot): Snapshot {
  return {
    rows: JSON.parse(JSON.stringify(s.rows)) as RowNode[],
    columns: s.columns.map((c) => ({ ...c })),
    columnWidths: [...s.columnWidths],
  }
}

/**
 * Undo history for the table data (rows tree, columns, column widths).
 *
 * Snapshots are taken debounced (~300ms after changes stop), so a burst of
 * edits (e.g. typing in a cell) collapses into one undo step. `undo()`
 * restores the previous snapshot. Covers structural ops (add/remove row/col,
 * fill, paste) as well as cell edits — unlike the browser's native
 * contentEditable undo, which only reverts text.
 */
export function useHistory(
  rows: Ref<RowNode[]>,
  columns: Ref<Column[]>,
  columnWidths: Ref<number[]>,
) {
  const stack = ref<Snapshot[]>([])
  let recording = true
  let timer: ReturnType<typeof setTimeout> | null = null

  function current(): Snapshot {
    return {
      rows: rows.value,
      columns: columns.value,
      columnWidths: columnWidths.value,
    }
  }
  function push() {
    stack.value.push(cloneSnapshot(current()))
    if (stack.value.length > 200) stack.value.shift()
  }
  function flush() {
    if (timer) {
      clearTimeout(timer)
      timer = null
      push()
    }
  }

  onMounted(() => {
    stack.value = [cloneSnapshot(current())]
  })
  watch(
    [rows, columns, columnWidths],
    () => {
      if (!recording) return
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        push()
        timer = null
      }, 300)
    },
    { deep: true },
  )

  function undo() {
    flush()
    if (stack.value.length < 2) return
    stack.value.pop()
    const prev = stack.value[stack.value.length - 1]
    recording = false
    rows.value = cloneSnapshot(prev).rows
    columns.value = prev.columns.map((c) => ({ ...c }))
    columnWidths.value = [...prev.columnWidths]
    recording = true
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { undo }
}
