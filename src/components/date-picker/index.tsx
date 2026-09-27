import {
  defineComponent,
  ref,
  computed,
  watch,
  type PropType,
} from "vue";
import { createBem } from "@/utils/create-bem";
import KCard from "@/components/card/index";
import KTooltip from "@/components/tooltip/index";
import type { CardShadow, CardSize } from "@/components/card/index";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "./index.scss";

dayjs.extend(weekOfYear);

const [b, e, m] = createBem("k-date-picker-pane");

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

export interface DateMark {
  /** 日期，支持 "MM-DD" 单日 或 ["MM-DD", "MM-DD"] 范围 */
  date: string | [string, string]
  /** 显示内容（显示在日期下方的文字或标记的 tooltip 提示） */
  label: string
  /** 标记类型：'dot' 小红点 | 'label' 文字 */
  type?: 'dot' | 'label'
  /** 自定义标记颜色，默认使用 --k-color-error。与 style 同时存在时，style 优先级更高 */
  color?: string
  /** 自定义 tooltip 提示内容，默认显示 label */
  tooltip?: string
  /** 自定义行内样式，优先级高于 color。可用于加粗、字号、背景色等 */
  style?: Partial<CSSStyleDeclaration> | Record<string, string>
}

export type DatePickerType = 'date' | 'week' | 'month' | 'year' | 'quarter'

/** 分段范围模式下的单个段：[起始日, 结束日]（均为按天取整的 Dayjs） */
export type DateSegment = [Dayjs, Dayjs]

export default defineComponent({
  name: "KDatePickerPane",
  props: {
    /** 当前高亮日期（单选），支持 Dayjs 或日期字符串 */
    value: { type: [String, Object] as PropType<string | Dayjs | null>, default: null },
    /** 多选模式：点选多个日期（仅 type: 'date' 生效，与范围互斥） */
    multiple: { type: Boolean, default: false },
    /** 多选已选日期数组（multiple 时的高亮来源），支持 Dayjs 或日期字符串 */
    values: { type: Array as PropType<(Dayjs | string)[]>, default: () => [] },
    /** 分段范围模式：可同时存在多段 [start, end] 范围。两步点选成段（重复点同一日取消），
     *  点已有段内的日期则截断移除该天，新段与已有段重叠或首尾相接时自动合并。
     *  仅 type: 'date' 生效，与 multiple / isRange 互斥 */
    segment: { type: Boolean, default: false },
    /** 分段模式已选段数组（segment 时的高亮来源），每项 [start, end]，支持 Dayjs 或日期字符串 */
    ranges: { type: Array as PropType<(Dayjs | string)[][]>, default: () => [] },
    /** 选中开始日期（范围显示用） */
    start: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 选中结束日期（范围显示用） */
    end: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 选择类型：date | week | month | year | quarter */
    type: { type: String as PropType<DatePickerType>, default: 'date' },
    /** 是否为范围选择（date 类型下的 daterange）。为 true 时结合 start/end 使用 */
    isRange: { type: Boolean, default: false },
    /** 范围选择时所在面板：'left' 隐藏“下一年/下一月”，'right' 隐藏“上一年/上一月” */
    rangeSide: { type: String as PropType<'left' | 'right'>, default: undefined },
    /** 范围选择时 hover 的结束日期（用于范围预览高亮） */
    rangeHover: { type: [Object, String] as PropType<Dayjs | string | null>, default: null },
    /** 最小可选日期 */
    minDate: { type: Object as PropType<Dayjs>, default: undefined },
    /** 最大可选日期 */
    maxDate: { type: Object as PropType<Dayjs>, default: undefined },
    /** 初始显示月份 */
    defaultMonth: { type: Object as PropType<Dayjs>, default: undefined },
    /** 是否显示年导航按钮 */
    showYearNav: { type: Boolean, default: true },
    /** 是否展示上/下月剩余日期（灰色） */
    showOtherMonth: { type: Boolean, default: true },
    /** 裸渲染模式：不包裹 KCard，仅渲染日历主体（用于范围面板并排时共用外层卡片） */
    bare: { type: Boolean, default: false },

    /* ========== 透传 KCard ========== */
    shadow: { type: String as PropType<CardShadow>, default: "always" },
    size: { type: String as PropType<CardSize>, default: "small" },
    border: { type: Boolean, default: true },
    cardClass: { type: String, default: undefined },
    width: { type: String, default: "340px" },
    /** 自定义日期格子的渲染函数，接收 (day: Dayjs) => VNodeChild */
    renderDate: { type: Function as PropType<(day: Dayjs) => any>, default: undefined },
    /** 日期标记数组，支持单日和范围，支持 dot / label 两种展示方式 */
    dateMarks: { type: Array as PropType<DateMark[]>, default: () => [] },
    /** （内部透传）自定义单元格作用域插槽的实现函数，接收 cell 作用域对象。优先于自身 slots.cell */
    cellRender: { type: Function as PropType<(scope: any) => any>, default: undefined },
    /** 自定义面板头部“上一月/上一档”单箭头图标。接收 (viewMonth, type)，返回 VNode；返回 null 时回落默认箭头 */
    renderHeaderPrev: { type: Function as PropType<(viewMonth: Dayjs, type: DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“下一月/下一档”单箭头图标。接收 (viewMonth, type)，返回 VNode；返回 null 时回落默认箭头 */
    renderHeaderNext: { type: Function as PropType<(viewMonth: Dayjs, type: DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“上一年”双箭头图标。接收 (viewMonth, type)，返回 VNode；返回 null 时回落默认双箭头 */
    renderHeaderPrevYear: { type: Function as PropType<(viewMonth: Dayjs, type: DatePickerType) => any>, default: undefined },
    /** 自定义面板头部“下一年”双箭头图标。接收 (viewMonth, type)，返回 VNode；返回 null 时回落默认双箭头 */
    renderHeaderNextYear: { type: Function as PropType<(viewMonth: Dayjs, type: DatePickerType) => any>, default: undefined },
    /** 自定义面板头部中间标题（如“August 2026”）。接收 (label, viewMonth, type)，返回 VNode；返回 null 时回落默认标题 */
    renderHeaderTitle: { type: Function as PropType<(label: string, viewMonth: Dayjs, type: DatePickerType) => any>, default: undefined },
  },
  emits: ["select", "update:value", "update:viewMonth", "update:rangeHover", "update:ranges"],
  setup(props, { emit, slots }) {
    const toDayjs = (v: Dayjs | string | null | undefined): Dayjs | null =>
      !v ? null : typeof v === "string" ? dayjs(v) : v;

    const resolvedValue = computed(() => toDayjs(props.value ?? props.start));
    const resolvedStart = resolvedValue;
    const resolvedEnd = computed(() => toDayjs(props.end));

    // 多选已选日期（规范化 Dayjs[]），用于多选高亮判断
    const multiValues = computed<Dayjs[]>(() =>
      (props.values || []).map((v) => (typeof v === "string" ? dayjs(v) : v)),
    );
    // 多选判重/高亮精度：date/week 按天，month 按月，year/quarter 按年
    const multiUnit = (): dayjs.OpUnitType => {
      switch (props.type) {
        case 'month': return 'month';
        case 'year': return 'year';
        default: return 'day';
      }
    };
    const isMultiSelected = (d: Dayjs): boolean =>
      multiValues.value.some((v) => v.isSame(d, multiUnit()));

    /* ================== 分段范围（segment）模式 ================== */
    // 规范化：字符串转 Dayjs、按天取整、段内起止排序、按起始日整体排序
    const segRanges = computed<DateSegment[]>(() =>
      (props.ranges || [])
        .map((seg) => {
          const s = toDayjs(seg[0])?.startOf("day");
          const en = toDayjs(seg[1])?.startOf("day");
          if (!s || !en) return null;
          return s.isBefore(en, "day") ? ([s, en] as DateSegment) : ([en, s] as DateSegment);
        })
        .filter((v): v is DateSegment => !!v)
        .sort((a, b) => (a[0].isBefore(b[0], "day") ? -1 : 1)),
    );

    // 分段集合为半受控：内部镜像 props.ranges，props 变化时同步；
    // 交互时本地即时更新并上报，父组件不回写也能正常高亮
    const localRanges = ref<DateSegment[]>(segRanges.value);
    watch(segRanges, (v) => {
      localRanges.value = v;
    });

    // 第一次点选后的待配对开始日期；重复点自身取消
    const pendingStart = ref<Dayjs | null>(null);
    // 分段模式 hover 预览日期（面板内部状态，不需要外层管理）
    const segHover = ref<Dayjs | null>(null);

    // 上报分段变更：先更新本地镜像再上报，保证父组件不回写时高亮不丢
    const emitRanges = (segs: DateSegment[]) => {
      localRanges.value = segs;
      emit("update:ranges", segs);
    };

    // 从分段集合中截断移除某一天：命中段按位置收缩，段中间则拆为两段
    const removeDayFromSegments = (segs: DateSegment[], d: Dayjs): DateSegment[] => {
      const out: DateSegment[] = [];
      for (const [s, en] of segs) {
        if (d.isBefore(s, "day") || d.isAfter(en, "day")) {
          out.push([s, en]);
          continue;
        }
        // d 落在该段内：d 的前后各保留一段（若是端点则对应半段为空不保留）
        const head = d.subtract(1, "day");
        const tail = d.add(1, "day");
        if (!head.isBefore(s, "day")) out.push([s, head]);
        if (!tail.isAfter(en, "day")) out.push([tail, en]);
      }
      return out;
    };

    // 向分段集合合并新段 [lo, hi]：与已有段重叠或首尾相接的并入，其余保留，按起始日排序
    const mergeSegmentInto = (segs: DateSegment[], lo: Dayjs, hi: Dayjs): DateSegment[] => {
      let mergedLo = lo;
      let mergedHi = hi;
      const rest: DateSegment[] = [];
      for (const [s, en] of segs) {
        // 首尾相接判定：已有段终点 +1 天 ≥ lo 且 起点 −1 天 ≤ hi
        const touches =
          !en.add(1, "day").isBefore(lo, "day") && !s.subtract(1, "day").isAfter(hi, "day");
        if (touches) {
          if (s.isBefore(mergedLo, "day")) mergedLo = s;
          if (en.isAfter(mergedHi, "day")) mergedHi = en;
        } else {
          rest.push([s, en]);
        }
      }
      rest.push([mergedLo, mergedHi]);
      return rest.sort((a, b) => (a[0].isBefore(b[0], "day") ? -1 : 1));
    };

    // 分段模式点选：无待配对时——点段内截断移除、点段外进入待配对；
    // 有待配对时——重复点自身取消，点其它日期成段（自动合并）
    const onSegmentPick = (date: Dayjs) => {
      const d = date.startOf("day");
      if (!pendingStart.value) {
        const hit = localRanges.value.some(
          ([s, en]) => !d.isBefore(s, "day") && !d.isAfter(en, "day"),
        );
        if (hit) {
          emitRanges(removeDayFromSegments(localRanges.value, d));
        } else {
          pendingStart.value = d;
        }
        return;
      }
      if (d.isSame(pendingStart.value, "day")) {
        pendingStart.value = null;
        return;
      }
      const lo = d.isBefore(pendingStart.value, "day") ? d : pendingStart.value;
      const hi = d.isBefore(pendingStart.value, "day") ? pendingStart.value : d;
      emitRanges(mergeSegmentInto(localRanges.value, lo, hi));
      pendingStart.value = null;
    };

    // 分段高亮类收集：返回 is-start / is-end / is-in-range（含待配对 hover 预览的临时段）
    const segCellState = (d: Dayjs): string[] => {
      let isStart = false;
      let isEnd = false;
      let inRange = false;
      for (const [s, en] of localRanges.value) {
        if (d.isSame(s, "day")) isStart = true;
        if (d.isSame(en, "day")) isEnd = true;
        if (d.isAfter(s, "day") && d.isBefore(en, "day")) inRange = true;
      }
      if (pendingStart.value) {
        const h = segHover.value;
        if (h && !h.isSame(pendingStart.value, "day")) {
          const lo = pendingStart.value.isBefore(h, "day") ? pendingStart.value : h;
          const hi = pendingStart.value.isBefore(h, "day") ? h : pendingStart.value;
          if (d.isSame(lo, "day")) isStart = true;
          if (d.isSame(hi, "day")) isEnd = true;
          if (d.isAfter(lo, "day") && d.isBefore(hi, "day")) inRange = true;
        } else if (d.isSame(pendingStart.value, "day")) {
          isStart = true;
        }
      }
      return [
        isStart && 'is-start',
        isEnd && 'is-end',
        inRange && 'is-in-range',
      ].filter(Boolean) as string[];
    };


    const viewMonth = ref<Dayjs>(
      props.defaultMonth ?? resolvedStart.value ?? dayjs(),
    );

    // 根据 type 决定 viewMonth 的精度
    const viewLabel = computed(() => {
      const m = viewMonth.value;
      switch (props.type) {
        case 'year': return m.format('YYYY');
        case 'quarter': return m.format('YYYY');
        default: return m.format('MMMM YYYY');
      }
    });

    const navStep = () => {
      switch (props.type) {
        case 'year': return 'year';
        case 'quarter': return 'year';
        default: return 'month';
      }
    };

    const navPrev = () => {
      if (navStep() === 'year') {
        // year 和 quarter 向前翻 10 年
        viewMonth.value = viewMonth.value.subtract(10, 'year');
      } else {
        viewMonth.value = viewMonth.value.subtract(1, 'month');
      }
    };

    const navNext = () => {
      if (navStep() === 'year') {
        viewMonth.value = viewMonth.value.add(10, 'year');
      } else {
        viewMonth.value = viewMonth.value.add(1, 'month');
      }
    };

    const prevYear = () => viewMonth.value = viewMonth.value.subtract(1, "year");
    const nextYear = () => viewMonth.value = viewMonth.value.add(1, "year");

    // 范围面板约束导航：left 隐藏“下一月/下一年”，right 隐藏“上一月/上一年”
    const hidePrev = computed(() => props.rangeSide === 'right');
    const hidePrevYear = computed(() => props.rangeSide === 'right');
    const hideNext = computed(() => props.rangeSide === 'left');
    const hideNextYear = computed(() => props.rangeSide === 'left');
    const navClass = (hidden: boolean) => hidden ? [e("nav"), m("hidden", true)] : e("nav");

    // 视图月份变化时向外通知（供范围面板联动）
    watch(viewMonth, (m) => emit("update:viewMonth", m.startOf("month")));

    /* ================== 核心：日历格子 ================== */
    const cells = computed<(Dayjs | null)[]>(() => {
      const type = props.type;
      const month = viewMonth.value;

      if (type === 'month') {
        // 12 months in the current year
        const yearStart = month.startOf('year');
        const arr: Dayjs[] = [];
        for (let i = 0; i < 12; i++) {
          arr.push(yearStart.add(i, 'month'));
        }
        return arr;
      }

      if (type === 'year') {
        // 10 years centered on the current decade
        const decadeStart = Math.floor(month.year() / 10) * 10;
        const arr: Dayjs[] = [];
        for (let i = 0; i < 10; i++) {
          arr.push(dayjs(new Date(decadeStart + i, 0, 1)));
        }
        return arr;
      }

      if (type === 'quarter') {
        // 4 quarters in the current year
        const yearStart = month.startOf('year');
        const arr: Dayjs[] = [];
        for (let i = 0; i < 4; i++) {
          arr.push(yearStart.add(i * 3, 'month'));
        }
        return arr;
      }

      // date / week: 42-day grid
      const first = month.startOf("month");

      // 按"周日起点"算 pad，locale 不改逻辑
      const pad = (first.day() + 7) % 7;

      const arr: (Dayjs | null)[] = [];

      if (props.showOtherMonth) {
        // 上个月最后 pad 天
        const prevEnd = month.subtract(1, "month").endOf("month");
        for (let i = pad - 1; i >= 0; i--) {
          arr.push(prevEnd.subtract(i, "day"));
        }
      } else {
        for (let i = 0; i < pad; i++) arr.push(null);
      }

      // 本月
      for (let d = 1; d <= first.daysInMonth(); d++) {
        arr.push(first.add(d - 1, "day"));
      }

      // 下个月补齐到 6 行
      if (props.showOtherMonth) {
        const nextStart = month.add(1, "month").startOf("month");
        let i = 0;
        while (arr.length < 42) {
          arr.push(nextStart.add(i, "day"));
          i++;
        }
      } else {
        while (arr.length < 42) arr.push(null);
      }

      return arr;
    });

    const isDisabled = (d: Dayjs): boolean => {
      const type = props.type;
      let unit: dayjs.ManipulateType;
      switch (type) {
        case 'month':
          unit = 'month';
          break;
        case 'year':
          unit = 'year';
          break;
        case 'quarter':
          unit = 'month';
          break;
        default:
          unit = 'day';
      }
      if (props.minDate && d.isBefore(props.minDate, unit)) return true;
      if (props.maxDate && d.isAfter(props.maxDate, unit)) return true;
      return false;
    };

    // 获取日期对应的标记
    const getMark = (d: Dayjs): DateMark | undefined => {
      const mmdd = d.format("MM-DD");
      return props.dateMarks.find((m) => {
        if (Array.isArray(m.date)) {
          // 范围标记
          const start = dayjs(m.date[0], "MM-DD");
          const end = dayjs(m.date[1], "MM-DD");
          const current = dayjs(mmdd, "MM-DD");
          return current.isAfter(start, "day") || current.isSame(start, "day")
            ? current.isBefore(end, "day") || current.isSame(end, "day")
            : false;
        }
        return m.date === mmdd;
      });
    };

    // week 模式下 hover 的周起始日期
    const hoverWeek = ref<Dayjs | null>(null);

    const cellClass = (d: Dayjs): string => {
      const today = dayjs();
      const isOther = !d.isSame(viewMonth.value, "month");

      // 多选模式：每个选中日期独立高亮（is-selected），互不关联
      if (props.multiple) {
        return [
          e("cell"),
          m("today", d.isSame(today, "day")),
          m("selected", isMultiSelected(d)),
          m("other-month", isOther),
        ].filter(Boolean).join(" ");
      }

      // 分段范围模式：每段独立 start/end/in-range 高亮
      if (props.segment) {
        return [
          e("cell"),
          m("today", d.isSame(today, "day")),
          m("other-month", isOther),
          ...segCellState(d),
        ].filter(Boolean).join(" ");
      }

      const s = resolvedStart.value;
      const end = resolvedEnd.value;

      // 范围选择：已选 start、尚未选 end 时，使用 rangeHover 作为预览结束日期
      let inRange = !!s && !!end && d.isAfter(s, "day") && d.isBefore(end, "day");
      let isStart = !!s && d.isSame(s, "day");
      let isEnd = !!end && d.isSame(end, "day");
      if (props.isRange && s && !end && props.rangeHover) {
        const h = toDayjs(props.rangeHover);
        if (h && !h.isSame(s, "day")) {
          const lo = s.isBefore(h, "day") ? s : h;
          const hi = s.isBefore(h, "day") ? h : s;
          inRange = d.isAfter(lo, "day") && d.isBefore(hi, "day");
          isStart = d.isSame(lo, "day");
          isEnd = d.isSame(hi, "day");
        }
      }

      // 判断一个日期是否落在某个周内，返回该周对应的起始/结束/中间类名
      const weekClasses = (weekRef: Dayjs | null): string[] => {
        if (!weekRef || props.type !== 'week') return [];
        const ws = weekRef.startOf('week');
        const we = weekRef.endOf('week');
        const inWeek = d.isAfter(ws, 'day') || d.isSame(ws, 'day')
          ? d.isBefore(we, 'day') || d.isSame(we, 'day')
          : false;
        if (!inWeek) return [];
        if (d.isSame(ws, 'day')) return ["week-start"];
        if (d.isSame(we, 'day')) return ["week-end"];
        return ["is-in-week"];
      };

      // 选中周的高亮（始终保留）与 hover 周的高亮（并存）
      const classes = [...weekClasses(s), ...weekClasses(hoverWeek.value)];

      return [
        e("cell"),
        m("today", d.isSame(today, "day")),
        m("start", isStart && props.type !== 'week'),
        m("end", isEnd && props.type !== 'week'),
        m("in-range", inRange),
        ...classes,
        m("other-month", isOther),
      ].filter(Boolean).join(" ");
    };

    // 月/年/季范围选择：计算宫格按钮的范围高亮类（is-start / is-end / is-in-range）
    const rangeModifiers = (d: Dayjs): string[] => {
      if (props.type !== 'month' && props.type !== 'year' && props.type !== 'quarter') return [];
      const unit = props.type === 'year'
        ? 'year'
        : props.type === 'quarter' ? 'quarter' : 'month';
      const s = resolvedStart.value;
      const end = resolvedEnd.value;
      let isStart = !!s && d.isSame(s, unit);
      let isEnd = !!end && d.isSame(end, unit);
      let inRange = !!s && !!end && d.isAfter(s, unit) && d.isBefore(end, unit);
      // 仅选开始且未选结束时，用 rangeHover 预览结束端
      if (props.isRange && s && !end && props.rangeHover) {
        const h = toDayjs(props.rangeHover);
        if (h && !h.isSame(s, unit)) {
          const lo = s.isBefore(h, unit) ? s : h;
          const hi = s.isBefore(h, unit) ? h : s;
          isStart = d.isSame(lo, unit);
          isEnd = d.isSame(hi, unit);
          inRange = d.isAfter(lo, unit) && d.isBefore(hi, unit);
        }
      }
      return [
        isStart && 'is-start',
        isEnd && 'is-end',
        inRange && 'is-in-range',
      ].filter(Boolean) as string[];
    };

    const onSelect = (date: Dayjs) => {
      if (isDisabled(date)) return;
      if (props.segment) {
        // 分段模式：内部维护成段/截断逻辑，向外上报新分段集合与被点击日期（不关闭面板）
        onSegmentPick(date);
        emit("select", date);
        return;
      }
      if (props.multiple) {
        // 多选：仅上报被点选的日期，由外层 KDatePicker 负责 toggle 入/出集合（不关闭面板）
        emit("select", date);
        return;
      }
      if (props.type === 'week') {
        // week 模式：选中周起始日
        const weekStart = date.startOf('week');
        emit("select", weekStart);
        emit("update:value", weekStart);
      } else {
        emit("select", date);
        emit("update:value", date);
      }
    };

    const onCellEnter = (d: Dayjs) => {
      if (props.segment) {
        // 分段模式：hover 用于待配对时的临时段预览（面板内部状态）
        segHover.value = d;
      } else if (props.type === 'week') {
        hoverWeek.value = d;
      } else if (props.isRange) {
        // 范围选择：hover 时预览结束日期
        emit("update:rangeHover", d);
      }
    };

    const onCellLeave = () => {
      // 不在格子级别清空，在面板级别清空
    };
    
    const onGridLeave = () => {
      if (props.segment) {
        segHover.value = null;
      } else if (props.type === 'week') {
        hoverWeek.value = null;
      } else if (props.isRange) {
        emit("update:rangeHover", null);
      }
    };

    // 根据 type 决定 grid 的列数
    const gridColumns = computed(() => {
      switch (props.type) {
        case 'month': return 4;
        case 'year': return 4;
        case 'quarter': return 2;
        default: return 7;
      }
    });

    // ========== 自定义单元格（cell 作用域插槽）==========
    // 供 slots.cell 使用的单元格作用域数据，日期格子与月/年/季宫格通用。
    const getCellScope = (d: Dayjs, type: DatePickerType) => {
      const today = dayjs();
      const unit = type === 'month' ? 'month' : type === 'year' ? 'year' : 'day';
      const isDateGrid = type === 'date' || type === 'week';

      // isSelected：区分日/周与月/年/季；多选模式命中已选集合；分段模式命中段端点
      let isSelected = false;
      let inRange = false;
      if (isDateGrid) {
        if (props.segment) {
          for (const [s, en] of localRanges.value) {
            if (d.isSame(s, 'day') || d.isSame(en, 'day')) isSelected = true;
            if (d.isAfter(s, 'day') && d.isBefore(en, 'day')) inRange = true;
          }
        } else if (props.multiple) {
          isSelected = isMultiSelected(d);
        } else {
          const s = resolvedStart.value;
          isSelected = props.type === 'week'
            ? !!s && d.isSame(s.startOf('week'), 'day')
            : !!s && d.isSame(s, 'day');
        }
      } else {
        const s = resolvedStart.value;
        isSelected = type === 'year'
          ? !!s && d.isSame(s, 'year')
          : !!s && d.isSame(s, 'month');
      }

      // inRange：复用 isDateGrid 的还是月/年/季的命中范围
      if (isDateGrid) {
        if (!props.segment) {
          const s = resolvedStart.value;
          const end = resolvedEnd.value;
          if (!!s && !!end && d.isAfter(s, 'day') && d.isBefore(end, 'day')) inRange = true;
          if (props.isRange && s && !end && props.rangeHover) {
            const h = toDayjs(props.rangeHover);
            if (h && !h.isSame(s, 'day')) {
              const lo = s.isBefore(h, 'day') ? s : h;
              const hi = s.isBefore(h, 'day') ? h : s;
              if (d.isAfter(lo, 'day') && d.isBefore(hi, 'day')) inRange = true;
            }
          }
        }
      } else {
        const s = resolvedStart.value;
        const end = resolvedEnd.value;
        if (!!s && !!end && d.isAfter(s, unit) && d.isBefore(end, unit)) inRange = true;
        if (props.isRange && s && !end && props.rangeHover) {
          const h = toDayjs(props.rangeHover);
          if (h && !h.isSame(s, unit)) {
            const lo = s.isBefore(h, unit) ? s : h;
            const hi = s.isBefore(h, unit) ? h : s;
            if (d.isAfter(lo, unit) && d.isBefore(hi, unit)) inRange = true;
          }
        }
      }

      const isCurrentMonth = isDateGrid
        ? d.isSame(viewMonth.value, 'month')
        : d.isSame(today, unit);

      // text：对齐 Element Plus 的 cell.text。date 为当天号数；month / quarter 为 0 起始索引
      // （0=1月、Q1）；year 为该年份本身（如 2026）。便于使用者做 "+1" 或直接展示。
      const text = isDateGrid
        ? d.date()
        : type === 'year'
          ? d.year()
          : type === 'month'
            ? d.month()
            : Math.floor(d.month() / 3);

      return {
        date: d,
        text,
        disabled: isDisabled(d),
        isToday: d.isSame(today, unit),
        isSelected,
        inRange,
        isCurrentMonth,
      };
    };

    // 自定义单元格的实现函数：优先使用透传的 cellRender prop，其次回退到自身 slots.cell。
    // 这样 KDatePicker 可通过普通 prop 可靠地把 #cell 作用域插槽传到面板，避开 JSX 插槽合并的不确定性。
    const cellScopeFn = computed<any>(() => props.cellRender ?? (slots.cell as any));

    const renderCell = (d: Dayjs | null) => {
      if (!d) {
        return <div class={e("empty")} />;
      }

      const type = props.type;

      // 渲染月/年/季面板的宫格按钮：宽度 100% 自适应，选中用 primary，当前用 plain
      if (type === 'month' || type === 'year' || type === 'quarter') {
        const s = resolvedStart.value;
        // 多选：命中已选集合即高亮
        const isSelected = props.multiple
          ? isMultiSelected(d)
          : type === 'year'
            ? !!s && d.isSame(s, 'year')
            : !!s && d.isSame(s, 'month');
        const isCurrent = type === 'year'
          ? d.isSame(dayjs(), 'year')
          : type === 'quarter'
            ? Math.floor(d.month() / 3) === Math.floor(dayjs().month() / 3) && d.isSame(dayjs(), 'year')
            : d.isSame(dayjs(), 'month');

        let label: string;
        if (type === 'month') label = MONTHS_SHORT[d.month()];
        else if (type === 'year') label = d.format('YYYY');
        else label = QUARTERS[Math.floor(d.month() / 3)];

        // cell 作用域插槽：命中时用自定义内容替换默认 label（若同时还有 renderDate 则仍追加在其下）
        const cellContent = cellScopeFn.value ? cellScopeFn.value(getCellScope(d, type)) : null;

        // 月/年/季宫格按钮：用普通 button，宽度贴合内容、在轨道内居中，
        // 避免 KButton 的固定 padding 挤压自定义 cell内容；hover/active/选中态样式在 scss 统一。
        const cellClasses = [
          e("non-day-cell"),
          m("selected", isSelected),
          m("current", isCurrent),
          ...rangeModifiers(d),
        ];
        return (
          <button
            type="button"
            class={cellClasses}
            disabled={isDisabled(d)}
            onClick={() => onSelect(d)}
            onMouseenter={() => onCellEnter(d)}
            onMouseleave={onCellLeave}
          >
            {cellContent ?? label}
            {!cellContent && props.renderDate?.(d)}
          </button>
        );
      }

      // date / week: day-level rendering (same as original)
      const mark = getMark(d);
      const tipContent = mark ? mark.tooltip || mark.label : undefined;

      // cell 作用域插槽：命中时用自定义内容替换默认日期数字（若同时还有 dateMarks / renderDate 仍在其下追加）
      const cellContent = cellScopeFn.value ? cellScopeFn.value(getCellScope(d, type)) : null;

      const cell = (
        <button
          type="button"
          class={cellClass(d)}
          disabled={isDisabled(d)}
          onClick={() => onSelect(d)}
          onMouseenter={() => onCellEnter(d)}
          onMouseleave={onCellLeave}
          style="display:flex;flex-direction:column;align-items:center;justify-content:center;"
        >
          {cellContent ?? <span>{d.date()}</span>}
          {mark ? (
            mark.type === 'label'
              ? <span class="holiday-label" style={{ ...(mark.color ? { color: mark.color } : {}), ...(mark.style || {}) } as any}>{mark.label}</span>
              : <span class="holiday-dot" style={{ ...(mark.color ? { background: mark.color } : {}), ...(mark.style || {}) } as any}></span>
          ) : !cellContent && props.renderDate?.(d)}
        </button>
      );

      if (tipContent) {
        return (
          <KTooltip content={tipContent} theme="dark" placement="top" autoFlip={false}>
            {cell}
          </KTooltip>
        );
      }
      return cell;
    };

    // 头部“上一组”单箭头（上一月/上一档）默认图标
    const renderDefaultArrowPrev = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );

    // 头部“下一组”单箭头（下一月/下一档）默认图标
    const renderDefaultArrowNext = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );

    // 头部“上一年”双箭头默认图标
    const renderDefaultArrowPrevYear = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9 12L5 8L9 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 12L9 8L13 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );

    // 头部“下一年”双箭头默认图标
    const renderDefaultArrowNextYear = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12L7 8L3 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 12L11 8L7 4" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );

    // 箭头图标解析：传了 renderXxx 且返回非空则用，否则回落默认图标
    const resolveArrowIcon = (fn: any, fallback: () => any, month: Dayjs, type: DatePickerType): any => {
      if (!fn) return fallback();
      return fn(month, type) ?? fallback();
    };

    return () => {
      const isDayGrid = props.type === 'date' || props.type === 'week';
      const cols = gridColumns.value;

      const body = (
        <div class={b()}>
          {/* 头部 */}
          <div class={e("header")}>
            <div class={e("nav-group")}>
              {props.showYearNav && (
                <button type="button" class={navClass(hidePrevYear.value)} aria-label="Previous year" onClick={prevYear}>
                  {resolveArrowIcon(props.renderHeaderPrevYear, renderDefaultArrowPrevYear, viewMonth.value, props.type)}
                </button>
              )}
              <button type="button" class={navClass(hidePrev.value)} aria-label="Previous" onClick={navPrev}>
                {resolveArrowIcon(props.renderHeaderPrev, renderDefaultArrowPrev, viewMonth.value, props.type)}
              </button>
            </div>

            {props.renderHeaderTitle ? (
              props.renderHeaderTitle(viewLabel.value, viewMonth.value, props.type) ?? (
                <span class={e("title")}>{viewLabel.value}</span>
              )
            ) : (
              <span class={e("title")}>{viewLabel.value}</span>
            )}

            <div class={e("nav-group")}>
              <button type="button" class={navClass(hideNext.value)} aria-label="Next" onClick={navNext}>
                {resolveArrowIcon(props.renderHeaderNext, renderDefaultArrowNext, viewMonth.value, props.type)}
              </button>
              {props.showYearNav && (
                <button type="button" class={navClass(hideNextYear.value)} aria-label="Next year" onClick={nextYear}>
                  {resolveArrowIcon(props.renderHeaderNextYear, renderDefaultArrowNextYear, viewMonth.value, props.type)}
                </button>
              )}
            </div>
          </div>

          {/* 星期（仅 date / week 显示） */}
          {isDayGrid && (
            <div class={e("weekdays")}>
              {WEEKDAYS.map(w => <span class={e("weekday")}>{w}</span>)}
            </div>
          )}

          {/* 格子 */}
          <div
            class={[e("grid"), isDayGrid ? "" : m("non-day", true), props.isRange && m("range", true)]}
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            onMouseleave={onGridLeave}
          >
            {cells.value.map((d) => renderCell(d))}
          </div>
        </div>
      );

      // bare：不包裹 KCard，仅渲染主体（范围面板并排时共用外层卡片）
      if (props.bare) return body;

      return (
        <KCard
          shadow={props.shadow}
          size={props.size}
          border={props.border}
          customClass={props.cardClass}
          style={{ width: props.width }}
        >
          {body}
        </KCard>
      );
    };
  },
});