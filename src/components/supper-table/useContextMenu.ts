import { ref } from 'vue'
import type { FlatRow, MenuState } from './types'
import type { TreeRows } from './useTreeRows'
import type { Selection } from './useSelection'

/**
 * Context-menu layer: owns the right-click menu state and its actions.
 * In multi-select (≥2 checked) the row menu reduces to copy/delete and
 * operates on all checked rows; otherwise it targets a single row.
 */
export function useContextMenu(treeRows: TreeRows, selection: Selection) {
  const menu = ref<MenuState>(null)

  function openRowMenu(e: MouseEvent, fr: FlatRow, c: number) {
    e.preventDefault()
    const batch = selection.checkedRows.value.size >= 2
    menu.value = { type: 'row', x: e.clientX, y: e.clientY, row: fr, batch }
    if (!batch) {
      selection.activeCell.value = { rowId: fr.node.id, col: c }
      selection.selectedRow.value = fr.node.id
      selection.selectedCol.value = null
    }
  }
  function openColMenu(e: MouseEvent, c: number) {
    e.preventDefault()
    selection.selectColumn(c)
    menu.value = { type: 'col', x: e.clientX, y: e.clientY, col: c }
  }
  function closeMenu() {
    menu.value = null
    selection.activeCell.value = null
  }

  // Right-clicking while a menu is already open should re-target immediately
  // instead of requiring a close first. The backdrop intercepts the event, so
  // we peer through it and re-dispatch a contextmenu to whatever is beneath.
  function onBackdropContextmenu(e: MouseEvent) {
    e.preventDefault()
    const el = e.currentTarget as HTMLElement
    el.style.pointerEvents = 'none'
    const under = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement | null
    el.style.pointerEvents = ''
    const before = menu.value
    if (under && under !== el) {
      under.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
        }),
      )
    }
    // nothing handled it (e.g. right-clicked empty area) -> close
    if (menu.value === before) closeMenu()
  }

  function runRowMenu(fn: (fr: FlatRow) => void) {
    if (menu.value && menu.value.type === 'row') fn(menu.value.row)
    closeMenu()
  }
  function runColMenu(fn: (c: number) => void) {
    if (menu.value && menu.value.type === 'col') fn(menu.value.col)
    closeMenu()
  }
  function doCopyRow() {
    const m = menu.value
    if (m && m.type === 'row') {
      if (m.batch) treeRows.copyCheckedRows(selection.checkedRows.value)
      else treeRows.copyRow(m.row)
    }
    closeMenu()
  }
  function doDeleteRow() {
    const m = menu.value
    if (m && m.type === 'row') {
      if (m.batch) {
        treeRows.deleteCheckedRows(selection.checkedRows.value)
        selection.checkedRows.value.clear()
      } else {
        treeRows.deleteRow(m.row)
        selection.checkedRows.value.delete(m.row.node.id)
      }
    }
    closeMenu()
  }

  return {
    menu,
    openRowMenu,
    openColMenu,
    closeMenu,
    onBackdropContextmenu,
    runRowMenu,
    runColMenu,
    doCopyRow,
    doDeleteRow,
  }
}
