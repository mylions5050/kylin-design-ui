import { computed, defineComponent, provide, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import { ROW_KEY } from './context'
import './index.scss'

const [b, , , v] = createBem('k-row')

/**
 * Row — 24-column grid row. `gutter` adds spacing between cols (negative
 * margin on the row, padding on cols). `justify` / `align` map to flex.
 *
 * Usage: `<KRow :gutter="20"><KCol :span="12">...</KCol></KRow>`
 */
export default defineComponent({
  name: 'KRow',
  props: {
    gutter: { type: Number, default: 0 },
    rowGutter: { type: Number, default: 0 },
    justify: {
      type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>,
      default: 'start',
    },
    align: { type: String as PropType<'top' | 'middle' | 'bottom'>, default: 'top' },
  },
  setup(props, { slots }) {
    provide(ROW_KEY, { gutter: computed(() => props.gutter) })

    return () => (
      <div
        class={[b(), v(props.justify, true), v(props.align, true)]}
        style={{
          marginLeft: `${-props.gutter / 2}px`,
          marginRight: `${-props.gutter / 2}px`,
          ...(props.rowGutter !== 0
            ? {
                rowGap: `${props.rowGutter}px`,
                marginBottom: `${props.rowGutter}px`,
              }
            : {}),
        }}
      >
        {slots.default?.()}
      </div>
    )
  },
})
