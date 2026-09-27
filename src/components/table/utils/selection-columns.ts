import type { BaseTableColumn } from '../types'

/**
 * 创建选择列（复选框列）
 * 用于SelectionTable等需要多选功能的表格
 */
export function createSelectionColumn<T = Record<string, any>>(
  options: {
    width?: number | string
    fixed?: boolean
  } = {}
): BaseTableColumn<T> {
  return {
    key: 'selection',
    title: '',
    width: options.width || 48,
    fixed: options.fixed || false,
    align: 'center',
    render: () => '',
    cellStyle: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  }
}

/**
 * 创建序号列
 * 自动递增的行号显示
 */
export function createIndexColumn<T = Record<string, any>>(
  options: {
    width?: number | string
    title?: string
    fixed?: boolean
    startIndex?: number
  } = {}
): BaseTableColumn<T> {
  const { width = 60, title = '#', fixed = false, startIndex = 1 } = options

  return {
    key: 'index',
    title,
    width,
    fixed,
    align: 'center',
    render: (value: any, row: T, index: number) => {
      return (index + startIndex).toString()
    },
    cellStyle: {
      fontWeight: '600',
      color: 'var(--k-color-text-secondary)',
    },
  }
}