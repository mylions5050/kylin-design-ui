import { ref, computed, onMounted, onUnmounted, type ComputedRef } from 'vue'
import type { FlatRow } from './types'

export interface CellRange {
  r1: number
  c1: number
  r2: number
  c2: number
}

/** Build a value generator from a source sequence. */
function makeFillGenerator(source: string[]): () => string {
  if (source.length === 0) return () => ''
  const nums = source.map(Number)
  const allNumeric = nums.every((n) => !Number.isNaN(n))
  if (allNumeric && source.length >= 2) {
    const step = nums[1] - nums[0]
    const arithmetic = nums.every(
      (n, i) => i === 0 || n - nums[i - 1] === step,
    )
    if (arithmetic) {
      let next = nums[nums.length - 1] + step
      return () => {
        const v = String(next)
        next += step
        return v
      }
    }
  }
  // otherwise repeat the source pattern cyclically (single value => copy)
  let i = 0
  return () => {
    const v = source[i % source.length]
    i++
    return v
  }
}

/**
 * Cell selection + fill handle (Excel-like).
 *
 *  - Press-drag on a cell -> select a source range (`selection`).
 *  - The fill handle sits at the selection's bottom-right corner.
 *  - Press-drag the handle -> preview the extension (`fillTarget`, the cells
 *    beyond the selection in the drag direction). On release, fill it from
 *    the selection (numeric arithmetic run continues, otherwise the pattern
 *    repeats; a single cell copies) and move the selection onto the fill area.
 */
export function useFillDrag(flatRows: ComputedRef<FlatRow[]>) {
  const selection = ref<CellRange | null>(null)
  const fillTarget = ref<CellRange | null>(null)
  const mode = ref<'select' | 'fill' | null>(null)
  const moved = ref(false)
  const anchor = ref<{ rIdx: number; c: number } | null>(null)
  let startXY = { x: 0, y: 0 }

  const isDragging = computed(() => mode.value !== null)

  function cellAt(x: number, y: number): { rIdx: number; col: number } | null {
    const el = document.elementFromPoint(x, y) as HTMLElement | null
    const cell = el?.closest('[data-row]') as HTMLElement | null
    const rowAttr = cell?.dataset.row
    const colAttr = cell?.dataset.col
    if (rowAttr === undefined || colAttr === undefined) return null
    const rowId = Number(rowAttr)
    const col = Number(colAttr)
    if (Number.isNaN(rowId) || Number.isNaN(col)) return null
    const rIdx = flatRows.value.findIndex((fr) => fr.node.id === rowId)
    if (rIdx < 0) return null
    return { rIdx, col }
  }

  function startSelectDrag(e: MouseEvent, rIdx: number, c: number) {
    e.preventDefault()
    // drop any stale DOM focus so its old :focus ring doesn't linger
    ;(document.activeElement as HTMLElement | null)?.blur()
    startXY = { x: e.clientX, y: e.clientY }
    selection.value = { r1: rIdx, c1: c, r2: rIdx, c2: c }
    fillTarget.value = null
    mode.value = 'select'
    moved.value = false
    anchor.value = { rIdx, c }
  }
  function startFillDrag(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    startXY = { x: e.clientX, y: e.clientY }
    fillTarget.value = null
    mode.value = 'fill'
    moved.value = false
  }

  /** The extension = cells beyond the selection toward the cursor. */
  function updateFillTarget(cursorR: number, cursorC: number) {
    const sel = selection.value
    if (!sel) {
      fillTarget.value = null
      return
    }
    const sMinR = Math.min(sel.r1, sel.r2)
    const sMaxR = Math.max(sel.r1, sel.r2)
    const sMinC = Math.min(sel.c1, sel.c2)
    const sMaxC = Math.max(sel.c1, sel.c2)
    if (cursorR > sMaxR) {
      fillTarget.value = { r1: sMaxR + 1, c1: sMinC, r2: cursorR, c2: sMaxC }
    } else if (cursorR < sMinR) {
      fillTarget.value = { r1: cursorR, c1: sMinC, r2: sMinR - 1, c2: sMaxC }
    } else if (cursorC > sMaxC) {
      fillTarget.value = { r1: sMinR, c1: sMaxC + 1, r2: sMaxR, c2: cursorC }
    } else if (cursorC < sMinC) {
      fillTarget.value = { r1: sMinR, c1: cursorC, r2: sMaxR, c2: sMinC - 1 }
    } else {
      fillTarget.value = null
    }
  }

  function onMousemove(e: MouseEvent) {
    if (!mode.value) return
    if (mode.value === 'select') {
      // ignore micro-movements so a plain click still focuses the cell
      if (!moved.value) {
        const dx = e.clientX - startXY.x
        const dy = e.clientY - startXY.y
        if (dx * dx + dy * dy < 16) return // < ~4px
        moved.value = true
      }
      const at = cellAt(e.clientX, e.clientY)
      if (at && selection.value) {
        selection.value.r2 = at.rIdx
        selection.value.c2 = at.col
      }
    } else if (mode.value === 'fill') {
      moved.value = true
      const at = cellAt(e.clientX, e.clientY)
      if (at) updateFillTarget(at.rIdx, at.col)
    }
  }
  function onMouseup() {
    if (mode.value === 'select') {
      // 始终聚焦 anchor：单格(点击)与多格(拖选)都聚焦，Delete/Backspace 等
      // 键盘操作才能从 contentEditable 冒泡到表格层的 onKeydown
      if (anchor.value) focusCell(anchor.value.rIdx, anchor.value.c)
    } else if (mode.value === 'fill') {
      applyFill()
    }
    mode.value = null
  }

  function focusCell(rIdx: number, c: number) {
    const fr = flatRows.value[rIdx]
    if (!fr) return
    const el = document.querySelector(
      `[data-row="${fr.node.id}"][data-col="${c}"]`,
    ) as HTMLElement | null
    el?.focus()
  }
  function getCell(rIdx: number, c: number): string {
    return flatRows.value[rIdx]?.node.cells[c] ?? ''
  }
  function setCellVal(rIdx: number, c: number, v: string) {
    const fr = flatRows.value[rIdx]
    if (fr) fr.node.cells[c] = v
  }

  function applyFill() {
    const sel = selection.value
    const ft = fillTarget.value
    if (!sel || !ft) return
    const sMinR = Math.min(sel.r1, sel.r2)
    const sMaxR = Math.max(sel.r1, sel.r2)
    const sMinC = Math.min(sel.c1, sel.c2)
    const sMaxC = Math.max(sel.c1, sel.c2)
    const fMinR = Math.min(ft.r1, ft.r2)
    const fMaxR = Math.max(ft.r1, ft.r2)
    const fMinC = Math.min(ft.c1, ft.c2)
    const fMaxC = Math.max(ft.c1, ft.c2)

    // fill each column (vertical) or each row (horizontal) independently
    if (fMaxR > sMaxR || fMinR < sMinR) {
      const down = fMaxR > sMaxR
      for (let col = sMinC; col <= sMaxC; col++) {
        const source: string[] = []
        for (let r = sMinR; r <= sMaxR; r++) source.push(getCell(r, col))
        const gen = makeFillGenerator(source)
        if (down) {
          for (let r = sMaxR + 1; r <= fMaxR; r++) setCellVal(r, col, gen())
        } else {
          for (let r = sMinR - 1; r >= fMinR; r--) setCellVal(r, col, gen())
        }
      }
    } else {
      const right = fMaxC > sMaxC
      for (let row = sMinR; row <= sMaxR; row++) {
        const source: string[] = []
        for (let c = sMinC; c <= sMaxC; c++) source.push(getCell(row, c))
        const gen = makeFillGenerator(source)
        if (right) {
          for (let c = sMaxC + 1; c <= fMaxC; c++) setCellVal(row, c, gen())
        } else {
          for (let c = sMinC - 1; c >= fMinC; c--) setCellVal(row, c, gen())
        }
      }
    }

    // move the selection onto the filled area (Excel behavior)
    selection.value = ft
    fillTarget.value = null
  }

  function inSelection(rIdx: number, c: number): boolean {
    const s = selection.value
    if (!s) return false
    return (
      rIdx >= Math.min(s.r1, s.r2) &&
      rIdx <= Math.max(s.r1, s.r2) &&
      c >= Math.min(s.c1, s.c2) &&
      c <= Math.max(s.c1, s.c2)
    )
  }
  function isMultiRange(): boolean {
    const s = selection.value
    return s !== null && (s.r1 !== s.r2 || s.c1 !== s.c2)
  }
  function inFillTarget(rIdx: number, c: number): boolean {
    const f = fillTarget.value
    if (!f) return false
    return (
      rIdx >= Math.min(f.r1, f.r2) &&
      rIdx <= Math.max(f.r1, f.r2) &&
      c >= Math.min(f.c1, f.c2) &&
      c <= Math.max(f.c1, f.c2)
    )
  }
  function selectionCorner(): { rIdx: number; c: number } | null {
    const s = selection.value
    if (!s) return null
    return { rIdx: Math.max(s.r1, s.r2), c: Math.max(s.c1, s.c2) }
  }
  function clearAll() {
    selection.value = null
    fillTarget.value = null
    mode.value = null
  }
  function setSelectionCell(rIdx: number, c: number) {
    selection.value = { r1: rIdx, c1: c, r2: rIdx, c2: c }
    fillTarget.value = null
  }
  function selectAll(maxR: number, maxC: number) {
    selection.value = { r1: 0, c1: 0, r2: maxR, c2: maxC }
    fillTarget.value = null
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  })

  return {
    selection,
    fillTarget,
    isDragging,
    startSelectDrag,
    startFillDrag,
    inSelection,
    inFillTarget,
    selectionCorner,
    clearAll,
    setSelectionCell,
    selectAll,
    isMultiRange,
  }
}
