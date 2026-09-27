export type SelectSize = 'small' | 'default' | 'large'
export type SelectEffect = 'light' | 'dark'

export interface SelectOption {
  /** 唯一标识，用于 Vue key 和选中态判断 */
  id?: string | number
  /** 显示文本 */
  label: string
  /** 选中值 */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 鼠标悬停提示 */
  tooltip?: string
  /** 分组标签 */
  group?: string
  /** 多选模式下 Tag 的额外 props（type、size 等） */
  tagProps?: Partial<Record<string, any>>
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

// Symbol identifiers for component registration
export const OPTION_TOKEN = Symbol('KOption')
export const SELECT_CTX = Symbol('KSelectContext')