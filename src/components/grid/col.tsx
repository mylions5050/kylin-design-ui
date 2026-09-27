import { computed, defineComponent, inject, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import { ROW_KEY } from './context'
import './index.scss'

const [b, , , v] = createBem('k-col')

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const
type Responsive = number | { span?: number; offset?: number } | undefined

/**
 * Col — a grid column. `span` = width in 24ths; `offset` = left margin in
 * 24ths; `push`/`pull` shift via position. Responsive: `xs/sm/md/lg/xl` take
 * a number or `{ span, offset }`. Reads `gutter` from the parent KRow.
 *
 * Usage: `<KCol :span="8" :offset="4" :md="12">...</KCol>`
 */
export default defineComponent({
  name: 'KCol',
  props: {
    span: { type: [Number, String], default: undefined },
    offset: { type: [Number, String], default: 0 },
    push: { type: [Number, String], default: 0 },
    pull: { type: [Number, String], default: 0 },
    xs: { type: [Number, Object] as PropType<Responsive>, default: undefined },
    sm: { type: [Number, Object] as PropType<Responsive>, default: undefined },
    md: { type: [Number, Object] as PropType<Responsive>, default: undefined },
    lg: { type: [Number, Object] as PropType<Responsive>, default: undefined },
    xl: { type: [Number, Object] as PropType<Responsive>, default: undefined },
  },
  setup(props, { slots }) {
    const row = inject(ROW_KEY, undefined)
    const gutter = computed(() => row?.gutter.value ?? 0)

    const classes = computed(() => {
      const arr = [b()]
      if (props.span != null) arr.push(v(String(props.span), true))
      if (Number(props.offset) > 0) arr.push(v(`offset-${props.offset}`, true))
      for (const bp of BREAKPOINTS) {
        const val = props[bp] as Responsive
        if (val == null) continue
        if (typeof val === 'number') {
          arr.push(v(`${bp}-${val}`, true))
        } else {
          if (val.span != null) arr.push(v(`${bp}-${val.span}`, true))
          if (val.offset != null) arr.push(v(`${bp}-offset-${val.offset}`, true))
        }
      }
      return arr
    })

    return () => {
      const style: Record<string, string> = {
        paddingLeft: `${gutter.value / 2}px`,
        paddingRight: `${gutter.value / 2}px`,
      }
      if (Number(props.push) > 0) {
        style.position = 'relative'
        style.left = `${(Number(props.push) / 24) * 100}%`
      }
      if (Number(props.pull) > 0) {
        style.position = 'relative'
        style.right = `${(Number(props.pull) / 24) * 100}%`
      }
      return (
        <div class={classes.value} style={style}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
