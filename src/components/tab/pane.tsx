import { defineComponent } from 'vue'

/**
 * KTabPane —— KTab 的面板子组件。
 *
 * 作为 KTab 默认插槽中的子组件，KTab 会解析其 props（k / label / closable）用于渲染
 * 选项卡头，并在内容区通过 cloneVNode 注入 active 状态后渲染本组件。
 * 本组件负责包裹并展示自己的面板内容：active 为真时可见，为假时用 v-show 隐藏
 * （保留 DOM 与组件状态，避免每次切换都卸载/挂载导致表单、滚动、异步状态丢失）。
 */
export default defineComponent({
  name: 'KTabPane',
  props: {
    /** 唯一标识，受 KTab 的 v-model 约束 */
    k: { type: String, required: true },
    /** 选项卡头显示文案 */
    label: { type: String, default: '' },
    /** 是否可关闭（在选项卡头上显示关闭按钮） */
    closable: { type: Boolean, default: false },
    /** （由 KTab 注入，非对外使用）当前面板是否激活可见 */
    active: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () => (
      <div class="k-tab__pane" role="tabpanel" style={{ display: props.active ? undefined : 'none' }}>
        {slots.default?.()}
      </div>
    )
  },
})
