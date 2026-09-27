import { defineComponent, type PropType, type VNode } from 'vue'
import { createBem } from '@/utils/create-bem'
import KHeader from './header'
import KAside from './aside'
import KMain from './main'
import KFooter from './footer'
import './index.scss'

export { KHeader, KAside, KMain, KFooter }

const [b, , , v] = createBem('k-container')

const childName = (vn: VNode): string => {
  const t = vn.type
  return typeof t === 'object' && t !== null ? (t as { name?: string }).name ?? '' : ''
}

/**
 * Container — flex layout shell. Direction auto-detected from children: a
 * Header/Footer child → vertical; an Aside child → horizontal. Override with
 * the `direction` prop. Combine with KHeader / KAside / KMain / KFooter, and
 * nest Containers for complex layouts.
 *
 * Usage:
 *   <KContainer><KHeader/>...<KFooter/></KContainer>
 *   <KContainer><KAside/><KMain/></KContainer>
 */
export default defineComponent({
  name: 'KContainer',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical' | undefined>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () => {
      const vnodes = slots.default?.() ?? []
      const hasHeaderFooter = vnodes.some(
        (vn) => childName(vn) === 'KHeader' || childName(vn) === 'KFooter',
      )
      const hasAside = vnodes.some((vn) => childName(vn) === 'KAside')
      const dir = props.direction ?? (hasHeaderFooter ? 'vertical' : hasAside ? 'horizontal' : 'vertical')
      return <section class={[b(), v(dir, true)]}>{vnodes}</section>
    }
  },
})
