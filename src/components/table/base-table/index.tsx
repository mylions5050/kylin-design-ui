import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  Fragment,
  type PropType,
  type VNode,
} from 'vue'
import type {
  BaseTableColumn,
  BaseTablePagination,
  BaseTableSummary,
  DefaultSort,
  SortItem,
} from '../types'
import { createBem } from '@/utils/create-bem'
import { useTableColumns } from '../composables/useTableColumns'
import { useTableSort } from '../composables/useTableSort'
import { useSelection } from '../composables/useSelection'
import { cellStyle, colWidthPx, toPx } from '../utils'
import TableEmptyState from '@/components/table/empty-state/index'
import Pagination from '@/components/pagination/index'
import HeaderInfo from './header-info'
import SortArrow from './sort-arrow'
import Tooltip from '@/components/tooltip/index'
import KCheckbox from '@/components/checkbox/index'
import ScrollBar, { type ScrollBarExposed } from '@/components/scrollbar/index'
import iconEmptySearch from '@/assets/icons/empty-search.svg?url'
import iconEmptyActivity from '@/assets/icons/empty-activity.svg?url'
import './index.scss'

const [b, e, m] = createBem('base-table')

const _BaseTable = defineComponent({
  name: 'BaseTable',
  props: {
    columns: { type: Array as PropType<BaseTableColumn<any>[]>, required: true },
    data: { type: Array as PropType<any[]>, required: true },
    rowKey: {
      type: [String, Function] as PropType<string | ((row: any) => string | number)>,
      default: 'id',
    },
    loading: { type: Boolean, default: false },
    pagination: {
      type: [Object, Boolean] as PropType<BaseTablePagination | false>,
      default: false,
    },
    total: { type: Number, default: undefined },
    summary: { type: Object as PropType<BaseTableSummary>, default: undefined },
    highlightKeyword: { type: String, default: undefined },
    highlightField: { type: String, default: undefined },
    defaultSort: { type: [Array, Object] as PropType<DefaultSort>, default: () => [] },
    rowClickable: { type: Boolean, default: true },
    emptyEntityLabel: { type: String, default: undefined },
    emptySchoolName: { type: String, default: undefined },
    zebra: { type: Boolean, default: false },
    selectedKey: { type: [String, Number] as PropType<string | number>, default: undefined },
    selectable: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    selectedKeys: { type: Array as PropType<(string | number)[]>, default: undefined },
    expandable: { type: Boolean, default: false },
    expandedKeys: { type: Array as PropType<(string | number)[]>, default: undefined },
    height: { type: Number, default: undefined },
    maxHeight: { type: Number, default: undefined },
    minHeight: { type: Number, default: undefined },
    manualSort: { type: Boolean, default: false },
    resizable: { type: Boolean, default: false },
    showOverflowTooltip: { type: Boolean, default: false },
    tooltipTheme: { type: String as PropType<'light' | 'dark'>, default: 'dark' },
    emptyText: { type: String, default: '-' },
    rowClassName: {
      type: [String, Function] as PropType<string | ((row: any, index: number) => string)>,
      default: undefined,
    },
    spanMethod: {
      type: Function as PropType<
        (params: {
          row: any
          column: BaseTableColumn<any>
          rowIndex: number
          columnIndex: number
        }) => [number, number] | undefined
      >,
      default: undefined,
    },
    border: { type: Boolean, default: undefined },
  },
  emits: [
    'rowClick',
    'sortChange',
    'pageChange',
    'clearSearch',
    'resetFilters',
    'update:selectedKey',
    'update:selectedKeys',
    'select',
    'selectAll',
    'update:expandedKeys',
  ],
  setup(props, { emit, slots }) {
    const emptyMode = computed<'search' | 'filter'>(() =>
      props.highlightKeyword?.trim() ? 'search' : 'filter',
    )
    const searchEmptyTitle = computed(
      () => `No ${props.emptyEntityLabel ?? ''} match "${props.highlightKeyword?.trim() ?? ''}"`,
    )
    const searchEmptyDesc = computed(
      () =>
        `Check the spelling or try a different name. Results\ninclude ${props.emptyEntityLabel ?? ''} across all selected schools.`,
    )
    const filterEmptyDesc = computed(() => {
      const subject = props.emptySchoolName ? `${props.emptySchoolName} has` : "There's"
      return `${subject} no recorded activity for this\ndate range. Try a wider date range or check back later.\nData appears as soon as students start reading.`
    })

    const selectionColumnConfig = {
      field: '_selection',
      type: 'selection' as const,
      title: '',
      width: 50,
      align: 'center' as const,
      fixed: 'left' as const,
      emptyText: false as const,
    }

    const computedColumns = computed<BaseTableColumn<any>[]>(() => {
      if (!props.multiple) {
        return props.columns
      }
      return [selectionColumnConfig, ...props.columns]
    })

    const resizedWidths = ref<Record<string, number>>({})

    const {
      hasGroups,
      hasChildren,
      flatColumns,
      lastLeafCol,
      leafMeta,
      leafIndexOf,
      lastLeftFixed,
      firstRightFixed,
      fixedLeftWidth,
      hasFixedLeft,
      fixedRightWidth,
      hasFixedRight,
      leafStyle,
      tableStyle,
    } = useTableColumns({
      columns: computedColumns,
      resizedWidths,
    })

    const {
      toggleSort: toggleSortBase,
      sortItemOf,
      ariaSort,
      sortIconClass,
      sortedData,
    } = useTableSort({
      columns: flatColumns,
      data: computed(() => props.data),
      defaultSort: computed(() => props.defaultSort),
      manualSort: computed(() => props.manualSort),
      emit: (ev, p) => emit(ev, p),
    })

    const isServerPaginated = computed(() => props.total != null)
    const pageSize = computed(() => (props.pagination ? props.pagination.pageSize : 0))
    const currentPage = ref(props.pagination ? (props.pagination.current ?? 1) : 1)
    const total = computed(() => props.total ?? props.data.length)
    const totalPages = computed(() =>
      pageSize.value ? Math.max(1, Math.ceil(total.value / pageSize.value)) : 1,
    )
    const hasPager = computed(() => pageSize.value > 0 && total.value > pageSize.value)

    const displayData = computed(() => {
      if (!pageSize.value || isServerPaginated.value) return sortedData.value
      const start = (currentPage.value - 1) * pageSize.value
      return sortedData.value.slice(start, start + pageSize.value)
    })

    watch(
      () => (props.pagination ? props.pagination.current : undefined),
      (v) => {
        if (isServerPaginated.value && v != null) currentPage.value = v
      },
    )

    watch(totalPages, (tp) => {
      if (isServerPaginated.value) return
      if (currentPage.value > tp) currentPage.value = tp
    })

    const goPage = (p: number) => {
      const clamped = Math.min(Math.max(1, p), totalPages.value)
      if (clamped === currentPage.value) return
      currentPage.value = clamped
      emit('pageChange', { page: clamped, pageSize: pageSize.value })
    }

    const toggleSort = (col: BaseTableColumn<any>, ev?: MouseEvent) => {
      if (!col.sortable || !col.field) return
      toggleSortBase(col, ev)
      currentPage.value = 1
    }

    const headerClass = (col: BaseTableColumn<any>, idx: number) => ({
      [m('sortable', true)]: col.sortable,
      [m('sorted', true)]: !!col.sortable && !!sortItemOf(col),
      [m('fixed', true)]: !!col.fixed,
      [m('fixed-left-last', true)]: idx === lastLeftFixed.value,
      [m('fixed-right-first', true)]: idx === firstRightFixed.value,
      [m(`align-${col.align || 'left'}`, true)]: true,
    })

    const rowClassValue = (row: any, i: number) => {
      const r = props.rowClassName
      return typeof r === 'function' ? r(row, i) : (r ?? '')
    }

    const cellClass = (col: BaseTableColumn<any>, idx: number) => ({
      [m('fixed', true)]: !!col.fixed,
      [m('fixed-left-last', true)]: idx === lastLeftFixed.value,
      [m('fixed-right-first', true)]: idx === firstRightFixed.value,
      [m(`align-${col.align || 'left'}`, true)]: true,
      ...(col.cellClass ? { [col.cellClass]: true } : {}),
    })

    const spanRows = computed(() => {
      const rows = displayData.value
      const cols = leafMeta.value
      if (!props.spanMethod) {
        return rows.map(() => cols.map((meta) => ({ meta, rowspan: 1, colspan: 1 })))
      }
      const rowSkip = new Map<number, number>()
      return rows.map((row, rowIndex) => {
        const cells: { meta: (typeof cols)[number]; rowspan: number; colspan: number }[] = []
        let colSkip = 0
        cols.forEach((meta, colIndex) => {
          if (colSkip > 0) {
            colSkip--
            return
          }
          const skip = rowSkip.get(colIndex) ?? 0
          if (skip > 0) {
            rowSkip.set(colIndex, skip - 1)
            return
          }
          const span = props.spanMethod!({
            row,
            column: meta.col,
            rowIndex,
            columnIndex: colIndex,
          }) ?? [1, 1]
          const rowspan = Math.max(1, span[0] ?? 1)
          const colspan = Math.max(1, span[1] ?? 1)
          cells.push({ meta, rowspan, colspan })
          if (colspan > 1) colSkip = colspan - 1
          if (rowspan > 1) rowSkip.set(colIndex, rowspan - 1)
        })
        return cells
      })
    })

    const cellText = (col: BaseTableColumn<any>, row: any) => {
      const field = col.field
      if (!field) return ''
      const val = row[field]
      if (val == null || val === '') return props.emptyText ?? '-'
      if (col.formatter) {
        const text = col.formatter(val, row)
        return text == null || text === '' ? (props.emptyText ?? '-') : text
      }
      return String(val)
    }

    const isCellEmpty = (col: BaseTableColumn<any>, row: any) => {
      if (col.emptyText === false) return false
      const field = col.field
      if (!field) return false
      const v = row[field]
      return v == null || v === ''
    }

    const emptyTextOf = (col: BaseTableColumn<any>) =>
      col.emptyText === false ? '' : (col.emptyText ?? props.emptyText ?? '-')

    const summaryText = (col: BaseTableColumn<any>) => {
      const field = col.field
      if (!field || !props.summary) return ''
      return props.summary[field] ?? ''
    }

    const highlightText = (text: string) => {
      const kw = props.highlightKeyword?.trim()
      if (!kw || !text) return text
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return text.replace(
        new RegExp(`(${escaped})`, 'gi'),
        `<mark class="${e('highlight')}">$1</mark>`,
      )
    }

    const shouldHighlight = (col: BaseTableColumn<any>) => {
      if (!props.highlightKeyword) return false
      if (!props.highlightField || props.highlightField === 'all') return true
      return col.field === props.highlightField
    }

    const tableRef = ref<HTMLTableElement | null>(null)
    const isResizing = ref(false)
    let resizeField: string | null = null
    let resizeStartX = 0
    let resizeStartWidth = 0
    let resizeMinClamp = 60

    function snapshotColumnWidths() {
      const el = tableRef.value
      if (!el) return
      const widthByField = new Map<string, number>()
      el.querySelectorAll<HTMLElement>('thead th[data-field]').forEach((th) => {
        const field = th.dataset.field
        if (field) widthByField.set(field, Math.round(th.getBoundingClientRect().width))
      })
      const next = { ...resizedWidths.value }
      for (const meta of leafMeta.value) {
        const field = meta.col.field
        if (!field) continue
        const w = widthByField.get(field)
        if (w != null) next[field] = w
      }
      resizedWidths.value = next
    }

    function startResize(col: BaseTableColumn<any>, ev: MouseEvent) {
      if (!col.field) return
      snapshotColumnWidths()
      resizeField = col.field
      resizeStartX = ev.clientX
      resizeStartWidth = colWidthPx(col, resizedWidths.value)
      resizeMinClamp = Math.max(60, toPx(col.minWidth))
      isResizing.value = true
      document.addEventListener('mousemove', onResizeMove)
      document.addEventListener('mouseup', onResizeUp, { once: true })
    }

    function onResizeMove(ev: MouseEvent) {
      if (!resizeField) return
      const next = Math.max(resizeMinClamp, resizeStartWidth + (ev.clientX - resizeStartX))
      resizedWidths.value = { ...resizedWidths.value, [resizeField]: next }
      nextTick(() => scrollRef.value?.update())
    }

    function onResizeUp() {
      resizeField = null
      isResizing.value = false
      document.removeEventListener('mousemove', onResizeMove)
    }

    const overflowState = ref<{ visible: boolean; content: string; rect: DOMRect | null }>({
      visible: false,
      content: '',
      rect: null,
    })
    let overflowHideTimer: ReturnType<typeof setTimeout> | null = null
    let currentCellEl: HTMLElement | null = null

    function findOverflowEl(el: Element): Element | null {
      if (el.scrollWidth > el.clientWidth) return el
      for (const child of el.children) {
        const found = findOverflowEl(child)
        if (found) return found
      }
      return null
    }

    function onCellEnter(ev: MouseEvent, _col: BaseTableColumn<any>) {
      if (!props.showOverflowTooltip || props.loading) return
      const td = ev.currentTarget as HTMLElement
      const overflow = findOverflowEl(td)
      if (!overflow) return
      if (overflowHideTimer) {
        clearTimeout(overflowHideTimer)
        overflowHideTimer = null
      }
      currentCellEl = td
      overflowState.value = {
        visible: true,
        content: (overflow.textContent ?? '').trim(),
        rect: td.getBoundingClientRect(),
      }
    }

    function onCellLeave(ev: MouseEvent) {
      if (!props.showOverflowTooltip) return
      const td = ev.currentTarget as HTMLElement
      if (td !== currentCellEl) return
      if (overflowHideTimer) clearTimeout(overflowHideTimer)
      overflowHideTimer = setTimeout(() => {
        overflowState.value = { ...overflowState.value, visible: false }
        currentCellEl = null
      }, 80)
    }

    const rowKeyValue = (row: any, i: number) => {
      if (typeof props.rowKey === 'function') return props.rowKey(row)
      const v = row[props.rowKey as string]
      return v == null ? i : v
    }

    const isRowSelected = (row: any, i: number) => {
      return (props.selectedKeys ?? []).includes(rowKeyValue(row, i))
    }

    const onRowClick = (row: any, index: number) => {
      if (props.loading) return

      if (props.multiple) {
        toggleRow(row, index)
      } else if (props.selectable) {
        emit('update:selectedKey', rowKeyValue(row, index))
      }

      if (props.rowClickable) {
        emit('rowClick', row, index)
      }
    }

    const isExpanded = (row: any, i: number) => {
      if (!props.expandable) return false
      return (props.expandedKeys ?? []).includes(rowKeyValue(row, i))
    }

    watch(
      [() => props.selectedKey, () => props.data],
      () => {
        if (isServerPaginated.value) return
        if (!props.selectable || props.selectedKey == null || !pageSize.value) return
        const idx = sortedData.value.findIndex(
          (row, i) => rowKeyValue(row, i) === props.selectedKey,
        )
        if (idx === -1) return
        const targetPage = Math.floor(idx / pageSize.value) + 1
        if (currentPage.value !== targetPage) currentPage.value = targetPage
      },
      { immediate: true },
    )

    const { selectionState, toggleRow, toggleAll } = useSelection({
      displayData,
      rowKey: props.rowKey,
      selectedKeys: computed(() => props.selectedKeys ?? []),
      multiple: computed(() => props.multiple),
      emit,
    })

    const scrollRef = ref<ScrollBarExposed | null>(null)
    const scrolledFromStart = ref(false)
    const scrolledFromEnd = ref(false)

    const onScrollBarScroll = (payload: {
      scrollLeft: number
      clientWidth: number
      scrollWidth: number
    }) => {
      scrolledFromStart.value = payload.scrollLeft > 0
      scrolledFromEnd.value = payload.scrollLeft + payload.clientWidth < payload.scrollWidth - 1
    }

    const onWindowResize = () => scrollRef.value?.update()

    watch([() => props.columns, () => props.data], () => {
      nextTick(() => scrollRef.value?.update())
    })

    onMounted(() => {
      nextTick(() => scrollRef.value?.update())
      window.addEventListener('resize', onWindowResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onWindowResize)
      document.removeEventListener('mousemove', onResizeMove)
      if (overflowHideTimer) clearTimeout(overflowHideTimer)
    })

    const handleResizeMousedown = (col: BaseTableColumn<any>, ev: MouseEvent) => {
      ev.stopPropagation()
      ev.preventDefault()
      startResize(col, ev)
    }

    return () => (
      <div
        class={[
          b(),
          {
            [m('loading', true)]: props.loading,
            [m('resizing', true)]: isResizing.value,
            [m('bordered', true)]: props.border,
          },
        ]}
      >
        {props.showOverflowTooltip && (
          <Tooltip
            trigger="manual"
            visible={overflowState.value.visible}
            content={overflowState.value.content}
            anchorRect={overflowState.value.rect}
            placement="top"
            theme={props.tooltipTheme}
            size="small"
          />
        )}
        <div class={e('viewport')}>
          <ScrollBar
            ref={scrollRef}
            height={props.height}
            maxHeight={props.maxHeight}
            minHeight={props.minHeight}
            onScroll={onScrollBarScroll}
          >
            <table class={e('table')} style={tableStyle.value} ref={tableRef}>
              {hasGroups.value ? (
                <thead>
                  <tr>
                    {props.columns.map((col) =>
                      hasChildren(col) ? (
                        <th
                          key={col.field || col.title}
                          class={e('group-cell')}
                          colspan={col.children?.length ?? 0}
                          style={col.background ? { background: col.background } : undefined}
                        >
                          {col.title}
                        </th>
                      ) : (
                        <th
                          key={col.field || col.title}
                          scope="col"
                          data-field={col.field}
                          rowspan="2"
                          style={leafStyle(col)}
                          class={headerClass(col, leafIndexOf(col))}
                          aria-sort={ariaSort(col)}
                        >
                          {col.sortable ? (
                            <button
                              type="button"
                              class={e('sort-btn')}
                              onClick={(ev: MouseEvent) => toggleSort(col, ev)}
                            >
                              <span class={e('sort-label')}>{col.title}</span>
                              <SortArrow class={[e('sort-icon'), sortIconClass(col)]} />
                            </button>
                          ) : (
                            <HeaderInfo col={col} />
                          )}
                          {props.resizable && col.field && col !== lastLeafCol.value && (
                            <span
                              class={e('resize-handle')}
                              onMousedown={(ev: MouseEvent) => handleResizeMousedown(col, ev)}
                            />
                          )}
                        </th>
                      ),
                    )}
                  </tr>
                  <tr>
                    {props.columns.map((col) =>
                      hasChildren(col)
                        ? (col.children ?? []).map((child) => (
                            <th
                              key={child.field}
                              scope="col"
                              data-field={child.field}
                              style={leafStyle(child)}
                              class={headerClass(child, leafIndexOf(child))}
                              aria-sort={ariaSort(child)}
                            >
                              {child.sortable ? (
                                <button
                                  type="button"
                                  class={e('sort-btn')}
                                  onClick={(ev: MouseEvent) => toggleSort(child, ev)}
                                >
                                  <span class={e('sort-label')}>{child.title}</span>
                                  <SortArrow class={[e('sort-icon'), sortIconClass(child)]} />
                                </button>
                              ) : (
                                <HeaderInfo col={child} />
                              )}
                              {props.resizable && child.field && child !== lastLeafCol.value && (
                                <span
                                  class={e('resize-handle')}
                                  onMousedown={(ev: MouseEvent) => handleResizeMousedown(child, ev)}
                                />
                              )}
                            </th>
                          ))
                        : null,
                    )}
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    {leafMeta.value.map((meta, idx) => (
                      <th
                        key={meta.col.field}
                        scope="col"
                        data-field={meta.col.field}
                        style={cellStyle(meta)}
                        class={headerClass(meta.col, idx)}
                        aria-sort={ariaSort(meta.col)}
                      >
                        {slots[`header-${meta.col.field}`]?.({ col: meta.col, index: idx }) ??
                          (meta.col.type === 'selection' ? (
                            <KCheckbox
                              checked={selectionState.value === 'all'}
                              indeterminate={selectionState.value === 'partial'}
                              onChange={() => toggleAll()}
                            />
                          ) : meta.col.sortable ? (
                            <button
                              type="button"
                              class={e('sort-btn')}
                              onClick={(ev: MouseEvent) => toggleSort(meta.col, ev)}
                            >
                              <span class={e('sort-label')}>{meta.col.title}</span>
                              <SortArrow class={[e('sort-icon'), sortIconClass(meta.col)]} />
                            </button>
                          ) : (
                            <HeaderInfo col={meta.col} />
                          ))}
                        {props.resizable && meta.col.field && meta.col !== lastLeafCol.value && (
                          <span
                            class={e('resize-handle')}
                            onMousedown={(ev: MouseEvent) => handleResizeMousedown(meta.col, ev)}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {displayData.value.map((row, i) => (
                  <Fragment key={rowKeyValue(row, i)}>
                    <tr
                      class={[
                        e('row'),
                        {
                          [m('clickable', true)]: props.rowClickable,
                          [m('selectable', true)]: props.selectable,
                          [m('selected', true)]:
                            props.selectable && rowKeyValue(row, i) === props.selectedKey,
                          [m('zebra-alt', true)]: props.zebra && i % 2 === 1,
                          [m('loading', true)]: props.loading,
                        },
                        rowClassValue(row, i),
                      ]}
                      onClick={() => onRowClick(row, i)}
                    >
                      {(spanRows.value[i] ?? []).map((cell, idx) => (
                        <td
                          key={cell.meta.col.field}
                          colspan={cell.colspan > 1 ? cell.colspan : undefined}
                          rowspan={cell.rowspan > 1 ? cell.rowspan : undefined}
                          style={cellStyle(cell.meta, row)}
                          class={cellClass(cell.meta.col, idx)}
                          onMouseenter={(ev: MouseEvent) => onCellEnter(ev, cell.meta.col)}
                          onMouseleave={(ev: MouseEvent) => onCellLeave(ev)}
                        >
                          {props.loading ? (
                            <span class={e('skeleton-bar')} />
                          ) : cell.meta.col.type === 'selection' ? (
                            <KCheckbox
                              checked={isRowSelected(row, i)}
                              onChange={() => toggleRow(row, i)}
                            />
                          ) : isCellEmpty(cell.meta.col, row) ? (
                            <span class={e('empty-cell')}>{emptyTextOf(cell.meta.col)}</span>
                          ) : (
                            (slots[`cell-${cell.meta.col.field}`]?.({
                              row,
                              value: row[cell.meta.col.field ?? ''],
                              index: i,
                            }) ??
                            (props.highlightKeyword && shouldHighlight(cell.meta.col) ? (
                              <span
                                class={e('cell-html')}
                                innerHTML={highlightText(cellText(cell.meta.col, row))}
                              />
                            ) : (
                              <>{cellText(cell.meta.col, row)}</>
                            )))
                          )}
                        </td>
                      ))}
                    </tr>
                    {props.expandable && isExpanded(row, i) && (
                      <tr class={e('expand-row')}>
                        <td colspan={leafMeta.value.length} class={e('expand-cell')}>
                          {slots.expand?.({ row, index: i })}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
              {props.summary && (
                <tfoot>
                  <tr class={e('summary-row')}>
                    {leafMeta.value.map((meta, idx) => (
                      <td
                        key={`summary-${meta.col.field ?? idx}`}
                        style={cellStyle(meta)}
                        class={cellClass(meta.col, idx)}
                      >
                        {summaryText(meta.col)}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
            {!props.loading && !displayData.value.length && (
              <div class={e('empty')}>
                {props.emptyEntityLabel ? (
                  emptyMode.value === 'search' ? (
                    <TableEmptyState
                      icon={iconEmptySearch}
                      title={searchEmptyTitle.value}
                      description={searchEmptyDesc.value}
                      buttonLabel="Clear Search"
                      onAction={() => emit('clearSearch')}
                    />
                  ) : (
                    <TableEmptyState
                      icon={iconEmptyActivity}
                      title="No reading activity yet"
                      description={filterEmptyDesc.value}
                      buttonLabel="Reset Filters"
                      onAction={() => emit('resetFilters')}
                    />
                  )
                ) : (
                  (slots.empty?.() ?? <>No data</>)
                )}
              </div>
            )}
          </ScrollBar>
          {hasFixedLeft.value && (
            <div
              class={[e('left-shadow'), { [m('visible', true)]: scrolledFromStart.value }]}
              style={{ left: `${fixedLeftWidth.value}px` }}
            />
          )}
          {hasFixedRight.value && (
            <div
              class={[e('right-shadow'), { [m('visible', true)]: scrolledFromEnd.value }]}
              style={{ right: `${fixedRightWidth.value}px` }}
            />
          )}
        </div>
        {hasPager.value && (
          <Pagination
            currentPage={currentPage.value}
            pageSize={pageSize.value}
            total={total.value}
            entityLabel={props.emptyEntityLabel}
            onPageChange={goPage}
          />
        )}
      </div>
    )
  },
})

export type BaseTableProps<T> = {
  columns: BaseTableColumn<T>[]
  data: T[]
  rowKey?: string | ((row: T) => string | number)
  loading?: boolean
  pagination?: BaseTablePagination | false
  total?: number
  summary?: BaseTableSummary
  highlightKeyword?: string
  highlightField?: string
  defaultSort?: DefaultSort
  rowClickable?: boolean
  emptyEntityLabel?: string
  emptySchoolName?: string
  zebra?: boolean
  selectedKey?: string | number
  selectable?: boolean
  multiple?: boolean
  selectedKeys?: (string | number)[]
  expandable?: boolean
  expandedKeys?: (string | number)[]
  height?: number
  maxHeight?: number
  minHeight?: number
  manualSort?: boolean
  resizable?: boolean
  showOverflowTooltip?: boolean
  tooltipTheme?: 'light' | 'dark'
  emptyText?: string
  rowClassName?: string | ((row: T, index: number) => string)
  spanMethod?: (params: {
    row: T
    column: BaseTableColumn<T>
    rowIndex: number
    columnIndex: number
  }) => [number, number] | undefined
  border?: boolean
  onRowClick?: (row: T, index: number) => void
  onSortChange?: (payload: { sorts: SortItem[] }) => void
  onPageChange?: (payload: { page: number; pageSize: number }) => void
  onClearSearch?: () => void
  onResetFilters?: () => void
  'onUpdate:selectedKey'?: (key: string | number) => void
  'onUpdate:selectedKeys'?: (keys: (string | number)[]) => void
  onSelect?: (payload: { row: T; selected: boolean; selectedKeys: (string | number)[] }) => void
  onSelectAll?: (payload: {
    selected: boolean
    selectedKeys: (string | number)[]
    allSelected: boolean
  }) => void
  'onUpdate:expandedKeys'?: (keys: (string | number)[]) => void
}

export default _BaseTable as unknown as <T extends Record<string, any> = Record<string, any>>(
  props: BaseTableProps<T>,
) => VNode
