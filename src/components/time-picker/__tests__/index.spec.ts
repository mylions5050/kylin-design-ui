import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KTimePicker from '../index'
import dayjs from 'dayjs'

// 面板经 KPopper Teleport 到 body，清理 DOM 避免用例互相污染
const clearBody = () => {
  document.querySelectorAll('.k-time-picker__panel').forEach((el) => el.remove())
}

const openPanel = async (wrapper: any) => {
  // 防御性清理：避免上一个用例异常退出时残留面板污染当前用例
  clearBody()
  await wrapper.find('input').trigger('focus')
  await nextTick()
}

const findHourItems = () =>
  Array.from(
    document.querySelectorAll('.k-time-picker__col:nth-child(1) .k-time-picker__item'),
  )
const inputValue = () =>
  (document.querySelector('.k-time-picker .k-input__inner') as HTMLInputElement).value

describe('KTimePicker 基本渲染与即时模式', () => {
  it('默认不显示底部操作栏', async () => {
    const wrapper = mount(KTimePicker, {
      props: { modelValue: dayjs('2026-08-26 09:10:20') },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    expect(document.querySelector('.k-time-picker__footer')).toBeNull()
    expect(wrapper.find('input').attributes('placeholder')).toBe('选择时间')
    wrapper.unmount()
    clearBody()
  })

  it('即时模式：点选即时提交但面板不关，点完最后一列（秒）才关闭', async () => {
    const wrapper = mount(KTimePicker, {
      props: { modelValue: dayjs('2026-08-26 09:00:00') },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    // 点小时：即时提交，面板保持打开，输入框实时反映 14:00:00
    findHourItems().find((el) => el.textContent === '14')!.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(document.querySelector('.k-time-picker__panel')).not.toBeNull()
    expect(inputValue()).toBe('14:00:00')
    // 点秒（最后一列）：提交并关闭
    const secondItems = Array.from(
      document.querySelectorAll('.k-time-picker__col:nth-child(3) .k-time-picker__item'),
    )
    secondItems.find((el) => el.textContent === '30')!.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(2)
    expect(document.querySelector('.k-time-picker__panel')).toBeNull()
    // 测试未接 v-model，面板关闭后输入框回落显示 props 原值；提交值以 change 负载为准
    const changes = wrapper.emitted('change') as any[][]
    expect(changes[1][0].format('HH:mm:ss')).toBe('14:00:30')
    wrapper.unmount()
    clearBody()
  })

  it('format 控制渲染列：HH:mm 无秒列', async () => {
    const wrapper = mount(KTimePicker, {
      props: { format: 'HH:mm', modelValue: dayjs('2026-08-26 09:10:00') },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    const cols = document.querySelectorAll('.k-time-picker__col')
    expect(cols.length).toBe(2) // 时 + 分，无秒列
    wrapper.unmount()
    clearBody()
  })
})

describe('KTimePicker 手动确认模式（confirm）', () => {
  it('开启 confirm：显示底部栏“此刻 | 确认”，点选只改草稿不提交', async () => {
    const onChange = vi.fn()
    const wrapper = mount(KTimePicker, {
      props: { modelValue: dayjs('2026-08-26 09:00:00'), confirm: true, onChange },
      attachTo: document.body,
    })
    await openPanel(wrapper)

    // 底部栏存在，含“此刻”与“确认”
    const footer = document.querySelector('.k-time-picker__footer')!
    expect(footer).not.toBeNull()
    const btns = Array.from(footer.querySelectorAll('.k-btn')).map((b) => b.textContent.trim())
    expect(btns).toEqual(['此刻', '确认'])

    // 点选小时 14：不改草稿提交、不关闭，但草稿在输入框即时反馈
    findHourItems().find((el) => el.textContent === '14')!.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    await nextTick()
    expect(onChange).not.toHaveBeenCalled()
    expect(document.querySelector('.k-time-picker__panel')).not.toBeNull()
    expect(inputValue()).toBe('14:00:00')

    // 点“确认”才提交并关闭
    ;(footer.querySelectorAll('.k-btn')[1] as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    await nextTick()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(document.querySelector('.k-time-picker__panel')).toBeNull()

    wrapper.unmount()
    clearBody()
  })

  it('底部栏“此刻”：设为当前时刻草稿，点确认生效', async () => {
    const wrapper = mount(KTimePicker, {
      props: { modelValue: dayjs('2026-08-26 09:00:00'), confirm: true },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    const now = dayjs()
    const footer = document.querySelector('.k-time-picker__footer')!
    ;(footer.querySelectorAll('.k-btn')[0] as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    await nextTick()
    // confirm 下“此刻”只改草稿，面板不关、输入框呈现当前时刻
    expect(document.querySelector('.k-time-picker__panel')).not.toBeNull()
    expect(inputValue()).toBe(now.format('HH:mm:ss'))
    // 更新选中的同时，小时列应滚动到当前时刻所在项顶部（scrollTop = 时 * 项高32）
    const hourWrap = document.querySelectorAll('.scrollbar__wrap')[0] as HTMLElement
    expect(hourWrap.scrollTop).toBe(now.hour() * 32)
    wrapper.unmount()
    clearBody()
  })
})

describe('KTimePicker hover / 滚动预览', () => {
  it('hover 时输入框浅灰预览但不提交；离开面板清空', async () => {
    const onChange = vi.fn()
    const wrapper = mount(KTimePicker, {
      props: { modelValue: dayjs('2026-08-26 09:10:00'), onChange },
      attachTo: document.body,
    })
    await openPanel(wrapper)
    const hourItem14 = findHourItems().find((el) => el.textContent === '14')!
    hourItem14.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await nextTick()
    expect(inputValue()).toBe('14:10:00')
    expect(document.querySelector('.k-time-picker.is-previewing')).not.toBeNull()
    expect(onChange).not.toHaveBeenCalled()

    // 鼠标离开面板 → 预览清空，回到已提交值
    document.querySelector('.k-time-picker__panel')!.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true }),
    )
    await nextTick()
    expect(inputValue()).toBe('09:10:00')
    expect(document.querySelector('.k-time-picker.is-previewing')).toBeNull()

    wrapper.unmount()
    clearBody()
  })
})