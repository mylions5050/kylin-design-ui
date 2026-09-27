/**
 * KDateTimePicker — 日期时间选择器（单选 / 范围）
 *
 * 基于 KInput + KPopper + KDatePickerPane + KScroll 拼装。
 * KDatePickerPane（bare）负责日历选择，KScroll 时/分/秒列负责时间选择，
 * 面板内改动只写入草稿，点"确定"才合并提交并关闭（对齐 Element Plus DateTimePicker / DateTimeRange 交互）。
 *
 * 特性：
 *  - 单选：v-model 绑定；范围：range + v-model:start / v-model:end（两块日历 + 各自独立的时分秒列）
 *  - format 决定展示格式与时间列：默认 "YYYY-MM-DD HH:mm:ss"；
 *    时间段缺秒（如 "YYYY-MM-DD HH:mm"）则不渲染秒列，缺分则不渲染分列
 *  - 底部操作栏：此刻（草稿跳到当前时刻）| 确定（提交合并值并关闭）
 *  - 范围两步点选成对（逆序自动纠正），未成对点"确定"不提交、面板不关闭
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
import KDatePickerPane from "@/components/date-picker/index";
import KScroll, { type ScrollBarExposed } from "@/components/scrollbar/index";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { PopperPlacement } from "@/components/popper/index";
import type { SelectSize } from "@/components/select/types";
import "./index.scss";

/** 数值 0-23 / 0-59 前导补零：5 → "05" */
const pad = (n: number) => String(n).padStart(2, "0");

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const SECONDS = Array.from({ length: 60 }, (_, i) => i);

export default defineComponent({
  name: "KDateTimePicker",
  inheritAttrs: false,
  props: {
    /** v-model 绑定值（单选），支持 Dayjs 或日期时间字符串（如 "2026-09-10 08:30:00"） */
    modelValue: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 范围选择的开始日期时间（v-model:start，range 时使用） */
    start: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 范围选择的结束日期时间（v-model:end，range 时使用） */
    end: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 是否为日期时间范围选择（datetimerange），配合 start / end 使用 */
    range: { type: Boolean, default: false },
    /** 占位文本 */
    placeholder: { type: String, default: "选择日期时间" },
    /** 展示格式：日期段 + 空格 + 时间段；时间段决定时/分/秒列渲染 */
    format: { type: String, default: "YYYY-MM-DD HH:mm:ss" },
    /** 尺寸（与 KInput/KSelect 保持一致） */
    size: { type: String as PropType<SelectSize>, default: "default" },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否可清除 */
    clearable: { type: Boolean, default: false },
    /** 弹出方向 */
    placement: { type: String as PropType<PopperPlacement>, default: "bottom-start" },
    /** 前缀图标名（触发框左侧） */
    prefixIcon: { type: String, default: undefined },
    /** 后缀图标名（触发框右侧），默认 'calendar' */
    suffixIcon: { type: String, default: "calendar" },
    /** 清除按钮图标名，默认 'close-bold' */
    clearIcon: { type: String, default: "close-bold" },
    /** 面板时/分/秒列的可滑滚动高度（px），默认 256 即天然容纳 8 个小时 */
    panelHeight: { type: [String, Number], default: 256 },
    /** 最小可选日期（透传日历面板） */
    minDate: { type: Object as PropType<Dayjs>, default: undefined },
    /** 最大可选日期（透传日历面板） */
    maxDate: { type: Object as PropType<Dayjs>, default: undefined },
  },
  emits: [
    "update:modelValue",
    "update:start",
    "update:end",
    "change",
    "visible-change",
    "clear",
  ],

  setup(props, { emit }) {
    const triggerRef = ref<HTMLElement | null>(null);
    const visible = ref(false);

    const toDayjs = (v: Dayjs | string | null | undefined): Dayjs | null =>
      !v ? null : typeof v === "string" ? dayjs(v) : v;

    /* ========== 时间列控制（依据 format 的时间段） ========== */
    const timeFormat = computed(() => {
      const parts = props.format.split(" ");
      return parts.length > 1 ? parts.slice(1).join(" ") : "HH:mm:ss";
    });
    const hasMinute = computed(() => /m/i.test(timeFormat.value));
    const hasSecond = computed(() => /s/i.test(timeFormat.value));

    /* ========== 已提交值 ========== */
    const currentValue = computed<Dayjs | null>(() => {
      const v = toDayjs(props.modelValue);
      return v && v.isValid() ? v : null;
    });
    const currentStart = computed<Dayjs | null>(() => {
      const v = toDayjs(props.start);
      return v && v.isValid() ? v : null;
    });
    const currentEnd = computed<Dayjs | null>(() => {
      const v = toDayjs(props.end);
      return v && v.isValid() ? v : null;
    });

    /* ========== 草稿：单选 ========== */
    const draftDate = ref<Dayjs>(dayjs().startOf("day"));
    const draftHour = ref(0);
    const draftMinute = ref(0);
    const draftSecond = ref(0);

    /* ========== 草稿：范围 ========== */
    const rsDate = ref<Dayjs | null>(null);
    const reDate = ref<Dayjs | null>(null);
    const rsHour = ref(0);
    const rsMinute = ref(0);
    const rsSecond = ref(0);
    const reHour = ref(0);
    const reMinute = ref(0);
    const reSecond = ref(0);
    // 范围模式共享的 hover 预览结束日期（未选完结束端时预览高亮）
    const rangeHover = ref<Dayjs | null>(null);

    /* ========== 时间列滚动定位 ========== */
    const hourScrollRef = ref<ScrollBarExposed | null>(null);
    const minuteScrollRef = ref<ScrollBarExposed | null>(null);
    const secondScrollRef = ref<ScrollBarExposed | null>(null);
    const rsHourScrollRef = ref<ScrollBarExposed | null>(null);
    const rsMinuteScrollRef = ref<ScrollBarExposed | null>(null);
    const rsSecondScrollRef = ref<ScrollBarExposed | null>(null);
    const reHourScrollRef = ref<ScrollBarExposed | null>(null);
    const reMinuteScrollRef = ref<ScrollBarExposed | null>(null);
    const reSecondScrollRef = ref<ScrollBarExposed | null>(null);

    // 每行项高（px），与 scss 中 __item 的 height 保持一致
    const ITEM_HEIGHT = 32;
    const scrollToSelected = () => {
      nextTick(() => {
        hourScrollRef.value?.scrollTo?.(draftHour.value * ITEM_HEIGHT);
        minuteScrollRef.value?.scrollTo?.(draftMinute.value * ITEM_HEIGHT);
        secondScrollRef.value?.scrollTo?.(draftSecond.value * ITEM_HEIGHT);
        rsHourScrollRef.value?.scrollTo?.(rsHour.value * ITEM_HEIGHT);
        rsMinuteScrollRef.value?.scrollTo?.(rsMinute.value * ITEM_HEIGHT);
        rsSecondScrollRef.value?.scrollTo?.(rsSecond.value * ITEM_HEIGHT);
        reHourScrollRef.value?.scrollTo?.(reHour.value * ITEM_HEIGHT);
        reMinuteScrollRef.value?.scrollTo?.(reMinute.value * ITEM_HEIGHT);
        reSecondScrollRef.value?.scrollTo?.(reSecond.value * ITEM_HEIGHT);
      });
    };

    // 打开面板时从当前值初始化草稿（无值则取当前时刻；范围结束端缺省沿用开始端时刻）
    const initDraft = () => {
      if (props.range) {
        const s = currentStart.value ?? dayjs();
        const e = currentEnd.value ?? s;
        // 草稿日期严格跟随 props（无值为 null，不隐式选中"今天"）；时间列数值回退当前时刻用于展示
        rsDate.value = currentStart.value ? s.startOf("day") : null;
        rsHour.value = s.hour();
        rsMinute.value = s.minute();
        rsSecond.value = s.second();
        reDate.value = currentEnd.value ? e.startOf("day") : null;
        reHour.value = e.hour();
        reMinute.value = e.minute();
        reSecond.value = e.second();
        return;
      }
      const base = currentValue.value ?? dayjs();
      draftDate.value = base.startOf("day");
      draftHour.value = base.hour();
      draftMinute.value = base.minute();
      draftSecond.value = base.second();
    };

    /* ========== 展示文本：仅展示已提交值（草稿不影响触发框，确定才生效） ========== */
    const displayText = computed(() => {
      if (props.range) {
        const s = currentStart.value;
        const e = currentEnd.value;
        return s && e ? `${s.format(props.format)} ~ ${e.format(props.format)}` : "";
      }
      const v = currentValue.value;
      return v ? v.format(props.format) : "";
    });

    /* ========== 面板交互：日历点选（只写草稿，不关闭面板） ========== */
    const onPaneSelect = (date: Dayjs) => {
      draftDate.value = date.startOf("day");
    };

    // 范围点选：无开始或已成对时重开（点选新开始），只有开始时配对成段（逆序自动纠正）
    const onPaneSelectRange = (date: Dayjs) => {
      const d = date.startOf("day");
      if (!rsDate.value || (rsDate.value && reDate.value)) {
        rsDate.value = d;
        reDate.value = null;
        return;
      }
      const lo = d.isBefore(rsDate.value, "day") ? d : rsDate.value;
      const hi = d.isBefore(rsDate.value, "day") ? rsDate.value : d;
      rsDate.value = lo;
      reDate.value = hi;
    };

    const onPickHour = (h: number) => { draftHour.value = h; };
    const onPickMinute = (m: number) => { draftMinute.value = m; };
    const onPickSecond = (s: number) => { draftSecond.value = s; };
    const onPickRsHour = (h: number) => { rsHour.value = h; };
    const onPickRsMinute = (m: number) => { rsMinute.value = m; };
    const onPickRsSecond = (s: number) => { rsSecond.value = s; };
    const onPickReHour = (h: number) => { reHour.value = h; };
    const onPickReMinute = (m: number) => { reMinute.value = m; };
    const onPickReSecond = (s: number) => { reSecond.value = s; };

    /* ========== 底部操作栏 ========== */
    // 此刻：草稿跳到当前时刻并滚动定位，不提交（点确定才生效）
    const onNow = () => {
      const n = dayjs();
      if (props.range) {
        rsDate.value = n.startOf("day");
        reDate.value = n.startOf("day");
        rsHour.value = reHour.value = n.hour();
        rsMinute.value = reMinute.value = n.minute();
        rsSecond.value = reSecond.value = n.second();
      } else {
        draftDate.value = n.startOf("day");
        draftHour.value = n.hour();
        draftMinute.value = n.minute();
        draftSecond.value = n.second();
      }
      scrollToSelected();
    };

    // 确定：合并草稿提交并关闭；范围未成对时不提交、不关闭
    const onConfirm = () => {
      if (props.range) {
        if (!rsDate.value || !reDate.value) return;
        const s = rsDate.value.hour(rsHour.value).minute(rsMinute.value).second(rsSecond.value);
        const e = reDate.value.hour(reHour.value).minute(reMinute.value).second(reSecond.value);
        emit("update:start", s);
        emit("update:end", e);
        emit("change", [s, e]);
        visible.value = false;
        return;
      }
      const composed = draftDate.value
        .hour(draftHour.value)
        .minute(draftMinute.value)
        .second(draftSecond.value);
      emit("update:modelValue", composed);
      emit("change", composed);
      visible.value = false;
    };

    const handleClear = () => {
      if (props.range) {
        emit("update:start", null);
        emit("update:end", null);
      } else {
        emit("update:modelValue", null);
      }
      emit("change", null);
      emit("clear");
    };

    const handleInputFocus = () => {
      if (!props.disabled) {
        visible.value = true;
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        visible.value = false;
      }
    };

    // 打开面板：初始化草稿并定位滚动
    watch(visible, (v) => {
      if (v) {
        initDraft();
        scrollToSelected();
      }
      emit("visible-change", v);
    });

    // 触发框按钮尺寸：KInput/KSelect 用 default，KButton 用 middle，做一次映射
    const buttonSize = computed(() =>
      props.size === "small" ? "small" : props.size === "large" ? "large" : "middle",
    );

    // 渲染单列 KScroll：数值列表 + 当前选中项高亮
    const renderColumn = (
      list: number[],
      selected: number,
      onClick: (v: number) => void,
      scrollRef: Ref<ScrollBarExposed | null>,
    ) => (
      <div class="k-date-time-picker__time-col">
        <KScroll ref={scrollRef} height={props.panelHeight}>
          <div class="k-date-time-picker__col-body">
            {list.map((n) => (
              <div
                class={["k-date-time-picker__item", n === selected && "is-selected"]}
                onClick={() => onClick(n)}
              >
                {pad(n)}
              </div>
            ))}
          </div>
        </KScroll>
      </div>
    );

    // 渲染一组时间列（单选一组 / 范围每组各一套）
    const renderTimeGroup = (
      h: number,
      m: number,
      s: number,
      onH: (v: number) => void,
      onM: (v: number) => void,
      onS: (v: number) => void,
      refs: [Ref<ScrollBarExposed | null>, Ref<ScrollBarExposed | null>, Ref<ScrollBarExposed | null>],
    ) => (
      <>
        {renderColumn(HOURS, h, onH, refs[0])}
        {hasMinute.value && renderColumn(MINUTES, m, onM, refs[1])}
        {hasSecond.value && renderColumn(SECONDS, s, onS, refs[2])}
      </>
    );

    // 范围模式：两块子面板（日历 + 各自时间列），共享范围高亮与 hover 预览
    const renderRangeMain = () => {
      const leftMonth = (currentStart.value ?? dayjs()).startOf("month");
      const renderSub = (side: "start" | "end") => (
        <div class="k-date-time-picker__sub">
          <div class="k-date-time-picker__date">
            <KDatePickerPane
              bare
              isRange
              start={rsDate.value}
              end={reDate.value}
              rangeHover={rangeHover.value}
              defaultMonth={side === "start" ? leftMonth : leftMonth.add(1, "month")}
              minDate={props.minDate}
              maxDate={props.maxDate}
              onSelect={onPaneSelectRange}
              onUpdate:value={() => {}}
              onUpdate:rangeHover={(d: Dayjs | null) => { rangeHover.value = d ?? null; }}
            />
          </div>
          <div class="k-date-time-picker__sub-time">
            {side === "start"
              ? renderTimeGroup(rsHour.value, rsMinute.value, rsSecond.value, onPickRsHour, onPickRsMinute, onPickRsSecond, [rsHourScrollRef, rsMinuteScrollRef, rsSecondScrollRef])
              : renderTimeGroup(reHour.value, reMinute.value, reSecond.value, onPickReHour, onPickReMinute, onPickReSecond, [reHourScrollRef, reMinuteScrollRef, reSecondScrollRef])}
          </div>
        </div>
      );
      return (
        <>
          {renderSub("start")}
          <div class="k-date-time-picker__divider" />
          {renderSub("end")}
        </>
      );
    };

    return () => (
      <div
        ref={triggerRef}
        class={["k-date-time-picker", props.disabled && "is-disabled"]}
        onKeydown={handleKeydown}
      >
        <KInput
          modelValue={displayText.value}
          onUpdate:modelValue={() => {}}
          placeholder={props.placeholder}
          size={props.size}
          disabled={props.disabled}
          clearable={props.clearable && !props.disabled && !!(currentValue.value || (currentStart.value || currentEnd.value))}
          clearIcon={props.clearIcon}
          prefixIcon={props.prefixIcon}
          suffixIcon={props.suffixIcon}
          onClear={handleClear}
          onFocus={handleInputFocus}
          class={["k-date-time-picker__input", visible.value && "is-focused"]}
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
          closeOnClickOutside={true}
          scrollFollow={true}
          transition="zoom-fade"
          onUpdate:visible={(v: boolean) => { visible.value = v; }}
        >
          <div class="k-date-time-picker__panel" onKeydown={handleKeydown}>
            <div class={["k-date-time-picker__main", props.range && "is-range"]}>
              {props.range ? renderRangeMain() : (
                <>
                  <div class="k-date-time-picker__date">
                    <KDatePickerPane
                      bare
                      value={draftDate.value}
                      minDate={props.minDate}
                      maxDate={props.maxDate}
                      onSelect={onPaneSelect}
                      onUpdate:value={() => {}}
                    />
                  </div>
                  <div class="k-date-time-picker__divider" />
                  <div class="k-date-time-picker__time">
                    {renderTimeGroup(draftHour.value, draftMinute.value, draftSecond.value, onPickHour, onPickMinute, onPickSecond, [hourScrollRef, minuteScrollRef, secondScrollRef])}
                  </div>
                </>
              )}
            </div>
            <div class="k-date-time-picker__footer">
              <KButton size={buttonSize.value} text onClick={onNow}>此刻</KButton>
              <KButton size={buttonSize.value} type="primary" onClick={onConfirm}>确定</KButton>
            </div>
          </div>
        </KPopper>
      </div>
    );
  },
});
