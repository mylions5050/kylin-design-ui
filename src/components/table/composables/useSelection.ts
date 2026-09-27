import { computed, type Ref, ref } from 'vue'

export interface UseSelectionOptions<T> {
  /** 当前页数据（已分页） */
  data?: Ref<T[]>
  displayData?: Ref<T[]>
  /** 行唯一标识字段或函数 */
  rowKey: string | ((row: T) => string | number)
  /** 当前选中的键值（来自 props） */
  selectedKeys: Ref<(string | number)[]>
  /** 是否多选 */
  multiple?: Ref<boolean>
  /** 事件发射器 */
  emit?: (event: any, ...args: any[]) => void
}

export interface UseSelectionReturn<T> {
  /** 全选状态 */
  allSelected: Ref<boolean>
  /** 部分选中状态 */
  someSelected: Ref<boolean>
  /** 当前选中状态（全选/部分选中/未选中） */
  selectionState: Ref<'all' | 'partial' | 'none'>
  /** 切换单个行的选中状态 */
  toggleRow: (row: T, index: number) => void
  /** 切换全选 */
  toggleAll: () => void
  /** 获取当前选中的行数据 */
  selectedRows: Ref<T[]>
}

/**
 * 表格多选功能组合式函数
 * 专用于 BaseTable 组件的多选状态管理和操作
 * 不直接修改状态，通过 emit 事件让父组件控制
 */
export function useSelection<T>({
  data,
  displayData,
  rowKey,
  selectedKeys,
  multiple,
  emit,
}: UseSelectionOptions<T>): UseSelectionReturn<T> & { selectedKeysValue: Ref<(string | number)[]> } {
  // 使用 displayData 或回退到 data
  const actualDisplayData = displayData || data || ref([])
  const actualMultiple = multiple || ref(true)
  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    const key = (row as any)[rowKey as string]
    return key == null ? index : key
  }

  const allSelected = computed(() => {
    if (!actualMultiple.value || actualDisplayData.value.length === 0) return false
    const keys = new Set(selectedKeys.value)
    return actualDisplayData.value.every((row, i) => keys.has(getRowKey(row, i)))
  })

  const someSelected = computed(() => {
    if (!actualMultiple.value || actualDisplayData.value.length === 0) return false
    return selectedKeys.value.length > 0 && !allSelected.value
  })

  const selectionState = computed<'all' | 'partial' | 'none'>(() => {
    if (allSelected.value) return 'all'
    if (someSelected.value) return 'partial'
    return 'none'
  })

  const selectedRows = computed(() => {
    const set = new Set(selectedKeys.value)
    return actualDisplayData.value.filter((row, i) => set.has(getRowKey(row, i)))
  })

  const toggleRow = (row: T, index: number) => {
    if (!actualMultiple.value) return
    const key = getRowKey(row, index)
    const set = new Set(selectedKeys.value)
    const selected = !set.has(key)

    selected ? set.add(key) : set.delete(key)

    const keys = [...set]
    emit?.('update:selectedKeys', keys)
    emit?.('select', { row, selected, selectedKeys: keys })
  }

  const toggleAll = () => {
    if (!actualMultiple.value) return
    const keys = allSelected.value ? [] : actualDisplayData.value.map((row, i) => getRowKey(row, i))

    emit?.('update:selectedKeys', keys)
    emit?.('selectAll', {
      selected: !allSelected.value,
      selectedKeys: keys,
      allSelected: !allSelected.value,
    })
  }

  return {
    allSelected,
    someSelected,
    selectionState,
    toggleRow,
    toggleAll,
    selectedRows,
    selectedKeysValue: selectedKeys,
  }
}
