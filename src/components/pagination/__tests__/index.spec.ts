import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KPagination from '../index'

const mountSimple = (props: Record<string, unknown> = {}) =>
  mount(KPagination, {
    props: { currentPage: 7, pageSize: 10, total: 1000, simple: true, ...props },
  })

/** 点击第 index 个导航按钮（0 = 上一页，1 = 下一页） */
const clickNav = (wrapper: ReturnType<typeof mountSimple>, index: number) => {
  wrapper.findAll('.pagination__btn--nav')[index].trigger('click')
}

describe('KPagination 极简模式（simple）', () => {
  it('渲染结构：「上一页箭头 + 页码输入框 + / + 总页数 + 下一页箭头」', () => {
    const wrapper = mountSimple()
    expect(wrapper.classes()).toContain('pagination--simple')
    // 两个导航按钮
    expect(wrapper.findAll('.pagination__btn--nav')).toHaveLength(2)
    // 输入框展示当前页，总页数 1000/10 = 100
    expect((wrapper.find('.pagination__simple-input .k-input__inner').element as HTMLInputElement).value).toBe('7')
    expect(wrapper.find('.pagination__simple-total').text()).toBe('100')
    // 不渲染普通模式的页码列表与 summary
    expect(wrapper.find('.pagination__summary').exists()).toBe(false)
    expect(wrapper.find('.pagination__btn.is-active').exists()).toBe(false)
  })

  it('点击下一页 emit pageChange 与 change', () => {
    const wrapper = mountSimple()
    clickNav(wrapper, 1)
    expect(wrapper.emitted('pageChange')![0]).toEqual([8])
    expect((wrapper.emitted('change')![0] as unknown[])[0]).toEqual({ page: 8, pageSize: 10 })
  })

  it('边界：第一页时上一页禁用，最后一页时下一页禁用', () => {
    const first = mountSimple({ currentPage: 1 })
    expect(first.findAll('.pagination__btn--nav')[0].attributes('disabled')).toBeDefined()

    const last = mountSimple({ currentPage: 100 })
    expect(last.findAll('.pagination__btn--nav')[1].attributes('disabled')).toBeDefined()
  })

  it('输入页码回车（原生 change）跳转', async () => {
    const wrapper = mountSimple()
    const input = wrapper.find('.pagination__simple-input .k-input__inner')
    await input.setValue('23')
    await input.trigger('change')
    expect(wrapper.emitted('pageChange')![0]).toEqual([23])
  })

  it('输入页码失焦同样提交跳转', async () => {
    const wrapper = mountSimple()
    const input = wrapper.find('.pagination__simple-input .k-input__inner')
    await input.setValue('50')
    await input.trigger('blur')
    expect(wrapper.emitted('pageChange')![0]).toEqual([50])
  })

  it('超出总页数自动夹取到最后一页，小于 1 夹取到第一页', async () => {
    const wrapper = mountSimple()
    const input = wrapper.find('.pagination__simple-input .k-input__inner')
    await input.setValue('9999')
    await input.trigger('change')
    expect(wrapper.emitted('pageChange')![0]).toEqual([100])

    await input.setValue('0')
    await input.trigger('change')
    expect(wrapper.emitted('pageChange')![1]).toEqual([1])
  })

  it('非法输入（非数字）不触发跳转', async () => {
    const wrapper = mountSimple()
    const input = wrapper.find('.pagination__simple-input .k-input__inner')
    await input.setValue('abc')
    await input.trigger('change')
    expect(wrapper.emitted('pageChange')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
