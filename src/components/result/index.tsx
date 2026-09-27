/**
 * KResult — 结果页
 *
 * 类似 Element Plus 的 Result：用于对用户的操作结果（成功 / 失败 / 警告 / 提示）
 * 做反馈展示，典型场景如支付成功页、404 页、无权限提示页等。
 *
 * 结构：图标（icon） → 主标题（title） → 副标题（subTitle） → 操作区（extra），
 * 四段均可通过同名插槽覆盖默认渲染；extra 通常放主/次按钮组。
 */
import { defineComponent, computed, type PropType } from "vue";
import { createBem } from "@/utils/create-bem";
import KIcon from "@/components/icon/index";
import "./index.scss";

const [b, e, m] = createBem("k-result");

export type KResultIcon = "success" | "warning" | "info" | "error";

/** 语义状态 → iconfont 图标名（带填充的圆底图标） */
const ICON_MAP: Record<KResultIcon, string> = {
  success: "success-filling",
  warning: "warning-filling",
  info: "prompt-filling",
  error: "error",
};

export default defineComponent({
  name: "KResult",
  props: {
    /** 图标类型：success / warning / info / error，也可用 icon 插槽完全自定义 */
    icon: { type: String as PropType<KResultIcon>, default: "info" },
    /** 主标题 */
    title: { type: String, default: undefined },
    /** 副标题（灰色说明文字） */
    subTitle: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    // 当前状态语义，供图标颜色 class 使用
    const status = computed<KResultIcon>(() => props.icon);

    // 图标区：icon 插槽 > 语义图标
    const renderIcon = () => {
      if (slots.icon) {
        return <div class={e("icon")}>{slots.icon()}</div>;
      }
      return (
        <div class={[e("icon"), m(status.value, true)]}>
          <KIcon name={ICON_MAP[props.icon]} size={56} />
        </div>
      );
    };

    // 主标题：title 插槽 > title prop
    const renderTitle = () => {
      const content = slots.title ? slots.title() : props.title;
      if (content == null) return null;
      return <div class={e("title")}>{content}</div>;
    };

    // 副标题：sub-title 插槽 > subTitle prop
    const renderSubTitle = () => {
      const content = slots["sub-title"] ? slots["sub-title"]() : props.subTitle;
      if (content == null) return null;
      return <div class={e("subtitle")}>{content}</div>;
    };

    return () => (
      <div class={b()}>
        {renderIcon()}
        {renderTitle()}
        {renderSubTitle()}
        {slots.extra ? <div class={e("extra")}>{slots.extra()}</div> : null}
      </div>
    );
  },
});
