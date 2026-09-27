/** 穿梭框数据项（配合 dataSource 使用） */
export interface TransferItem {
  /** 唯一标识，即组件值（targetKeys）里的元素 */
  key: string | number
  /** 展示文本 */
  label: string
  /** 是否禁用（禁用项不可勾选、不可穿梭） */
  disabled?: boolean
}

/** 穿梭方向：left 表示从目标列表移回源列表，right 表示移入目标列表 */
export type TransferDirection = 'left' | 'right'

/** 数据项 key 类型 */
export type TransferKey = string | number
