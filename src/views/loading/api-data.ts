/** 该文件由 scripts/gen-api.mjs 自动生成，请勿手改。重新生成：node scripts/gen-api.mjs /Users/macair123/Desktop/vue3-ts-app/src/components/loading/index.tsx */

import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'modelValue', type: "Boolean", default: "false", required: false, desc: "是否显示 loading（v-model）" },
  { name: 'type', type: "KLoadingSemanticType", default: "'primary'", required: false, desc: "type 语义色：primary / success / info / warning / error（菊花与文字随此颜色）" },
  { name: 'spinnerType', type: "KLoadingType", default: "'spinner'", required: false, desc: "菊花样式：spinner 双弧咬合 / circle 圆点脉冲 / arc 经典弧线追逐（Element Plus 风格）（区别于 type 语义色）" },
  { name: 'text', type: "String", default: "undefined", required: false, desc: "底部加载文案" },
  { name: 'color', type: "String", default: "undefined", required: false, desc: "自定义菊花/文字颜色（覆盖 type 语义色）" },
  { name: 'size', type: "Number", default: "32", required: false, desc: "菊花尺寸（px）" },
  { name: 'background', type: "String", default: "'#000000'", required: false, desc: "遮罩背景色（配合 opacity 合成 rgba）" },
  { name: 'opacity', type: "Number", default: "0.5", required: false, desc: "遮罩背景透明度（0-1）" },
  { name: 'maskType', type: "'dimmed' | 'blur'", default: "'dimmed'", required: false, desc: "遮罩类型（透传 KOverlay）：dimmed 蒙层（默认）/ blur 毛玻璃（背景不变 + backdrop-filter: blur(4px)，local 局部模式同样生效）" },
  { name: 'theme', type: "KLoadingTheme", default: "'auto'", required: false, desc: "主题：auto 跟随系统/当前 / 强制 light / dark" },
  { name: 'customClass', type: "String", default: "undefined", required: false, desc: "自定义 class" },
  { name: 'zIndex', type: "Number", default: "undefined", required: false, desc: "层级 z-index" },
  { name: 'teleported', type: "Boolean", default: "true", required: false, desc: "是否 teleport 到 body" },
  { name: 'lock', type: "Boolean", default: "true", required: false, desc: "是否锁定页面滚动" },
  { name: 'duration', type: "Number", default: "250", required: false, desc: "过渡时长（ms）" },
  { name: 'closeOnClick', type: "Boolean", default: "false", required: false, desc: "点击遮罩关闭" },
  { name: 'svg', type: "String", default: "undefined", required: false, desc: "自定义 SVG（覆盖默认菊花）" },
  { name: 'local', type: "Boolean", default: "false", required: false, desc: "局部分块模式：absolute 覆盖父容器（父需 position:relative），不 teleport 不锁页面滚动" },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'update:modelValue', desc: '' },
  { name: 'open', desc: '' },
  { name: 'opened', desc: '' },
  { name: 'close', desc: '' },
  { name: 'closed', desc: '' },
]

export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '' },
  { name: 'text', desc: '' },
]
