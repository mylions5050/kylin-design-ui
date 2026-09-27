/** 触发方式 */
export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'

export interface DropdownOption {
  /** 唯一标识，click 事件回传 */
  key: string | number
  /** 菜单项文本 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否危险态（红色，用于删除等操作） */
  danger?: boolean
  /** 是否在其上方显示分隔线 */
  divided?: boolean
  /** 图标名称（KIcon 的 iconfont name） */
  icon?: string
}
