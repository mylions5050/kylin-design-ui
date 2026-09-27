import { defineComponent, Teleport, TransitionGroup } from 'vue'
import { createBem } from '@/utils/create-bem'
import { useNotices } from './useNotice'
import type { NoticeItem, NoticeType } from './useNotice'
import KIcon from '@/components/icon/index'
import KButton from '@/components/button/index'
import iconSuccess from '@/assets/icons/notice-success.svg?url'
import iconError from '@/assets/icons/notice-error.svg?url'
import iconInfo from '@/assets/icons/notice-info.svg?url'
import iconWarning from '@/assets/icons/notice-warning.svg?url'
import iconLoading from '@/assets/icons/notice-loading.svg?url'
import './index.scss'

const [b, e, m, v] = createBem('notice')
const [containerB] = createBem('notice-container')

const DEFAULT_ICONS: Record<NoticeType, string> = {
  success: iconSuccess,
  error: iconError,
  info: iconInfo,
  warning: iconWarning,
  loading: iconLoading,
}

const iconFor = (n: NoticeItem) => n.icon ?? DEFAULT_ICONS[n.type]
const isBareIcon = (n: NoticeItem) => !!n.icon || n.type === 'loading'
const bareIconSize = (n: NoticeItem) => n.iconSize ?? (n.type === 'loading' ? 32 : 48)
const bareIconStyle = (n: NoticeItem) => ({
  width: `${bareIconSize(n)}px`,
  height: `${bareIconSize(n)}px`,
})

export default defineComponent({
  name: 'Notice',
  setup() {
    const { notices, dismiss, pause, resume } = useNotices()

    const onAction = (n: NoticeItem) => {
      n.action?.onClick?.()
      dismiss(n.id)
    }

    return () => (
      <Teleport to="body">
        {/* class is a fallthrough attr at runtime; TransitionGroup's JSX type
            doesn't list it, so pass it via a cast-typed spread. */}
        <TransitionGroup
          name="notice-anim"
          tag="div"
          {...({ class: containerB() } as any)}
        >
          {notices.value.map((n) => (
            <div
              key={n.id}
              class={[b(), v(n.type, true), n.class]}
              onMouseenter={() => pause(n.id)}
              onMouseleave={() => resume(n.id)}
            >
               <span class={[e('icon'), { [m('bare', true)]: isBareIcon(n) }]}>
                 {n.type === 'loading' ? (
                   // loading 状态使用 SVG 保持动画
                   <img
                     src={iconFor(n)}
                     alt=""
                     class={[e('icon-img'), { [m('spin', true)]: true }]}
                     style={bareIconStyle(n)}
                   />
                 ) : (
                   // 使用指定的图标字体
                   <KIcon
                     class={[e('icon-img'), { [m('spin', true)]: n.iconSpin }]}
                     name={n.type === 'success' ? 'select-bold' : 
                           n.type === 'error' ? 'close-bold' :
                           n.type === 'warning' ? 'warning' :
                           'prompt'}
                   />
                 )}
               </span>
              <div class={e('body')}>
                {n.message && <div class={e('message')}>{n.message}</div>}
                {n.description && <div class={e('description')}>{n.description}</div>}
              </div>
              {n.action && (
                <KButton
                  class={[e('action'), 'notice-action']}
                  type="primary"
                  size="mini"
                  onClick={() => onAction(n)}
                >
                  {n.action.label}
                </KButton>
              )}
              <button
                type="button"
                class={e('close')}
                aria-label="Close"
                onClick={() => dismiss(n.id)}
              >
                <KIcon name="close" class={e('close-icon')} />
              </button>
            </div>
          ))}
        </TransitionGroup>
      </Teleport>
    )
  },
})
