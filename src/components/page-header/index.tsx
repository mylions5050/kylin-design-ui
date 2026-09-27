import { defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import './index.scss'

const [b, e] = createBem('k-page-header')

/**
 * PageHeader 页头 —— 声明页面的标题与层级入口，适合路径简单的页面。
 * 结构对齐 Element Plus 的 ElPageHeader：
 *  - 左侧区域（返回图标 + 标题）：点击任意位置触发 back 事件，由外部决定如何返回
 *  - 同一行依次为：左侧区域 | 竖分割线 | 主内容（flex 撑满） | #extra 右侧操作
 *  - #breadcrumb 插槽：需要展示完整层级时，用面包屑替代返回入口（置于页头最上方）
 *  - #content 插槽 / content 属性：页头主内容（与返回区同行，通常较醒目）
 *  - #default 插槽：页头下方的正文内容
 *  - icon 传空字符串可隐藏返回图标（icon=""），也可通过 #icon 插槽完全自定义
 *
 * 用法：<KPageHeader content="详情页" @back="router.back()">
 *         <template #extra><KButton>编辑</KButton></template>
 *       </KPageHeader>
 */
export default defineComponent({
  name: 'KPageHeader',
  props: {
    /** 返回图标（iconfont 名称）；传空字符串隐藏图标，iconfont 名不带 icon- 前缀 */
    icon: { type: String as PropType<string>, default: 'direction-left' },
    /** 左侧主标题文案（通常是"返回"或页面入口名称） */
    title: { type: String as PropType<string>, default: '返回' },
    /** 页头主内容文案；复杂内容建议用 #content 插槽 */
    content: { type: String as PropType<string>, default: '' },
  },
  emits: ['back'],
  setup(props, { emit, slots }) {
    const handleBack = () => {
      emit('back')
    }

    return () => (
      <div class={b()}>
        {slots.breadcrumb ? <div class={e('breadcrumb')}>{slots.breadcrumb()}</div> : null}
        <div class={e('header')}>
          <div class={e('left')} onClick={handleBack}>
            <div class={e('icon')}>
              {slots.icon
                ? slots.icon()
                : props.icon
                  ? <KIcon name={props.icon} size={16} />
                  : null}
            </div>
            <div class={e('title')}>{slots.title ? slots.title() : props.title}</div>
          </div>
          {/* 主内容与返回区同行，中间竖分割线由 __left::after 绘制（同 ElPageHeader） */}
          <div class={e('content')}>
            {slots.content ? slots.content() : props.content}
          </div>
          {slots.extra ? <div class={e('extra')}>{slots.extra()}</div> : null}
        </div>
        {slots.default ? <div class={e('main')}>{slots.default()}</div> : null}
      </div>
    )
  },
})
