import {
  defineComponent,
  type PropType,
  type VNode,
  computed,
} from 'vue'
import { useRouter } from 'vue-router'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import '@/assets/iconfont/iconfont.css'
import './index.scss'
import type { KBreadcrumbItem } from './types'

// 安全读取 router：真实应用通过 app.use(router) 后 useRouter() 可拿到实例；
// 在无 Router 的独立环境（纯展示/单元测试）useRouter() 会抛错，捕获后返回 undefined，
// 使组件仍可正常渲染，只是路由型跳转退化为不可跳转。
const injectRouterSafe = (): ReturnType<typeof useRouter> | undefined => {
  try {
    return useRouter()
  } catch {
    return undefined
  }
}

const [b, e, m] = createBem('k-breadcrumb')

export type { KBreadcrumbItem }

export default defineComponent({
  name: 'KBreadcrumb',
  props: {
    /** 面包屑数据源：{ label, to?/path?/href?, target?, replace?, icon?, disabled? }[]。
     *  跳转优先级：href（外部原生链接）> to（vue-router 目标，string|object）> path（路由字符串）；
     *  target 指定新窗口打开（如 _blank）。末项自动渲染为当前页高亮、不可点击。 */
    items: { type: Array as PropType<KBreadcrumbItem[]>, default: () => [] },
    /** 分隔符内容。缺省为斜杠 `/`；传图标名可配合 iconSeparator 渲染为图标。 */
    separator: { type: String, default: '/' },
    /** 分隔符是否以图标（iconfont 名称）方式渲染。 */
    iconSeparator: { type: Boolean, default: false },
    /** 超过该数量时折叠省略中间项（0 = 永不折叠）。 */
    maxItems: { type: Number, default: 0 },
    /** 折叠后保留的前段项数量。 */
    itemsBeforeCollapse: { type: Number, default: 1 },
    /** 折叠后保留的后段项数量（至少保留当前页）。 */
    itemsAfterCollapse: { type: Number, default: 1 },
    /** 是否允许点击跳转（总开关）；false 时所有项不可点击。 */
    clickable: { type: Boolean, default: true },
    /** 路由跳转是否不留历史记录：true 用 router.replace，false 用 router.push。
     *  单个 item 的 replace 优先于该组件级默认值。 */
    replace: { type: Boolean, default: false },
  },
  emits: ['click-item'],
  setup(props, { slots, emit }) {
    const router = injectRouterSafe()

    // —— 可见项：过滤掉 show === false 的项（业务中按权限/状态动态隐藏），
    //    隐藏项及其分隔符不渲染，折叠/末项/点击等逻辑均基于过滤后的数组。 ——
    const visibleItems = computed(() => props.items.filter((i) => i.show !== false))

    // —— 折叠逻辑：基于可见项，需要渲染的真实索引 + 是否出现省略点 ——
    const meta = computed(() => {
      const n = visibleItems.value.length
      if (!(props.maxItems > 0) || n <= props.maxItems) {
        return { indices: visibleItems.value.map((_, i) => i), hasMore: false, moreFrom: -1, moreTo: -1 }
      }
      const before = Math.max(0, Math.min(props.itemsBeforeCollapse, n - 1))
      const after = Math.max(0, Math.min(props.itemsAfterCollapse, n - 1))
      const from = before
      const to = n - after
      const indices: number[] = []
      for (let i = 0; i < n; i++) if (i < from || i >= to) indices.push(i)
      return { indices, hasMore: from < to, moreFrom: from, moreTo: to }
    })

    const isLastIdx = (index: number) => index === visibleItems.value.length - 1

    /** 是否可点击（未禁用、非最后一项、总开关开启）。 */
    const linkable = (item: KBreadcrumbItem, index: number) =>
      props.clickable && !item.disabled && !isLastIdx(index)

    const renderSeparator = (afterIndex: number) => {
      const cls = [e('separator'), m(`sep-${afterIndex + 1}`, true)]
      if (slots.separator) return <span class={cls}>{slots.separator({ index: afterIndex })}</span>
      if (props.iconSeparator && props.separator) return <KIcon name={props.separator} class={cls} />
      return <span class={cls}>{props.separator}</span>
    }

    const renderLabel = (item: KBreadcrumbItem) => (
      <>
        {item.icon && <KIcon name={item.icon} class={e('icon')} />}
        <span class={e('label')}>{item.label}</span>
      </>
    )

    const handleClick = (item: KBreadcrumbItem, index: number, e: Event) => {
      if (!linkable(item, index)) {
        e.preventDefault()
        return
      }
      emit('click-item', { item, index, e })
      // 外部页面：由原生 <a href> 接管（在 renderItem 中已渲染 <a>，target 已作用于其上）
      if (item.href) return
      // 路由型跳转：to 优先于 path
      const target = item.to ?? item.path
      if (target && router) {
        e.preventDefault()
        // 指定了打开方式（如 _blank）：解析出完整 URL 后用 window.open 新开，而非 SPA 内导航
        if (item.target) {
          const resolved = router.resolve(target as never)
          window.open(resolved.href, item.target)
          return
        }
        const useReplace = item.replace ?? props.replace
        if (useReplace) router.replace(target as never)
        else router.push(target as never)
      }
    }

    /** 渲染单项（含点击 / 禁用 / 当前态切换与 icon）。 */
    const renderItem = (index: number, item: KBreadcrumbItem) => {
      if (slots.item) return slots.item({ item, index })

      const classList = [
        e('item'),
        m('link', linkable(item, index)),
        m('current', isLastIdx(index)),
        m('disabled', item.disabled),
      ]
      const content = renderLabel(item)

      if (!linkable(item, index)) {
        return (
          <span class={classList} aria-current={isLastIdx(index) ? 'page' : undefined}>
            {content}
          </span>
        )
      }
      // 可点击项：有 href 渲染原生链接（支持 target/rel 新开窗口），否则渲染为可点击 span 走点击逻辑
      const onClick = (ev: Event) => handleClick(item, index, ev)
      if (item.href) {
        return (
          <a
            href={item.href}
            class={classList}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={onClick}
          >
            {content}
          </a>
        )
      }
      return (
        <span class={classList} role="link" tabindex={0} onClick={onClick} onKeydown={(ev: KeyboardEvent) => ev.key === 'Enter' && onClick(ev)}>
          {content}
        </span>
      )
    }

    return () => {
      const { indices, hasMore, moreFrom, moreTo } = meta.value
      const lastRendered = indices[indices.length - 1]
      // more 是否已插入（仅在后段第一项之前插一次）
      let moreInserted = false

      const nodes: VNode[] = []
      for (const idx of indices) {
        // 遇到后段第一项（idx >= moreTo）时，先插入省略占位
        if (hasMore && !moreInserted && idx >= moreTo) {
          moreInserted = true
          nodes.push(
            <li class={e('item-wrap')} key="__more__">
              {slots.more ? (
                slots.more({ from: moreFrom, to: moreTo })
              ) : (
                <span class={[e('item'), e('item--more')]}>
                  <span class={e('label')}>…</span>
                </span>
              )}
              {renderSeparator(moreFrom)}
            </li>,
          )
        }
        const isLast = idx === lastRendered
        nodes.push(
          <li class={e('item-wrap')} key={idx}>
            {renderItem(idx, visibleItems.value[idx])}
            {!isLast && renderSeparator(idx)}
          </li>,
        )
      }

      return (
        <nav class={b()} aria-label="面包屑" role="navigation">
          <ol class={e('list')}>{nodes}</ol>
        </nav>
      )
    }
  },
})
