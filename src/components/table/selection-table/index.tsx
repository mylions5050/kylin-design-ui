import { defineComponent, type PropType, computed, ref, watch } from 'vue'
import BaseTable from '../base-table/index'
import { useSelection } from '../composables/useSelection'
import { createSelectionColumn } from '../utils/selection-columns'
import type { BaseTableColumn, BaseTableProps } from '../types'
import KCheckbox from '@/components/checkbox/index'
import './index.scss'

export interface SelectionTableProps<T> extends Omit<BaseTableProps<T>, 'columns'> {
  /** 表格列配置（会自动在前面插入多选列） */
  columns: BaseTableColumn<T>[]
  /** 是否启用多选 */
  multiple?: boolean
  /** 选中的行键值 */
  selectedKeys?: (string | number)[]
  /** 多选列配置 */
  selectionColumn?: {
    width?: number | string
    showHeader?: boolean
    headerContent?: string
    align?: 'left' | 'center' | 'right'
    fixed?: 'left' | 'right'
  }
  /** 是否在行点击时切换选中 */
  selectOnRowClick?: boolean
}

const SelectionTable = defineComponent({
  name: 'SelectionTable',
  props: {
    columns: { type: Array as PropType<BaseTableColumn<any>[]>, required: true },
    data: { type: Array as PropType<any[]>, required: true },
    rowKey: {
      type: [String, Function] as PropType<string | ((row: any) => string | number)>,
      default: 'id',
    },
    multiple: { type: Boolean, default: true },
    selectedKeys: { type: Array as PropType<(string | number)[]>, default: () => [] },
    selectionColumn: {
      type: Object as PropType<{
        width?: number | string
        showHeader?: boolean
        headerContent?: string
        align?: 'left' | 'center' | 'right'
        fixed?: 'left' | 'right'
      }>,
      default: () => ({})
    },
    selectOnRowClick: { type: Boolean, default: true },
    // 继承 BaseTable 的其他属性
    loading: { type: Boolean, default: false },
    pagination: { type: [Object, Boolean] as PropType<any>, default: false },
    total: { type: Number, default: undefined },
    summary: { type: Object as PropType<any>, default: undefined },
    highlightKeyword: { type: String, default: undefined },
    highlightField: { type: String, default: undefined },
    defaultSort: { type: [Array, Object] as PropType<any>, default: () => [] },
    emptyEntityLabel: { type: String, default: undefined },
    emptySchoolName: { type: String, default: undefined },
    zebra: { type: Boolean, default: false },
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
    rowClassName: { type: [String, Function] as PropType<any>, default: undefined },
    spanMethod: { type: Function as PropType<any>, default: undefined },
    border: { type: Boolean, default: undefined },
  },
  emits: [
    'update:selectedKeys',
    'select',
    'selectAll',
    'rowClick',
    'sortChange',
    'pageChange',
    'clearSearch',
    'resetFilters',
    'update:expandedKeys',
  ],
  setup(props, { emit, slots, expose }) {
    const innerSelectedKeys = ref<(string | number)[]>(props.selectedKeys || [])

    // 监听外部 selectedKeys 变化
    watch(
      () => props.selectedKeys,
      (newKeys) => {
        if (newKeys) {
          innerSelectedKeys.value = [...newKeys]
        }
      },
      { immediate: true }
    )

    // 使用 selection composable
    const selection = useSelection({
      data: computed(() => props.data),
      rowKey: props.rowKey,
      selectedKeys: innerSelectedKeys,
      multiple: computed(() => props.multiple),
      emit,
    })

    // 生成包含多选列的完整列配置
    const tableColumns = computed(() => {
      if (!props.multiple) return props.columns
      
      const selectionCol = createSelectionColumn({
        width: props.selectionColumn?.width ?? 50,
        align: props.selectionColumn?.align ?? 'center',
        fixed: props.selectionColumn?.fixed,
      })
      
      return [selectionCol, ...props.columns]
    })

    // 处理选中状态更新
    watch(
      () => selection.selectedKeysValue.value,
      (newKeys) => {
        emit('update:selectedKeys', newKeys)
      }
    )

    // 处理行点击
    const handleRowClick = (row: any, index: number) => {
      if (props.selectOnRowClick && props.multiple) {
        selection.toggleRow(row)
        emit('select', {
          row,
          selected: selection.selectedKeysValue.value.includes(
            typeof props.rowKey === 'function' ? props.rowKey(row) : row[props.rowKey as string]
          ),
          selectedKeys: selection.selectedKeysValue.value,
        })
      }
      emit('rowClick', row, index)
    }

    // 暴露 selection 相关方法
    expose({
      clearSelection: selection.clearSelection,
      selectAll: () => {
        selection.toggleAll()
        emit('selectAll', {
          selected: selection.allSelected.value,
          selectedKeys: selection.selectedKeysValue.value,
          selectedRows: selection.selectedRows.value,
        })
      },
      getSelectedRows: () => selection.selectedRows.value,
      getSelectedKeys: () => selection.selectedKeysValue.value,
    })

    return () => {
      const tableSlots: Record<string, any> = {}

      // 如果启用多选，添加多选相关的插槽
      if (props.multiple) {
        // 多选列头部插槽
        tableSlots['header-_selection'] = () => {
          return (
            <KCheckbox
              checked={selection.selectionState.value === 'all'}
              indeterminate={selection.selectionState.value === 'partial'}
              onChange={() => {
                selection.toggleAll()
                emit('selectAll', {
                  selected: selection.allSelected.value,
                  selectedKeys: selection.selectedKeysValue.value,
                  selectedRows: selection.selectedRows.value,
                })
              }}
            />
          )
        }

        // 多选列单元格插槽
        tableSlots['cell-_selection'] = ({ row }: { row: any }) => {
          const rowKey = typeof props.rowKey === 'function'
            ? props.rowKey(row)
            : row[props.rowKey as string]
          const isSelected = selection.selectedKeysValue.value.includes(rowKey)

          return (
            <KCheckbox
              checked={isSelected}
              onChange={() => {
                selection.toggleRow(row)
                emit('select', {
                  row,
                  selected: !isSelected,
                  selectedKeys: selection.selectedKeysValue.value,
                })
              }}
            />
          )
        }
      }

      // 合并用户自定义插槽
      Object.keys(slots).forEach(key => {
        if (!tableSlots[key]) {
          tableSlots[key] = slots[key]
        }
      })

      return (
        <div class="selection-table">
          <BaseTable
            columns={tableColumns.value}
            data={props.data}
            rowKey={props.rowKey}
            multiple={props.multiple}
            selectedKeys={selection.selectedKeysValue.value}
            loading={props.loading}
            pagination={props.pagination}
            total={props.total}
            summary={props.summary}
            highlightKeyword={props.highlightKeyword}
            highlightField={props.highlightField}
            defaultSort={props.defaultSort}
            emptyEntityLabel={props.emptyEntityLabel}
            emptySchoolName={props.emptySchoolName}
            zebra={props.zebra}
            expandable={props.expandable}
            expandedKeys={props.expandedKeys}
            height={props.height}
            maxHeight={props.maxHeight}
            minHeight={props.minHeight}
            manualSort={props.manualSort}
            resizable={props.resizable}
            showOverflowTooltip={props.showOverflowTooltip}
            tooltipTheme={props.tooltipTheme}
            emptyText={props.emptyText}
            rowClassName={props.rowClassName}
            spanMethod={props.spanMethod}
            border={props.border}
            onRowClick={handleRowClick}
            onSortChange={(payload) => emit('sortChange', payload)}
            onPageChange={(payload) => emit('pageChange', payload)}
            onClearSearch={() => emit('clearSearch')}
            onResetFilters={() => emit('resetFilters')}
            onUpdate:expandedKeys={(keys) => emit('update:expandedKeys', keys)}
            v-slots={tableSlots}
          />
        </div>
      )
    }
  },
})

export default SelectionTable

// 导出简化后的组件类型
type SelectionTableComponent = typeof SelectionTable
export type { SelectionTableComponent }