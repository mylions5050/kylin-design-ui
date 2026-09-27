import { computed, defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import type { KDescriptionsItem } from './types'
import './index.scss'

const [b, e, m, v] = createBem('k-descriptions')

export type KDescriptionsSize = 'default' | 'middle' | 'small'
export type KDescriptionsLayout = 'horizontal' | 'vertical'

type Cell = { item: KDescriptionsItem; span: number }

export default defineComponent({
  name: 'KDescriptions',
  props: {
    /** 描述列表的标题（也可以通过 #title slot 自定义） */
    title: { type: String, default: undefined },
    /** 标题右侧的额外内容（也可以通过 #extra slot 自定义），通常放操作按钮 */
    extra: { type: String, default: undefined },
    /** 是否显示边框（AntD bordered 同款：标签列浅色背景 + 单元格边框） */
    bordered: { type: Boolean, default: false },
    /** 一行放几组「标签 + 内容」，最后一行不满时末位自动补满 */
    column: { type: Number, default: 3 },
    /** 尺寸，主要影响单元格内边距 */
    size: { type: String as PropType<KDescriptionsSize>, default: 'default' },
    /** 布局：horizontal 标签与内容同行 / vertical 标签在内容上方 */
    layout: { type: String as PropType<KDescriptionsLayout>, default: 'horizontal' },
    /** 是否在标签后显示冒号 */
    colon: { type: Boolean, default: true },
    /** 数据驱动的描述项列表 */
    items: { type: Array as PropType<KDescriptionsItem[]>, default: () => [] },
  },
  emits: [],
  setup(props, { slots }) {
    /* ====================== 布局计算（AntD 同款规则） ====================== */

    /**
     * 把 items 铺成单元格：
     * 1. span 夹取到 [1, column]；
     * 2. 当前行剩余列不够时自动换行；
     * 3. 最后一行未填满时末位 item 自动补满剩余列（保证边框闭合、行对齐）
     */
    const cells = computed<Cell[]>(() => {
      const col = Math.max(1, Math.floor(props.column) || 1)
      const result: Cell[] = []
      let row: Cell[] = []
      let used = 0

      props.items.forEach((item) => {
        const span = Math.min(Math.max(item.span ?? 1, 1), col)
        if (used + span > col) {
          result.push(...row)
          row = []
          used = 0
        }
        row.push({ item, span })
        used += span
      })

      if (row.length) {
        const last = row[row.length - 1]
        if (used < col) row[row.length - 1] = { item: last.item, span: last.span + (col - used) }
        result.push(...row)
      }

      return result
    })

    const renderItem = (cell: Cell, index: number) => {
      const { item, span } = cell
      const key = item.key ?? index
      const content = item.children != null ? item.children : slots.default?.({ item })

      /* 垂直布局：item 为块级单元格，标签在内容上方 */
      if (props.layout === 'vertical') {
        return (
          <div key={key} class={e('item')} style={{ gridColumn: `span ${span}` }}>
            <div class={[e('label'), m('colon', props.colon)]}>{item.label}</div>
            <div class={e('content')}>{content}</div>
          </div>
        )
      }

      /* 水平布局：label/content 作为独立网格单元（成对轨道 auto + 1fr），
         同一列上下行的标签列宽自动取最大值对齐（与 Element Plus / AntD 表格表现一致） */
      return [
        <div key={`${key}-label`} class={[e('label'), m('colon', props.colon)]}>
          {item.label}
        </div>,
        <div key={`${key}-content`} class={e('content')} style={{ gridColumn: `span ${span * 2 - 1}` }}>
          {content}
        </div>,
      ]
    }

    return () => {
      const hasHeader = props.title != null || props.extra != null || !!slots.title || !!slots.extra

      return (
        <div
          class={[
            b(),
            v('bordered', props.bordered),
            v('vertical', props.layout === 'vertical'),
            v(props.size, props.size !== 'default'),
          ]}
        >
          {hasHeader && (
            <div class={e('header')}>
              <div class={e('title')}>{slots.title?.() ?? props.title}</div>
              {(props.extra != null || !!slots.extra) && <div class={e('extra')}>{slots.extra?.() ?? props.extra}</div>}
            </div>
          )}

          <div
            class={e('view')}
            style={{
              gridTemplateColumns:
                props.layout === 'vertical'
                  ? `repeat(${Math.max(1, Math.floor(props.column) || 1)}, minmax(0, 1fr))`
                  : `repeat(${Math.max(1, Math.floor(props.column) || 1)}, auto minmax(0, 1fr))`,
            }}
          >
            {cells.value.map(renderItem)}
          </div>
        </div>
      )
    }
  },
})
