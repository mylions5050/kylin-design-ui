import type { ApiPropRow, ApiEventRow } from '@/components/api-table/types'

/** KIcon Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'name',
    type: 'string',
    default: '—',
    required: true,
    desc: '图标名，iconfont 去掉 icon- 前缀，如 check-item-filling；若 icons-figma/ 下有同名 .svg 则优先内联渲染 Figma SVG。',
  },
  {
    name: 'size',
    type: 'number | string',
    default: '—',
    required: false,
    desc: '尺寸，px 数字或任意 font-size 字符串；不传则继承周围文字的 font-size。',
  },
  {
    name: 'color',
    type: 'string',
    default: 'currentColor',
    required: false,
    desc: 'CSS 颜色；默认跟随周围文字颜色（Figma SVG 需把 fill 设为 currentColor 才生效）。',
  },
]

/** KIcon Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'click',
    desc: '点击图标时触发，参数为原生 MouseEvent。',
  },
]
