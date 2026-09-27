import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import KSteps from '../index'
import type { KStepItem } from '../types'

const items: KStepItem[] = [
  { title: 'Step 1', description: 'desc 1' },
  { title: 'Step 2', description: 'desc 2' },
  { title: 'Step 3', description: 'desc 3' },
]

/** 渲染 3 步步骤条，current 指向第 2 步（索引 1） */
function mountSteps(overrides: Record<string, unknown> = {}) {
  return mount(KSteps, {
    props: { items, current: 1, ...overrides },
  })
}

describe('KSteps 渲染', () => {
  it('渲染与 items 数量一致', () => {
    const wrapper = mount(KSteps, { props: { items } })
    expect(wrapper.findAll('.k-steps__node').length).toBe(3)
    expect(wrapper.text()).toContain('Step 1')
    expect(wrapper.text()).toContain('Step 2')
    expect(wrapper.text()).toContain('Step 3')
  })

  it('默认横向布局', () => {
    const wrapper = mount(KSteps, { props: { items } })
    expect(wrapper.classes()).toContain('k-steps')
    expect(wrapper.classes()).toContain('is-horizontal')
  })

  it('vertical 方向', () => {
    const wrapper = mount(KSteps, { props: { items, direction: 'vertical' } })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  it('节点之间存在连接线', () => {
    const wrapper = mount(KSteps, { props: { items } })
    expect(wrapper.findAll('.k-steps__tail').length).toBe(2)
  })

  it('序号按 1 起显示', () => {
    const wrapper = mount(KSteps, { props: { items } })
    const nums = wrapper.findAll('.k-steps__num').map((n) => n.text())
    expect(nums).toEqual(['1', '2', '3'])
  })
})

describe('KSteps 状态推导', () => {
  it('current=1：第 0 步 finish、第 1 步 process、第 2 步 wait', () => {
    const wrapper = mountSteps()
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[0].classes()).toContain('is-finish')
    expect(nodes[1].classes()).toContain('is-process')
    expect(nodes[2].classes()).toContain('is-wait')
  })

  it('current=0 时首步为 process，无 finish', () => {
    const wrapper = mount(KSteps, { props: { items, current: 0 } })
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[0].classes()).toContain('is-process')
    expect(wrapper.findAll('.is-finish').length).toBe(0)
  })

  it('items[].status 显式覆盖自动推导', () => {
    const forced: KStepItem[] = [
      { title: 'A', status: 'error' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: forced, current: 1 } })
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[0].classes()).toContain('is-error')
    expect(nodes[0].classes()).not.toContain('is-finish')
  })
})

describe('KSteps 图标渲染', () => {
  it('finish 状态渲染 select-bold 图标', () => {
    const wrapper = mountSteps()
    expect(wrapper.findAll('.k-steps__icon')[0].find('i.icon-select-bold').exists()).toBe(true)
  })

  it('error 状态渲染 close 图标', () => {
    const forced: KStepItem[] = [
      { title: 'A', status: 'error' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: forced, current: 0 } })
    expect(wrapper.findAll('.k-steps__icon')[0].find('i.icon-close').exists()).toBe(true)
  })

  it('items[].icon 指定图标渲染', () => {
    const withIcon: KStepItem[] = [{ title: '图标', icon: 'edit' }, { title: 'B' }, { title: 'C' }]
    const wrapper = mount(KSteps, { props: { items: withIcon, current: 0 } })
    expect(wrapper.findAll('.k-steps__icon')[0].find('i.icon-edit').exists()).toBe(true)
  })

  it('success 状态渲染 success 图标', () => {
    const forced: KStepItem[] = [
      { title: 'A', status: 'success' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: forced, current: 0 } })
    expect(wrapper.findAll('.k-steps__icon')[0].find('i.icon-success').exists()).toBe(true)
  })

  it('warning 状态渲染 warning 图标', () => {
    const forced: KStepItem[] = [
      { title: 'A', status: 'warning' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: forced, current: 0 } })
    expect(wrapper.findAll('.k-steps__icon')[0].find('i.icon-warning').exists()).toBe(true)
  })
})

describe('KSteps fill 模式', () => {
  it('fill 为 true 时 icon 带 is-fill 类', () => {
    const withFill: KStepItem[] = [{ title: 'A', fill: true }, { title: 'B' }, { title: 'C' }]
    const wrapper = mount(KSteps, { props: { items: withFill, current: 0 } })
    expect(wrapper.findAll('.k-steps__icon')[0].classes()).toContain('is-fill')
  })
})

describe('KSteps tooltip', () => {
  it('tooltip 内容使 icon 被 KTooltip 包裹', () => {
    const withTip: KStepItem[] = [
      { title: 'A', tooltip: '提示内容' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: withTip, current: 0 } })
    // KTooltip 渲染为 .tooltip 容器，且包裹在 icon 外层
    expect(wrapper.findAll('.k-steps__icon').length).toBe(3)
    // 验证 tooltip 内容存在
    expect(wrapper.find('.tooltip').exists()).toBe(true)
  })
})

describe('KSteps 交互', () => {
  it('clickable 节点带 is-clickable 类', () => {
    const wrapper = mountSteps({ clickable: true })
    expect(wrapper.findAll('.k-steps__node')[0].classes()).toContain('is-clickable')
  })

  it('禁用节点不可点击', () => {
    const withDisabled: KStepItem[] = [
      { title: 'A', disabled: true },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, {
      props: { items: withDisabled, current: 0, clickable: true },
    })
    expect(wrapper.findAll('.k-steps__node')[0].classes()).toContain('is-disabled')
    expect(wrapper.findAll('.k-steps__node')[0].classes()).not.toContain('is-clickable')
  })

  it('点击可点击步骤触发事件', async () => {
    const onUpdate = vi.fn()
    const onStepClick = vi.fn()
    const onCurrentChange = vi.fn()
    const wrapper = mount(KSteps, {
      props: {
        items,
        current: 0,
        clickable: true,
        'onUpdate:current': onUpdate,
        onStepClick,
        onCurrentChange,
      },
    })
    await wrapper.findAll('.k-steps__node')[2].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(2)
    expect(onStepClick).toHaveBeenCalledWith({ index: 2, item: items[2] })
    expect(onCurrentChange).toHaveBeenCalledWith({ index: 2, item: items[2] })
  })

  it('clickable=false 不触发事件', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(KSteps, {
      props: { items, current: 0, clickable: false, 'onUpdate:current': onUpdate },
    })
    await wrapper.findAll('.k-steps__node')[1].trigger('click')
    expect(onUpdate).not.toHaveBeenCalled()
  })
})

describe('KSteps 连接线', () => {
  it('finish 步骤后的连接线为激活态', () => {
    const wrapper = mountSteps()
    const lines = wrapper.findAll('.k-steps__tail')
    // current=1: 第 0 步 finish → 第 1 条线是 active
    expect(lines[0].classes()).toContain('is-active')
    // 第 1 步 process → 第 2 条线也是 active
    expect(lines[1].classes()).toContain('is-active')
  })

  it('current=0 时 process 步骤后的连接线为激活态', () => {
    const wrapper = mount(KSteps, { props: { items, current: 0 } })
    const lines = wrapper.findAll('.k-steps__tail')
    // 第 0 步 process → 第 1 条线 active
    expect(lines[0].classes()).toContain('is-active')
    // 第 1 步 wait → 第 2 条线 非激活
    expect(lines[1].classes()).not.toContain('is-active')
  })
})

describe('KSteps 尺寸', () => {
  it('small 尺寸带 is-small 类', () => {
    const wrapper = mount(KSteps, { props: { items, size: 'small' } })
    expect(wrapper.classes()).toContain('is-small')
  })

  it('default 尺寸不带 is-small 类', () => {
    const wrapper = mount(KSteps, { props: { items } })
    expect(wrapper.classes()).not.toContain('is-small')
  })

  it('mini 尺寸带 is-mini 类', () => {
    const wrapper = mount(KSteps, { props: { items, size: 'mini' } })
    expect(wrapper.classes()).toContain('is-mini')
  })
})

describe('KSteps 全局 status', () => {
  it('status=success 时所有步骤都是 success 状态', () => {
    const wrapper = mount(KSteps, { props: { items, current: 1, status: 'success' } })
    const nodes = wrapper.findAll('.k-steps__node')
    nodes.forEach((node) => {
      expect(node.classes()).toContain('is-success')
    })
  })

  it('status=error 时所有步骤都是 error 状态', () => {
    const wrapper = mount(KSteps, { props: { items, current: 0, status: 'error' } })
    const nodes = wrapper.findAll('.k-steps__node')
    nodes.forEach((node) => {
      expect(node.classes()).toContain('is-error')
    })
  })

  it('item.status 优先级高于全局 status', () => {
    const withError: KStepItem[] = [
      { title: 'A', status: 'error' },
      { title: 'B' },
      { title: 'C' },
    ]
    const wrapper = mount(KSteps, { props: { items: withError, current: 1, status: 'success' } })
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[0].classes()).toContain('is-error')
    expect(nodes[1].classes()).toContain('is-success')
    expect(nodes[2].classes()).toContain('is-success')
  })
})

describe('KSteps minHeight', () => {
  it('vertical 模式应用 minHeight CSS 变量', () => {
    const wrapper = mount(KSteps, { props: { items, direction: 'vertical', minHeight: 200 } })
    const el = wrapper.element as HTMLElement
    expect(el.style.getPropertyValue('--k-steps-min-height')).toBe('200px')
  })

  it('default minHeight 不注入 CSS 变量', () => {
    const wrapper = mount(KSteps, { props: { items, direction: 'vertical' } })
    const el = wrapper.element as HTMLElement
    expect(el.style.getPropertyValue('--k-steps-min-height')).toBe('')
  })
})

describe('KSteps 边界情况', () => {
  it('current 超出范围时钳制到末步', () => {
    const wrapper = mount(KSteps, { props: { items, current: 99 } })
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[2].classes()).toContain('is-process')
  })

  it('current 为负时钳制到第 0 步', () => {
    const wrapper = mount(KSteps, { props: { items, current: -5 } })
    const nodes = wrapper.findAll('.k-steps__node')
    expect(nodes[0].classes()).toContain('is-process')
  })
})