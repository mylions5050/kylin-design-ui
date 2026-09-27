import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KDatePicker from '../date-picker'
import dayjs from 'dayjs'

// 面板经 KPopper Teleport 到 body，清理 DOM 避免用例互相污染
const clearBody = () => {
  document.querySelectorAll('.k-date-picker__panel').forEach((el) => el.remove())
}

const openPanel = async (wrapper: any) => {
  // 防御性清理：避免上一个用例异常退出时残留面板污染当前用例
  clearBody()
  await wrapper.find('input').trigger('focus')
  await nextTick()
}

const panelVisible = () => !!document.querySelector('.k-date-picker__panel')

// 面板内当前月的日期格子（排除上/下月灰色格与快捷项等非格子按钮）
const panelCells = () =>
  Array.from(
    document.querySelectorAll('.k-date-picker__panel .k-date-picker-pane__grid button'),
  ).filter(
    (b) =>
      b.className.includes('k-date-picker-pane__cell') &&
      !b.className.includes('is-other-month'),
  ) as HTMLElement[]

const cell = (day: number) =>
  panelCells().find((b) => b.textContent!.trim() === String(day))!

const clickCell = async (day: number) => {
  cell(day)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await nextTick()
}

const fmt = (v: any) => dayjs(v).format('YYYY-MM-DD')

// 本月的某一天（视图月份默认为当前月）
const day = (n: number) => dayjs().date(n)

describe('KDatePicker 基础单选', () => {
  it('默认占位符，focus 打开面板，点选日期即提交并关闭', async () => {
    const wrapper = mount(KDatePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('选择日期')

    await openPanel(wrapper)
    expect(panelVisible()).toBe(true)

    await clickCell(15)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(fmt((wrapper.emitted('update:modelValue') as any[])[0][0])).toBe(fmt(day(15)))
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('手动输入合法日期回车：解析提交并回填格式化文本', async () => {
    const wrapper = mount(KDatePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    })
    await wrapper.find('input').setValue('2026-03-15')
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(fmt((wrapper.emitted('update:modelValue') as any[])[0][0])).toBe('2026-03-15')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('2026-03-15')

    wrapper.unmount()
    clearBody()
  })
})

describe('KDatePicker 多选模式（multiple）', () => {
  it('点选 toggle 入集合，面板不关闭；再点移出', async () => {
    const wrapper = mount(KDatePicker, {
      props: { multiple: true, values: [] },
      attachTo: document.body,
    })
    await openPanel(wrapper)

    await clickCell(2)
    const first = (wrapper.emitted('update:values') as any[])[0][0] as any[]
    expect(first).toHaveLength(1)
    expect(fmt(first[0])).toBe(fmt(day(2)))
    expect(panelVisible()).toBe(true) // 多选不关闭面板

    // 父组件回写后再点同一天：移出集合
    await wrapper.setProps({ values: first })
    await clickCell(2)
    const second = (wrapper.emitted('update:values') as any[])[1][0] as any[]
    expect(second).toHaveLength(0)

    wrapper.unmount()
    clearBody()
  })
})

describe('KDatePicker 范围模式（range）', () => {
  it('两步点选成对：第一次只设 start 不关面板，第二次成对并自动关闭；逆序点击自动纠正', async () => {
    const wrapper = mount(KDatePicker, {
      props: { range: true },
      attachTo: document.body,
    })
    // 范围模式为开始/结束两个输入框
    expect(wrapper.findAll('input').length).toBe(2)

    await openPanel(wrapper)
    // 逆序：先点 10 号（作为第一次点击），再点 2 号
    await clickCell(10)
    const starts = wrapper.emitted('update:start') as any[][]
    const ends = wrapper.emitted('update:end') as any[][]
    expect(fmt(starts[0][0])).toBe(fmt(day(10)))
    expect(ends[0][0]).toBeNull()
    expect(panelVisible()).toBe(true)

    await wrapper.setProps({ start: starts[0][0], end: ends[0][0] })
    await clickCell(2)
    // 面板关闭时清理逻辑可能补发 null（测试未接 v-model），过滤后断言真实成对负载
    const nonNull = (name: string) =>
      (wrapper.emitted(name) as any[][]).map((e) => e[0]).filter(Boolean).at(-1)
    expect(fmt(nonNull('update:start'))).toBe(fmt(day(2)))
    expect(fmt(nonNull('update:end'))).toBe(fmt(day(10)))
    expect(panelVisible()).toBe(false) // 成对后自动关闭

    wrapper.unmount()
    clearBody()
  })
})

describe('KDatePicker 手动确认模式（confirm + cardPanel）', () => {
  it('点选只写草稿不提交；点"确定"才提交并关闭，点"取消"回滚', async () => {
    const wrapper = mount(KDatePicker, {
      props: { cardPanel: true, confirm: true, modelValue: null },
      attachTo: document.body,
    })
    await openPanel(wrapper)

    // 点日期：草稿生效（面板高亮），但不提交父值、不关闭
    await clickCell(15)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(panelVisible()).toBe(true)

    // 点"确定"：提交并关闭
    const btns = () =>
      Array.from(document.querySelectorAll('.k-date-picker__panel-actions .k-btn')) as HTMLElement[]
    btns()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(fmt((wrapper.emitted('update:modelValue') as any[])[0][0])).toBe(fmt(day(15)))
    expect(panelVisible()).toBe(false)

    // 重新打开、点另一天、点"取消"：不提交、面板关闭
    await openPanel(wrapper)
    await clickCell(16)
    btns()[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1) // 仍是确定那一次
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })
})

describe('KDatePicker 快捷选项（shortcuts）', () => {
  it('点击快捷项提交对应日期并关闭面板', async () => {
    const wrapper = mount(KDatePicker, {
      props: { shortcuts: [{ text: '今天', value: () => dayjs() }] },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    const sc = document.querySelector('.k-date-picker__shortcut') as HTMLElement
    sc.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(fmt((wrapper.emitted('update:modelValue') as any[])[0][0])).toBe(fmt(dayjs()))
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })
})

describe('KDatePicker type 类型化显示', () => {
  it('month / quarter / year 按类型格式化显示值', async () => {
    const monthPicker = mount(KDatePicker, {
      props: { type: 'month', modelValue: dayjs('2026-08-15') },
      attachTo: document.body,
    })
    expect((monthPicker.find('input').element as HTMLInputElement).value).toBe('2026-08')
    monthPicker.unmount()
    clearBody()

    const quarterPicker = mount(KDatePicker, {
      props: { type: 'quarter', modelValue: dayjs('2026-08-15') },
      attachTo: document.body,
    })
    expect((quarterPicker.find('input').element as HTMLInputElement).value).toBe('2026-Q3')
    quarterPicker.unmount()
    clearBody()

    const yearPicker = mount(KDatePicker, {
      props: { type: 'year', modelValue: dayjs('2026-08-15') },
      attachTo: document.body,
    })
    expect((yearPicker.find('input').element as HTMLInputElement).value).toBe('2026')
    yearPicker.unmount()
    clearBody()
  })
})

describe('KDatePicker 禁用与可选范围限制', () => {
  it('disabled：输入框禁用，focus 不打开面板', async () => {
    const wrapper = mount(KDatePicker, {
      props: { disabled: true },
      attachTo: document.body,
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    await wrapper.find('input').trigger('focus')
    await nextTick()
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('minDate：限制日期之前的格子禁用不可点', async () => {
    const wrapper = mount(KDatePicker, {
      props: { minDate: dayjs().date(15) },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(cell(2).hasAttribute('disabled')).toBe(true)
    expect(cell(20).hasAttribute('disabled')).toBe(false)
    // 点击禁用格不产生任何提交
    await clickCell(2)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    wrapper.unmount()
    clearBody()
  })
})
