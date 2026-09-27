/**
 * KSteps 类型定义。
 *
 * 参考 Ant Design Steps API 设计。
 * 引导用户按流程完成任务的导航条。
 */

/** 单个步骤的状态 */
export type KStepStatus = 'wait' | 'process' | 'finish' | 'success' | 'error' | 'warning'

/** 悬浮提示配置：字符串为内容，对象可指定 content 和 theme */
export interface KStepTooltip {
  /** 提示内容 */
  content: string
  /** 主题：light | dark，缺省 dark */
  theme?: 'light' | 'dark'
}

/** 单个步骤的配置项 */
export interface KStepItem {
  /** 步骤标题 */
  title: string
  /** 步骤描述（可选，展示在标题下方） */
  description?: string
  /** 子标题（可选，展示在标题右侧） */
  subTitle?: string
  /** 图标名（iconfont）；缺省渲染序号 */
  icon?: string
  /** 强制指定该步骤状态；缺省由 current 自动推导 */
  status?: KStepStatus
  /** 是否禁用 */
  disabled?: boolean
  /** 悬浮提示（可选），字符串或 { content, theme } 对象 */
  tooltip?: string | KStepTooltip
  /** 是否填充模式：填充背景色，文字/图标为白色 */
  fill?: boolean
}

/** KSteps 组件 Props */
export interface KStepsProps {
  /** 步骤数据源 */
  items?: KStepItem[]
  /** 当前步骤索引（0 起），支持 v-model:current 双向绑定 */
  current?: number
  /** 非受控模式下初始步骤索引 */
  defaultCurrent?: number
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical'
  /** 全局步骤状态：覆盖所有步骤的状态，缺省由 current 自动推导各步骤 */
  status?: 'process' | 'finish' | 'error' | 'success' | 'warning'
  /** 尺寸 */
  size?: 'default' | 'small' | 'mini'
  /** 类型：default 上下结构 | inline 左右结构 */
  type?: 'default' | 'inline'
  /** 是否支持点击步骤切换 */
  clickable?: boolean
  /** 步骤图标尺寸（px） */
  iconSize?: number
  /** 纵向布局时每个步骤的最小高度（px），缺省 120 */
  minHeight?: number
}

/** KSteps 组件 Events */
export interface KStepsEmits {
  /** 点击步骤切换时触发，载荷为当前点击的步骤索引 */
  'update:current': (index: number) => void
  /** 点击步骤时触发，载荷为 { index, item } */
  'step-click': (payload: { index: number; item: KStepItem }) => void
  /** 当前步骤改变时触发 */
  'current-change': (payload: { index: number; item: KStepItem }) => void
}