import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KDatePickerPane from '../index'
import dayjs from 'dayjs'
import type { DateSegment } from '../index'

// 统一用 2026-09 做测试月份，避免依赖"今天"的日期
const M = '2026-09'
const d = (day: number) => dayjs(`${M}-${String(day).padStart(2, '0')}`)

const mountPane = (ranges: DateSegment[] = []) =>
  mount(KDatePickerPane, {
    props: { segment: true, defaultMonth: d(15), ranges },
    attachTo: document.body,
  })

// 找当前月的某个日期格子（排除上/下月灰色格）
const cell = (wrapper: any, day: number) =>
  wrapper
    .findAll('.k-date-picker-pane__grid button')
    .find(
      (b: any) =>
        !b.classes().includes('is-other-month') && b.text().trim() === String(day),
    )!

const clickCell = async (wrapper: any, day: number) => {
  await cell(wrapper, day).trigger('click')
  await nextTick()
}

// 最近一次 update:ranges 的负载，格式化为字符串便于断言
const emittedRanges = (wrapper: any) =>
  ((wrapper.emitted('update:ranges') ?? []).at(-1)?.[0] as DateSegment[]).map(
    ([s, e]) => [s.format('YYYY-MM-DD'), e.format('YYYY-MM-DD')],
  )

describe('KDatePickerPane 分段范围模式（segment）', () => {
  it('两步点选成段：第一次点选进入待配对不上报，第二次点选上报完整段', async () => {
    const wrapper = mountPane()
    await clickCell(wrapper, 2)

    // 第一次点选：仅进入待配对（起点高亮），不上报分段
    expect(wrapper.emitted('update:ranges')).toBeUndefined()
    expect(cell(wrapper, 2).classes()).toContain('is-start')

    // 待配对期间 hover 另一端：临时段预览
    await cell(wrapper, 5).trigger('mouseenter')
    await nextTick()
    expect(cell(wrapper, 4).classes()).toContain('is-in-range')
    expect(cell(wrapper, 5).classes()).toContain('is-end')

    // 第二次点选：成段并上报
    await clickCell(wrapper, 10)
    expect(emittedRanges(wrapper)).toEqual([['2026-09-02', '2026-09-10']])
    expect(cell(wrapper, 2).classes()).toContain('is-start')
    expect(cell(wrapper, 10).classes()).toContain('is-end')
    expect(cell(wrapper, 5).classes()).toContain('is-in-range')

    wrapper.unmount()
  })

  it('段内截断：2~10 号取消 4 号拆成 2~3 与 5~10，再取消 5 号变成 2~3 与 6~10', async () => {
    const wrapper = mountPane([[d(2), d(10)]])

    await clickCell(wrapper, 4)
    expect(emittedRanges(wrapper)).toEqual([
      ['2026-09-02', '2026-09-03'],
      ['2026-09-05', '2026-09-10'],
    ])

    // 外层回写 ranges 后继续截断
    await wrapper.setProps({ ranges: emittedRanges(wrapper) as any })
    await clickCell(wrapper, 5)
    expect(emittedRanges(wrapper)).toEqual([
      ['2026-09-02', '2026-09-03'],
      ['2026-09-06', '2026-09-10'],
    ])

    await wrapper.setProps({ ranges: emittedRanges(wrapper) as any })
    expect(cell(wrapper, 2).classes()).toContain('is-start')
    expect(cell(wrapper, 3).classes()).toContain('is-end')
    expect(cell(wrapper, 6).classes()).toContain('is-start')
    expect(cell(wrapper, 10).classes()).toContain('is-end')
    expect(cell(wrapper, 8).classes()).toContain('is-in-range')
    expect(cell(wrapper, 4).classes()).not.toContain('is-in-range')
    expect(cell(wrapper, 5).classes()).not.toContain('is-in-range')

    wrapper.unmount()
  })

  it('不相邻的两段各自独立；补选中间空隙后自动合并为一段', async () => {
    const wrapper = mountPane([[d(2), d(10)]])

    // 12~13 号与 2~10 号不相邻，保持两段
    await clickCell(wrapper, 12)
    await clickCell(wrapper, 13)
    expect(emittedRanges(wrapper)).toEqual([
      ['2026-09-02', '2026-09-10'],
      ['2026-09-12', '2026-09-13'],
    ])

    // 补选 11~13：与 2~10 首尾相接（10+1=11）、与已有 12~13 重叠 → 合并为 2~13
    await wrapper.setProps({ ranges: emittedRanges(wrapper) as any })
    await clickCell(wrapper, 11)
    await clickCell(wrapper, 13)
    expect(emittedRanges(wrapper)).toEqual([['2026-09-02', '2026-09-13']])

    wrapper.unmount()
  })

  it('待配对状态下重复点击同一日：取消待配对，不上报', async () => {
    const wrapper = mountPane()
    await clickCell(wrapper, 2)
    expect(cell(wrapper, 2).classes()).toContain('is-start')
    await clickCell(wrapper, 2)
    expect(wrapper.emitted('update:ranges')).toBeUndefined()
    expect(cell(wrapper, 2).classes()).not.toContain('is-start')

    wrapper.unmount()
  })

  it('单日段：点段内唯一一天即整段移除', async () => {
    const wrapper = mountPane([[d(4), d(4)]])
    expect(cell(wrapper, 4).classes()).toContain('is-start')
    expect(cell(wrapper, 4).classes()).toContain('is-end')

    await clickCell(wrapper, 4)
    expect(emittedRanges(wrapper)).toEqual([])

    wrapper.unmount()
  })

  it('select 事件始终上报被点击的原始日期', async () => {
    const wrapper = mountPane()
    await clickCell(wrapper, 2)
    await clickCell(wrapper, 10)
    await clickCell(wrapper, 5)
    const selects = (wrapper.emitted('select') ?? []).map((args: any[]) => args[0])
    expect(selects.map((v: any) => v.date())).toEqual([2, 10, 5])

    wrapper.unmount()
  })
})
