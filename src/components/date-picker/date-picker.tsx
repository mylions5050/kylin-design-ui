/**
 * KDatePicker — 日期选择器
 *
 * 基于 KInput + KPopper + KDatePickerPane 拼装。
 * KDatePickerPane 负责日历渲染，KPopper 负责弹出定位，KInput 负责触发和展示。
 *
 * 扩展能力：
 *  - 触发框前后缀：prefixIcon / suffixIcon / prefix / suffix（自定义后缀替换默认 calendar 图标）
 *  - 自定义清除图标：clearIcon
 *  - 面板内容区：top / bottom 插槽（顶部工具条、底部快捷操作区）
 *  - 快捷选项：shortcuts 数组，内置快捷项渲染
 *  - 自定义单元格：cell 作用域插槽（可拿到 date/disabled/isToday/isSelected/inRange/isCurrentMonth）
 */
import {
  defineComponent,
  ref,
  computed,
  watch,
  nextTick,
  type PropType,
} from "vue";
import KInput from "@/components/input/index";
import KIcon from "@/components/icon/index";
import KPopper from "@/components/popper/index";
import KCard from "@/components/card/index";
import KButton from "@/components/button/index";
import KDatePickerPane from "@/components/date-picker/index";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { PopperPlacement } from "@/components/popper/index";
import type { SelectSize } from "@/components/select/types";
import "./index.scss";

/** 快捷选项：text 展示文字，value 返回要选中的日期。触发选中后复用单选/范围的 select 逻辑 */
export interface Shortcut {
  text: string;
  value: () => Dayjs;
}

/** cell 作用域插槽暴露的数据 */
export interface DateCellScope {
  date: Dayjs;
  /** 对齐 Element Plus：date 为当天号数；month / quarter 为 0 起始索引（0=1月、Q1）；year 为年份本身 */
  text: number;
  disabled: boolean;
  isToday: boolean;
  isSelected: boolean;
  inRange: boolean;
  isCurrentMonth: boolean;
}

export default defineComponent({
  name: "KDatePicker",
  props: {
    /** v-model 绑定值（单选），支持 Dayjs 或日期字符串 */
    modelValue: { type: [String, Object] as PropType<string | Dayjs | null>, default: null },
    /** 多选模式：可在面板中点击多个日期（仅 type: 'date' 生效，与 range 互斥） */
    multiple: { type: Boolean, default: false },
    /** 多选已选日期数组（v-model:values），支持 Dayjs 或日期字符串 */
    values: { type: Array as PropType<(Dayjs | string)[]>, default: () => [] },
    /** 选中开始日期（范围选择用） */
    start: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 选中结束日期（范围选择用） */
    end: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 占位文本 */
    placeholder: { type: String, default: "选择日期" },
    /** 尺寸（与 KInput/KSelect 保持一致） */
    size: { type: String as PropType<"small" | "default" | "large">, default: "default" },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否可清除 */
    clearable: { type: Boolean, default: false },
    /** 弹出方向 */
    placement: { type: String as PropType<PopperPlacement>, default: "bottom-start" },
    /** 日期格式 */
    format: { type: String, default: "YYYY-MM-DD" },
    /** 选择类型：date | week | month | year | quarter */
    type: { type: String as PropType<import("./index").DatePickerType>, default: 'date' },
    /** 是否为日期范围选择（匹配 Element Plus 的 daterange，需配合 start/end 使用） */
    range: { type: Boolean, default: false },
    /** 范围选择时两个面板是否各自独立切换月份（解除联动，默认联动） */
    unlinkPanels: { type: Boolean, default: false },
    /** 最小可选日期 */
    minDate: { type: Object as PropType<Dayjs>, default: undefined },
    /** 最大可选日期 */
    maxDate: { type: Object as PropType<Dayjs>, default: undefined },
    /** 是否显示年导航按钮 */
    showYearNav: { type: Boolean, default: true },
    /** 是否展示上/下月剩余日期 */
    showOtherMonth: { type: Boolean, default: true },

    /* ========== 透传 KDatePickerPane 的 KCard 属性 ========== */
    shadow: { type: String as PropType<"always" | "hover" | "never">, default: "always" },
    paneSize: { type: String as PropType<"small" | "default" | "large">, default: "small" },
    border: { type: Boolean, default: true },
    paneWidth: { type: String, default: "340px" },
    /** 自定义日期格子的渲染函数，接收 (day: Dayjs) => VNodeChild */
    renderDate: { type: Function as PropType<(day: Dayjs) => any>, default: undefined },
    /** 日期标记数组，支持单日和范围，支持 dot / label 两种展示方式 */
    dateMarks: { type: Array as PropType<import("./index").DateMark[]>, default: () => [] },

    /* ========== 头部自定义渲染（对齐 Element Plus 的 prefix-icon 机制） ========== */
    /** 自定义面板头部“上一月/上一档”单箭头图标，接收 (viewMonth, type)，返回非空则替换默认箭头图标；返回 null/undefined 回落默认。 */
    renderHeaderPrev: { type: Function as PropType<(viewMonth: Dayjs, type: import("./index").DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“下一月/下一档”单箭头图标，接收 (viewMonth, type)，返回非空则替换默认箭头图标；返回 null/undefined 回落默认。 */
    renderHeaderNext: { type: Function as PropType<(viewMonth: Dayjs, type: import("./index").DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“上一年”双箭头图标，接收 (viewMonth, type)，返回非空则替换默认双箭头；返回 null/undefined 回落默认。 */
    renderHeaderPrevYear: { type: Function as PropType<(viewMonth: Dayjs, type: import("./index").DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“下一年”双箭头图标，接收 (viewMonth, type)，返回非空则替换默认双箭头；返回 null/undefined 回落默认。 */
    renderHeaderNextYear: { type: Function as PropType<(viewMonth: Dayjs, type: import("./index").DatePickerType) => any>, default: undefined },
    /** 自定义面板头部标题，接收 (label, viewMonth, type)，返回非空则替换默认标题文字；返回 null/undefined 回落默认。 */
    renderHeaderTitle: { type: Function as PropType<(label: string, viewMonth: Dayjs, type: import("./index").DatePickerType) => any>, default: undefined },

    /* ========== 前后缀 & 快捷项（扩展） ========== */
    /** 前缀图标名（触发框左侧） */
    prefixIcon: { type: String, default: undefined },
    /** 后缀图标名（触发框右侧），默认 'calendar'。传了 prefix/suffix 插槽时插槽优先渲染。 */
    suffixIcon: { type: String, default: "calendar" },
    /** 清除按钮图标名，默认 'close-bold' */
    clearIcon: { type: String, default: "close-bold" },
    /** 快捷选项数组，渲染在面板底部（与 bottom 插槽并存）。value 返回要选中的日期。 */
    shortcuts: {
      type: Array as PropType<Shortcut[]>,
      default: () => [],
    },
    /** 卡片式面板布局：最外层无边框卡（padding 5px）包住[内层蓝边卡（日期面板）+ 右侧快捷列]，右下角提供 清空/确定/取消。 */
    cardPanel: { type: Boolean, default: false },
    /** 手动确认模式：开启后选择日期不即时关闭面板，需点"确定"才提交生效、点"取消"回滚；
     *  仅 cardPanel 场景下展示确定/取消 footer。默认关闭（选择日期即时生效、无确定/取消按钮）。 */
    confirm: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "update:start", "update:end", "update:values", "select", "change"],
  setup(props, { emit, slots }) {
    const triggerRef = ref<HTMLElement>();
    const visible = ref(false);
    const inputText = ref("");
    // 用于强制刷新面板（回车后跳转到对应月份）
    const paneKey = ref(0);

    const toDayjs = (v: Dayjs | string | null | undefined): Dayjs | null =>
      !v ? null : typeof v === "string" ? dayjs(v) : v;

    /* ========== 范围选择状态 ========== */
    // 左面板视图月份
    const leftMonth = ref(toDayjs(props.start) ?? dayjs());
    // 右面板视图月份（unlink 时独立使用）
    const rightMonth = ref(toDayjs(props.start)?.add(1, "month") ?? dayjs().add(1, "month"));
    // 联动模式下，左面板每次翻页递增，强制右面板跟随重挂载
    const rightPaneKey = ref(0);
    // 手动回车修改开始日期后，递增强制左面板重挂载并跳到对应月份
    const leftPaneKey = ref(0);
    // 单面板范围（unlink）模式下，手动回车修改后递增以强制重挂载跳到对应月份
    const singleRangeKey = ref(0);
    // hover 预览的结束日期（两个面板共享）
    const rangeHover = ref<Dayjs | null>(null);
    // 范围模式下，开始/结束输入框的文本
    const startText = ref("");
    const endText = ref("");
    // 范围模式开始/结束输入框的 DOM 引用（非受控输入，回车时读值，确认后写回）
    const startInputRef = ref<HTMLInputElement | null>(null);
    const endInputRef = ref<HTMLInputElement | null>(null);

    // 把规范化日期文本写回范围输入框的 DOM（点选、手动回车确认后调用）
    const syncRangeInputDom = (which: "start" | "end", text: string) => {
      const el = which === "start" ? startInputRef.value : endInputRef.value;
      if (el) el.value = text;
    };
    // 范围选择支持的类型：date / month / year（周、季度暂不纳入范围）
    const isRangeTypeSupported = (t: string) => t === 'date' || t === 'month' || t === 'year';
    const isRangeMode = computed(() => props.range && isRangeTypeSupported(props.type));
    // 联动范围：左右两块面板
    const isLinkedRange = computed(() => props.range && isRangeTypeSupported(props.type) && !props.unlinkPanels);
    // 独立范围：单个面板即可选择起止日期
    const isSingleRange = computed(() => props.range && isRangeTypeSupported(props.type) && props.unlinkPanels);

    // 多选模式：type 支持 date / month / year，且与 range 互斥。多选用 values 数组（单选 modelValue 不参与）
    const isMultipleMode = computed(() =>
      props.multiple && (props.type === 'date' || props.type === 'month' || props.type === 'year') && !props.range,
    );
    // 多选已选日期（规范化 Dayjs[]）：确认模式用草稿，否则直接用父值
    const parentValues = computed<Dayjs[]>(() =>
      (props.values || []).map((v) => (typeof v === "string" ? dayjs(v) : v)),
    );
    const pendingValues = ref<Dayjs[]>([]);
    // 多选集合判重/toggle 辅助：去重与比较精度随类型（date 按天、month 按月、year 按年）
    const multiUnit = (): dayjs.OpUnitType => {
      switch (props.type) {
        case 'month': return 'month';
        case 'year': return 'year';
        default: return 'day';
      }
    };
    const toggleDay = (list: Dayjs[], d: Dayjs): Dayjs[] => {
      const idx = list.findIndex((v) => v.isSame(d, multiUnit()));
      if (idx >= 0) return list.filter((_, i) => i !== idx);
      return [...list, d];
    };
    // 供面板高亮使用的多选值源
    const paneValues = computed(() =>
      isConfirmMode.value ? pendingValues.value : parentValues.value,
    );

    // 范围模式下输入框各端显示的格式：
    // year → 2026；month → 年+月（如 2026-02）；date → 常规 format
    const formatRangePart = (val: Dayjs): string => {
      if (props.type === 'month') return `${val.year()}-${String(val.month() + 1).padStart(2, '0')}`;
      if (props.type === 'year') return String(val.year());
      return formatValue(val);
    };

    // 手动输入回车时解析范围输入（支持 year/month/date 类型感知）
    const parseRangeInput = (val: string, fallbackYear: number): Dayjs | null => {
      const trimmed = val.trim();
      if (!trimmed) return null;
      if (props.type === 'month') {
        // 支持 2026-2、2026-02、或单独月份数字 2
        const m = trimmed.match(/^(\d{4})-(\d{1,2})$/);
        if (m) {
          const mon = Number(m[2]);
          if (mon >= 1 && mon <= 12) {
            return dayjs(new Date(Number(m[1]), mon - 1, 1)).startOf('month');
          }
          return null;
        }
        const n = Number(trimmed);
        if (!isNaN(n) && n >= 1 && n <= 12) {
          return dayjs(new Date(fallbackYear, n - 1, 1)).startOf('month');
        }
        return null;
      }
      if (props.type === 'year') {
        const p = dayjs(trimmed, 'YYYY');
        return p.isValid() ? p : null;
      }
      const d = dayjs(trimmed, props.format);
      return d.isValid() ? d : null;
    };
    // 联动模式右面板的初始视图：date→下一月，month→下一年，year→下一个十年
    const getLinkedPairMonth = (base: Dayjs): Dayjs => {
      if (props.type === 'month') return base.add(1, 'year');
      if (props.type === 'year') return base.add(10, 'year');
      return base.add(1, 'month');
    };
    // 范围模式下单块面板宽度：与单面板一致，两块并排共用一个外层卡片
    const rangePaneWidth = computed(() => props.paneWidth);
    // 范围卡片总宽度：单面板的 2 倍
    const rangeCardWidth = computed(() => `calc(${props.paneWidth} * 2)`);

    // 按 type 格式化选中值
    const formatValue = (val: Dayjs): string => {
      const year = val.year();
      // 周：2026-W08
      if (props.type === 'week') {
        const weekNum = val.week();
        return `${year}-W${String(weekNum).padStart(2, '0')}`;
      }
      // 月：2026-08
      if (props.type === 'month') {
        return val.format("YYYY-MM");
      }
      // 年：2026
      if (props.type === 'year') {
        return val.format("YYYY");
      }
      // 季度：2026-Q1 ~ 2026-Q4
      if (props.type === 'quarter') {
        const quarter = Math.floor(val.month() / 3) + 1;
        return `${year}-Q${quarter}`;
      }
      return val.format(props.format);
    };

    // 显示值：优先使用输入框文本，否则显示格式化日期；多选显示已选列表（逗号分隔）
    const displayText = computed(() => {
      if (isMultipleMode.value) {
        const list = paneValues.value;
        return list.map((d) => formatValue(d)).join(", ");
      }
      if (inputText.value) return inputText.value;
      const val = toDayjs(props.modelValue);
      if (val) {
        return formatValue(val);
      }
      const s = toDayjs(props.start);
      const e = toDayjs(props.end);
      if (s && e) return `${formatValue(s)} ~ ${formatValue(e)}`;
      if (s) return `${formatValue(s)} ~ ...`;
      return "";
    });

    // 范围模式：开始/结束两个输入框各自的显示文本。
    // 对齐 Element Plus：只有开始和结束都选好后（成对）才渲染；仅选一端时输入框保持为空，
    // 直到成对或用户手动输入（startText/endText 手动编辑态优先）。
    const startDisplay = computed(() => {
      if (startText.value) return startText.value;
      const s = toDayjs(props.start);
      const e = toDayjs(props.end);
      return s && e ? formatRangePart(s) : "";
    });
    const endDisplay = computed(() => {
      if (endText.value) return endText.value;
      const s = toDayjs(props.start);
      const e = toDayjs(props.end);
      return s && e ? formatRangePart(e) : "";
    });
    // 范围模式下是否显示清除按钮
    const rangeShowClear = computed(
      () => props.clearable && !props.disabled && (toDayjs(props.start) || toDayjs(props.end)),
    );

    // 同步 modelValue 到 inputText（用于外部清空或重置后恢复显示）
    const syncInputText = () => {
      const val = toDayjs(props.modelValue);
      inputText.value = val ? formatValue(val) : "";
    };

    /* ========== 手动确认模式（confirm）草稿机制 ==========
     * confirm=true：选择日期不即时关闭/提交，先写入草稿，点"确定"才 emit 提交并关闭，点"取消"丢弃草稿。
     * confirm=false（默认）：保持原有即时生效行为。
     * 面板高亮使用草稿；触发框文本仍显示父值（未确定前不生效）。 */
    const isConfirmMode = computed(() => props.confirm);
    const pendingVal = ref<Dayjs | null>(null);
    const pendingStart = ref<Dayjs | null>(null);
    const pendingEnd = ref<Dayjs | null>(null);
    // 打开面板 / 回滚后，草稿回退到父值
    const syncPendingFromProps = () => {
      pendingVal.value = toDayjs(props.modelValue);
      pendingStart.value = toDayjs(props.start);
      pendingEnd.value = toDayjs(props.end);
      pendingValues.value = [...parentValues.value];
    };
    syncPendingFromProps();
    // 供面板高亮使用的“当前值源”：确认模式用草稿，否则直接用父值
    const paneValue = computed(() => (isConfirmMode.value ? pendingVal.value : toDayjs(props.modelValue)));
    const paneStart = computed(() => (isConfirmMode.value ? pendingStart.value : toDayjs(props.start)));
    const paneEnd = computed(() => (isConfirmMode.value ? pendingEnd.value : toDayjs(props.end)));

    // 范围模式的点击：点第一次设 start，第二次设 end（升序），第三次重开范围
    const handleRangeSelect = (date: Dayjs) => {
      // 确认模式：操作草稿，不立即提交父值、不关闭（点确定才生效）
      if (isConfirmMode.value) {
        let s = pendingStart.value;
        let e = pendingEnd.value;
        if (!s) {
          pendingStart.value = date;
          pendingEnd.value = null;
        } else if (!e) {
          const start = s.isAfter(date, "day") ? date : s;
          const end = s.isAfter(date, "day") ? s : date;
          pendingStart.value = start;
          pendingEnd.value = end;
        } else {
          pendingStart.value = date;
          pendingEnd.value = null;
        }
        startText.value = "";
        endText.value = "";
        emit("select", date);
        inputText.value = "";
        return;
      }

      const s = toDayjs(props.start);
      const e = toDayjs(props.end);
      if (!s) {
        // 只选了开始：输入框先不渲染，等成对后再显示（对齐 Element Plus）
        emit("update:start", date);
        emit("update:end", null);
        startText.value = "";
        endText.value = "";
      } else if (!e) {
        // 选齐开始和结束：成对，输入框在此渲染完整范围
        const start = s.isAfter(date, "day") ? date : s;
        const end = s.isAfter(date, "day") ? s : date;
        emit("update:start", start);
        emit("update:end", end);
        startText.value = "";
        endText.value = "";
        syncRangeInputDom("start", formatRangePart(start));
        syncRangeInputDom("end", formatRangePart(end));
        // 范围选齐：自动关闭面板
        visible.value = false;
      } else {
        // 重新开始选择：只选中新的开始，输入框暂不渲染
        emit("update:start", date);
        emit("update:end", null);
        startText.value = "";
        endText.value = "";
      }
      emit("select", date);
      emit("change", [toDayjs(props.start), date]);
      inputText.value = "";
    };

    const handleSelect = (date: any) => {
      // 多选：点选 toggle 入/出集合；即时模式直接提交父值与面板高亮一致，确认模式写草稿
      if (isMultipleMode.value && date && typeof date === "object") {
        const day = date as Dayjs;
        if (isConfirmMode.value) {
          pendingValues.value = toggleDay(pendingValues.value, day);
        } else {
          emit("update:values", toggleDay(parentValues.value, day));
          emit("change", toggleDay(parentValues.value, day));
          emit("select", day);
        }
        inputText.value = "";
        return;
      }
      if (isRangeMode.value) {
        if (date && typeof date === "object" && !Array.isArray(date)) {
          handleRangeSelect(date as Dayjs);
        }
        return;
      }
      // 确认模式：单选写入草稿、不提交父值、不关闭
      if (isConfirmMode.value && date && typeof date === "object" && !Array.isArray(date)) {
        pendingVal.value = date as Dayjs;
        emit("select", date);
        inputText.value = "";
        return;
      }
      if (date && typeof date === "object" && !Array.isArray(date)) {
        emit("update:modelValue", date);
        emit("change", date);
        emit("select", date);
        inputText.value = "";
        visible.value = false;
      } else if (Array.isArray(date)) {
        emit("select", date);
      }
    };

    const handleClear = () => {
      if (isMultipleMode.value) {
        // 多选：一键清空已选日期集合
        if (isConfirmMode.value) {
          pendingValues.value = [];
        } else {
          emit("update:values", []);
          emit("change", []);
        }
      } else if (isRangeMode.value) {
        emit("update:start", null);
        emit("update:end", null);
        syncRangeInputDom("start", "");
        syncRangeInputDom("end", "");
      } else {
        emit("update:modelValue", null);
      }
      startText.value = "";
      endText.value = "";
      inputText.value = "";
      emit("change", null);
    };

    // 快捷项点击：单选走单选分支；范围将该日期作为起止两端（单日范围），随后关闭面板。
    // 注意：范围模式下必须 start/end 成对赋值，否则关闭面板时 watch(visible) 会清空不完整的范围。
    const handleShortcut = (sc: Shortcut) => {
      const date = sc.value();
      // 多选：快捷项按“加入集合”处理（已存在则移除，否则加入），不关闭面板
      if (isMultipleMode.value) {
        if (isConfirmMode.value) {
          pendingValues.value = toggleDay(pendingValues.value, date);
        } else {
          emit("update:values", toggleDay(parentValues.value, date));
          emit("change", toggleDay(parentValues.value, date));
          emit("select", date);
        }
        inputText.value = "";
        return;
      }
      // 确认模式：只写入草稿，不提交父值、不关闭（点确定才生效）
      if (isConfirmMode.value) {
        if (isRangeMode.value) {
          pendingStart.value = date;
          pendingEnd.value = date;
        } else {
          pendingVal.value = date;
        }
        startText.value = "";
        endText.value = "";
        emit("select", date);
        inputText.value = "";
        return;
      }
      if (isRangeMode.value) {
        emit("update:start", date);
        emit("update:end", date);
        startText.value = "";
        endText.value = "";
        syncRangeInputDom("start", formatRangePart(date.startOf("day")));
        syncRangeInputDom("end", formatRangePart(date.startOf("day")));
        emit("select", date);
        emit("change", [date, date]);
      } else {
        emit("update:modelValue", date);
        emit("select", date);
        emit("change", date);
      }
      visible.value = false;
      inputText.value = "";
    };

    // 确定：提交草稿到父值并关闭。单选提交 modelValue，范围提交 start/end，多选提交 values。
    const confirmApply = () => {
      if (isMultipleMode.value) {
        emit("update:values", [...pendingValues.value]);
        emit("change", [...pendingValues.value]);
      } else if (isRangeMode.value) {
        emit("update:start", pendingStart.value);
        emit("update:end", pendingEnd.value);
        if (pendingStart.value) {
          syncRangeInputDom("start", formatRangePart(pendingStart.value));
          syncRangeInputDom("end", pendingEnd.value ? formatRangePart(pendingEnd.value) : "");
        }
        emit("change", [pendingStart.value, pendingEnd.value]);
      } else {
        emit("update:modelValue", pendingVal.value);
        emit("change", pendingVal.value);
      }
      visible.value = false;
      inputText.value = "";
    };

    // 取消：丢弃草稿回退到父值，并关闭（不提交）
    const cancelPanel = () => {
      syncPendingFromProps();
      visible.value = false;
      inputText.value = "";
    };

    // 快捷项是否命中当前选中值：单取 paneValue，范围取 paneStart/paneEnd，两端任一同一天即命中。
    // 确认模式下 pane 值即草稿，未提交前左侧高亮跟随草稿；非确认模式即父值。
    // 统一按天（day 精度）对齐比较，避免快捷项（如“今天”带时分秒）与面板点选值（当天 00:00）因时间差异而漏判。
    const isShortcutActive = (sc: Shortcut): boolean => {
      const d = sc.value();
      if (!d) return false;
      // 多选：快捷项命中的日期已在已选集合中即为激活
      if (isMultipleMode.value) {
        return paneValues.value.some((v) => v.isSame(d, multiUnit()));
      }
      const targets = [paneValue.value, paneStart.value, paneEnd.value]
        .filter((v): v is Dayjs => !!v);
      return targets.some((t) => t.isSame(d, "day"));
    };

    // 打开面板时：确认模式重新从父值同步草稿（取消后重开回到旧值）；同时重置视图月份
    watch(visible, (now, prev) => {
      if (now === true) {
        syncPendingFromProps();
        return;
      }
      if (!isRangeMode.value || isConfirmMode.value) return;
      if (prev === true && now === false) {
        if (!toDayjs(props.start) || !toDayjs(props.end)) {
          emit("update:start", null);
          emit("update:end", null);
          startText.value = "";
          endText.value = "";
          syncRangeInputDom("start", "");
          syncRangeInputDom("end", "");
        }
      }
    });

    const handleInputFocus = () => {
      if (!props.disabled) {
        visible.value = true;
      }
    };

    // 范围模式开始/结束输入框：允许手动输入，回车时解析并更新。
    // onInput 实时同步到 startText/endText，Enter 时直接从事件对象读取当前值，避免 onChange 迟于 keydown 导致的"回车失效"
    const handleStartTextInput = (v: string) => (startText.value = v);
    const handleEndTextInput = (v: string) => (endText.value = v);

    // 校验手动输入产生的起止顺序：若出现 start > end，则拒绝本次修改并保持面板打开（与 Element Plus 一致）
    const isRangeOrderValid = (s: Dayjs, e: Dayjs): boolean => {
      return !s.isAfter(e);
    };

    const handleStartTextEnter = (e: KeyboardEvent) => {
      const val = (e.currentTarget as HTMLInputElement).value.trim();
      const fallbackYear = (toDayjs(props.start) ?? leftMonth.value).year();
      const parsed = parseRangeInput(val, fallbackYear);
      if (!parsed) return;
      const end = toDayjs(props.end);
      // 如果结束日期已存在且手动输入的开始晚于结束，则不做任何动作
      if (end && !isRangeOrderValid(parsed, end)) return;
      // 确认模式：只更新开始草稿，不提交父值（点确定才生效）
      if (isConfirmMode.value) {
        pendingStart.value = parsed;
        startText.value = formatRangePart(parsed);
        leftMonth.value = parsed.startOf("month");
        if (props.unlinkPanels) {
          singleRangeKey.value++;
        } else {
          leftPaneKey.value++;
          rightPaneKey.value++;
        }
        return;
      }
      emit("update:start", parsed);
      const text = formatRangePart(parsed);
      startText.value = text;
      syncRangeInputDom("start", text);
      // 跳转对应面板到开始月份
      leftMonth.value = parsed.startOf("month");
      if (props.unlinkPanels) {
        // 单面板范围：重挂载单面板跳到开始月份
        singleRangeKey.value++;
      } else {
        // 联动面板范围：重挂载左面板，并让右面板跟随
        leftPaneKey.value++;
        rightPaneKey.value++;
      }
    };
    const handleEndTextEnter = (e: KeyboardEvent) => {
      const val = (e.currentTarget as HTMLInputElement).value.trim();
      const fallbackYear = (toDayjs(props.end) ?? toDayjs(props.start) ?? leftMonth.value).year();
      const parsed = parseRangeInput(val, fallbackYear);
      if (!parsed) return;
      const s = toDayjs(props.start);
      // 如果开始日期已存在且手动输入的结束早于开始，则不做任何动作
      if (s && !isRangeOrderValid(s, parsed)) return;
      // 确认模式：只更新结束草稿，不提交父值（点确定才生效）
      if (isConfirmMode.value) {
        pendingEnd.value = parsed;
        endText.value = formatRangePart(parsed);
        if (props.unlinkPanels) {
          rightMonth.value = parsed.startOf("month");
          leftMonth.value = parsed.startOf("month");
          singleRangeKey.value++;
        }
        return;
      }
      emit("update:end", parsed);
      const text = formatRangePart(parsed);
      endText.value = text;
      syncRangeInputDom("end", text);
      // 严格对齐 Element Plus：
      // - 联动模式始终以开始月份为锚点（左=开始月份，右=开始月份+1），改结束日期不做面板重锚定
      // - 仅单面板（unlink）模式才让面板跟随被编辑的一端
      if (props.unlinkPanels) {
        rightMonth.value = parsed.startOf("month");
        leftMonth.value = parsed.startOf("month");
        singleRangeKey.value++;
      }
    };

    // 左面板翻页：记录左月份；联动模式下强制右面板跟随重挂载
    const handleLeftView = (m: Dayjs) => {
      leftMonth.value = m;
      if (!props.unlinkPanels) {
        rightPaneKey.value++;
      }
    };
    // 右面板翻页（unlink 时独立记录）
    const handleRightView = (m: Dayjs) => {
      rightMonth.value = m;
    };
    // 两个面板共享 hover 预览结束日期
    const handleRangeHover = (d: Dayjs | null) => {
      rangeHover.value = d ?? null;
    };

    // 输入框回车：解析输入文本，如果合法则更新日期面板，并跳转到对应月份
    const handleInputEnter = () => {
      // 多选：触发框只读展示，不手动输入
      if (isMultipleMode.value) return;
      const trimmed = inputText.value.trim();
      if (!trimmed) return;
      // 根据 type 决定解析格式
      let parsedFormat = props.format;
      if (props.type === 'month') parsedFormat = 'YYYY-MM';
      else if (props.type === 'year') parsedFormat = 'YYYY';
      else if (props.type === 'quarter') parsedFormat = 'YYYY-[Q]Q';
      let parsed = dayjs(trimmed, parsedFormat);
      if (!parsed.isValid()) parsed = dayjs(trimmed, props.format);
      if (parsed.isValid()) {
        // 确认模式：只写入草稿，不提交父值、不关闭（点确定才生效）
        if (isConfirmMode.value) {
          pendingVal.value = parsed;
          inputText.value = formatValue(parsed);
          paneKey.value++;
          return;
        }
        emit("update:modelValue", parsed);
        emit("change", parsed);
        emit("select", parsed);
        // 把输入框更新为解析后的类型化文本
        inputText.value = formatValue(parsed);
        // 递增 key 强制面板重新渲染，跳转到对应月份
        paneKey.value++;
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        visible.value = false;
      } else if (e.key === "Enter") {
        handleInputEnter();
      }
    };

    // 范围模式：开始/结束两个独立输入框，视觉上合并为一个整体选择框
    const renderRangeInput = () => {
      // 后缀插槽优先于 suffixIcon（自定义后缀替换默认 calendar 图标）
      const renderSuffix = slots.suffix
        ? slots.suffix()
        : props.suffixIcon
          ? <KIcon name={props.suffixIcon} class="k-input__icon" />
          : null;

      return (
        <div
          class={[
            "k-date-picker__range-box",
            `k-date-picker__range-box--${props.size}`,
            props.disabled && "is-disabled",
            visible.value && "is-focused",
            rangeShowClear.value && "is-clearable",
            (props.prefixIcon || slots.prefix) && "has-prefix",
          ]}
        >
          {(slots.prefix || props.prefixIcon) && (
            <span class="k-date-picker__range-prefix">
              {slots.prefix
                ? slots.prefix()
                : props.prefixIcon && <KIcon name={props.prefixIcon} class="k-input__icon" />}
            </span>
          )}
          <input
            ref={startInputRef}
            class="k-date-picker__range-cell"
            value={startDisplay.value}
            placeholder="开始日期"
            disabled={props.disabled}
            onInput={(e) => handleStartTextInput((e.target as HTMLInputElement).value)}
            onKeydown={(e) => { if (e.key === "Enter") handleStartTextEnter(e); }}
            onFocus={handleInputFocus}
          />
          <span class="k-date-picker__range-sep">—</span>
          <input
            ref={endInputRef}
            class="k-date-picker__range-cell"
            value={endDisplay.value}
            placeholder="结束日期"
            disabled={props.disabled}
            onInput={(e) => handleEndTextInput((e.target as HTMLInputElement).value)}
            onKeydown={(e) => { if (e.key === "Enter") handleEndTextEnter(e); }}
            onFocus={handleInputFocus}
          />
          {(slots.suffix || props.suffixIcon || rangeShowClear.value) && (
            <span class="k-date-picker__range-suffix">
              {renderSuffix}
              {rangeShowClear.value && (
                <KIcon
                  name={props.clearIcon}
                  class={["k-input__icon", "k-input__clear"]}
                  onClick={handleClear}
                />
              )}
            </span>
          )}
        </div>
      );
    };

    const renderPanes = () =>
      isLinkedRange.value ? (
        <KCard
          shadow={props.shadow}
          size={props.paneSize}
          border={props.border}
          bodyStyle={{ padding: "0" }}
          style={{ width: rangeCardWidth.value }}
        >
          <div class="k-date-picker__range-panel">
            <KDatePickerPane
              key={leftPaneKey.value}
              cellRender={slots.cell ? (scope: any) => slots.cell!(scope) : undefined}
              bare
              rangeSide="left"
              defaultMonth={leftMonth.value}
              value={paneValue.value}
              start={paneStart.value}
              end={paneEnd.value}
              isRange={true}
              rangeHover={rangeHover.value}
              type={props.type}
              minDate={props.minDate}
              maxDate={props.maxDate}
              showYearNav={props.showYearNav}
              showOtherMonth={props.showOtherMonth}
              shadow={props.shadow}
              size={props.paneSize}
              border={props.border}
              width={rangePaneWidth.value}
              renderDate={props.renderDate}
              dateMarks={props.dateMarks}
              renderHeaderPrev={props.renderHeaderPrev}
              renderHeaderNext={props.renderHeaderNext}
              renderHeaderPrevYear={props.renderHeaderPrevYear}
              renderHeaderNextYear={props.renderHeaderNextYear}
              renderHeaderTitle={props.renderHeaderTitle}
              onSelect={handleSelect}
              onUpdate:value={() => {}}
              onUpdate:viewMonth={handleLeftView}
              onUpdate:rangeHover={handleRangeHover}
            >
            </KDatePickerPane>
            <div class="k-date-picker__divider" />
            <KDatePickerPane
              bare
              rangeSide="right"
              key={props.unlinkPanels ? "unlink" : rightPaneKey.value}
              cellRender={slots.cell ? (scope: any) => slots.cell!(scope) : undefined}
              defaultMonth={props.unlinkPanels
                ? rightMonth.value
                : getLinkedPairMonth(leftMonth.value)}
              value={paneValue.value}
              start={paneStart.value}
              end={paneEnd.value}
              isRange={true}
              rangeHover={rangeHover.value}
              type={props.type}
              minDate={props.minDate}
              maxDate={props.maxDate}
              showYearNav={props.showYearNav}
              showOtherMonth={props.showOtherMonth}
              shadow={props.shadow}
              size={props.paneSize}
              border={props.border}
              width={rangePaneWidth.value}
              renderDate={props.renderDate}
              dateMarks={props.dateMarks}
              renderHeaderPrev={props.renderHeaderPrev}
              renderHeaderNext={props.renderHeaderNext}
              renderHeaderPrevYear={props.renderHeaderPrevYear}
              renderHeaderNextYear={props.renderHeaderNextYear}
              renderHeaderTitle={props.renderHeaderTitle}
              onSelect={handleSelect}
              onUpdate:value={() => {}}
              onUpdate:viewMonth={handleRightView}
              onUpdate:rangeHover={handleRangeHover}
            >
            </KDatePickerPane>
          </div>
        </KCard>
      ) : isSingleRange.value ? (
        <KDatePickerPane
          key={singleRangeKey.value}
          cellRender={slots.cell ? (scope: any) => slots.cell!(scope) : undefined}
          bare={props.cardPanel}
          defaultMonth={leftMonth.value}
          value={paneValue.value}
          start={paneStart.value}
          end={paneEnd.value}
          isRange={true}
          rangeHover={rangeHover.value}
          type={props.type}
          minDate={props.minDate}
          maxDate={props.maxDate}
          showYearNav={props.showYearNav}
          showOtherMonth={props.showOtherMonth}
          shadow={props.shadow}
          size={props.paneSize}
          border={props.border}
          width={props.paneWidth}
          renderDate={props.renderDate}
          dateMarks={props.dateMarks}
          renderHeaderPrev={props.renderHeaderPrev}
          renderHeaderNext={props.renderHeaderNext}
          renderHeaderPrevYear={props.renderHeaderPrevYear}
          renderHeaderNextYear={props.renderHeaderNextYear}
          renderHeaderTitle={props.renderHeaderTitle}
          onSelect={handleSelect}
          onUpdate:value={() => {}}
          onUpdate:rangeHover={handleRangeHover}
        >
        </KDatePickerPane>
      ) : (
        <KDatePickerPane
          key={paneKey.value}
          cellRender={slots.cell ? (scope: any) => slots.cell!(scope) : undefined}
          bare={props.cardPanel}
          value={paneValue.value}
          start={paneStart.value}
          end={paneEnd.value}
          multiple={isMultipleMode.value}
          values={paneValues.value}
          type={props.type}
          minDate={props.minDate}
          maxDate={props.maxDate}
          showYearNav={props.showYearNav}
          showOtherMonth={props.showOtherMonth}
          shadow={props.shadow}
          size={props.paneSize}
          border={props.border}
          width={props.paneWidth}
          renderDate={props.renderDate}
          dateMarks={props.dateMarks}
          renderHeaderPrev={props.renderHeaderPrev}
          renderHeaderNext={props.renderHeaderNext}
          renderHeaderPrevYear={props.renderHeaderPrevYear}
          renderHeaderNextYear={props.renderHeaderNextYear}
          renderHeaderTitle={props.renderHeaderTitle}
          onSelect={handleSelect}
          onUpdate:value={() => {}}
        >
        </KDatePickerPane>
      );

    return () => (
      <div
        ref={triggerRef}
        class={[
          "k-date-picker",
          props.range && "is-range",
          props.disabled && "is-disabled",
          visible.value && "is-focused",
        ]}
        onKeydown={handleKeydown}
      >
        {isRangeMode.value ? renderRangeInput() : (
          <KInput
            modelValue={displayText.value}
            onUpdate:modelValue={(v) => (inputText.value = String(v))}
            placeholder={props.placeholder}
            size={props.size}
            disabled={props.disabled}
            readonly={isMultipleMode.value}
            clearable={props.clearable && !isMultipleMode.value}
            clearIcon={props.clearIcon}
            prefixIcon={props.prefixIcon}
            suffixIcon={props.suffixIcon}
            onClear={handleClear}
            onFocus={handleInputFocus}
            class={["k-date-picker__input", visible.value && "is-focused"]}
          >
            {{
              prefix: slots.prefix ? () => slots.prefix!() : undefined,
              suffix: slots.suffix ? () => slots.suffix!() : undefined,
            }}
          </KInput>
        )}
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
          {/* cell 作用域插槽透传给面板，dateMarks/renderDate 与其共存 */}
          <div class="k-date-picker__panel">
            {props.cardPanel ? (
              <KCard
                shadow={props.shadow}
                size="small"
                customClass="k-date-picker__panel-outer"
                bodyStyle={{ padding: "10px", width: "max-content" }}
              >
                {slots.top && <div class="k-date-picker__panel-top">{slots.top()}</div>}
                <div class="k-date-picker__panel-card">
                  {props.shortcuts.length > 0 && (
                    <div class="k-date-picker__panel-side">
                      <div class="k-date-picker__shortcuts">
                        {props.shortcuts.map((sc) => (
                          <KButton
                            size="small"
                            text
                            class={[
                              "k-date-picker__shortcut",
                              isShortcutActive(sc) && "is-active",
                            ]}
                            onClick={() => handleShortcut(sc)}
                          >
                            {sc.text}
                          </KButton>
                        ))}
                      </div>
                    </div>
                  )}
                  <div class="k-date-picker__panel-main">
                    {renderPanes()}
                    {slots.bottom && <div class="k-date-picker__panel-main-bottom">{slots.bottom()}</div>}
                  </div>
                </div>
                {props.confirm && (
                  <div class="k-date-picker__panel-actions">
                    <KButton size="small" type="primary" onClick={confirmApply}>确定</KButton>
                    <KButton size="small" onClick={cancelPanel}>取消</KButton>
                  </div>
                )}
              </KCard>
            ) : (
              <>
                {slots.top && <div class="k-date-picker__panel-top">{slots.top()}</div>}
                {renderPanes()}
                {(props.shortcuts.length > 0 || slots.bottom) && (
                  <div class="k-date-picker__panel-bottom">
                    {props.shortcuts.length > 0 && (
                      <div class="k-date-picker__shortcuts">
                        {props.shortcuts.map((sc) => (
                          <button
                            type="button"
                            class="k-date-picker__shortcut"
                            onClick={() => handleShortcut(sc)}
                          >
                            {sc.text}
                          </button>
                        ))}
                      </div>
                    )}
                    {slots.bottom && <div class="k-date-picker__panel-bottom-slot">{slots.bottom()}</div>}
                  </div>
                )}
              </>
            )}
          </div>
        </KPopper>
      </div>
    );
  },
});