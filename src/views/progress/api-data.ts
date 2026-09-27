import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'percentage', type: 'number', default: '0', required: true, desc: '进度百分比（0-100，超出自动截断）。' },
  { name: 'type', type: "'line' | 'circle' | 'dashboard'", default: "'line'", required: false, desc: '进度条类型：直线 / 环形 / 仪表盘。' },
  { name: 'strokeWidth', type: 'number', default: '6', required: false, desc: '进度条粗细（line 为条高，circle/dashboard 为环宽，单位 px）。' },
  { name: 'textInside', type: 'boolean', default: 'false', required: false, desc: '百分比文字是否内嵌在进度条中（仅 line 生效，需配合较大的 strokeWidth）。' },
  { name: 'status', type: "'' | 'success' | 'warning' | 'exception'", default: "''", required: false, desc: '状态，决定条与文字的语义色；环形中心会显示对应状态图标。' },
  { name: 'color', type: 'string | Record<string, string> | ((p: number) => string) | ProgressColorStop[]', default: "''", required: false, desc: '自定义颜色：字符串（也支持直接传 CSS 渐变串，仅 line）/ 百分比键对象渐变 { \'0%\': \'#108ee9\', \'100%\': \'#87d068\' }（line 生成 CSS 渐变、circle/dashboard 生成 SVG linearGradient）/ 分档数组 / 函数。优先于 status 语义色。' },
  { name: 'width', type: 'number', default: '126', required: false, desc: '环形整体尺寸（直径，px，仅 circle/dashboard 生效）。' },
  { name: 'showText', type: 'boolean', default: 'true', required: false, desc: '是否展示进度文字。' },
  { name: 'strokeLinecap', type: "'butt' | 'round' | 'square'", default: "'round'", required: false, desc: '环形端点形状（仅 circle/dashboard 生效）。' },
  { name: 'format', type: '(p: number) => string', default: '-', required: false, desc: '文字格式化函数；不传展示 `${percentage}%`。' },
  { name: 'indeterminate', type: 'boolean', default: 'false', required: false, desc: '是否启用直线进度条的流动动画（适合未知进度的加载场景）；百分比文字随动画 0→99 循环。' },
  { name: 'duration', type: 'number', default: '3', required: false, desc: '流动动画一轮时长（秒）。' },
  { name: 'marks', type: 'ProgressMark[]', default: '[]', required: false, desc: '打点列表（仅 line 生效），如 [{ percentage: 60, label: \'及格\' }]。' },
  { name: 'markPlacement', type: "'tooltip' | 'top' | 'bottom'", default: "'tooltip'", required: false, desc: '打点详情展示方式：tooltip 悬浮提示 / top 打点上方文字 / bottom 打点下方文字。打点为白色空心圆，已达到的打点边框染进度色。' },
  { name: 'iconSize', type: 'number', default: '0（按 width 自适应）', required: false, desc: '环形中心状态图标尺寸（px，仅 circle/dashboard 生效）。' },
  { name: 'steps', type: 'number', default: '0', required: false, desc: '步骤数（>0 启用步骤模式）：line 变为分断步骤条，circle 变为步骤进度圈。' },
  { name: 'gap', type: 'number', default: '4', required: false, desc: '步骤条相邻两段的间隔（px，仅 steps 模式 line 生效）。' },
  { name: 'gapDegree', type: 'number', default: '0', required: false, desc: '步骤圈相邻两段的角度间隔（deg，仅 steps 模式 circle 生效）。' },
]

export const apiEmits: ApiEventRow[] = []

export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '自定义内容，替换进度文字区域；作用域参数为 { percentage, status }。textInside 开启时插槽内容渲染在进度条内部。' },
]
