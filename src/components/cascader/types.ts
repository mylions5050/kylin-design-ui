/** 二级展开触发方式 */
export type CascaderExpandTrigger = 'click' | 'hover'

/** 级联选项（配合 fieldNames 可自定义字段名） */
export interface CascaderOption {
  /** 选项文本 */
  label: string
  /** 选中值（叶子节点的 value 即组件的值） */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 子级选项 */
  children?: CascaderOption[]
}

/** 自定义 options 的字段名 */
export interface CascaderFieldNames {
  /** 对应 label 的字段名 */
  label?: string
  /** 对应 value 的字段名 */
  value?: string
  /** 对应 children 的字段名 */
  children?: string
}

/** 组件值：单选为标量，多选为标量数组 */
export type CascaderValue = string | number | (string | number)[]
