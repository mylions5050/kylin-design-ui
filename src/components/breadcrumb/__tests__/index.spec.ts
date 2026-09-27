import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import KBreadcrumb from '../index'
import type { KBreadcrumbItem } from '../index'

const baseItems: KBreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '组件', path: '/components' },
  { label: '面包屑' },
]

/** 触发第 index 个可点击项并返回是否发起了 click-item 事件 */
async function clickItem(wrapper: ReturnType<typeof mount>, index: number) {
  const item = wrapper.findAll('.k-breadcrumb__item.is-link')[index]
  await item.trigger('click')
  return wrapper.emitted('click-item')
}

describe('KBreadcrumb 基本渲染', () => {
  it('渲染所有项的 label 文案', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    const labels = wrapper.findAll('.k-breadcrumb__label').map((n) => n.text())
    expect(labels).toEqual(['首页', '组件', '面包屑'])
  })

  it('默认用斜杠 / 作为分隔符，分隔符数量为 n-1', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    const seps = wrapper.findAll('.k-breadcrumb__separator')
    expect(seps).toHaveLength(baseItems.length - 1)
    seps.forEach((s) => expect(s.text()).toBe('/'))
  })

  it('渲染为导航标签并带上 aria-label 与无序列表', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    expect(wrapper.find('nav.k-breadcrumb').attributes('aria-label')).toBe('面包屑')
    expect(wrapper.find('ol.k-breadcrumb__list').exists()).toBe(true)
  })
})

describe('KBreadcrumb 当前项与可点击', () => {
  it('最后一项添加 is-current，无 is-link，且带 aria-current="page"', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    const items = wrapper.findAll('.k-breadcrumb__item')
    expect(items[2].classes()).toContain('is-current')
    expect(items[2].classes()).not.toContain('is-link')
    expect(items[2].attributes('aria-current')).toBe('page')
  })

  it('带 path 的非末项可点击（is-link），末项不可点击', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    const items = wrapper.findAll('.k-breadcrumb__item')
    expect(items[0].classes()).toContain('is-link')
    expect(items[1].classes()).toContain('is-link')
  })

  it('点击可点击项触发 click-item 事件（载荷含 item/index）', async () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    const evts = await clickItem(wrapper, 0)
    expect(evts).toHaveLength(1)
    const [arg] = evts![0] as unknown as [{ item: KBreadcrumbItem; index: number }]
    expect(arg.index).toBe(0)
    expect(arg.item.label).toBe('首页')
  })

  it('当前末项点击不触发 click-item', async () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems } })
    await wrapper.findAll('.k-breadcrumb__item')[2].trigger('click')
    expect(wrapper.emitted('click-item')).toBeUndefined()
  })

  it('clickable=false 时所有项都不可点击', async () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems, clickable: false } })
    expect(wrapper.findAll('.k-breadcrumb__item.is-link')).toHaveLength(0)
    await wrapper.findAll('.k-breadcrumb__item')[0].trigger('click')
    expect(wrapper.emitted('click-item')).toBeUndefined()
  })
})

describe('KBreadcrumb 禁用项', () => {
  it('disabled 项含 is-disabled，点击不触发事件', async () => {
    const items: KBreadcrumbItem[] = [
      { label: '首页', path: '/', disabled: true },
      { label: '面包屑' },
    ]
    const wrapper = mount(KBreadcrumb, { props: { items } })
    const first = wrapper.findAll('.k-breadcrumb__item')[0]
    expect(first.classes()).toContain('is-disabled')
    await first.trigger('click')
    expect(wrapper.emitted('click-item')).toBeUndefined()
  })
})

describe('KBreadcrumb href 原生链接', () => {
  it('带 href 的项渲染为 <a href> 并保留前缀图标', () => {
    const items: KBreadcrumbItem[] = [
      { label: 'Github', href: 'https://github.com', icon: 'link' },
      { label: '文档' },
    ]
    const wrapper = mount(KBreadcrumb, { props: { items } })
    expect(wrapper.find('a[href="https://github.com"]').exists()).toBe(true)
    expect(wrapper.find('.k-breadcrumb__icon').exists()).toBe(true)
  })
})

describe('KBreadcrumb 自定义分隔符', () => {
  it('支持字符串分隔符', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems, separator: '>' } })
    wrapper.findAll('.k-breadcrumb__separator').forEach((s) => expect(s.text()).toBe('>'))
  })

  it('iconSeparator 时以 KIcon(i.icon-right) 渲染分隔图标', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: baseItems, separator: 'right', iconSeparator: true } })
    expect(wrapper.findAll('i.icon-right')).toHaveLength(baseItems.length - 1)
  })
})

describe('KBreadcrumb 折叠', () => {
  const many: KBreadcrumbItem[] = [
    { label: '一', path: '/a' },
    { label: '二', path: '/b' },
    { label: '三', path: '/c' },
    { label: '四', path: '/d' },
    { label: '当前' },
  ]

  it('超 maxItems 折叠：保留首、省略占位、当前项', () => {
    const wrapper = mount(KBreadcrumb, { props: { items: many, maxItems: 3 } })
    const labels = wrapper.findAll('.k-breadcrumb__label').map((n) => n.text())
    expect(labels).toEqual(['一', '…', '当前'])
  })

  it('itemsBeforeCollapse / itemsAfterCollapse 控制保留数量', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: many, maxItems: 3, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
    })
    const labels = wrapper.findAll('.k-breadcrumb__label').map((n) => n.text())
    expect(labels).toEqual(['一', '二', '…', '当前'])
  })

  it('折叠占位可通过 slot.more 定制（作用域含 from/to）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: many, maxItems: 3 },
      slots: { more: ({ from, to }: { from: number; to: number }) => h('em', { class: 'custom-more' }, `+${to - from}`) },
    })
    expect(wrapper.find('em.custom-more').text()).toBe('+3')
  })
})

describe('KBreadcrumb Slots 定制', () => {
  it('item 插槽可完全自定义单项（作用域 item/index）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: baseItems },
      slots: { item: ({ item, index }: { item: KBreadcrumbItem; index: number }) => h('strong', { class: 'custom-item' }, `${index}:${item.label}`) },
    })
    const customs = wrapper.findAll('.custom-item').map((n) => n.text())
    expect(customs).toEqual(['0:首页', '1:组件', '2:面包屑'])
  })

  it('separator 插槽自定义分隔符', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: baseItems },
      slots: { separator: () => h('span', { class: 'custom-sep' }, '»') },
    })
    expect(wrapper.findAll('.custom-sep')).toHaveLength(baseItems.length - 1)
  })
})

// —— 路由 & 外部页面跳转 ——
async function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div/>' } },
      { path: '/docs', name: 'docs', component: { template: '<div/>' } },
      { path: '/user/:id', name: 'user', component: { template: '<div/>' } },
    ],
  })
  await router.push('/')
  await router.isReady()
  return router
}

/** 用真实 router 挂载组件，返回 wrapper 与 push/replace spy。 */
async function mountWithRouter(items: KBreadcrumbItem[], props: Record<string, unknown> = {}) {
  const router = await createTestRouter()
  const push = vi.spyOn(router, 'push')
  const replace = vi.spyOn(router, 'replace')
  const wrapper = mount(KBreadcrumb, { props: { items, ...props }, global: { plugins: [router] } })
  return { wrapper, router, push, replace }
}

/** 点击第 index 个 is-link 项（有可点击项时）。 */
function clickLink(wrapper: ReturnType<typeof mount>, index = 0) {
  return wrapper.findAll('.k-breadcrumb__item.is-link')[index].trigger('click')
}

describe('KBreadcrumb 路由跳转（to / path / replace）', () => {
  it('path 字符串：点击调用 router.push(path)', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '首页', path: '/' },
      { label: '文档', path: '/docs' },
      { label: '当前' },
    ])
    await clickLink(wrapper, 1) // 第 2 项「文档」
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/docs')
  })

  it('to 对象（{ name, params }）：点击调用 router.push(to)', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '首页', to: { name: 'user', params: { id: '7' } } },
      { label: '当前' },
    ])
    await clickLink(wrapper, 0)
    expect(push).toHaveBeenCalledWith({ name: 'user', params: { id: '7' } })
  })

  it('path 与 to 同时存在时，to 优先（只调用 to）', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '首页', path: '/', to: { name: 'docs' } },
      { label: '当前' },
    ])
    await clickLink(wrapper, 0)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({ name: 'docs' })
  })

  it('item.replace=true 时调用 router.replace 而非 push', async () => {
    const { wrapper, push, replace } = await mountWithRouter([
      { label: '首页', path: '/docs', replace: true },
      { label: '当前' },
    ])
    await clickLink(wrapper, 0)
    expect(replace).toHaveBeenCalledWith('/docs')
    expect(push).not.toHaveBeenCalled()
  })

  it('组件级 replace=true 时，所有路由项均走 replace', async () => {
    const { wrapper, push, replace } = await mountWithRouter(
      [
        { label: '首页', path: '/docs' },
        { label: '当前' },
      ],
      { replace: true },
    )
    await clickLink(wrapper, 0)
    expect(replace).toHaveBeenCalledWith('/docs')
    expect(push).not.toHaveBeenCalled()
  })

  it('item.replace=false 可覆盖组件级 replace=true（走 push）', async () => {
    const { wrapper, push, replace } = await mountWithRouter(
      [
        { label: '首页', path: '/docs', replace: false },
        { label: '当前' },
      ],
      { replace: true },
    )
    await clickLink(wrapper, 0)
    expect(push).toHaveBeenCalledWith('/docs')
    expect(replace).not.toHaveBeenCalled()
  })

  it('on:click-item 仍照常触发（即使走路由跳转）', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '首页', path: '/docs' },
      { label: '当前' },
    ])
    await clickLink(wrapper, 0)
    expect(push).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('click-item')).toHaveLength(1)
  })

  it('to + target="_blank"：点击用 window.open 新开窗口，而非 router.push', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '首页', to: '/docs', target: '_blank' },
      { label: '当前' },
    ])
    const open = vi.fn()
    window.open = open as unknown as typeof window.open
    await clickLink(wrapper, 0)
    expect(open).toHaveBeenCalledTimes(1)
    expect(open.mock.calls[0][0]).toMatch(/\/docs$/) // 解析后的完整 URL 以 /docs 结尾
    expect(open.mock.calls[0][1]).toBe('_blank')
    expect(push).not.toHaveBeenCalled()
  })
})

describe('KBreadcrumb 外部页面（href）', () => {
  it('href 项渲染为原生 <a href>，点击不触发 router', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '官方文档', href: 'https://vuejs.org' },
      { label: '当前' },
    ])
    const a = wrapper.find('a[href="https://vuejs.org"]')
    expect(a.exists()).toBe(true)
    await a.trigger('click')
    expect(push).not.toHaveBeenCalled()
  })

  it('href 优先级最高：同时设置 to/href 时渲染 <a href> 且不触发 router', async () => {
    const { wrapper, push } = await mountWithRouter([
      { label: '外部', to: { name: 'docs' }, href: 'https://example.com/ext' },
      { label: '当前' },
    ])
    expect(wrapper.find('a[href="https://example.com/ext"]').exists()).toBe(true)
    await wrapper.find('a[href="https://example.com/ext"]').trigger('click')
    expect(push).not.toHaveBeenCalled()
  })

  it('href + target="_blank" 时渲染 <a target="_blank" rel="noopener noreferrer">', () => {
    const wrapper = mount(KBreadcrumb, {
      props: {
        items: [
          { label: 'GitHub', href: 'https://github.com', target: '_blank' },
          { label: '当前' },
        ],
      },
    })
    const a = wrapper.find('a[href="https://github.com"]')
    expect(a.attributes('target')).toBe('_blank')
    expect(a.attributes('rel')).toBe('noopener noreferrer')
  })

  it('无 target 的 href 项不输出 rel（普通跳转）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: [{ label: '首页', href: '/' }, { label: '当前' }] },
    })
    const a = wrapper.find('a')
    expect(a.attributes('target')).toBeUndefined()
    expect(a.attributes('rel')).toBeUndefined()
  })
})

describe('KBreadcrumb show 动态隐藏', () => {
  it('show=false 的项不渲染，后项顺延（不移除 label、不残留空分隔符）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: {
        items: [
          { label: '首页', path: '/', show: false },
          { label: '组件', path: '/components' },
          { label: '当前' },
        ],
      },
    })
    const labels = wrapper.findAll('.k-breadcrumb__label').map((n) => n.text())
    expect(labels).toEqual(['组件', '当前'])
    // 只剩 2 项 → 只有 1 个分隔符
    expect(wrapper.findAll('.k-breadcrumb__separator')).toHaveLength(1)
  })

  it('隐藏后末项仍正确高亮为当前页（is-current）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: {
        items: [
          { label: 'A', path: '/a' },
          { label: 'B', show: false },
          { label: '当前' },
        ],
      },
    })
    const all = wrapper.findAll('.k-breadcrumb__item')
    const last = all[all.length - 1]
    expect(last.classes()).toContain('is-current')
    expect(last.text()).toBe('当前')
    // 隐藏项不产生 is-link 可点击节点
    const links = wrapper.findAll('.k-breadcrumb__item.is-link').map((n) => n.text())
    expect(links).toEqual(['A'])
  })

  it('show 缺省为 true（不传则全部显示）', () => {
    const wrapper = mount(KBreadcrumb, {
      props: { items: [{ label: '首页' }, { label: '当前' }] },
    })
    expect(wrapper.findAll('.k-breadcrumb__item')).toHaveLength(2)
  })

  it('show 可与折叠(maxItems)结合：折叠基于过滤后的可见项', () => {
    const items: KBreadcrumbItem[] = [
      { label: '一', path: '/a', show: false },
      { label: '二', path: '/b' },
      { label: '三', path: '/c' },
      { label: '四', path: '/d' },
      { label: '当前' },
    ]
    const wrapper = mount(KBreadcrumb, { props: { items, maxItems: 3 } })
    // 过滤 一 后剩 4 项：二/三/四/当前 → 折叠为 二 … 当前
    const labels = wrapper.findAll('.k-breadcrumb__label').map((n) => n.text())
    expect(labels).toEqual(['二', '…', '当前'])
  })

  it('show=false 的项不会触发 click-item（不可点、不渲染）', async () => {
    const wrapper = mount(KBreadcrumb, {
      props: {
        items: [
          { label: '首页', path: '/', show: false },
          { label: '组件', path: '/components' },
          { label: '当前' },
        ],
      },
    })
    await wrapper.find('.k-breadcrumb__item.is-link').trigger('click')
    const evts = wrapper.emitted('click-item') as Array<[{ index: number; item: KBreadcrumbItem }]>
    // 只触发可见项，index 基于可见数组（0 = 组件）
    expect(evts).toHaveLength(1)
    expect(evts[0][0].index).toBe(0)
    expect(evts[0][0].item.label).toBe('组件')
  })
})

