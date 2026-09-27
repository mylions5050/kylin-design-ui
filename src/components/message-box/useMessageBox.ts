/**
 * useMessageBox — KMessageBox 的编程式调用
 *
 * 参考 Element Plus MessageBox 的 Promise 用法：
 *   messageBox.confirm('确认删除？').then(...).catch(...)
 *   messageBox.prompt('请输入名称', { inputValidator }).then(({ value }) => ...)
 *
 * Promise 语义（与 EP 一致）：
 * - 确认：alert / confirm resolve('confirm')；prompt resolve({ value })
 * - 取消按钮：reject('cancel')
 * - 关闭按钮 / ESC / 遮罩：reject('close')
 *
 * 单实例：同时只保留一个弹框，新调用会关闭旧的（reject('close')）。
 */
import { createApp, h, ref } from "vue";
import type { VNode } from "vue";
import KMessageBox from "./index";
import type { KMessageBoxIcon } from "./index";
import type { KOverlayMaskType } from "@/components/overlay/index";

export interface MessageBoxOptions {
  /** 标题，默认「提示」 */
  title?: string;
  /** 内容：纯文本或 VNode */
  message?: string | VNode;
  /** 语义图标：success / warning / info / error；不传不显示 */
  icon?: KMessageBoxIcon | "";
  /** 取消按钮文案 */
  cancelText?: string;
  /** 确定按钮文案 */
  confirmText?: string;
  /** 点击遮罩是否关闭，默认 true */
  closeOnClickOverlay?: boolean;
  /** 遮罩类型：dimmed 暗色（默认）/ blur 毛玻璃 */
  maskType?: KOverlayMaskType;
  /** ESC 是否关闭，默认 true */
  closeOnPressEscape?: boolean;
  /** 自定义 class */
  customClass?: string;
  /** 输入框初始值（prompt） */
  inputValue?: string;
  /** 输入框 placeholder（prompt） */
  inputPlaceholder?: string;
  /** 输入框类型（prompt） */
  inputType?: "text" | "password" | "textarea" | "number";
  /** 输入校验函数（prompt）：返回 true/undefined 合法；返回 string 为错误文案 */
  inputValidator?: (value: string) => boolean | string;
}

/** 当前实例的关闭句柄（供 messageBox.close() 使用） */
let activeClose: (() => void) | null = null;

function show(
  options: MessageBoxOptions,
  base: { showCancel: boolean; showInput?: boolean },
): Promise<{ action: "confirm"; value?: string }> {
  return new Promise((resolve, reject) => {
    // 单实例：先关掉旧的
    if (activeClose) activeClose();

    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp({
      setup() {
        const visible = ref(true);
        let settled = false;

        // 收尾：resolve / reject + 关闭弹框；unmount 在 closed（动画结束）后
        const settle = (action: "confirm" | "cancel" | "close", value?: string) => {
          if (settled) return;
          settled = true;
          activeClose = null;
          if (action === "confirm") resolve({ action, value });
          else reject(action);
          if (visible.value) visible.value = false;
        };

        activeClose = () => settle("close");

        return () =>
          h(KMessageBox, {
            modelValue: visible.value,
            title: options.title ?? "提示",
            message: options.message ?? "",
            icon: options.icon,
            showCancel: base.showCancel,
            confirmText: options.confirmText,
            cancelText: options.cancelText,
            showInput: base.showInput ?? false,
            inputValue: options.inputValue,
            inputPlaceholder: options.inputPlaceholder,
            inputType: options.inputType,
            inputValidator: options.inputValidator,
            closeOnClickOverlay: options.closeOnClickOverlay,
            maskType: options.maskType,
            closeOnPressEscape: options.closeOnPressEscape,
            customClass: options.customClass,
            "onUpdate:modelValue": (v: boolean) => {
              // 遮罩 / ESC / 关闭按钮触发
              if (!v) settle("close");
            },
            onConfirm: (value: string) => settle("confirm", value),
            onCancel: () => settle("cancel"),
            onClosed: () => {
              app.unmount();
              container.remove();
            },
          });
      },
    });
    app.mount(container);
  });
}

export const messageBox = {
  /** 提醒弹框（只有确定按钮）；确认 resolve('confirm')，关闭 reject */
  alert: (message?: string | VNode, options?: Omit<MessageBoxOptions, "inputValue">) =>
    show({ ...options, message }, { showCancel: false }),

  /** 确认弹框（确定 + 取消）；确认 resolve('confirm')，取消 reject('cancel')，关闭 reject('close') */
  confirm: (message?: string | VNode, options?: Omit<MessageBoxOptions, "inputValue">) =>
    show({ ...options, message }, { showCancel: true }),

  /** 输入弹框；确认 resolve({ value })，取消 reject('cancel')，关闭 reject('close') */
  prompt: (message?: string | VNode, options?: MessageBoxOptions) =>
    show({ ...options, message }, { showCancel: true, showInput: true }),

  /** 关闭当前弹框（若有），按 'close' 处理 */
  close: () => activeClose?.(),
};

export default messageBox;
