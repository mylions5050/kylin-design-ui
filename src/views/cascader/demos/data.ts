import type { CascaderOption } from '@/components/cascader/types'

/** 级联选择通用演示数据：省 / 市 / 区 */
export const regionOptions: CascaderOption[] = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' },
        ],
      },
      {
        label: '宁波',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' },
        ],
      },
      { label: '苏州', value: 'suzhou' },
    ],
  },
  {
    label: '广东',
    value: 'guangdong',
    disabled: true,
    children: [
      {
        label: '广州',
        value: 'guangzhou',
        children: [{ label: '天河区', value: 'tianhe' }],
      },
    ],
  },
]
