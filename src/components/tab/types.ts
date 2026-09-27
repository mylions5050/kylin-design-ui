import type { VNode } from 'vue'

/** 数据驱动的单个选项卡配置（:items 数组元素） */
export interface KTabItem {
  /** 唯一标识（v-model 匹配用）；缺省时取 value，再取 label */
  key?: string | number
  /** 显示文案 */
  label?: string | number
  /** 兼容值语义：可作为 key 兜底 */
  value?: string | number
  /** 该项是否可关闭（在选项卡头上显示关闭按钮） */
  closable?: boolean
  /** 该项面板的插槽内容（可选） */
  slot?: (item: KTabItem) => VNode[]
}
