import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  Teleport,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import { TEXT_COLORS, RECOMMENDED_COLORS, NO_BG, hexToRgbTriplet } from './colors'
import './index.scss'

const [b, e, m] = createBem('k-format-bar')

export type FormatCommand = 'bold' | 'italic' | 'underline' | 'strikeThrough'
type ColorCmd = 'foreColor' | 'hiliteColor'
type BlockTag = 'P' | 'H1' | 'H2' | 'H3' | 'H4'
type AlignCmd = 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'indent'
type ListCmd = 'insertOrderedList' | 'insertUnorderedList' | 'todo'

interface ColorSection {
  label: string
  cmd: ColorCmd
  colors: { label: string; value: string }[]
}

/**
 * KFormatBar —— 迷你富文本浮窗（选中文字后弹出）。
 *  T▾ 段落/标题 | B I U S | A▾ 颜色(文本/背景/推荐) | 链接 |
 *  align▾ 对齐/缩进 | list▾ 列表 | 代码 / 清除格式 / 复制 / 删除
 *
 * 传入 `target`（contentEditable 元素）：target 内有非折叠文字选区时浮窗定位在
 * 选区上方（空间不足则下方）居中并带小三角箭头。所有按钮 mousedown preventDefault +
 * stopPropagation（保选区、不冒泡到表格 useOutsideClick）。链接浮窗打开期间 update() 跳过。
 */
export default defineComponent({
  name: 'KFormatBar',
  props: {
    target: { type: Object as PropType<HTMLElement | null>, default: null },
  },
  setup(props) {
    const visible = ref(false)
    const top = ref(0)
    const left = ref(0)
    const below = ref(false)
    const blockOpen = ref(false)
    const colorOpen = ref(false)
    const linkOpen = ref(false)
    const alignOpen = ref(false)
    const listOpen = ref(false)
    const currentBlock = ref<BlockTag>('P')
    const currentColor = ref('')
    const currentBg = ref('')
    const aColor = ref('')
    const active = ref<Record<FormatCommand, boolean>>({
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
    })
    const alignStates = ref({
      justifyLeft: true,
      justifyCenter: false,
      justifyRight: false,
    })
    const listStates = ref({
      insertOrderedList: false,
      insertUnorderedList: false,
    })
    // 链接浮窗：存档选区（输入框聚焦会丢选区，确认时恢复）
    const savedRange = ref<Range | null>(null)
    const linkText = ref('')
    const linkUrl = ref('')

    const buttons: {
      cmd: FormatCommand
      cls: string
      label: string
      title: string
    }[] = [
      { cmd: 'bold', cls: 'bold', label: 'B', title: '加粗' },
      { cmd: 'italic', cls: 'italic', label: 'I', title: '斜体' },
      { cmd: 'underline', cls: 'underline', label: 'U', title: '下划线' },
      { cmd: 'strikeThrough', cls: 'strike', label: 'S', title: '删除线' },
    ]

    const blockOptions: { tag: BlockTag; label: string }[] = [
      { tag: 'P', label: '文本' },
      { tag: 'H1', label: '标题 1' },
      { tag: 'H2', label: '标题 2' },
      { tag: 'H3', label: '标题 3' },
      { tag: 'H4', label: '标题 4' },
    ]

    const colorSections: ColorSection[] = [
      { label: '文本', cmd: 'foreColor', colors: TEXT_COLORS },
      {
        label: '背景',
        cmd: 'hiliteColor',
        colors: [NO_BG, ...TEXT_COLORS.slice(1)],
      },
      { label: '推荐', cmd: 'foreColor', colors: RECOMMENDED_COLORS },
    ]

    const alignOptions: { cmd: AlignCmd; label: string }[] = [
      { cmd: 'justifyLeft', label: '左对齐' },
      { cmd: 'justifyCenter', label: '居中对齐' },
      { cmd: 'justifyRight', label: '右对齐' },
      { cmd: 'indent', label: '增加缩进' },
    ]

    const listOptions: { cmd: ListCmd; label: string }[] = [
      { cmd: 'insertOrderedList', label: '有序列表' },
      { cmd: 'insertUnorderedList', label: '无序列表' },
      { cmd: 'todo', label: '待办事项清单' },
    ]

    // 末尾单动作按钮（图标来自 iconfont）
    const actionButtons: {
      key: string
      icon: string
      title: string
      run: () => void
    }[] = []

    function belongs(node: Node | null): boolean {
      const t = props.target
      return !!t && !!node && t.contains(node)
    }

    function syncState() {
      try {
        active.value.bold = document.queryCommandState('bold')
        active.value.italic = document.queryCommandState('italic')
        active.value.underline = document.queryCommandState('underline')
        active.value.strikeThrough = document.queryCommandState('strikeThrough')
        const blk = (document.queryCommandValue('formatBlock') || '')
          .toUpperCase()
          .replace(/[<>]/g, '')
        currentBlock.value = (
          ['P', 'H1', 'H2', 'H3', 'H4'].includes(blk) ? blk : 'P'
        ) as BlockTag
        currentColor.value = document.queryCommandValue('foreColor') || ''
        currentBg.value = document.queryCommandValue('hiliteColor') || ''
        aColor.value =
          TEXT_COLORS.find((c) =>
            currentColor.value.includes(hexToRgbTriplet(c.value)),
          )?.value ?? ''
        alignStates.value.justifyLeft = document.queryCommandState('justifyLeft')
        alignStates.value.justifyCenter = document.queryCommandState('justifyCenter')
        alignStates.value.justifyRight = document.queryCommandState('justifyRight')
        listStates.value.insertOrderedList =
          document.queryCommandState('insertOrderedList')
        listStates.value.insertUnorderedList =
          document.queryCommandState('insertUnorderedList')
      } catch {
        /* queryCommand* 在无选区时可能抛错，忽略 */
      }
    }

    function update() {
      // 链接浮窗打开期间保持显示（输入框聚焦会让选区离开 target）
      if (linkOpen.value) return
      blockOpen.value = false
      colorOpen.value = false
      alignOpen.value = false
      listOpen.value = false
      const t = props.target
      if (!t) {
        visible.value = false
        return
      }
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        visible.value = false
        return
      }
      const range = sel.getRangeAt(0)
      if (!belongs(range.commonAncestorContainer)) {
        visible.value = false
        return
      }
      const rect = range.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        visible.value = false
        return
      }
      const above = rect.top > 44
      below.value = !above
      top.value = above ? rect.top - 6 : rect.bottom + 6
      left.value = rect.left + rect.width / 2
      syncState()
      visible.value = true
    }

    function execAndUpd(cmd: string) {
      document.execCommand(cmd)
      update()
    }

    function applyBlock(tag: BlockTag) {
      document.execCommand('formatBlock', false, tag)
      blockOpen.value = false
      update()
    }
    function applyColor(cmd: ColorCmd, value: string) {
      document.execCommand(cmd, false, value)
      colorOpen.value = false
      update()
    }
    function applyAlign(cmd: AlignCmd) {
      document.execCommand(cmd)
      alignOpen.value = false
      update()
    }
    function applyList(cmd: ListCmd) {
      if (cmd === 'todo') {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return
        const range = sel.getRangeAt(0)
        const text = sel.toString()
        const ul = document.createElement('ul')
        ul.style.cssText = 'list-style:none;padding-left:0;margin:0'
        const li = document.createElement('li')
        const cb = document.createElement('input')
        cb.type = 'checkbox'
        li.appendChild(cb)
        li.appendChild(document.createTextNode(' ' + text))
        ul.appendChild(li)
        range.deleteContents()
        range.insertNode(ul)
        sel.removeAllRanges()
        props.target?.dispatchEvent(new Event('input', { bubbles: true }))
      } else {
        document.execCommand(cmd)
        props.target?.dispatchEvent(new Event('input', { bubbles: true }))
      }
      listOpen.value = false
      update()
    }
    function applyCode() {
      // 需选中文字：无选区不操作
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return
      const range = sel.getRangeAt(0)
      const code = document.createElement('code')
      code.appendChild(range.extractContents())
      range.insertNode(code)
      sel.removeAllRanges()
      const r = document.createRange()
      r.selectNodeContents(code)
      sel.addRange(r)
      props.target?.dispatchEvent(new Event('input', { bubbles: true }))
      update()
    }
    function applyClearFormat() {
      document.execCommand('removeFormat')
      document.execCommand('unlink')
      update()
    }
    function applyCopy() {
      const sel = window.getSelection()
      const text = sel ? sel.toString() : ''
      // 直接写剪贴板，避免触发表格层 onCopy（那是单元格 TSV，不是文字选区）
      navigator.clipboard?.writeText(text).catch(() => {})
    }
    function applyDelete() {
      document.execCommand('delete')
      update()
    }

    function toggleBlock() {
      colorOpen.value = false
      linkOpen.value = false
      alignOpen.value = false
      listOpen.value = false
      blockOpen.value = !blockOpen.value
    }
    function toggleColor() {
      blockOpen.value = false
      linkOpen.value = false
      alignOpen.value = false
      listOpen.value = false
      colorOpen.value = !colorOpen.value
    }
    function toggleAlign() {
      blockOpen.value = false
      colorOpen.value = false
      linkOpen.value = false
      listOpen.value = false
      alignOpen.value = !alignOpen.value
    }
    function toggleList() {
      blockOpen.value = false
      colorOpen.value = false
      linkOpen.value = false
      alignOpen.value = false
      listOpen.value = !listOpen.value
    }
    function toggleLink() {
      if (linkOpen.value) {
        linkOpen.value = false
        return
      }
      blockOpen.value = false
      colorOpen.value = false
      alignOpen.value = false
      listOpen.value = false
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        savedRange.value = sel.getRangeAt(0).cloneRange()
        linkText.value = sel.toString()
      } else {
        savedRange.value = null
        linkText.value = ''
      }
      linkUrl.value = ''
      linkOpen.value = true
    }
    function confirmLink() {
      const url = linkUrl.value.trim()
      if (!url) return // 链接必填
      const text = linkText.value
      const r = savedRange.value
      // 焦点回到 contentEditable（输入框曾获焦），恢复存档选区，用 Range 包 <a>
      props.target?.focus()
      const sel = window.getSelection()
      if (r && sel) {
        sel.removeAllRanges()
        sel.addRange(r)
        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
        a.textContent = text
        r.deleteContents()
        r.insertNode(a)
        sel.removeAllRanges()
        const nr = document.createRange()
        nr.selectNodeContents(a)
        sel.addRange(nr)
        props.target?.dispatchEvent(new Event('input', { bubbles: true }))
      }
      linkOpen.value = false
      update()
    }
    function cancelLink() {
      linkOpen.value = false
      update()
    }
    function isColorActive(cmd: ColorCmd, value: string): boolean {
      if (value === 'transparent') return false
      const cur = cmd === 'foreColor' ? currentColor.value : currentBg.value
      if (!cur) return false
      return cur.includes(hexToRgbTriplet(value))
    }

    // 末尾动作按钮（在函数定义后填充，引用上面的 apply*）
    actionButtons.push(
      { key: 'code', icon: 'code', title: '标记为代码', run: applyCode },
      { key: 'clear', icon: 'close-bold', title: '清除格式', run: applyClearFormat },
      { key: 'copy', icon: 'copy', title: '复制', run: applyCopy },
      { key: 'delete', icon: 'delete', title: '删除', run: applyDelete },
    )

    function onScrollResize() {
      if (visible.value) update()
    }

    onMounted(() => {
      document.addEventListener('selectionchange', update)
      window.addEventListener('scroll', onScrollResize, true)
      window.addEventListener('resize', onScrollResize)
    })
    onUnmounted(() => {
      document.removeEventListener('selectionchange', update)
      window.removeEventListener('scroll', onScrollResize, true)
      window.removeEventListener('resize', onScrollResize)
    })
    watch(() => props.target, update)

    return () => {
      if (!visible.value) return null
      return (
        <Teleport to="body">
          <div
            class={[b(), below.value && 'is-below']}
            style={{ top: `${top.value}px`, left: `${left.value}px` }}
            onMousedown={(ev: MouseEvent) => {
              ev.preventDefault()
              ev.stopPropagation()
            }}
          >
            {/* T：段落/标题下拉 */}
            <div class={e('block')}>
              <button
                class={[e('btn'), m('wide', true)]}
                title="段落 / 标题"
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  toggleBlock()
                }}
              >
                <span>T</span>
                <span class={e('caret')}>▾</span>
              </button>
              {blockOpen.value && (
                <div class={e('menu')}>
                  {blockOptions.map((opt) => (
                    <button
                      key={opt.tag}
                      class={[
                        e('menu-item'),
                        m('active', currentBlock.value === opt.tag),
                      ]}
                      onMousedown={(ev: MouseEvent) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        applyBlock(opt.tag)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span class={e('sep')} />
            {/* B / I / U / S */}
            {buttons.map((btn) => (
              <button
                key={btn.cmd}
                class={[e('btn'), m('active', active.value[btn.cmd])]}
                title={btn.title}
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  execAndUpd(btn.cmd)
                }}
              >
                <span class={e(btn.cls)}>{btn.label}</span>
              </button>
            ))}
            <span class={e('sep')} />
            {/* A：文字颜色下拉（文本 / 背景 / 推荐） */}
            <div class={e('block')}>
              <button
                class={[e('btn'), m('wide', true)]}
                title="文字颜色"
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  toggleColor()
                }}
              >
                <span style={{ color: aColor.value || undefined }}>A</span>
                <span class={e('caret')}>▾</span>
              </button>
              {colorOpen.value && (
                <div class={[e('menu'), m('color', true)]}>
                  {colorSections.map((sec) => (
                    <div key={sec.label} class={e('color-section')}>
                      <div class={e('color-label')}>{sec.label}</div>
                      <div class={e('color-grid')}>
                        {sec.colors.map((opt) => (
                          <button
                            key={sec.label + opt.value}
                            class={[
                              e('swatch'),
                              opt.value === 'transparent' && 'is-transparent',
                              m('active', isColorActive(sec.cmd, opt.value)),
                            ]}
                            style={{ background: opt.value }}
                            title={opt.label}
                            onMousedown={(ev: MouseEvent) => {
                              ev.preventDefault()
                              ev.stopPropagation()
                              applyColor(sec.cmd, opt.value)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span class={e('sep')} />
            {/* 链接浮窗 */}
            <div class={e('block')}>
              <button
                class={e('btn')}
                title="插入链接"
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  toggleLink()
                }}
              >
                <KIcon name="link" size={14} />
              </button>
              {linkOpen.value && (
                <div
                  class={e('link-popover')}
                  onMousedown={(ev: MouseEvent) => ev.stopPropagation()}
                >
                  <label class={e('link-field')}>
                    <span class={e('link-label')}>文本</span>
                    <input
                      class={e('link-input')}
                      value={linkText.value}
                      onInput={(ev: Event) => {
                        linkText.value = (ev.target as HTMLInputElement).value
                      }}
                    />
                  </label>
                  <label class={e('link-field')}>
                    <span class={e('link-label')}>链接</span>
                    <input
                      class={e('link-input')}
                      value={linkUrl.value}
                      placeholder="https://"
                      onInput={(ev: Event) => {
                        linkUrl.value = (ev.target as HTMLInputElement).value
                      }}
                    />
                  </label>
                  <div class={e('link-actions')}>
                    <button
                      class={[e('link-btn'), e('link-btn--default')]}
                      onMousedown={(ev: MouseEvent) => ev.stopPropagation()}
                      onClick={() => cancelLink()}
                    >
                      取消
                    </button>
                    <button
                      class={[e('link-btn'), e('link-btn--primary')]}
                      disabled={!linkUrl.value.trim()}
                      onMousedown={(ev: MouseEvent) => ev.stopPropagation()}
                      onClick={() => confirmLink()}
                    >
                      确认
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span class={e('sep')} />
            {/* 对齐方式下拉 */}
            <div class={e('block')}>
              <button
                class={[e('btn'), m('wide', true)]}
                title="对齐方式"
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  toggleAlign()
                }}
              >
                <span class={e('align-icon')}>
                  <span class={e('align-line')} style={{ width: '100%' }} />
                  <span class={e('align-line')} style={{ width: '65%' }} />
                  <span class={e('align-line')} style={{ width: '82%' }} />
                </span>
                <span class={e('caret')}>▾</span>
              </button>
              {alignOpen.value && (
                <div class={e('menu')}>
                  {alignOptions.map((opt) => (
                    <button
                      key={opt.cmd}
                      class={[
                        e('menu-item'),
                        m(
                          'active',
                          opt.cmd !== 'indent' &&
                            alignStates.value[
                              opt.cmd as 'justifyLeft' | 'justifyCenter' | 'justifyRight'
                            ],
                        ),
                      ]}
                      onMousedown={(ev: MouseEvent) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        applyAlign(opt.cmd)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span class={e('sep')} />
            {/* 列表下拉：有序/无序/待办，默认不选 */}
            <div class={e('block')}>
              <button
                class={[e('btn'), m('wide', true)]}
                title="列表"
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  toggleList()
                }}
              >
                <KIcon name="menu" size={14} />
                <span class={e('caret')}>▾</span>
              </button>
              {listOpen.value && (
                <div class={e('menu')}>
                  {listOptions.map((opt) => (
                    <button
                      key={opt.cmd}
                      class={[
                        e('menu-item'),
                        m(
                          'active',
                          opt.cmd !== 'todo' &&
                            listStates.value[
                              opt.cmd as 'insertOrderedList' | 'insertUnorderedList'
                            ],
                        ),
                      ]}
                      onMousedown={(ev: MouseEvent) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        applyList(opt.cmd)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span class={e('sep')} />
            {/* 代码 / 清除格式 / 复制 / 删除 */}
            {actionButtons.map((ab) => (
              <button
                key={ab.key}
                class={e('btn')}
                title={ab.title}
                onMousedown={(ev: MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  ab.run()
                }}
              >
                <KIcon name={ab.icon} size={14} />
              </button>
            ))}
          </div>
        </Teleport>
      )
    }
  },
})
