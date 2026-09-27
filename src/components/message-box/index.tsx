/**
 * KMessageBox — 消息弹框（组合组件）
 *
 * 参考 Element Plus MessageBox：在 KDialog 之上组合出「图标 + 内容 + 可选输入框」
 * 的确认/提醒弹框形态，底部按钮直接复用 KDialog 内置的 footer
 * （showCancel / confirmText / cancelText / confirmLoading）。
 *
 * 两种用法：
 * 1. 模板受控用法：v-model 控制显隐，监听 confirm / cancel 事件；
 * 2. 编程式用法：import { messageBox } 后调用 messageBox.alert / confirm / prompt，
 *    返回 Promise（见 useMessageBox.ts）。
 */
import { defineComponent, ref, computed, watch, type PropType, type VNode } from "vue";
import { createBem } from "@/utils/create-bem";
import KDialog from "@/components/dialog/index";
import type { KOverlayMaskType } from "@/components/overlay/index";
import KIcon from "@/components/icon/index";
import KInput from "@/components/input/index";
import "./index.scss";

const [b, e, m] = createBem("k-message-box");

export type KMessageBoxIcon = "success" | "warning" | "info" | "error";

/** 语义状态 → iconfont 图标名 */
const ICON_MAP: Record<KMessageBoxIcon, string> = {
  success: "success-filling",
  warning: "warning-filling",
  info: "prompt-filling",
  error: "error",
};

export default defineComponent({
  name: "KMessageBox",
  props: {
    /** 显隐（v-model） */
    modelValue: { type: Boolean, default: false },
    /** 标题（转发给 KDialog，默认「提示」） */
    title: { type: String, default: "提示" },
    /** 内容：纯文本或 VNode */
    message: { type: [String, Object] as PropType<string | VNode>, default: "" },
    /** 语义图标；不传不显示（传 '' 同样隐藏） */
    icon: { type: String as PropType<KMessageBoxIcon | "">, default: undefined },
    /** 是否显示取消按钮（alert 形态不需要） */
    showCancel: { type: Boolean, default: false },
    /** 确定按钮文案 */
    confirmText: { type: String, default: "确 定" },
    /** 取消按钮文案 */
    cancelText: { type: String, default: "取 消" },
    /** 确定按钮 loading（转发 KDialog） */
    confirmLoading: { type: Boolean, default: false },
    /** 是否显示输入框（prompt 形态） */
    showInput: { type: Boolean, default: false },
    /** 输入框初始值 */
    inputValue: { type: String, default: "" },
    /** 输入框 placeholder */
    inputPlaceholder: { type: String, default: "" },
    /** 输入框类型 */
    inputType: {
      type: String as PropType<"text" | "password" | "textarea" | "number">,
      default: "text",
    },
    /** 输入校验函数：返回 true / undefined 合法；返回 string 为错误文案 */
    inputValidator: {
      type: Function as PropType<(value: string) => boolean | string>,
      default: undefined,
    },
    /** 弹框宽度 */
    width: { type: String, default: "420px" },
    /** 点击遮罩是否关闭（默认 true，与 Dialog 一致；传 false 可防误触） */
    closeOnClickOverlay: { type: Boolean, default: true },
    /** 遮罩类型：dimmed 暗色（默认）/ blur 毛玻璃（透传 KDialog → KOverlay） */
    maskType: { type: String as PropType<KOverlayMaskType>, default: "dimmed" },
    /** ESC 是否关闭 */
    closeOnPressEscape: { type: Boolean, default: true },
    /** 自定义 class（追加到 k-message-box 上） */
    customClass: { type: String, default: undefined },
  },
  // confirm 事件参数：showInput 时为输入值，否则为空字符串
  emits: ["update:modelValue", "confirm", "cancel", "closed"],

  setup(props, { emit }) {
    // 输入框内部值：打开时用 props.inputValue 重置
    const innerValue = ref(props.inputValue);
    watch(
      () => props.modelValue,
      (v) => {
        if (v) innerValue.value = props.inputValue;
      },
    );

    // 校验结果：空串 = 合法；非空 = 错误文案（实时校验，非法时禁用确定按钮）
    const validationError = computed(() => {
      if (!props.showInput || !props.inputValidator) return "";
      const r = props.inputValidator(innerValue.value);
      if (typeof r === "string") return r;
      return r ? "" : "输入不合法";
    });

    const handleConfirm = () => {
      if (validationError.value) return;
      emit("confirm", innerValue.value);
    };

    return () => (
      <KDialog
        modelValue={props.modelValue}
        title={props.title}
        width={props.width}
        showCancel={props.showCancel}
        confirmText={props.confirmText}
        cancelText={props.cancelText}
        confirmLoading={props.confirmLoading}
        confirmDisabled={!!validationError.value}
        closeOnClickOverlay={props.closeOnClickOverlay}
        maskType={props.maskType}
        closeOnPressEscape={props.closeOnPressEscape}
        customClass={[b(), props.customClass].filter(Boolean).join(" ") || undefined}
        onUpdate:modelValue={(v: boolean) => {
          if (!v) emit("update:modelValue", false);
        }}
        onConfirm={handleConfirm}
        onCancel={() => emit("cancel")}
        onClosed={() => emit("closed")}
      >
        {/* 内容区：语义图标 + 消息文本 */}
        <div class={e("body")}>
          {props.icon && (
            <span class={[e("icon"), m(props.icon, true)]}>
              <KIcon name={ICON_MAP[props.icon as KMessageBoxIcon]} size={22} />
            </span>
          )}
          <div class={e("content")}>{props.message}</div>
        </div>

        {/* prompt 形态：可选输入框 + 校验错误文案 */}
        {props.showInput && (
          <div class={e("input-wrap")}>
            <KInput
              modelValue={innerValue.value}
              onUpdate:modelValue={(v: string) => (innerValue.value = v)}
              type={props.inputType}
              placeholder={props.inputPlaceholder}
            />
            {validationError.value && <p class={e("input-error")}>{validationError.value}</p>}
          </div>
        )}
      </KDialog>
    );
  },
});
