import { defineComponent, ref, computed, type PropType, type VNode } from 'vue'
import { createBem } from '@/utils/create-bem'
import type { BaseTableColumn } from '../types'
import ScrollBar from '@/components/scrollbar/index'
import './index.scss'

const [b, e] = createBem('virtual-table')

const _VirtualTable = defineComponent({
  name: 'VirtualTable',
  props: {
    data: { type: Array as PropType<Record<string, any>[]>, required: true },
    columns: { type: Array as PropType<BaseTableColumn<any>[]>, required: true },
    rowHeight: { type: Number, default: 44 },
    height: { type: Number, default: 400 },
    rowKey: { type: String, default: 'id' },
  },
  setup(props) {
    const scrollTop = ref(0)
    const onScrollBarScroll = (payload: { scrollTop: number }) => {
      scrollTop.value = payload.scrollTop
    }

    const totalHeight = computed(() => props.data.length * props.rowHeight)
    const start = computed(() => Math.max(0, Math.floor(scrollTop.value / props.rowHeight) - 5))
    const visibleCount = computed(() => Math.ceil(props.height / props.rowHeight) + 10)
    const end = computed(() => Math.min(props.data.length, start.value + visibleCount.value))
    const visibleData = computed(() => props.data.slice(start.value, end.value))
    const topPad = computed(() => start.value * props.rowHeight)
    const bottomPad = computed(() =>
      Math.max(0, totalHeight.value - end.value * props.rowHeight),
    )

    /** Inline width/flex style for a column — fixed-width columns pin their width, others flex to fill. */
    const cellStyle = (col: BaseTableColumn<any>) =>
      col.width
        ? { width: `${col.width}px`, flex: ` 0 ${col.width}px` }
        : { flex: '1' }

    return () => (
      <ScrollBar height={props.height} onScroll={onScrollBarScroll} class={b()}>
        <div class={e('head')}>
          {props.columns.map((col) => (
            <div key={col.field} class={e('head-cell')} style={cellStyle(col)}>
              {col.title}
            </div>
          ))}
        </div>
        <div class={e('body')} style={{ height: `${totalHeight.value}px` }}>
          <div class={e('spacer')} style={{ height: `${topPad.value}px` }} />
          {visibleData.value.map((row) => (
            <div
              key={row[props.rowKey]}
              class={e('row')}
              style={{ height: `${props.rowHeight}px` }}
            >
              {props.columns.map((col) => (
                <div key={col.field} class={e('cell')} style={cellStyle(col)}>
                  {row[col.field ?? '']}
                </div>
              ))}
            </div>
          ))}
          <div class={e('spacer')} style={{ height: `${bottomPad.value}px` }} />
        </div>
      </ScrollBar>
    )
  },
})

// Public generic JSX signature: <VirtualTable :data="rows" :columns="cols" />
// infers T from `data` (T[]) and `columns` (BaseTableColumn<T>[]).
export type VirtualTableProps<T extends Record<string, any> = Record<string, any>> = {
  data: T[]
  columns: BaseTableColumn<T>[]
  rowHeight?: number
  height?: number
  rowKey?: string
}

export default _VirtualTable as unknown as <T extends Record<string, any> = Record<string, any>>(
  props: VirtualTableProps<T>,
) => VNode
