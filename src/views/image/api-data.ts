import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export const apiProps: ApiPropRow[] = [
  { name: 'src', type: 'string', default: "''", required: true, desc: '图片地址，同原生 img 的 src。' },
  { name: 'alt', type: 'string', default: "''", required: false, desc: '原生 alt 描述文本。' },
  { name: 'fit', type: "'' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'", default: "''", required: false, desc: '图片如何适应容器框，同原生 object-fit。' },
  { name: 'width', type: 'number | string', default: 'undefined', required: false, desc: '容器宽度，数字按 px 处理，也可传任意 CSS 宽度。' },
  { name: 'height', type: 'number | string', default: 'undefined', required: false, desc: '容器高度，数字按 px 处理，也可传任意 CSS 高度。' },
  { name: 'lazy', type: 'boolean', default: 'false', required: false, desc: '是否懒加载，进入视口后才真正发起图片请求。' },
  { name: 'scroll-container', type: 'string | HTMLElement', default: 'undefined', required: false, desc: '懒加载的滚动容器，CSS 选择器或元素，不传则使用视口。' },
  { name: 'preview-src-list', type: 'string[]', default: '[]', required: false, desc: '开启图片预览：传入大图地址列表后，点击图片打开全屏预览器（KImageViewer）。' },
  { name: 'initial-index', type: 'number', default: '0', required: false, desc: '打开预览器时默认定位的图片下标。' },
  { name: 'z-index', type: 'number', default: 'undefined', required: false, desc: '预览器的层级。' },
  { name: 'hide-on-click-modal', type: 'boolean', default: 'false', required: false, desc: '点击预览器画布空白处是否关闭预览。' },
  { name: 'close-on-press-escape', type: 'boolean', default: 'true', required: false, desc: '是否允许按 ESC 关闭预览。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'load', desc: '图片加载成功时触发。' },
  { name: 'error', desc: '图片加载失败时触发。' },
  { name: 'show', desc: '打开预览器时触发。' },
  { name: 'hide', desc: '关闭预览器时触发。' },
  { name: 'switch', desc: '预览器切换图片时触发，参数为当前图片下标。' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'placeholder', desc: '图片加载中的占位内容，默认为 shimmer 微光动画。' },
  { name: 'error', desc: '图片加载失败的内容，默认为"加载失败"图标与文案。' },
]
