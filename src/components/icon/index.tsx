import { defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import '@/assets/iconfont/iconfont.css'
import { figmaIcons } from '@/assets/icons-figma'
import './index.scss'

const [b] = createBem('k-icon')

/**
 * Icon — supports two sources, auto-detected by `name`:
 *  - Figma SVGs dropped in `src/assets/icons-figma/` (rendered inline; keep
 *    their original colors — set `fill="currentColor"` in the SVG to make it
 *    follow the `color` prop).
 *  - Alibaba iconfont.cn font (self-hosted woff2 via `iconfont.css`); each
 *    `name` maps to an `icon-{name}` class whose `::before` is the glyph.
 *
 * Color follows `currentColor` (inherit), size follows `font-size`, so icons
 * line up with surrounding text by default.
 *
 * Usage: `<KIcon name="check-item-filling" :size="20" color="#0A96E6" />`
 * (iconfont) or `<KIcon name="sample-star" :size="24" />` (Figma SVG).
 */
export default defineComponent({
  name: 'KIcon',
  props: {
    /** iconfont icon name without the `icon-` prefix, e.g. `check-item-filling`. */
    name: { type: String, required: true },
    /** Size in px (number) or any CSS font-size string. Defaults to inherited font-size. */
    size: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** CSS color. Defaults to currentColor (follows surrounding text color). */
    color: { type: String, default: undefined },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => {
      const style: Record<string, string> = {}
      if (props.size != null) {
        style.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
      }
      if (props.color != null) style.color = props.color
      // A Figma SVG (if a .svg with this name was dropped in icons-figma/)
      // renders inline and takes precedence over the iconfont glyph.
      const svg = figmaIcons[props.name]
      const iconProps = {
        class: [b(), svg ? 'k-icon--svg' : `icon-${props.name}`],
        style: style,
        onClick: (e: Event) => emit('click', e)
      }
      if (svg) return <i {...iconProps} innerHTML={svg} />
      return <i {...iconProps} />
    }
  },
})
