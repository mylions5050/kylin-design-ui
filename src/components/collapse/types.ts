import type { VNode } from 'vue'

/** 数据驱动的单个折叠面板配置（:items 数组元素） */
export interface KCollapseItem {
  /** 唯一标识（activeKey 匹配用） */
  key: string | number
  /** 面板标题 */
  label: string | number | VNode
  /** 面板内容 */
  children?: string | number | VNode
  /** 标题栏右侧附加内容（箭头之前） */
  extra?: string | number | VNode
  /** 是否禁用（标题栏不可点击展开/收起） */
  disabled?: boolean
}
