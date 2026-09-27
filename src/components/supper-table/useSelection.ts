import { ref, computed, type ComputedRef } from 'vue'
import type { ActiveCell, FlatRow } from './types'

/**
 * Selection layer: owns row/column selection, the active (bordered) cell,
 * and the multi-select (checkbox) set. Row and column selection are mutually
 * exclusive; depends on `flatRows` to resolve the first cell / totals.
 */
export function useSelection(flatRows: ComputedRef<FlatRow[]>) {
  const checkedRows = ref<Set<number>>(new Set())
  const selectedCol = ref<number | null>(null)
  const selectedRow = ref<number | null>(null)
  const activeCell = ref<ActiveCell | null>(null)

  const allChecked = computed(
    () =>
      flatRows.value.length > 0 &&
      flatRows.value.every((fr) => checkedRows.value.has(fr.node.id)),
  )
  const someChecked = computed(() =>
    flatRows.value.some((fr) => checkedRows.value.has(fr.node.id)),
  )

  function selectRow(fr: FlatRow) {
    clearSelection()
    selectedRow.value = fr.node.id
  }
  function selectColumn(c: number) {
    selectedCol.value = c
    selectedRow.value = null
    const first = flatRows.value[0]
    activeCell.value = first ? { rowId: first.node.id, col: c } : null
  }
  function clearSelection() {
    selectedCol.value = null
    selectedRow.value = null
    activeCell.value = null
  }
  function toggleCheck(id: number) {
    if (checkedRows.value.has(id)) checkedRows.value.delete(id)
    else checkedRows.value.add(id)
  }
  function toggleAll() {
    if (allChecked.value) checkedRows.value.clear()
    else flatRows.value.forEach((fr) => checkedRows.value.add(fr.node.id))
  }

  return {
    checkedRows,
    selectedCol,
    selectedRow,
    activeCell,
    allChecked,
    someChecked,
    selectRow,
    selectColumn,
    clearSelection,
    toggleCheck,
    toggleAll,
  }
}

export type Selection = ReturnType<typeof useSelection>
