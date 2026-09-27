import { defineComponent, ref, computed, watch, nextTick, onMounted, onUnmounted, type PropType } from 'vue'
import './SupperTable.scss'
import EditableText from './EditableText'
import KCheckbox from '@/components/checkbox/index'
import KIcon from '@/components/icon/index'
import KDialog from '@/components/dialog'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KSelect from '@/components/select/index'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useTreeRows } from './useTreeRows'
import { useSelection } from './useSelection'
import { useContextMenu } from './useContextMenu'
import { useColumnModal, EMPTY_COL_MODAL } from './useColumnModal'
import { useFillDrag } from './useFillDrag'
import { useColumnResize } from './useColumnResize'
import { useHistory } from './useHistory'
import { createBem } from '../../utils/createBem'
import { TYPE_LABELS, DEFAULT_COLUMNS, DEFAULT_ROWS, MIN_COL_WIDTH } from './constants'
import type { Column, ColumnType, NavDirection } from './types'

const t = createBem('supper-table')
const cm = createBem('ctx-menu')

export default defineComponent({
  name: 'KSupTable',
  props: {
    defaultColumns: {
      type: Array as PropType<Column[]>,
      default: () => DEFAULT_COLUMNS,
    },
    defaultRows: {
      type: Number,
      default: DEFAULT_ROWS,
    },
  },
  setup(props) {
    const treeRows = useTreeRows(props)
    const selection = useSelection(treeRows.flatRows)
    const ctxMenu = useContextMenu(treeRows, selection)
    const columnModal = useColumnModal(treeRows)
    const fillDrag = useFillDrag(treeRows.flatRows)
    const {
      colModal,
      modalVisible,
      openCreateModal,
      openEditModal,
      confirmColModal,
      cancelColModal,
      clearModal,
    } = columnModal
    const {
      selection: cellSelection,
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
    } = fillDrag
    const tableRef = ref<HTMLDivElement | null>(null)
    const { startResize, guideX } = useColumnResize(treeRows.columnWidths, tableRef)
    const { undo } = useHistory(treeRows.rows, treeRows.columns, treeRows.columnWidths)

    const {
      columns,
      columnWidths,
      flatRows,
      colCount,
      setCell,
      insertAbove,
      insertBelow,
      addChild,
      addRow,
      appendColumn,
      insertColumnAt,
      copyColumn,
      deleteCol,
    } = treeRows
    const {
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
    } = selection
    const {
      menu,
      openRowMenu,
      openColMenu,
      closeMenu,
      onBackdropContextmenu,
      runRowMenu,
      runColMenu,
      doCopyRow,
      doDeleteRow,
    } = ctxMenu

    const hoverIndex = ref(false)
    const hoverCol = ref<number | null>(null)
    const hoverRow = ref<number | null>(null)
    const focusedCell = ref<{ rowId: number; col: number } | null>(null)
    const insertY = ref<number | null>(null)
    const insertRowIndex = ref<number | null>(null)

    function setFocusedCell(rowId: number, col: number) {
      focusedCell.value = { rowId, col }
    }

    function focusCellAt(rowId: number, col: number) {
      const el = tableRef.value?.querySelector(
        `[data-row="${rowId}"][data-col="${col}"]`,
      ) as HTMLElement | null
      el?.focus()
      focusedCell.value = { rowId, col }
    }

    // 左键 / 右键列表头共用的选中逻辑：选中该列、清旧单元格、聚焦首格
    function activateColumn(c: number) {
      ;(document.activeElement as HTMLElement | null)?.blur()
      selectColumn(c)
      clearAll()
      const first = flatRows.value[0]
      if (first) focusCellAt(first.node.id, c)
      else focusedCell.value = null
    }

    const openCol = computed<number | null>(() =>
      menu.value !== null && menu.value.type === 'col' ? menu.value.col : null,
    )


    useOutsideClick(tableRef, () => {
      clearSelection()
      clearAll()
      focusedCell.value = null
    })

    // size every data column equally to fill the container, clamped to a
    // minimum so a scrollbar appears once they stop fitting; when it does,
    // park the horizontal scroll at the far right
    const INDEX_COL_W = 48
    const ACTION_COL_W = 96
    const TABLE_PADDING = 24
    function layoutColumns() {
      const el = tableRef.value
      if (!el) return
      const avail = el.clientWidth - TABLE_PADDING - INDEX_COL_W - ACTION_COL_W
      const n = columns.value.length
      if (n === 0 || avail <= 0) return
      columnWidths.value = Array(n).fill(
        Math.max(MIN_COL_WIDTH, Math.floor(avail / n)),
      )
    }
    function scrollToRight() {
      const el = tableRef.value
      if (el) el.scrollLeft = el.scrollWidth
    }
    // re-average on any column count change (add/delete/insert/copy); the
    // default pre-flush runs after the structural mutation completes but
    // before the render, so columnWidths stays in sync with the new count
    watch(
      () => columns.value.length,
      () => layoutColumns(),
    )
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    function onWindowResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(layoutColumns, 150)
    }
    onMounted(() => {
      layoutColumns()
      nextTick(scrollToRight)
      window.addEventListener('resize', onWindowResize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', onWindowResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    })

    function onNavigate(direction: NavDirection) {
      const active = document.activeElement as HTMLElement | null
      const rowAttr = active?.dataset.row
      const colAttr = active?.dataset.col
      if (rowAttr === undefined || colAttr === undefined) return
      const rowId = Number(rowAttr)
      const col = Number(colAttr)
      if (Number.isNaN(rowId) || Number.isNaN(col)) return
      const flat = flatRows.value
      const rIdx = flat.findIndex((fr) => fr.node.id === rowId)
      if (rIdx < 0) return
      let nr = rIdx
      let nc = col
      if (direction === 'up') nr = Math.max(0, rIdx - 1)
      else if (direction === 'down') nr = Math.min(flat.length - 1, rIdx + 1)
      else if (direction === 'left') nc = Math.max(0, col - 1)
      else nc = Math.min(colCount.value - 1, col + 1)
      const target = flat[nr]
      if (!target) return
      const targetRowId = target.node.id
      const el = tableRef.value?.querySelector(
        `[data-row="${targetRowId}"][data-col="${nc}"]`,
      ) as HTMLElement | null
      if (el) {
        el.focus()
        setSelectionCell(nr, nc)
        selectedRow.value = targetRowId
        selectedCol.value = null
      }
    }

    // ---- clipboard shortcuts (operate on the current selection) ----
    function getSelectionTSV(): string {
      const sel = cellSelection.value
      if (!sel) return ''
      const minR = Math.min(sel.r1, sel.r2)
      const maxR = Math.max(sel.r1, sel.r2)
      const minC = Math.min(sel.c1, sel.c2)
      const maxC = Math.max(sel.c1, sel.c2)
      const rows: string[] = []
      for (let r = minR; r <= maxR; r++) {
        const cells: string[] = []
        for (let c = minC; c <= maxC; c++) {
          cells.push(flatRows.value[r]?.node.cells[c] ?? '')
        }
        rows.push(cells.join('\t'))
      }
      return rows.join('\n')
    }
    function clearSelectionCells() {
      const sel = cellSelection.value
      if (!sel) return
      const minR = Math.min(sel.r1, sel.r2)
      const maxR = Math.max(sel.r1, sel.r2)
      const minC = Math.min(sel.c1, sel.c2)
      const maxC = Math.max(sel.c1, sel.c2)
      for (let r = minR; r <= maxR; r++) {
        const fr = flatRows.value[r]
        if (!fr) continue
        for (let c = minC; c <= maxC; c++) setCell(fr.node, c, '')
      }
    }
    function onCopy(e: ClipboardEvent) {
      const tsv = getSelectionTSV()
      if (!tsv) return
      e.preventDefault()
      e.clipboardData?.setData('text/plain', tsv)
    }
    function onCut(e: ClipboardEvent) {
      const tsv = getSelectionTSV()
      if (!tsv) return
      e.preventDefault()
      e.clipboardData?.setData('text/plain', tsv)
      clearSelectionCells()
    }
    function pasteFromText(text: string) {
      const sel = cellSelection.value
      if (!sel) return
      const minR = Math.min(sel.r1, sel.r2)
      const minC = Math.min(sel.c1, sel.c2)
      text.split('\n').forEach((line, ri) => {
        line.split('\t').forEach((val, ci) => {
          const fr = flatRows.value[minR + ri]
          if (fr) setCell(fr.node, minC + ci, val)
        })
      })
    }
    function onPaste(e: ClipboardEvent) {
      e.preventDefault()
      pasteFromText(e.clipboardData?.getData('text/plain') ?? '')
    }
    function onTableMousemove(e: MouseEvent) {
      if (isDragging.value) {
        insertY.value = null
        insertRowIndex.value = null
        return
      }
      const root = tableRef.value
      if (!root) return
      // keep the affordance alive while the pointer is over its own line/+ button,
      // otherwise re-entering the button area would clear the line mid-click
      const target = e.target as HTMLElement | null
      if (target?.closest('.supper-table__insert-line')) return
      const rows = root.querySelectorAll<HTMLTableRowElement>('tbody > tr')
      if (!rows.length) return
      // only show the insert affordance over the index/checkbox column
      const indexCell = rows[0].querySelector<HTMLElement>('td.supper-table__index')
      if (!indexCell) return
      const indexRect = indexCell.getBoundingClientRect()
      if (e.clientX < indexRect.left || e.clientX > indexRect.right) {
        insertY.value = null
        insertRowIndex.value = null
        return
      }
      const rootRect = root.getBoundingClientRect()
      const mouseY = e.clientY
      const firstTop = rows[0].getBoundingClientRect().top
      const lastBottom = rows[rows.length - 1].getBoundingClientRect().bottom
      if (mouseY < firstTop || mouseY > lastBottom) {
        insertY.value = null
        insertRowIndex.value = null
        return
      }
      // hovered row → blue line at its bottom edge; insertRowIndex points at the
      // next row so doInsert() inserts below the hovered one (append for the last)
      let rowIdx = rows.length - 1
      for (let i = 0; i < rows.length; i++) {
        if (mouseY <= rows[i].getBoundingClientRect().bottom) {
          rowIdx = i
          break
        }
      }
      insertRowIndex.value = rowIdx + 1
      insertY.value = rows[rowIdx].getBoundingClientRect().bottom - rootRect.top - 1
    }
    function doInsert() {
      const idx = insertRowIndex.value
      if (idx === null) return
      if (idx < flatRows.value.length) {
        insertAbove(flatRows.value[idx])
      } else {
        addRow()
      }
      insertY.value = null
      insertRowIndex.value = null
    }
    function onKeydown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      // Delete / Backspace：清空选中单元格内容（select 模式；编辑态由 EditableText
      // stopPropagation 拦截，不会到这里）
      if (key === 'delete' || key === 'backspace') {
        if (!cellSelection.value) return
        e.preventDefault()
        clearSelectionCells()
        // 焦点中的 contentEditable 不受 watch 同步，直接清空其文本
        const active = document.activeElement as HTMLElement | null
        if (active && active.isContentEditable) active.textContent = ''
        return
      }
      if (!(e.ctrlKey || e.metaKey)) return
      if (key === 'a') {
        e.preventDefault()
        selectAll(flatRows.value.length - 1, colCount.value - 1)
      } else if (key === 'z') {
        e.preventDefault()
        undo()
      }
    }

    // add a row/column then move focus onto the newly added cell so the user
    // can keep typing without an extra click
    function addRowAndFocus() {
      const col = focusedCell.value?.col ?? 0
      addRow()
      nextTick(() => {
        const last = flatRows.value[flatRows.value.length - 1]
        if (!last) return
        selectRow(last)
        clearAll()
        focusCellAt(last.node.id, col)
      })
    }
    function appendColumnAndFocus(name: string, type: ColumnType) {
      const rowId = focusedCell.value?.rowId ?? null
      appendColumn(name, type)
      nextTick(() => {
        const lastCol = columns.value.length - 1
        if (lastCol < 0) return
        selectColumn(lastCol)
        clearAll()
        // land on the same row the user was editing (first row when none) and
        // make it the column's active cell so only that one cell is bordered
        const targetRowId = rowId ?? flatRows.value[0]?.node.id ?? null
        if (targetRowId !== null) {
          activeCell.value = { rowId: targetRowId, col: lastCol }
          focusCellAt(targetRowId, lastCol)
        }
        scrollToRight()
      })
    }

    return () => (
      <div
        class={[t.b, isDragging.value && t.m('dragging')]}
        ref={tableRef}
        onKeydown={onKeydown}
        onCopy={onCopy}
        onCut={onCut}
        onPaste={onPaste}
        onMousemove={onTableMousemove}
        onMouseleave={() => {
          insertY.value = null
          insertRowIndex.value = null
        }}
      >
        <table class={t.e('table')}>
          <thead>
            <tr>
              <th
                class={t.e('corner')}
                onMouseenter={() => (hoverIndex.value = true)}
                onMouseleave={() => (hoverIndex.value = false)}
              >
                <KCheckbox
                  checked={allChecked.value}
                  indeterminate={!allChecked.value && someChecked.value}
                  onChange={() => toggleAll()}
                />
              </th>
              {columns.value.map((col, c) => (
                <th
                  key={c}
                  class={[
                    t.e('head'),
                    selectedCol.value === c && t.em('head', 'selected'),
                  ]}
                  style={{ width: `${columnWidths.value[c] ?? 120}px` }}
                  onMouseenter={() => (hoverCol.value = c)}
                  onMouseleave={() => (hoverCol.value = null)}
                  onClick={() => activateColumn(c)}
                  onContextmenu={(e: MouseEvent) => {
                    activateColumn(c)
                    openColMenu(e, c)
                  }}
                  onDblclick={() => openEditModal(c)}
                >
                  <div class={t.e('head-name')}>{col.name}</div>
                  {(hoverCol.value === c || openCol.value === c) && (
                    <button
                      class={t.e('head-arrow')}
                      title="列操作"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        openColMenu(e, c)
                      }}
                    >
                      <KIcon name="arrow-down-bold" size={12} />
                    </button>
                  )}
                  <div
                    class={t.e('col-resizer')}
                    onMousedown={(e: MouseEvent) => startResize(e, c)}
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                  />
                </th>
              ))}
              <th class={t.e('action-head')}>
                <button
                  class={t.e('add')}
                  onClick={() => openCreateModal(appendColumnAndFocus)}
                >
                  + 添加列
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {flatRows.value.map((fr, rIdx) => {
              const checked = checkedRows.value.has(fr.node.id)
              return (
                <tr
                  key={fr.node.id}
                  class={[
                    t.e('row'),
                    checked && t.em('row', 'checked'),
                    selectedRow.value === fr.node.id && t.em('row', 'selected'),
                    hoverRow.value === fr.node.id && t.em('row', 'hover'),
                  ]}
                  onMouseenter={() => {
                    if (!isDragging.value) hoverRow.value = fr.node.id
                  }}
                  onMouseleave={() => {
                    hoverRow.value = null
                  }}
                >
                  <td
                    class={t.e('index')}
                    onMouseenter={() => (hoverIndex.value = true)}
                    onMouseleave={() => (hoverIndex.value = false)}
                  >
                    {hoverIndex.value ? (
                      <KCheckbox
                        checked={checked}
                        onChange={() => toggleCheck(fr.node.id)}
                      />
                    ) : (
                      <span class={t.e('index-num')}>{fr.label}</span>
                    )}
                  </td>
                  {fr.node.cells.map((val, c) => {
                    const isActive =
                      activeCell.value !== null &&
                      activeCell.value.rowId === fr.node.id &&
                      activeCell.value.col === c
                    const isFocused =
                      focusedCell.value !== null &&
                      focusedCell.value.rowId === fr.node.id &&
                      focusedCell.value.col === c
                    const active = isActive || isFocused
                    return (
                      <td
                        key={c}
                        class={[
                          t.e('cell'),
                          selectedCol.value === c && t.em('cell', 'selected'),
                          inSelection(rIdx, c) && (!active || isMultiRange()) && t.em('cell', 'in-selection'),
                          inFillTarget(rIdx, c) && t.em('cell', 'in-fill'),
                        ]}
                        onMouseenter={() => (hoverCol.value = c)}
                        onMouseleave={() => (hoverCol.value = null)}
                        onMousedown={(e: MouseEvent) => {
                          startSelectDrag(e, rIdx, c)
                          setFocusedCell(fr.node.id, c)
                          selectRow(fr)
                        }}
                        onContextmenu={(e: MouseEvent) =>
                          openRowMenu(e, fr, c)
                        }
                      >
                        <EditableText
                          value={val}
                          rowId={fr.node.id}
                          col={c}
                          active={active}
                          richText={columns.value[c]?.type === 'text'}
                          onEdit={(v: string) => setCell(fr.node, c, v)}
                          onNavigate={onNavigate}
                          onEnter={() => onNavigate('down')}
                          onFocus={() => setFocusedCell(fr.node.id, c)}
                        />
                        {(() => {
                          const corner = selectionCorner()
                          return corner &&
                            corner.rIdx === rIdx &&
                            corner.c === c ? (
                            <div
                              class={t.e('fill-handle')}
                              onMousedown={(e: MouseEvent) => startFillDrag(e)}
                            />
                          ) : null
                        })()}
                      </td>
                    )
                  })}
                  <td class={t.e('action-cell')} />
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td class={t.e('footer')} colspan={colCount.value + 2}>
                <button
                  class={[t.e('add'), t.em('add', 'row')]}
                  onClick={addRowAndFocus}
                >
                  + 添加行
                </button>
              </td>
            </tr>
          </tfoot>
        </table>

        {guideX.value !== null && (
          <div
            class={t.e('resize-guide')}
            style={{ left: `${guideX.value}px` }}
          />
        )}

        {insertY.value !== null && (
          <div
            class={t.e('insert-line')}
            style={{ top: `${insertY.value}px` }}
          >
            <div class={t.e('insert-btn')} onClick={doInsert}>
              <KIcon name="add-bold" size={10} />
            </div>
          </div>
        )}

        {(() => {
          const m = menu.value
          if (!m) return null
          return (
            <>
              <div
                class={cm.e('backdrop')}
                onClick={closeMenu}
                onContextmenu={onBackdropContextmenu}
              />
              {m.type === 'row' ? (
                <div
                  class={cm.b}
                  style={{ left: `${m.x}px`, top: `${m.y}px` }}
                >
                  {!m.batch && (
                    <div
                      class={cm.e('item')}
                      onClick={() => runRowMenu(insertAbove)}
                    >
                      <KIcon name="direction-up" size={14} />
                      在上方插入一行
                    </div>
                  )}
                  {!m.batch && (
                    <div
                      class={cm.e('item')}
                      onClick={() => runRowMenu(insertBelow)}
                    >
                      <KIcon name="direction-down" size={14} />
                      在下方插入一行
                    </div>
                  )}
                  <div class={cm.e('item')} onClick={doCopyRow}>
                    <KIcon name="copy" size={14} />
                    复制行
                  </div>
                  {!m.batch && (
                    <div
                      class={cm.e('item')}
                      onClick={() => runRowMenu(addChild)}
                    >
                      <KIcon name="adjust" size={14} />
                      添加子行
                    </div>
                  )}
                  <div class={cm.e('sep')} />
                  <div
                    class={[cm.e('item'), cm.em('item', 'danger')]}
                    onClick={doDeleteRow}
                  >
                    <KIcon name="ashbin" size={14} />
                    删除行
                  </div>
                </div>
              ) : (
                <div
                  class={cm.b}
                  style={{ left: `${m.x}px`, top: `${m.y}px` }}
                >
                  <div
                    class={cm.e('item')}
                    onClick={() => runColMenu(openEditModal)}
                  >
                    <KIcon name="edit" size={14} />
                    编辑列
                  </div>
                  <div class={cm.e('sep')} />
                  <div
                    class={cm.e('item')}
                    onClick={() =>
                      runColMenu((c) =>
                        openCreateModal((n, tp) => insertColumnAt(c, n, tp)),
                      )
                    }
                  >
                    <KIcon name="direction-left" size={14} />
                    在左侧插入列
                  </div>
                  <div
                    class={cm.e('item')}
                    onClick={() =>
                      runColMenu((c) =>
                        openCreateModal((n, tp) => insertColumnAt(c + 1, n, tp)),
                      )
                    }
                  >
                    <KIcon name="direction-right" size={14} />
                    在右侧插入列
                  </div>
                  <div
                    class={cm.e('item')}
                    onClick={() => runColMenu(copyColumn)}
                  >
                    <KIcon name="copy" size={14} />
                    复制列
                  </div>
                  <div class={cm.e('sep')} />
                  <div
                    class={[cm.e('item'), cm.em('item', 'danger')]}
                    onClick={() => runColMenu(deleteCol)}
                  >
                    <KIcon name="ashbin" size={14} />
                    删除列
                  </div>
                </div>
              )}
            </>
          )
        })()}

        {/* KDialog 常驻渲染：关闭走 modelValue=false 播离场动画，
            onClosed 后才清数据；条件渲染卸载组件会跳过动画 */}
        {(() => {
          const m = colModal.value ?? EMPTY_COL_MODAL
          const typeOptions = Object.entries(TYPE_LABELS).map(([value, label]) => ({
            label,
            value,
          }))
          return (
            <KDialog
              modelValue={modalVisible.value}
              title={m.mode === 'edit' ? '编辑列' : '添加列'}
              width="460px"
              confirmText="确认"
              cancelText="取消"
              confirmDisabled={!m.name.trim()}
              onUpdate:modelValue={(v: boolean) => {
                if (!v) cancelColModal()
              }}
              onConfirm={confirmColModal}
              onClosed={clearModal}
            >
              <KForm model={m} label-width="70px">
                <KFormItem prop="name" label="名称" rules={[{ required: true, message: '请输入列名称' }]}>
                  <KInput
                    modelValue={m.name}
                    placeholder="请输入列名称"
                    onUpdate:modelValue={(v: string) => {
                      if (colModal.value) colModal.value.name = v
                    }}
                  />
                </KFormItem>
                <KFormItem prop="type" label="类型">
                  <KSelect
                    modelValue={m.type}
                    options={typeOptions}
                    onUpdate:modelValue={(v: string | number) => {
                      if (colModal.value) colModal.value.type = v as ColumnType
                    }}
                  />
                </KFormItem>
              </KForm>
            </KDialog>
          )
        })()}
      </div>
    )
  },
})
