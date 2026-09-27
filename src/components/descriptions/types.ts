import type { VNode } from 'vue'

/** 描述列表的数据项：label 为描述标签，children 为内容，span 为占据的列数 */
export interface KDescriptionsItem {
  key?: string | number
  label: string | number | VNode
  children?: string | number | VNode
  span?: number
}
