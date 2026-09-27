import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick, type Component } from 'vue'
import KTab from '../index'
import KTabPane from '../pane'

/** 便捷构造 KTabPane 的 vnode */
function pane(k: string, label: string, content = `content:${k}`) {
  return h(KTabPane as Component, { k, label }, { default: () => content })
}

function mountBasic(props: Record<string, unknown> = {}) {
  return mount(KTab, {
    props: { ...props },
    slots: {
      default: () => [pane('a', 'Tab A'), pane('b', 'Tab B'), pane('c', 'Tab C')],
    },
  })
}

/** 当前可见面板文本 */
function visibleText(wrapper: {
  findAll: (sel: string) => Array<{ element: HTMLElement; text: () => string }>
}) {
  return wrapper
    .findAll('.k-tab__pane')
    .filter((p) => (p.element as HTMLElement).style.display !== 'none')
    .map((p) => p.text())
    .join(' ')
}

describe('KTab 基础渲染', () => {
  it('渲染所有 Tab 的标题文字', () => {
    const wrapper = mountBasic()
    expect(wrapper.findAll('.k-tab__label').map((n) => n.text())).toEqual(['Tab A', 'Tab B', 'Tab C'])
  })

  it('未传激活项时默认激活第一项并高亮', () => {
    const wrapper = mountBasic()
    const active = wrapper.find('.k-tab__item.is-active')
    expect(active.exists()).toBe(true)
    expect(active.find('.k-tab__label').text()).toContain('Tab A')
  })

  it('默认渲染第一项面板内容', () => {
    const wrapper = mountBasic()
    expect(visibleText(wrapper)).toContain('content:a')
  })
})

describe('KTab 激活与事件', () => {
  it('点击 Tab 触发 tab-click / tab-change 并切换高亮', async () => {
    const onClick = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(KTab, {
      props: { onTabClick: onClick, onTabChange: onChange },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B'), pane('c', 'C')] },
    })
    await wrapper.findAll('.k-tab__item')[1].trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][0]).toMatchObject({ key: 'b', label: 'B' })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toMatchObject({ key: 'b' })
    expect(wrapper.find('.k-tab__item.is-active').find('.k-tab__label').text()).toContain('B')
    expect(visibleText(wrapper)).toContain('content:b')
  })

  it('受控 v-model：触发 update:modelValue，高亮跟随外部值', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(KTab, {
      props: { modelValue: 'a', 'onUpdate:modelValue': onUpdate },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B')] },
    })
    await wrapper.findAll('.k-tab__item')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith('b')
    expect(wrapper.find('.k-tab__item.is-active').find('.k-tab__label').text()).toContain('A')
    await wrapper.setProps({ modelValue: 'b' })
    await nextTick()
    expect(wrapper.find('.k-tab__item.is-active').find('.k-tab__label').text()).toContain('B')
  })

  it('default-key 指定初始激活项', () => {
    const wrapper = mountBasic({ defaultKey: 'b' })
    expect(wrapper.find('.k-tab__item.is-active').find('.k-tab__label').text()).toContain('B')
  })
})

describe('KTab 数据驱动 items', () => {
  it('通过 :items 渲染并对 #pane 插槽传参', () => {
    const wrapper = mount(KTab, {
      props: {
        items: [
          { key: 'home', label: '首页' },
          { key: 'list', label: '列表' },
        ],
        modelValue: 'home',
      },
      slots: { pane: (p) => `${p.label} 的面板` },
    })
    expect(wrapper.findAll('.k-tab__label').map((n) => n.text())).toEqual(['首页', '列表'])
    expect(visibleText(wrapper)).toContain('首页 的面板')
  })
})

describe('KTab 键盘可访问性', () => {
  it('Enter/空格键触发切换', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(KTab, {
      props: { modelValue: 'a', 'onUpdate:modelValue': onUpdate },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B')] },
    })
    await wrapper.findAll('.k-tab__item')[1].trigger('keydown', { key: 'Enter' })
    expect(onUpdate).toHaveBeenCalledWith('b')
  })
})

describe('KTab 均分（stretch）', () => {
  it('stretch 时 nav 带 is-stretch 类', () => {
    expect(mountBasic({ stretch: true }).find('.k-tab__nav').classes()).toContain('is-stretch')
    expect(mountBasic().find('.k-tab__nav').classes()).not.toContain('is-stretch')
  })
})

describe('KTab 内外面距', () => {
  it('item-padding/item-margin 通过 CSS 变量注入到根节点', () => {
    const wrapper = mountBasic({ itemPadding: '8px 24px', itemMargin: '0 6px' })
    const wrap = wrapper.find('.k-tab__wrap').element as HTMLElement
    expect(wrap.getAttribute('style')).toContain('--k-tab-item-padding: 8px 24px')
    expect(wrap.getAttribute('style')).toContain('--k-tab-item-margin: 0 6px')
    // item 本体不内联 style（避免膨胀）
    expect((wrapper.find('.k-tab__item').element as HTMLElement).style.padding).toBe('')
  })
})

describe('KTab 指示条宽度（indicator）', () => {
  it('indicator-label 正常渲染，激活项高亮', () => {
    const wrapper = mountBasic({ modelValue: 'b', indicator: 'label' })
    expect(wrapper.find('.k-tab__item.is-active').find('.k-tab__label').text()).toContain('B')
  })
})

describe('KTab 指示条动画开关', () => {
  it('indicatorTransition=false 时带 is-no-anim 类', () => {
    expect(mountBasic({ modelValue: 'a', indicatorTransition: false }).find('.k-tab__indicator').classes()).toContain('is-no-anim')
    expect(mountBasic({ modelValue: 'a' }).find('.k-tab__indicator').classes()).not.toContain('is-no-anim')
  })
})

describe('KTab 自定义下划线样式', () => {
  it('indicator-style 内联样式 + indicator-class 叠加', () => {
    const wrapper = mountBasic({ modelValue: 'a', indicatorStyle: { height: '4px' }, indicatorClass: 'my-ul' })
    const ind = wrapper.find('.k-tab__indicator')
    expect((ind.element as HTMLElement).style.height).toBe('4px')
    expect(ind.classes()).toContain('my-ul')
  })
})

describe('KTab 主题色（activeColor）', () => {
  it('active-color 在根节点设 --k-tab-active-color 变量', () => {
    const wrapper = mountBasic({ modelValue: 'a', activeColor: '#7c3aed' })
    expect((wrapper.find('.k-tab__wrap').element as HTMLElement).getAttribute('style')).toContain('--k-tab-active-color: #7c3aed')
  })
})

describe('KTab 溢出滚动（scrollable）', () => {
  it('scrollable 时渲染滚动容器', () => {
    expect(mountBasic({ scrollable: true }).find('.k-tab__scroll').exists()).toBe(true)
    expect(mountBasic().find('.k-tab__scroll').exists()).toBe(false)
  })
})

describe('KTab 可添加 / 可关闭', () => {
  it('addable 渲染添加按钮并触发 add', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(KTab, {
      props: { addable: true, onAdd },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B')] },
    })
    await wrapper.find('.k-tab__add').trigger('click')
    expect(onAdd).toHaveBeenCalledTimes(1)
  })

  it('closable 渲染关闭按钮并触发 tab-remove，且不切换激活', async () => {
    const onRemove = vi.fn()
    const onUpdate = vi.fn()
    const wrapper = mount(KTab, {
      props: { modelValue: 'a', closable: true, onTabRemove: onRemove, 'onUpdate:modelValue': onUpdate },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B')] },
    })
    await wrapper.findAll('.k-tab__close')[0].trigger('click')
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove.mock.calls[0][0]).toMatchObject({ key: 'a' })
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('仅剩一个 tab 时即使 closable 也隐藏关闭按钮', () => {
    const wrapper = mount(KTab, {
      props: { modelValue: 'a', closable: true },
      slots: { default: () => [h(KTabPane as Component, { k: 'a', label: 'A', closable: true }, { default: () => 'A' })] },
    })
    expect(wrapper.find('.k-tab__close').exists()).toBe(false)
    expect(wrapper.findAll('.k-tab__item').length).toBe(1)
  })

  it('单个 KTabPane 的 closable 可独立控制', () => {
    const wrapper = mount(KTab, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          h(KTabPane as Component, { k: 'a', label: 'A', closable: true }, { default: () => 'A' }),
          h(KTabPane as Component, { k: 'b', label: 'B' }, { default: () => 'B' }),
        ],
      },
    })
    expect(wrapper.findAll('.k-tab__close').length).toBe(1)
  })

  it('beforeRemove 返回 false 时阻止关闭', async () => {
    const onRemove = vi.fn()
    const wrapper = mount(KTab, {
      props: { modelValue: 'a', closable: true, beforeRemove: () => false, onTabRemove: onRemove },
      slots: { default: () => [pane('a', 'A'), pane('b', 'B')] },
    })
    await wrapper.find('.k-tab__close').trigger('click')
    expect(onRemove).not.toHaveBeenCalled()
  })
})

describe('KTab 自定义标题插槽（label）', () => {
  it('label 插槽可基于 active 状态自定义', () => {
    const wrapper = mount(KTab, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [pane('a', 'A'), pane('b', 'B')],
        label: ({ label, active }: { label: string; active: boolean }) => `${active ? '★' : ''}${label}`,
      },
    })
    expect(wrapper.findAll('.k-tab__label').map((n) => n.text())).toEqual(['★A', 'B'])
  })
})
