/**
 * KTimePicker — 时间选择器
 *
 * 基于 KInput + KPopper + KScroll 拼装。
 * KInput 负责触发与展示，KPopper 负责弹出定位，KScroll 负责时分秒滚动列。
 *
 * 特性：
 *  - format 决定展示格式与可滚动的列：HH:mm:ss（含秒）、HH:mm（不含秒）、HH（仅小时）
 *  - 面板为 时/分/秒 三列 KScroll 滚动选择，点选即时生效；选完 format 中的最后一列（秒/分/时）
 *    后自动关闭面板，中途点面板外收起时已点选的列仍然生效
 *  - 支持手动输入，回车解析（按 format）
 *  - 触发框前后缀：prefixIcon / suffixIcon（默认 'time' 图标）/ clearIcon
 */
import {
  defineComponent,
  ref,
  computed,
  watch,
  nextTick,
  type Ref,
  type PropType,
} from "vue";
import KInput from "@/components/input/index";
import KButton from "@/components/button/index";
import KPopper from "@/components/popper/index";
import KScroll, { type ScrollBarExposed } from "@/components/scrollbar/index";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Dayjs } from "dayjs";
import type { PopperPlacement } from "@/components/popper/index";
import type { SelectSize } from "@/components/select/types";
import "./index.scss";

dayjs.extend(customParseFormat);

/** 数值 0-23 / 0-59 前导补零：5 → "05" */
const pad = (n: number) => String(n).padStart(2, "0");

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const SECONDS = Array.from({ length: 60 }, (_, i) => i);

export default defineComponent({
  name: "KTimePicker",
  inheritAttrs: false,
  props: {
    /** v-model 绑定值，支持 Dayjs 或时间字符串（如 "14:30:00"） */
    modelValue: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 占位文本 */
    placeholder: { type: String, default: "选择时间" },
    /** 时间格式，默认 "HH:mm:ss"；缺段则对应列不渲染（HH:mm 无秒列、HH 仅有小时列） */
    format: { type: String, default: "HH:mm:ss" },
    /** 尺寸（与 KInput/KSelect 保持一致） */
    size: { type: String as PropType<SelectSize>, default: "default" },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否只读（禁止输入，但不影响点选面板） */
    readonly: { type: Boolean, default: false },
    /** 手动确认模式：开启后面板选择只记录草稿、不立即生效，并显示底部操作栏（此刻 | 确认），
     *  须点“确认”才提交生效；关闭则为即时模式（选择即生效并关闭面板） */
    confirm: { type: Boolean, default: false },
    /** 是否开启 hover / 滚动预览：面板内 hover 或滚动到时/分/秒值，输入框实时浅灰预览；
     *  不产生提交，点选/确认才落定。默认开启（对齐 Element Plus 体验） */
    previewOnHover: { type: Boolean, default: true },
    /** 是否可清除 */
    clearable: { type: Boolean, default: false },
    /** 弹出方向 */
    placement: { type: String as PropType<PopperPlacement>, default: "bottom-start" },
    /** 前缀图标名（触发框左侧） */
    prefixIcon: { type: String, default: undefined },
    /** 后缀图标名（触发框右侧），默认 'time' */
    suffixIcon: { type: String, default: "time" },
    /** 清除按钮图标名，默认 'close-bold' */
    clearIcon: { type: String, default: "close-bold" },
    /** 面板时/分/秒列的可滑滚动高度（px），默认 256 即天然容纳 8 个小时 */
    panelHeight: { type: [String, Number], default: 256 },
    /** 面板是否 Teleport 到 body */
    teleported: { type: Boolean, default: true },
    /** 自定义面板类名 */
    popperClass: { type: String, default: undefined },
    /** 面板最小宽度 */
    minWidth: { type: [String, Number], default: undefined },
  },
  emits: ["update:modelValue", "change", "visible-change", "clear", "focus", "blur"],

  setup(props, { emit }) {
    const triggerRef = ref<HTMLElement | null>(null);
    const visible = ref(false);
    const inputText = ref("");

    const toDayjs = (v: Dayjs | string | null | undefined): Dayjs | null =>
      !v ? null : typeof v === "string" ? dayjs(v, props.format) : v;

    /* ========== 面板列控制（依据 format） ========== */
    // 是否渲染秒列（含 "ss"/"SSS" 或任意 "s" 大小写标记）
    const hasSecond = computed(() => /s/i.test(props.format));
    // 是否渲染分列（含 "mm"）；小时列始终渲染
    const hasMinute = computed(() => /m/i.test(props.format));

    /* ========== 选中值派生 ========== */
    const currentValue = computed<Dayjs | null>(() => {
      const v = toDayjs(props.modelValue);
      return v && v.isValid() ? v : null;
    });

    // 面板内待提交的各列值（以 modelValue 为基准；无值初始化时从当前时刻取）
    const draftHour = ref(dayjs().hour());
    const draftMinute = ref(0);
    const draftSecond = ref(0);

    // 每列 KScroll 实例，用于打开面板后把选中值滚动定位到顶部
    const hourScrollRef = ref<ScrollBarExposed | null>(null);
    const minuteScrollRef = ref<ScrollBarExposed | null>(null);
    const secondScrollRef = ref<ScrollBarExposed | null>(null);

    // 每行项高（px），与 scss 中 .k-time-picker__item 的 height 保持一致
    const ITEM_HEIGHT = 32;
    // 打开面板后把各列滚动到选中值位置（贴顶部），避免用户去手动找
    const scrollToSelected = () => {
      nextTick(() => {
        hourScrollRef.value?.scrollTo?.(draftHour.value * ITEM_HEIGHT);
        minuteScrollRef.value?.scrollTo?.(draftMinute.value * ITEM_HEIGHT);
        secondScrollRef.value?.scrollTo?.(draftSecond.value * ITEM_HEIGHT);
      });
    };

    // 打开面板时初始化草稿，确保从空值开始也有合理默认时间
    const initDraft = () => {
      const base = currentValue.value ?? dayjs();
      draftHour.value = base.hour();
      draftMinute.value = base.minute();
      draftSecond.value = base.second();
    };

    // 预览态（hover / 滚动）：记录各列当前被预览到但尚未提交的值，浅灰显示，不产生提交
    const preview = ref<{ hour?: number; minute?: number; second?: number } | null>(null);
    const previewing = computed(
      () => props.previewOnHover && preview.value !== null && !inputText.value,
    );

    // 预览合并：预览字段优先，缺失字段回落到当前已提交值；用于展示浅灰预览文本
    const previewTime = computed(() => {
      const p = preview.value;
      if (!p) return null;
      const base = currentValue.value ?? dayjs();
      return {
        hour: p.hour !== undefined ? p.hour : base.hour(),
        minute: p.minute !== undefined ? p.minute : base.minute(),
        second: p.second !== undefined ? p.second : base.second(),
      };
    });

    // 合成为 Dayjs 以供 format
    const toPreviewDayjs = () => {
      const t = previewTime.value;
      if (!t) return null;
      const base = currentValue.value ?? dayjs();
      return base.hour(t.hour).minute(t.minute).second(t.second);
    };

    // 展示文本：手动输入 > hover/滚动预览（浅灰） > 草稿（confirm 待确认） > 已提交值
    const displayText = computed(() => {
      if (inputText.value) return inputText.value;
      const pv = toPreviewDayjs();
      if (pv) return pv.format(props.format);
      // 面板打开时（confirm 模式点选/此刻未确认）先反映草稿，给用户即时反馈
      if (visible.value) {
        const base = currentValue.value ?? dayjs();
        return base
          .hour(draftHour.value)
          .minute(draftMinute.value)
          .second(draftSecond.value)
          .format(props.format);
      }
      const v = currentValue.value;
      return v ? v.format(props.format) : "";
    });

    // 设置某列的预览值
    const setPreview = (col: "hour" | "minute" | "second", v: number) => {
      if (!props.previewOnHover) return;
      preview.value = { ...(preview.value ?? {}), [col]: v };
    };

    // 清空预览（鼠标离开组件 / 收起面板时）
    const clearPreview = () => {
      if (preview.value) preview.value = null;
    };

    const handleInput = (v: string) => (inputText.value = v);

    // 面板选中某列某项的提交逻辑：以草稿各列构造 Dayjs 并写入；closePanel 决定是否关闭
    const applyFromDraft = (closePanel: boolean) => {
      const base = currentValue.value ?? dayjs();
      const composed = base
        .hour(draftHour.value)
        .minute(draftMinute.value)
        .second(draftSecond.value);
      emit("update:modelValue", composed);
      emit("change", composed);
      inputText.value = "";
      if (closePanel) visible.value = false;
    };

    // 按 format 判断最后一列：有秒列时点完秒才关闭，其次分，最后时
    const lastColumn = computed(() =>
      hasSecond.value ? "second" : hasMinute.value ? "minute" : "hour",
    );

    // 非 confirm 模式点选：即时提交（不关闭），点完最后一列才自动关闭面板；
    // confirm 模式仅更新草稿，等待底部“确认”按钮提交
    const handlePick = (col: "hour" | "minute" | "second", setDraft: () => void) => {
      setDraft();
      if (props.confirm) return;
      applyFromDraft(false);
      if (col === lastColumn.value) visible.value = false;
    };
    const onPickHour = (h: number) => handlePick("hour", () => { draftHour.value = h; });
    const onPickMinute = (m: number) => handlePick("minute", () => { draftMinute.value = m; });
    const onPickSecond = (s: number) => handlePick("second", () => { draftSecond.value = s; });

    // confirm 模式：确认——提交草稿并关闭
    const onConfirm = () => applyFromDraft(true);
    // 底部栏“此刻”：把草稿设为当前时刻并滚动回选中项顶部；非 confirm 模式下即时提交并关闭
    const onNow = () => {
      const n = dayjs();
      draftHour.value = n.hour();
      draftMinute.value = n.minute();
      draftSecond.value = n.second();
      scrollToSelected();
      if (!props.confirm) applyFromDraft(true);
    };

    // 触发框按钮尺寸：KInput/KSelect 用 default，KButton 用 middle，做一次映射
    const buttonSize = computed(() =>
      props.size === "small" ? "small" : props.size === "large" ? "large" : "middle",
    );

    // 渲染单列 KScroll：给定数值列表与当前选中/点击回调，ref 绑定用于定位
    // colKey 用于隔离各列的 hover/滚动预览；跑动项在 mouseenter 时浅灰预览
    const renderColumn = (
      list: number[],
      selected: number,
      onClick: (v: number) => void,
      scrollRef: Ref<ScrollBarExposed | null>,
      colKey: "hour" | "minute" | "second",
    ) => (
      <KScroll
        ref={scrollRef}
        height={props.panelHeight}
        onScroll={(payload: { scrollTop: number }) => {
          if (!props.previewOnHover) return;
          const row = Math.round(payload.scrollTop / ITEM_HEIGHT);
          const v = list[Math.min(Math.max(row, 0), list.length - 1)];
          if (v !== undefined) setPreview(colKey, v);
        }}
      >
        <div class="k-time-picker__col-body">
          {list.map((n) => (
            <div
              class={[
                "k-time-picker__item",
                n === selected && "is-selected",
                previewing.value &&
                  n ===
                    (preview.value
                      ? preview.value[colKey]
                      : undefined) &&
                  "is-preview",
              ]}
              onClick={() => onClick(n)}
              onMouseenter={() => setPreview(colKey, n)}
            >
              {pad(n)}
            </div>
          ))}
        </div>
      </KScroll>
    );

    /* ========== 触发框 ========== */
    const showClear = computed(
      () => props.clearable && !props.disabled && !!currentValue.value,
    );

    const handleClear = () => {
      emit("update:modelValue", null);
      emit("change", null);
      emit("clear");
      inputText.value = "";
    };

    const handleInputFocus = () => {
      if (!props.disabled && !props.readonly) {
        visible.value = true;
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        visible.value = false;
      } else if (e.key === "Enter" && !props.confirm) {
        // 非 confirm 模式：手动输入回车解析，合法则提交并关闭，非法保持面板打开
        const trimmed = inputText.value.trim();
        if (!trimmed) return;
        const parsed = dayjs(trimmed, props.format);
        if (parsed.isValid()) {
          emit("update:modelValue", parsed);
          emit("change", parsed);
          inputText.value = trimmed;
          visible.value = false;
        }
      }
      // confirm 模式：Enter 不做自动提交，交由底部“确认”按钮决定
    };

    // 统一处理面板开/关：无论从 KInput focus 直接设 visible，还是 KPopper 回调更新，
    // 都经由 watch 确保“打开时初始化草稿 + 把选中值滚动定位到顶部”。
    watch(visible, (v) => {
      if (v) {
        initDraft();
        scrollToSelected();
        emit("focus");
      } else {
        emit("blur");
      }
      clearPreview();
      emit("visible-change", v);
    });

    return () => (
      <div
        ref={triggerRef}
        class={[
          "k-time-picker",
          props.disabled && "is-disabled",
          visible.value && "is-focused",
          previewing.value && "is-previewing",
        ]}
        onKeydown={handleKeydown}
        onMouseleave={clearPreview}
      >
        <KInput
          modelValue={displayText.value}
          onUpdate:modelValue={handleInput}
          placeholder={props.placeholder}
          size={props.size}
          disabled={props.disabled}
          readonly={props.readonly}
          clearable={showClear.value}
          clearIcon={props.clearIcon}
          prefixIcon={props.prefixIcon}
          suffixIcon={props.suffixIcon}
          onClear={handleClear}
          onFocus={handleInputFocus}
          class={["k-time-picker__input", visible.value && "is-focused"]}
        />
        <KPopper
          visible={visible.value}
          triggerRef={triggerRef}
          placement={props.placement}
          gap={4}
          margin={8}
          autoFlip={true}
          arrow={false}
          zIndex={2100}
          popperClass={props.popperClass}
          minWidth={props.minWidth}
          closeOnClickOutside={true}
          scrollFollow={true}
          transition="zoom-fade"
          onUpdate:visible={(v: boolean) => { visible.value = v; }}
        >
          <div
            class="k-time-picker__panel"
            onKeydown={handleKeydown}
            onMouseleave={clearPreview}
          >
            <div class="k-time-picker__cols">
              <div class="k-time-picker__col">
                {renderColumn(HOURS, draftHour.value, onPickHour, hourScrollRef, "hour")}
              </div>
              {hasMinute.value && (
                <div class="k-time-picker__col">
                  {renderColumn(MINUTES, draftMinute.value, onPickMinute, minuteScrollRef, "minute")}
                </div>
              )}
              {hasSecond.value && (
                <div class="k-time-picker__col">
                  {renderColumn(SECONDS, draftSecond.value, onPickSecond, secondScrollRef, "second")}
                </div>
              )}
            </div>
            {props.confirm && (
              <div class="k-time-picker__footer">
                <KButton size={buttonSize.value} text onClick={onNow}>此刻</KButton>
                <KButton type="primary" size={buttonSize.value} onClick={onConfirm}>确认</KButton>
              </div>
            )}
          </div>
        </KPopper>
      </div>
    );
  },
});