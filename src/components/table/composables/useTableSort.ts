import { computed, ref, shallowRef, watch, type ComputedRef, type Ref } from 'vue'
import type { BaseTableColumn, DefaultSort, SortItem } from '../types'

export interface UseTableSortOptions<T> {
  /** Flat leaf columns (group headers stripped) — used to look up sorter + field metadata. */
  columns: ComputedRef<BaseTableColumn<T>[]> | Ref<BaseTableColumn<T>[]>
  /** Source data (pre-pagination). */
  data: ComputedRef<T[]> | Ref<T[]>
  /** Default sort declarations: prop-level (`defaultSort` prop, possibly multi-column). */
  defaultSort: ComputedRef<DefaultSort> | Ref<DefaultSort>
  /**
   * manualSort=true: only re-sort when sorts change (header click / defaultSort
   * reset) or when data reference is wholesale replaced. Field edits (e.g.
   * select value changes inside a row) don't trigger re-sort — fits popup/dialog
   * scenarios where edits shouldn't reshuffle the rows out from under the user.
   * manualSort=false: reactive, re-sorts on any data change (other tables' behavior).
   */
  manualSort: ComputedRef<boolean> | Ref<boolean>
  emit: (event: 'sortChange', payload: { sorts: SortItem[] }) => void
}

/**
 * Multi-column sort state for base-table.
 *
 * Default sort has two sources merged with column-level priority:
 *  1. prop `defaultSort` (centralized, may be a single item or array)
 *  2. column-level `defaultSort` (per-column default direction)
 * Prop-level declaration for a field wins; column-level only fills in when the
 * prop hasn't named that field.
 *
 * Click model:
 *  - plain click → single-column three-state cycle (asc → desc → clear).
 *    Columns with a defaultSort never reach "no sort" — they cycle desc → asc.
 *  - shift+click → append / cycle / remove this column without touching others.
 */
export function useTableSort<T extends Record<string, any> = Record<string, any>>(
  options: UseTableSortOptions<T>,
) {
  const { columns, data, defaultSort, manualSort, emit } = options

  const normalizeDefaultSort = (d?: DefaultSort): SortItem[] => {
    if (!d) return []
    const arr = Array.isArray(d) ? d : [d]
    return arr.filter(
      (s): s is SortItem => !!s.field && (s.order === 'asc' || s.order === 'desc'),
    )
  }

  const buildInitialSorts = (): SortItem[] => {
    const propSorts = normalizeDefaultSort(defaultSort.value)
    const result: SortItem[] = []
    for (const col of columns.value) {
      if (!col.field) continue
      const propItem = propSorts.find((s) => s.field === col.field)
      if (propItem) {
        result.push(propItem)
      } else {
        const order = col.defaultSort?.order
        if (order === 'asc' || order === 'desc') {
          result.push({ field: col.field, order })
        }
      }
    }
    return result
  }

  const sorts = ref<SortItem[]>(buildInitialSorts())

  const defaultSortFields = computed(() => new Set(buildInitialSorts().map((s) => s.field)))

  watch(
    () => defaultSort.value,
    () => {
      sorts.value = buildInitialSorts()
    },
  )

  const sortItemOf = (col: BaseTableColumn<T>) =>
    col.field ? sorts.value.find((s) => s.field === col.field) : undefined

  /** Toggle sort state on header click (see composable docstring for click model). */
  const toggleSort = (col: BaseTableColumn<T>, e?: MouseEvent) => {
    if (!col.sortable || !col.field) return
    const field = col.field
    const item = sortItemOf(col)

    if (e?.shiftKey) {
      // Shift+click: append / flip / remove this column, leave other columns alone.
      if (!item) {
        sorts.value = [...sorts.value, { field, order: 'asc' }]
      } else if (item.order === 'asc') {
        sorts.value = sorts.value.map((s) => (s.field === field ? { ...s, order: 'desc' } : s))
      } else {
        sorts.value = sorts.value.filter((s) => s.field !== field)
      }
    } else {
      // Plain click: replace with single-column sort, three-state cycle asc→desc→none.
      // Columns with a defaultSort should stay ordered, so desc→asc (not desc→clear).
      const soleItem = sorts.value.length === 1 ? sorts.value[0] : undefined
      if (soleItem && soleItem.field === field && soleItem.order === 'asc') {
        sorts.value = [{ field, order: 'desc' }]
      } else if (soleItem && soleItem.field === field && soleItem.order === 'desc') {
        sorts.value = defaultSortFields.value.has(field) ? [{ field, order: 'asc' }] : []
      } else {
        sorts.value = [{ field, order: 'asc' }]
      }
    }
    emit('sortChange', { sorts: sorts.value })
  }

  const ariaSort = (
    col: BaseTableColumn<T>,
  ): 'ascending' | 'descending' | 'none' | undefined => {
    if (!col.sortable) return undefined
    const item = sortItemOf(col)
    if (!item) return 'none'
    return item.order === 'asc' ? 'ascending' : 'descending'
  }

  const sortIconClass = (col: BaseTableColumn<T>) => {
    const item = sortItemOf(col)
    if (!item) return 'is-idle'
    return item.order === 'asc' ? 'is-asc' : 'is-desc'
  }

  /** Produce a sorted copy of `arr` applying all active sort items in priority order. */
  const sortArray = (arr: T[]): T[] => {
    if (!sorts.value.length) return arr
    const cols = sorts.value.map((s) => ({
      field: s.field,
      dir: s.order === 'asc' ? 1 : -1,
      col: columns.value.find((c) => c.field === s.field),
    }))
    return [...arr].sort((a, b) => {
      for (const { field, dir, col } of cols) {
        const sorter = col?.sorter
        let cmp: number
        if (sorter) {
          cmp = sorter(a, b) * dir
        } else {
          const av = (a as any)[field]
          const bv = (b as any)[field]
          if (av === bv) cmp = 0
          else if (typeof av === 'number' && typeof bv === 'number') cmp = (av - bv) * dir
          else cmp = String(av).localeCompare(String(bv)) * dir
        }
        if (cmp !== 0) return cmp
      }
      return 0
    })
  }

  // manualSort: cache results so field edits don't trigger re-sort until the
  // next sort-cycle / data-reference-replace event. Non-manualSort: recompute reactively.
  const sortedCache = shallowRef<T[]>([])

  const sortedData = computed<T[]>(() => {
    if (manualSort.value) return sortedCache.value
    return sortArray(data.value)
  })

  watch(
    [sorts, () => data.value],
    () => {
      if (manualSort.value) sortedCache.value = sortArray(data.value)
    },
    { immediate: true },
  )

  return {
    toggleSort,
    sortItemOf,
    ariaSort,
    sortIconClass,
    sortedData,
  }
}
