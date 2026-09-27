import { defineComponent, type PropType } from "vue";
import { createBem } from "@/utils/create-bem";
import "./index.scss";

const [b, e, m, v] = createBem("k-card");

export type CardShadow = "always" | "hover" | "never";
export type CardSize = "small" | "default" | "large";

export default defineComponent({
  name: "KCard",
  props: {
    /** 卡片标题（也可以通过 #header slot 自定义） */
    header: { type: String, default: undefined },
    /** 卡片页脚（也可以通过 #footer slot 自定义） */
    footer: { type: String, default: undefined },
    /** body 的 CSS 样式 */
    bodyStyle: { type: Object as PropType<Record<string, string>>, default: undefined },
    /** header 自定义类名 */
    headerClass: { type: String, default: undefined },
    /** body 自定义类名 */
    bodyClass: { type: String, default: undefined },
    /** footer 自定义类名 */
    footerClass: { type: String, default: undefined },
    /** 阴影显示时机 */
    shadow: { type: String as PropType<CardShadow>, default: "always" },
    /** 尺寸：small / default / large，主要影响内边距 */
    size: { type: String as PropType<CardSize>, default: "default" },
    /** 是否显示边框 */
    border: { type: Boolean, default: false },
    /** 自定义类名 */
    customClass: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const hasHeader = !!props.header || !!slots.header;
    const hasFooter = !!props.footer || !!slots.footer;

    return () => (
      <div class={[b(), v(props.shadow, props.shadow !== "never"), v(props.size, props.size !== "default"), m("border", props.border), props.customClass]}>
        {/* 头部 */}
        {hasHeader && (
          <div class={[e("header"), props.headerClass]}>
            {slots.header?.() ?? props.header}
          </div>
        )}

        {/* 主体 */}
        <div class={[e("body"), props.bodyClass]} style={props.bodyStyle}>
          {slots.default?.()}
        </div>

        {/* 底部 */}
        {hasFooter && (
          <div class={[e("footer"), props.footerClass]}>
            {slots.footer?.() ?? props.footer}
          </div>
        )}
      </div>
    );
  },
});