/**
 * 树节点数据结构。
 *
 * 数据驱动渲染的最小单元：父组件传入一整棵树的数据，
 * 组件内部维护展开/收起与选中状态。
 */
export interface TreeNodeData {
  /** 节点唯一标识 */
  id: string
  /** 节点显示文本 */
  label: string
  /** 节点图标（iconfont 名称，不带 icon- 前缀），可选；不传则不渲染图标 */
  icon?: string
  /** 是否禁用该节点：禁用后不可选中、不可展开收起 */
  disabled?: boolean
  /** 子节点数组；空数组或 undefined 视为叶子节点 */
  children?: TreeNodeData[]
  /**
   * 是否为叶子节点。仅在配置了 load 异步加载时有意义：
   * 未携带子级又未被标记 leaf 的节点，展开时会尝试调用 load 拉取；
   * leaf 为 true 则直接视为叶子，不再发起请求。
   */
  leaf?: boolean
}

/**
 * 字段映射配置。
 *
 * 后端返回的字段名与默认结构不一致时（如 name/status/sublist），
 * 通过 fieldProps 做归一化映射，无需手动转换数据。
 */
export interface TreeFieldProps {
  /** 自定义唯一标识字段名，默认 'id' */
  id?: string
  /** 自定义显示文本字段名，默认 'label' */
  label?: string
  /** 自定义子节点列表字段名，默认 'children' */
  children?: string
  /** 自定义图标字段名，默认 'icon' */
  icon?: string
  /** 自定义禁用状态字段名，默认 'disabled' */
  disabled?: string
  /** 自定义叶子标记字段名，默认 'leaf'（仅 load 异步模式使用） */
  leaf?: string
}
