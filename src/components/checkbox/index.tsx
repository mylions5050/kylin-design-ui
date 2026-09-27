import { defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import './index.scss'

const [b, e, m] = createBem('k-checkbox')

/**
 * KCheckbox —— 通用三态复选框。
 *
 * API 从 vue3-ts-app 现有 Table / KSupTable 的多选逻辑反推：
 *  - `checked`：是否选中
 *  - `indeterminate`：半选态（表头"全选"在部分选中时）
 *  - `disabled`：禁用
 *  - `size`：方框尺寸（px 数字或任意 CSS 尺寸字符串）
 *  - `change` / `update:checked`：点击切换，emit 新的 checked
 *  - default 插槽：标签文字（不传则只渲染方框，表格场景常用）
 *
 * 勾选图标用 iconfont `select-bold`，半选用 `minus-bold`（currentColor 跟随方框 color）。
 * 颜色取 --k-color-* token。点击会 stopPropagation，避免在表格行里冒泡触发行点击。
 */
export default defineComponent({
  name: 'KCheckbox',
  props: {
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 16,
    },
  },
  emits: ['change', 'update:checked'],
  setup(props, { slots, emit }) {
    function toggle() {
      if (props.disabled) return
      // 半选 → 点击变为选中；否则切换
      const next = props.indeterminate ? true : !props.checked
      emit('update:checked', next)
      emit('change', next)
    }
    return () => {
      const px =
        typeof props.size === 'number' ? `${props.size}px` : props.size
      // 图标比方框小 2px，留出边框余量
      const iconSize =
        typeof props.size === 'number' ? props.size - 2 : props.size
      return (
        <span
          class={[
            b(),
            m('checked', props.checked),
            m('indeterminate', props.indeterminate),
            m('disabled', props.disabled),
          ]}
          role="checkbox"
          aria-checked={props.indeterminate ? 'mixed' : props.checked}
          aria-disabled={props.disabled}
          tabindex={props.disabled ? -1 : 0}
          onClick={(ev: MouseEvent) => {
            ev.stopPropagation()
            toggle()
          }}
          onKeydown={(ev: KeyboardEvent) => {
            if (props.disabled) return
            if (ev.key === ' ' || ev.key === 'Enter') {
              ev.preventDefault()
              ev.stopPropagation()
              toggle()
            }
          }}
        >
          <span class={e('box')} style={{ width: px, height: px }}>
            {props.checked ? (
              <KIcon name="select-bold" size={iconSize} />
            ) : props.indeterminate ? (
              <KIcon name="minus-bold" size={iconSize} />
            ) : null}
          </span>
          {slots.default?.()}
        </span>
      )
    }
  },
})
