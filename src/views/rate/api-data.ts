import type { ApiPropRow } from '@/components/api-table/types'

/** KRate Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'modelValue',
    type: 'Number',
    default: '0',
    required: false,
    desc:
      '当前评分（1 起），支持 v-model 双向绑定；\n开启 allowHalf 后允许 0.5 步进。',
  },
  {
    name: 'count',
    type: 'Number',
    default: '5',
    required: false,
    desc: '星星总数。',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否禁用；禁用后整体变灰降透明、显示禁用光标，不可点击与悬浮。\n' +
      '与 readonly 的区别：disabled 表达“不可用”，会改变外观。',
  },
  {
    name: 'readonly',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否只读；保持完整颜色视觉，仅不可交互（无悬浮预览与点击），\n' +
      '常用于详情页展示历史评分。',
  },
  {
    name: 'size',
    type: 'Number',
    default: '18',
    required: false,
    desc: '图标尺寸（px）。',
  },
  {
    name: 'allowHalf',
    type: 'Boolean',
    default: 'false',
    required: false,
    desc:
      '是否允许半星选择。\n' +
      '悬浮/点击图标左半部分记 0.5 分，选中态以宽度截取的填充星展示半颗效果。',
  },
  {
    name: 'color',
    type: 'String',
    default: "''",
    required: false,
    desc:
      '星星选中填充色（任意 CSS 颜色值）。\n' +
      '不传时使用内置默认金黄 #ffc53d。',
  },
  {
    name: 'character',
    type: "String",
    default: "''",
    required: false,
    desc:
      "自定义评分字符：传入后以该字符替代星星图标展示（如 'A'、'好'）。\n" +
      '与 allowHalf / color / size 能力完全兼容。',
  },
  {
    name: 'icon',
    type: "String",
    default: "''",
    required: false,
    desc:
      "自定义 iconfont 图标名（如 'good'、'fabulous'）；\n" +
      "未传时使用默认的 favorite-filling；character 优先级更高。",
  },
  {
    name: 'texts',
    type: 'String[]',
    default: '[]',
    required: false,
    desc:
      "按等级排列的字符/文案数组（如 ['差', '中', '良', '优']），\n" +
      '第 value 级展示 texts[value - 1]；传入后覆盖 character 与 icon。',
  },
  {
    name: 'colors',
    type: 'String[]',
    default: '[]',
    required: false,
    desc:
      "按等级排列的填充色数组（如 ['#ff4d4f', '#faad14', '#52c41a']），\n" +
      '第 value 级选中时使用 colors[value - 1]；超出长度时沿用最后一个。',
  },
]

/** KRate Emits 表格数据 */
export const apiEmits: { name: string; desc: string }[] = [
  {
    name: 'update:modelValue',
    desc: 'v-model：评分变化时触发，载荷为当前评分数值。',
  },
  {
    name: 'change',
    desc: '评分变化时触发，载荷为当前评分数值。',
  },
]
