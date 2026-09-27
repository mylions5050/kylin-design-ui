/**
 * KDrawer — 抽屉面板
 *
 * 参考 Ant Design Drawer：从屏幕四边滑出的浮层面板，适合表单编辑、
 * 详情查看等需要较大承载空间又不完全遮挡页面的场景。
 *
 * 组合复用：
 * - 外壳 KOverlay（遮罩淡入淡出 / teleport / z-index / 点击遮罩关闭）
 * - 面板滑入滑出由内部独立的 Vue Transition 原生类驱动（EP 同款架构），
 *   起止由真实 transitionend 判定；遮罩淡出与面板滑动同时进行、互不干扰
 * - 内容区复用 KScroll 滚动；loading 态复用 KLoading 的 local 模式
 *
 * 特色能力：
 * - push：同方向多层抽屉叠加时，底层抽屉自动被推开（AntD 同款，默认 180px）
 * - ESC 只关闭最上层抽屉（全局栈协调）
 * - 打开期间锁定 placement，关闭动画方向不受外部状态变化影响
 */
import {
  defineComponent,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  Transition,
  type PropType,
  type CSSProperties,
} from "vue";
import { createBem } from "@/utils/create-bem";
import KOverlay from "@/components/overlay/index";
import type { KOverlayMaskType } from "@/components/overlay/index";
import KIcon from "@/components/icon/index";
import KScroll from "@/components/scrollbar/index";
import KLoading from "@/components/loading/index";
import "./index.scss";

const [, e, m] = createBem("k-drawer");

export type DrawerPlacement = "right" | "left" | "top" | "bottom";
export type DrawerSize = "default" | "large";

/** size → 面板厚度（right/left 为宽度，top/bottom 为高度），与 AntD 一致 */
const SIZE_MAP: Record<DrawerSize, number> = {
  default: 378,
  large: 736,
};

/** 默认推开距离（AntD push 默认 180px） */
const DEFAULT_PUSH = 180;

/* ============ 全局抽屉栈：协调 push 推开与 ESC 只关最上层 ============ */

interface DrawerStackItem {
  id: number;
  placement: DrawerPlacement;
}

const drawerStack = ref<DrawerStackItem[]>([]);
let drawerSeq = 0;

/** 被推开的距离：本条目之后存在同方向抽屉即被推（多层叠加只按一层 180 处理，与 AntD 一致） */
function usePushed(id: number, placement: () => DrawerPlacement, push: () => number) {
  return computed(() => {
    const stack = drawerStack.value;
    const idx = stack.findIndex((it) => it.id === id);
    if (idx < 0) return 0;
    const covered = stack.slice(idx + 1).some((it) => it.placement === placement());
    return covered ? push() : 0;
  });
}

/** 是否为栈顶（最上层）抽屉：只有栈顶响应 ESC */
function useIsTop(id: number) {
  return computed(() => {
    const stack = drawerStack.value;
    return stack.length > 0 && stack[stack.length - 1].id === id;
  });
}

export default defineComponent({
  name: "KDrawer",
  props: {
    /** 显隐（v-model） */
    modelValue: { type: Boolean, default: false },
    /** 标题（也可用 title 插槽） */
    title: { type: String, default: "" },
    /** 弹出方向 */
    placement: {
      type: String as PropType<DrawerPlacement>,
      default: "right",
    },
    /** 预设尺寸：default 378px / large 736px（宽度或高度随方向） */
    size: {
      type: String as PropType<DrawerSize>,
      default: "default",
    },
    /** 自定义面板宽度（仅 right/left 生效，覆盖 size） */
    width: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** 自定义面板高度（仅 top/bottom 生效，覆盖 size） */
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** 是否显示标题栏关闭按钮 */
    closable: { type: Boolean, default: true },
    /** 点击遮罩是否关闭 */
    closeOnClickOverlay: { type: Boolean, default: true },
    /** ESC 是否关闭（多层抽屉时只有最上层响应） */
    closeOnPressEscape: { type: Boolean, default: true },
    /**
     * 同方向多层抽屉叠加时，本层是否被后打开的抽屉推开：
     * false 不推开 / true 推开 180px（默认）/ 数字自定义推开距离
     */
    push: {
      type: [Boolean, Number] as PropType<boolean | number>,
      default: true,
    },
    /** 内容加载中（body 显示 KLoading 局部加载态） */
    loading: { type: Boolean, default: false },
    /** 加载提示文案（配合 loading） */
    loadingText: { type: String, default: undefined },
    /** 是否 teleport 到 body */
    teleported: { type: Boolean, default: true },
    /** 遮罩背景色（透传 KOverlay） */
    overlayBackground: { type: String, default: undefined },
    /** 遮罩类型：dimmed 暗色（默认）/ blur 毛玻璃（透传 KOverlay） */
    maskType: { type: String as PropType<KOverlayMaskType>, default: "dimmed" },
    /** 遮罩层级（透传 KOverlay） */
    overlayZIndex: { type: Number, default: undefined },
    /** 自定义 class（追加到面板上） */
    customClass: { type: String, default: undefined },
    /** 标题栏自定义样式 */
    headerStyle: { type: Object as PropType<CSSProperties>, default: undefined },
    /** 内容区自定义样式 */
    bodyStyle: { type: Object as PropType<CSSProperties>, default: undefined },
    /** 页脚自定义样式 */
    footerStyle: { type: Object as PropType<CSSProperties>, default: undefined },
  },
  emits: ["update:modelValue", "open", "opened", "close", "closed"],

  setup(props, { emit, slots }) {
    /* ============ 全局栈注册：push / ESC 顶层判断 ============ */

    const drawerId = ++drawerSeq;

    const pushValue = computed(() => {
      if (props.push === false) return 0;
      return typeof props.push === "number" ? props.push : DEFAULT_PUSH;
    });

    // 打开期间锁定的方向：关闭动画不受外部 placement 变化影响
    const activePlacement = ref<DrawerPlacement>(props.placement);

    const pushed = usePushed(drawerId, () => activePlacement.value, () => pushValue.value);
    const isTop = useIsTop(drawerId);

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          activePlacement.value = props.placement;
          panelVisible.value = true; // 触发面板 Transition 滑入（与遮罩淡入同时开始）
          // 防重复：先移除旧条目再入栈
          const idx = drawerStack.value.findIndex((it) => it.id === drawerId);
          if (idx >= 0) drawerStack.value.splice(idx, 1);
          drawerStack.value.push({ id: drawerId, placement: props.placement });
          emit("open");
        } else {
          panelVisible.value = false; // 触发面板 Transition 滑出（与遮罩淡出同时开始）
          const idx = drawerStack.value.findIndex((it) => it.id === drawerId);
          if (idx >= 0) drawerStack.value.splice(idx, 1);
          emit("close");
        }
      },
    );
    onBeforeUnmount(() => {
      const idx = drawerStack.value.findIndex((it) => it.id === drawerId);
      if (idx >= 0) drawerStack.value.splice(idx, 1);
    });

    /* ============ 动画：面板独立 Vue Transition（EP 同款架构） ============ */
    // 遮罩淡入淡出在 KOverlay 内部；面板滑入滑出由下方 Transition 原生类驱动，
    // 起止由真实 transitionend 判定，没有定时器裁切，打开锁定方向后 Transition 名固定

    const panelRef = ref<HTMLElement>();

    /** 面板显隐：配合 appear 在首次打开时也播放滑入动画 */
    const panelVisible = ref(false);

    const handlePanelEnter = () => {
      bindEvents();
      emit("opened");
    };

    const handlePanelLeave = () => {
      unbindEvents();
      emit("closed");
    };

    /* ============ ESC 关闭：只有最上层抽屉响应 ============ */

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.closeOnPressEscape && isTop.value) {
        emit("update:modelValue", false);
      }
    };

    const bindEvents = () => {
      document.addEventListener("keydown", handleKeydown);
    };

    const unbindEvents = () => {
      document.removeEventListener("keydown", handleKeydown);
    };

    onBeforeUnmount(() => {
      unbindEvents();
    });

    /* ============ 面板尺寸 + push 位移 ============ */

    const panelStyle = computed(() => {
      const s: Record<string, string> = {};
      const horizontal = activePlacement.value === "right" || activePlacement.value === "left";
      // 自定义宽/高优先，否则用 size 预设
      const thickness =
        (horizontal ? props.width : props.height) ?? `${SIZE_MAP[props.size]}px`;
      const value = typeof thickness === "number" ? `${thickness}px` : thickness;
      if (horizontal) s.width = value;
      else s.height = value;

      // push 推开：方向与滑入方向相反
      if (pushed.value > 0) {
        const sign = activePlacement.value === "right" || activePlacement.value === "bottom" ? -1 : 1;
        const axis = horizontal ? "X" : "Y";
        s.transform = `translate${axis}(${sign * pushed.value}px)`;
      }
      return s;
    });

    return () => (
      <KOverlay
        modelValue={props.modelValue}
        duration={380} /* 兕底卸载延时：面板滑动 0.3s + 缓冲（动画结束由 transitionend 判定，不被定时器裁切） */
        closeOnClick={props.closeOnClickOverlay}
        contentFade={false} /* AntD 同款：遮罩淡入淡出，面板保持不透明纯滑动 */
        teleported={props.teleported}
        background={props.overlayBackground}
        maskType={props.maskType}
        zIndex={props.overlayZIndex}
        onUpdate:modelValue={(val: boolean) => {
          if (!val) emit("update:modelValue", false);
        }}
      >
        <Transition
          appear
          name={`k-drawer-slide-${activePlacement.value}`}
          onAfterEnter={handlePanelEnter}
          onAfterLeave={handlePanelLeave}
        >
          {panelVisible.value ? (
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              tabindex={-1}
              class={[
                e("wrapper"),
                m(activePlacement.value, true), // is-right / is-left / is-top / is-bottom（对应 SCSS 贴边规则）
                m("pushed", pushed.value > 0),
                props.customClass,
              ]}
              style={panelStyle.value}
              onPointerdown={(ev: PointerEvent) => ev.stopPropagation()}
            >
          {/* 头部：标题 + extra + 关闭按钮 */}
          <div class={e("header")} style={props.headerStyle}>
            <span class={e("title")}>{slots.title ? slots.title() : props.title}</span>
            <div class={e("header-actions")}>
              {slots.extra && <div class={e("extra")}>{slots.extra()}</div>}
              {props.closable && (
                <button
                  type="button"
                  class={e("close")}
                  aria-label="Close"
                  onClick={() => emit("update:modelValue", false)}
                >
                  <KIcon name="close-bold" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* 内容区：KScroll 接管滚动；loading 态用 KLoading 局部模式覆盖 */}
          <div class={e("main")}>
            <KScroll class={e("body")}>
              <div class={e("body-content")} style={props.bodyStyle}>
                {slots.default?.()}
              </div>
            </KScroll>
            {props.loading && (
              <KLoading local modelValue text={props.loadingText} />
            )}
          </div>

          {/* 页脚：footer 插槽有内容才渲染 */}
          {slots.footer && (
            <div class={e("footer")} style={props.footerStyle}>
              {slots.footer()}
            </div>
          )}
            </div>
          ) : null}
        </Transition>
      </KOverlay>
    );
  },
});
