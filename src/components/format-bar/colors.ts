export interface ColorOption {
  label: string
  value: string
}

/**
 * A 下拉的文本颜色调色板。
 * 集中定义常量，便于统一维护/替换（改这里即可，无需动组件）。
 */
export const TEXT_COLORS: ColorOption[] = [
  { label: '默认', value: '#3c4b62' },
  { label: '浅灰', value: '#9aa4b0' },
  { label: '棕', value: '#7a4b2e' },
  { label: '红', value: '#e2195d' },
  { label: '橙', value: '#fa8c16' },
  { label: '黄', value: '#fadb14' },
  { label: '绿', value: '#52c41a' },
  { label: '青', value: '#13c2c2' },
  { label: '蓝', value: '#0a96e6' },
  { label: '紫', value: '#722ed1' },
  { label: '粉', value: '#eb2f96' },
  { label: '黑', value: '#1f1f1f' },
]

/**
 * 推荐色（精选子集，foreColor）。常用于"推荐"段。
 */
export const RECOMMENDED_COLORS: ColorOption[] = [
  { label: '默认', value: '#3c4b62' },
  { label: '红', value: '#e2195d' },
  { label: '橙', value: '#fa8c16' },
  { label: '黄', value: '#fadb14' },
  { label: '绿', value: '#52c41a' },
  { label: '蓝', value: '#0a96e6' },
  { label: '紫', value: '#722ed1' },
]

/** 背景色"无"：透明（清除高亮）。 */
export const NO_BG: ColorOption = { label: '无', value: 'transparent' }

/**
 * hex → 'r, g, b' 三元组字符串，用于和 `document.queryCommandValue('foreColor')`
 * 返回的 `rgb(r, g, b)` 做包含比对（高亮当前色块）。
 */
export function hexToRgbTriplet(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}
