/**
 * KMessage — 全局消息提示
 *
 * 参考 Ant Design message：顶部居中浮层，白底 + 浅边框 + 浮层阴影，
 * 图标随 type 着色、内容为中性文字色；每条按内容自适应宽度。
 *
 * 通常不直接写模板，而是编程式调用：
 *   import { message } from '.../useMessage'
 *   message.success('已保存')
 * 页面里只需挂载一个 <KMessage /> 负责渲染队列。
 */
import { defineComponent, Teleport, TransitionGroup } from 'vue'
import { createBem } from '@/utils/create-bem'
import { useMessages } from './useMessage'
import type { MessageType } from './useMessage'
import KIcon from '@/components/icon/index'
import './index.scss'

const [b] = createBem('k-message')

/** type → iconfont 图标名（error 用圆圈 ×，loading 用旋转菊花） */
const ICON_MAP: Record<MessageType, string> = {
  success: 'success-filling',
  warning: 'warning-filling',
  info: 'prompt-filling',
  error: 'error',
  loading: 'loading',
}

export default defineComponent({
  name: 'KMessage',
  setup() {
    const { messages, dismiss } = useMessages()

    return () => (
      <Teleport to="body">
        <TransitionGroup
          name="k-message-anim"
          tag="div"
          {...({ class: b() } as any)}
        >
          {messages.value.map((m) => {
            // icon: undefined → 按 type 取默认图标；'' → 不显示图标；其余 → 自定义图标名
            const iconName = m.icon === '' ? '' : m.icon || ICON_MAP[m.type]
            return (
              <div
                key={m.id}
                class={[
                  'k-message__item',
                  `is-${m.type}`,
                  `is-${m.effect}`,
                  m.customClass,
                ]}
                onClick={() => m.onClick?.()}
              >
                {iconName !== '' && (
                  <span class={['k-message__icon', m.type === 'loading' && !m.icon && 'is-spinning']}>
                    <KIcon name={iconName} size={16} />
                  </span>
                )}
                <span class="k-message__content">{m.content}</span>
                {m.closable && (
                  <button
                    type="button"
                    class="k-message__close"
                    aria-label="Close"
                    onClick={(e: Event) => {
                      // 阻止冒泡，避免触发消息体的 onClick
                      e.stopPropagation()
                      dismiss(m.id)
                    }}
                  >
                    <KIcon name="close-bold" size={12} />
                  </button>
                )}
              </div>
            )
          })}
        </TransitionGroup>
      </Teleport>
    )
  },
})
