import {
  defineComponent,
  ref,
  watch,
  onBeforeUnmount,
  Teleport,
  Transition,
  type PropType,
} from "vue";
import { createBem } from "@/utils/create-bem";
import "./index.scss";

const [b, e, m, v] = createBem("k-overlay");

/** 遮罩类型：dimmed 暗色蒙层（默认）/ blur 毛玻璃 */
export type KOverlayMaskType = "dimmed" | "blur";

export default defineComponent({
  name: "KOverlay",
  props: {
    modelValue: { type: Boolean, default: false },
    /**
     * 关闭后的兜底卸载延时（ms）。
     * 动画本身不靠它裁切：遮罩淡入淡出、内容面板各自的出入场动画
     * 都由 Vue Transition 的真实 transitionend 判定结束，
     * 这个延时只需 ≥ 内容方最长的离场动画（如 Drawer 面板滑动 0.3s 传 380）。
     */
    duration: { type: Number, default: 250 },
    teleported: { type: Boolean, default: true },
    closeOnClick: { type: Boolean, default: true },
    customClass: { type: String, default: undefined },
    zIndex: { type: Number, default: undefined },
    background: { type: String, default: undefined },
    /**
     * 遮罩类型（AntD v6 遮罩 demo 同款能力）：
     * - dimmed：暗色蒙层（默认，--k-color-mask）
     * - blur：毛玻璃——蒙层背景色不变，追加 backdrop-filter: blur(4px)
     *   把底下的页面内容模糊掉（实测 AntD v6：背景仍 rgba(0,0,0,0.45) + blur 4px）
     */
    maskType: {
      type: String as PropType<KOverlayMaskType>,
      default: "dimmed",
    },
    transitionName: { type: String, default: "k-overlay-fade" },
    /**
     * 内容层是否跟随遮罩一起淡入淡出（语义保留）。
     * true（默认）：Dialog / Loading 等内容自带出入场动画，遮罩单独淡入淡出；
     * false：供 Drawer 等自带滑入滑出动画的面板使用（AntD 同款：遮罩淡、面板滑）。
     */
    contentFade: { type: Boolean, default: true },
  },
  emits: ["update:modelValue", "open", "opened", "close", "closed"],

  setup(props, { emit, slots }) {
    const overlayRef = ref<HTMLElement>();
    /** 根节点挂载：首次打开懒渲染，关闭动画兜底延时结束后卸载 */
    const mounted = ref(false);
    /** 遮罩显隐：独立 Transition 驱动淡入淡出 */
    const maskShown = ref(false);

    let unmountTimer: ReturnType<typeof setTimeout> | null = null;

    const clearUnmountTimer = () => {
      if (unmountTimer !== null) {
        clearTimeout(unmountTimer);
        unmountTimer = null;
      }
    };

    /* ====================== 事件 ====================== */

    // 点击遮罩关闭：面板内容会 stopPropagation（如 Dialog/Drawer 的 wrapper），
    // 能走到这里的 pointerdown 都是遮罩空白区域的点击。
    // 通过 v-model 通知外部，遮罩淡出与内容面板的离场动画同时开始
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.currentTarget === e.target && props.closeOnClick) {
        emit("update:modelValue", false);
      }
    };

    /* ====================== 外部 v-model 驱动 ====================== */

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          // 关闭卸载还没到点就重新打开：取消卸载，遮罩直接反向过渡
          clearUnmountTimer();
          mounted.value = true;
          maskShown.value = true;
        } else if (mounted.value) {
          // 关闭：遮罩立即淡出（独立 Transition），内容层保持挂载存活，
          // 让面板组件自己的离场 Transition 正常播放
          maskShown.value = false;
          clearUnmountTimer();
          unmountTimer = setTimeout(() => {
            unmountTimer = null;
            mounted.value = false;
            emit("closed");
            emit("update:modelValue", false);
          }, props.duration);
        }
      },
      { immediate: true }, // createVNode 时同步初始化挂载与遮罩状态
    );

    /* ====================== 遮罩 Transition 钩子：对外事件语义与旧版对齐 ====================== */

    const onMaskBeforeEnter = () => emit("open");
    const onMaskAfterEnter = () => emit("opened");
    const onMaskBeforeLeave = () => emit("close");

    /* ====================== 清理 ====================== */

    onBeforeUnmount(clearUnmountTimer);

    /* ====================== 渲染 ====================== */

    return () => {
      const rootStyle: Record<string, string> = {};
      if (props.zIndex != null) rootStyle.zIndex = String(props.zIndex);

      const maskStyle: Record<string, string> = {};
      if (props.background != null) maskStyle.background = props.background;

      return (
        <Teleport to="body" disabled={!props.teleported}>
          {mounted.value ? (
            <div
              ref={overlayRef}
              class={[b(), m("content-fade", props.contentFade), props.customClass]}
              style={rootStyle}
            >
              {/* 遮罩层：独立 Transition 驱动淡入淡出，起止由真实 transitionend 判定 */}
              <Transition
                appear
                name={props.transitionName}
                onBeforeEnter={onMaskBeforeEnter}
                onAfterEnter={onMaskAfterEnter}
                onBeforeLeave={onMaskBeforeLeave}
              >
                {maskShown.value ? (
                  <div
                    class={[e("mask"), v("blur", props.maskType === "blur")]}
                    style={maskStyle}
                    onPointerdown={handleClick}
                  />
                ) : null}
              </Transition>
              {/* 内容层：display:contents 不产生盒子，子元素直接参与根节点的布局。
                  挂载期间始终存活并响应更新（EP 同款架构），
                  内容方可以在内部再包自己的 Transition 控制出入场 */}
              <div class={e("content")}>{slots.default?.()}</div>
            </div>
          ) : null}
        </Teleport>
      );
    };
  },
});
