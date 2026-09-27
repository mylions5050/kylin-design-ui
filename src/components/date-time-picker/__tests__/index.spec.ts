import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KDateTimePicker from '../index'
import dayjs from 'dayjs'

// 面板经 KPopper Teleport 到 body，清理 DOM 避免用例互相污染
const clearBody = () => {
  document.querySelectorAll('.k-date-time-picker__panel').forEach((el) => el.remove())
}

const openPanel = async (wrapper: any) => {
  // 防御性清理：避免上一个用例异常退出时残留面板污染当前用例
  clearBody()
  await wrapper.find('input').trigger('focus')
  await nextTick()
}

const panelVisible = () => !!document.querySelector('.k-date-time-picker__panel')

// 本月某天的日期字符串（视图月份默认为当前月）
const fmtDay = (n: number) => dayjs().date(n).format('YYYY-MM-DD')

// 面板内某个容器中当前月的日期格子（排除上/下月灰色格）
const dateCellIn = (container: Element, day: number) =>
  Array.from(
    container.querySelectorAll('.k-date-picker-pane__grid button'),
  ).find(
    (b) =>
      b.className.includes('k-date-picker-pane__cell') &&
      !b.className.includes('is-other-month') &&
      b.textContent!.trim() === String(day),
  ) as HTMLElement

// 单选模式：整个面板只有一块日历
const panelEl = () => document.querySelector('.k-date-time-picker__panel')!
const dateCell = (day: number) => dateCellIn(panelEl(), day)
const clickDate = async (day: number) => {
  dateCell(day)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await nextTick()
}

// 容器内第 col 列（1=时 2=分 3=秒）中数值为 value 的时间项
const timeItemIn = (container: Element, col: number, value: number) =>
  Array.from(
    container.querySelectorAll(
      `.k-date-time-picker__time-col:nth-of-type(${col}) .k-date-time-picker__item`,
    ),
  ).find((el) => el.textContent!.trim() === String(value).padStart(2, '0')) as HTMLElement

// 单选模式时间项
const timeItem = (col: number, value: number) => timeItemIn(panelEl(), col, value)
const clickTime = async (col: number, value: number) => {
  timeItem(col, value)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await nextTick()
}

const footerButtons = () =>
  Array.from(
    document.querySelectorAll('.k-date-time-picker__footer .k-btn'),
  ) as HTMLElement[]

const clickFooter = async (index: number) => {
  footerButtons()[index].dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await nextTick()
}

const timeCols = () =>
  document.querySelectorAll('.k-date-time-picker__panel .k-date-time-picker__time-col')

describe('KDateTimePicker 基础渲染与面板结构', () => {
  it('默认占位符；面板包含日历格、时/分/秒三列与底部 此刻/确定', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('选择日期时间')

    await openPanel(wrapper)
    expect(panelVisible()).toBe(true)
    expect(timeCols().length).toBe(3)
    const btns = footerButtons().map((b) => b.textContent!.trim())
    expect(btns).toEqual(['此刻', '确定'])
    wrapper.unmount()
    clearBody()
  })

  it('format 时间段缺秒时无秒列（HH:mm 两列）', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: dayjs('2026-09-10 08:30'), format: 'YYYY-MM-DD HH:mm' },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(timeCols().length).toBe(2)
    wrapper.unmount()
    clearBody()
  })

  it('自定义 format 决定触发框显示格式', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: dayjs('2026-09-10 08:05:30'), format: 'YYYY/MM/DD HH:mm' },
      attachTo: document.body,
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('2026/09/10 08:05')
    wrapper.unmount()
    clearBody()
  })

  it('支持字符串绑定值', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: '2026-09-10 08:05:30' },
      attachTo: document.body,
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('2026-09-10 08:05:30')
    wrapper.unmount()
    clearBody()
  })
})

describe('KDateTimePicker 草稿与确定提交（单选）', () => {
  it('点选日期/时间只写草稿不提交；点确定合并提交并关闭', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: dayjs('2026-09-10 08:05:30') },
      attachTo: document.body,
    })
    // 初始显示已提交值
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('2026-09-10 08:05:30')

    await openPanel(wrapper)
    // 打开面板后时间列定位：草稿小时 08 选中
    expect(timeItem(1, 8).className).toContain('is-selected')

    // 点 15 号 + 时 20：草稿生效，但不提交、不关闭
    await clickDate(15)
    await clickTime(1, 20)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(panelVisible()).toBe(true)
    // 输入框仍显示已提交值，草稿不影响触发框
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('2026-09-10 08:05:30')
    // 日期草稿已高亮到 15 号（单选高亮类为 is-start）
    expect(dateCell(15)!.className).toContain('is-start')

    // 点确定：合并提交 2026-09-15 20:05:30（时间保留草稿未改的分/秒）并关闭
    await clickFooter(1)
    const emitted = wrapper.emitted('update:modelValue') as any[][]
    expect(emitted).toHaveLength(1)
    expect(emitted[0][0].format('YYYY-MM-DD HH:mm:ss')).toBe('2026-09-15 20:05:30')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('此刻：草稿跳到当前时刻不提交；点确定后提交当前时刻', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    await clickFooter(0)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(panelVisible()).toBe(true)

    await clickFooter(1)
    const emitted = wrapper.emitted('update:modelValue') as any[][]
    // 秒级可能与点击时刻有 1s 内偏差，按天断言
    expect(emitted[0][0].format('YYYY-MM-DD')).toBe(dayjs().format('YYYY-MM-DD'))
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('Escape 关闭面板并触发 visible-change', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    })
    await wrapper.find('input').trigger('focus')
    await nextTick()
    expect(panelVisible()).toBe(true)
    // 打开时上报 true
    expect((wrapper.emitted('visible-change') as any[][])[0][0]).toBe(true)

    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(panelVisible()).toBe(false)
    // 关闭时上报 false
    expect((wrapper.emitted('visible-change') as any[][])[1][0]).toBe(false)

    wrapper.unmount()
    clearBody()
  })
})

describe('KDateTimePicker 可选范围限制（单选）', () => {
  it('minDate：限制日期之前的格子禁用且点击无效', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { minDate: dayjs().date(15) },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(dateCell(2)!.hasAttribute('disabled')).toBe(true)
    expect(dateCell(20)!.hasAttribute('disabled')).toBe(false)
    // 点击禁用格不产生任何提交
    await clickDate(2)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    wrapper.unmount()
    clearBody()
  })

  it('maxDate：限制日期之后的格子禁用', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { maxDate: dayjs().date(10) },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(dateCell(5)!.hasAttribute('disabled')).toBe(false)
    expect(dateCell(20)!.hasAttribute('disabled')).toBe(true)

    wrapper.unmount()
    clearBody()
  })
})

describe('KDateTimePicker 范围模式（range）', () => {
  it('面板结构：两块子面板（日历 + 各自时间列），共 6 列', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true, start: dayjs('2026-09-01 08:00:00') },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(document.querySelectorAll('.k-date-time-picker__panel .k-date-time-picker__sub').length).toBe(2)
    expect(timeCols().length).toBe(6)
    wrapper.unmount()
    clearBody()
  })

  it('两步点选成对：点开始再点结束，确定后按各自时间列提交 start/end', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true, start: dayjs('2026-09-01 08:00:00') },
      attachTo: document.body,
    })
    await openPanel(wrapper)

    const firstSub = document.querySelectorAll('.k-date-time-picker__sub')[0]
    // 点开始子面板的 5 号成对（开始为已存在的 1 号）
    dateCellIn(firstSub, 5)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    // 配对后开始/结束时间列仍为草稿值（08 选中）
    expect(timeItemIn(firstSub, 1, 8).className).toContain('is-selected')

    // 未成对完成前确定被允许？已成对（1~5），点确定提交
    await clickFooter(1)
    const starts = wrapper.emitted('update:start') as any[][]
    const ends = wrapper.emitted('update:end') as any[][]
    expect(starts[0][0].format('YYYY-MM-DD HH:mm:ss')).toBe('2026-09-01 08:00:00')
    expect(ends[0][0].format('YYYY-MM-DD HH:mm:ss')).toBe('2026-09-05 08:00:00')
    expect(
      (wrapper.emitted('change') as any[][])[0][0].map((v: any) => v.format('YYYY-MM-DD')),
    ).toEqual(['2026-09-01', '2026-09-05'])
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('未成对时点确定：不提交、面板不关闭', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    await clickDate(2)
    // 只点了开始，点确定不提交
    await clickFooter(1)
    expect(wrapper.emitted('update:start')).toBeUndefined()
    expect(wrapper.emitted('update:end')).toBeUndefined()
    expect(panelVisible()).toBe(true)
    wrapper.unmount()
    clearBody()
  })

  it('逆序点选自动纠正：先点 10 号再点 2 号 → start=2 号、end=10 号', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    await clickDate(10)
    await clickDate(2)
    await clickFooter(1)
    const starts = wrapper.emitted('update:start') as any[][]
    const ends = wrapper.emitted('update:end') as any[][]
    expect(starts[0][0].format('YYYY-MM-DD')).toBe(fmtDay(2))
    expect(ends[0][0].format('YYYY-MM-DD')).toBe(fmtDay(10))
    expect(panelVisible()).toBe(false)

    wrapper.unmount()
    clearBody()
  })

  it('重新选择：已配对后再点日期重开新一轮（只更新开始）', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true, start: dayjs('2026-09-01 08:00:00') },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    const firstSub = document.querySelectorAll('.k-date-time-picker__sub')[0]
    // 已有 start 草稿（1 号），点 5 号配对成 1~5
    dateCellIn(firstSub, 5)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    // 再点 20 号：已成对，重开新一轮，只设 20 号为新的开始
    dateCellIn(firstSub, 20)!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    // 未成对，确定不提交
    await clickFooter(1)
    expect(wrapper.emitted('update:start')).toBeUndefined()
    expect(panelVisible()).toBe(true)

    wrapper.unmount()
    clearBody()
  })

  it('范围"此刻"：草稿跳到当前时刻，确定后 start/end 同为今天', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: { range: true },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    await clickFooter(0)
    await clickFooter(1)
    const starts = wrapper.emitted('update:start') as any[][]
    const ends = wrapper.emitted('update:end') as any[][]
    const today = dayjs().format('YYYY-MM-DD')
    expect(starts[0][0].format('YYYY-MM-DD')).toBe(today)
    expect(ends[0][0].format('YYYY-MM-DD')).toBe(today)
    wrapper.unmount()
    clearBody()
  })

  it('范围清除：提交 update:start / update:end 为 null 并触发 clear', async () => {
    const wrapper = mount(KDateTimePicker, {
      props: {
        range: true,
        start: dayjs('2026-09-01 08:00:00'),
        end: dayjs('2026-09-05 18:00:00'),
        clearable: true,
      },
      attachTo: document.body,
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      '2026-09-01 08:00:00 ~ 2026-09-05 18:00:00',
    )
    const clearIcon = wrapper.find('.k-input__clear')
    expect(clearIcon.exists()).toBe(true)
    await clearIcon.trigger('click')
    const starts = wrapper.emitted('update:start') as any[][]
    const ends = wrapper.emitted('update:end') as any[][]
    expect(starts[0][0]).toBeNull()
    expect(ends[0][0]).toBeNull()
    expect(wrapper.emitted('clear')).toHaveLength(1)
    wrapper.unmount()
    clearBody()
  })
})

describe('KDateTimePicker 禁用', () => {
  it('disabled：输入框禁用，focus 不打开面板', async () => {
    const wrapper = mount(KDateTimePicker, {
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
})
