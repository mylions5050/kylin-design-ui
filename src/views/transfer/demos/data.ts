import type { TransferItem } from '@/components/transfer'

/** 基础演示数据：12 个可穿梭项 */
export const mockData: TransferItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: i + 1,
  label: `内容 ${i + 1}`,
}))

/** 带禁用项的演示数据 */
export const disabledData: TransferItem[] = [
  { key: 1, label: '内容 1' },
  { key: 2, label: '内容 2（禁用）', disabled: true },
  { key: 3, label: '内容 3' },
  { key: 4, label: '内容 4' },
  { key: 5, label: '内容 5（禁用）', disabled: true },
  { key: 6, label: '内容 6' },
]

/** 自定义渲染演示数据：带描述的选项 */
export interface CityItem extends TransferItem {
  desc: string
}

export const cityData: CityItem[] = [
  { key: 'hz', label: '杭州', desc: '阿里巴巴总部所在地' },
  { key: 'sh', label: '上海', desc: '国际化大都市' },
  { key: 'bj', label: '北京', desc: '全国政治文化中心' },
  { key: 'sz', label: '深圳', desc: '科技创新之城' },
  { key: 'cd', label: '成都', desc: '天府之国' },
]
