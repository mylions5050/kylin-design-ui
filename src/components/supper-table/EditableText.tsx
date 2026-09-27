import { defineComponent, ref, watch, onMounted } from 'vue'
import './EditableText.scss'
import { createBem } from '../../utils/createBem'
import { ARROW_DIR } from './constants'
import type { NavDirection } from './types'
import KFormatBar from '@/components/format-bar/index'

const b = createBem('cell-text')

export default defineComponent({
  name: 'EditableText',
  props: {
    value: { type: String, default: '' },
    rowId: { type: Number, required: true },
    col: { type: Number, required: true },
    active: { type: Boolean, default: false },
    /** 文本列开启富文本：contentEditable=true + innerHTML 同步 + 选中文字弹 KFormatBar */
    richText: { type: Boolean, default: false },
  },
  emits: {
    edit: (_value: string) => true,
    navigate: (_dir: NavDirection) => true,
    focus: () => true,
    enter: () => true,
  },
  setup(props, { emit }) {
    const el = ref<HTMLDivElement | null>(null)
    // false = select mode (cell selected, no caret, typing overwrites)
    // true  = edit mode (caret visible, typing inserts)
    const editing = ref(false)

    function setContent(node: HTMLElement, v: string) {
      if (props.richText) node.innerHTML = v
      else node.textContent = v
    }
    function getContent(node: HTMLElement): string {
      return props.richText ? node.innerHTML : (node.textContent ?? '')
    }

    onMounted(() => {
      const node = el.value
      if (!node) return
      node.contentEditable = props.richText ? 'true' : 'plaintext-only'
      setContent(node, props.value)
    })

    watch(
      () => props.value,
      (v) => {
        const node = el.value
        if (node && document.activeElement !== node && getContent(node) !== v) {
          setContent(node, v)
        }
      },
    )

    function placeCaretAtEnd(node: HTMLElement) {
      const range = document.createRange()
      range.selectNodeContents(node)
      range.collapse(false)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }

    function onFocus() {
      editing.value = false
      emit('focus')
    }
    function onDblclick(e: MouseEvent) {
      e.preventDefault()
      editing.value = true
      const node = el.value
      if (node) placeCaretAtEnd(node)
    }
    function onKeydown(e: KeyboardEvent) {
      // let the IME (Chinese/Japanese/...) handle its own composition,
      // otherwise the first pinyin key gets inserted as a stray char
      if (e.isComposing || e.keyCode === 229) return
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          // Shift+Enter：编辑态插 <br> 换行；select 模式忽略
          if (editing.value) {
            e.preventDefault()
            insertBr()
          }
          return
        }
        e.preventDefault()
        if (editing.value) emit('enter')
        return
      }
      if (editing.value) {
        // 编辑态：按键不冒泡到表格层，避免 Delete/Backspace 被表格误清整格
        e.stopPropagation()
        return
      }
      // select mode: arrow keys move between cells
      const dir = ARROW_DIR[e.key]
      if (dir) {
        e.preventDefault()
        emit('navigate', dir)
        return
      }
      // select mode: a printable char overwrites the whole content
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        const node = el.value
        if (node) {
          node.textContent = e.key
          placeCaretAtEnd(node)
          emit('edit', e.key)
          editing.value = true
        }
      }
    }
    function onInput() {
      editing.value = true
      const node = el.value
      if (node) emit('edit', getContent(node))
    }
    function onBlur() {
      editing.value = false
    }
    // select 模式下点击单元格内的 <a>：新标签打开链接；编辑态则正常进光标编辑
    function onLinkClick(e: MouseEvent) {
      if (editing.value) return
      const t = e.target
      if (t instanceof Element) {
        const a = t.closest('a')
        if (a && a.href) {
          e.preventDefault()
          window.open(a.href, '_blank')
        }
      }
    }
    // Shift+Enter：插入 <br> 换行（仅编辑态）；单元格高度 auto 会自动撑高
    function insertBr() {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) return
      const range = sel.getRangeAt(0)
      range.deleteContents()
      const br = document.createElement('br')
      range.insertNode(br)
      // Chrome 末尾 <br> 不渲染空行（光标看似没换行）：紧跟一个零宽空格
      // 锚定光标到新行（不可见），一次 Shift+Enter 即可见换行
      const zws = document.createTextNode('​')
      br.after(zws)
      range.setStartBefore(zws)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      el.value?.dispatchEvent(new Event('input', { bubbles: true }))
    }

    return () => (
      <>
        <div
          ref={el}
          class={[b.b, editing.value && b.m('editing'), props.active && b.m('active')]}
          data-row={props.rowId}
          data-col={props.col}
          spellcheck={false}
          onMousedown={(e: MouseEvent) => {
            if (editing.value) e.stopPropagation()
          }}
          onClick={onLinkClick}
          onFocus={onFocus}
          onDblclick={onDblclick}
          onKeydown={onKeydown}
          onInput={onInput}
          onBlur={onBlur}
        />
        {props.richText && <KFormatBar target={el.value} />}
      </>
    )
  },
})
