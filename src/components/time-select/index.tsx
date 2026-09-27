/**
 * KTimeSelect — 时间选择（固定时间点）
 *
 * 类似 Element Plus 的 TimeSelect：通过 start / step / end 生成一组固定时间点，
 * 以 KSelect 下拉形式供用户点选，minTime / maxTime 可将范围外的选项置灰。
 * 基于 KSelect 封装，复用其 size / clearable / placement / 图标等基础能力。
 *
 * v-model 绑定 "HH:mm" 格式的时间字符串（与选项 value 一致）；
 * format 仅控制下拉项与触发框的展示文案。
 */
import {
  defineComponent,
  computed,
  type PropType,
} from "vue";
import KSelect from "@/components/select/index";
import type { SelectOption } from "@/components/select/types";
import type { PopperPlacement } from "@/components/popper/index";
import dayjs from "dayjs";
import "./index.scss";

/** 解析 "HH:mm" 为当天分钟数；非法输入返回 -1 */
const toMinutes = (t: string): number => {
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(t.trim());
  if (!m) return -1;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return -1;
  return h * 60 + min;
};

/** 分钟数转 "HH:mm" */
const toTimeText = (t: number): string =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

export default defineComponent({
  name: "KTimeSelect",
  props: {
    /** v-model 绑定值："HH:mm" 格式的时间字符串 */
    modelValue: { type: String, default: "" },
    /** 开始时间（"HH:mm"） */
    start: { type: String, default: "09:00" },
    /** 结束时间（"HH:mm"），默认不包含在选项中（includeEndTime 开启后包含） */
    end: { type: String, default: "18:00" },
    /** 步长间隔（"HH:mm"，仅取分钟差） */
    step: { type: String, default: "00:30" },
    /** 最早可选时间，早于该时间的选项置灰（"HH:mm"） */
    minTime: { type: String, default: "" },
    /** 最晚可选时间，晚于该时间的选项置灰（"HH:mm"） */
    maxTime: { type: String, default: "" },
    /** 是否在选项中包含 end 本身 */
    includeEndTime: { type: Boolean, default: true },
    /** 下拉项与触发框的展示格式（dayjs format） */
    format: { type: String, default: "HH:mm" },
    /** 占位文本 */
    placeholder: { type: String, default: "选择时间" },
    /** 尺寸（与 KSelect 保持一致） */
    size: { type: String as PropType<"small" | "default" | "large">, default: "default" },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否可清除 */
    clearable: { type: Boolean, default: true },
    /** 下拉面板弹出方向 */
    placement: { type: String as PropType<PopperPlacement>, default: "bottom-start" },
    /** 前缀图标名（触发框左侧） */
    prefixIcon: { type: String, default: "clock" },
    /** 清除按钮图标名 */
    clearIcon: { type: String, default: "close-bold" },
  },
  emits: ["update:modelValue", "change", "clear", "focus", "blur", "visible-change"],
  setup(props, { emit }) {
    // 由 start / step / end 生成固定时间点选项，minTime / maxTime 之外的置灰
    const options = computed<SelectOption[]>(() => {
      const startM = toMinutes(props.start);
      const endM = toMinutes(props.end);
      const stepM = toMinutes(props.step);
      // 任一边界非法或步长非正数时不生成选项，避免死循环
      if (startM < 0 || endM < 0 || stepM <= 0 || startM > endM) return [];
      const minM = toMinutes(props.minTime);
      const maxM = toMinutes(props.maxTime);
      const limit = props.includeEndTime ? endM : endM - 1;

      const list: SelectOption[] = [];
      for (let t = startM; t <= limit; t += stepM) {
        const value = toTimeText(t);
        const disabled =
          (minM >= 0 && t < minM) || (maxM >= 0 && t > maxM);
        list.push({
          value,
          label: dayjs().hour(Math.floor(t / 60)).minute(t % 60).format(props.format),
          disabled,
        });
      }
      return list;
    });

    const handleUpdate = (v: string) => emit("update:modelValue", v);

    return () => (
      <KSelect
        class="k-time-select"
        modelValue={props.modelValue}
        options={options.value}
        placeholder={props.placeholder}
        size={props.size}
        disabled={props.disabled}
        clearable={props.clearable}
        placement={props.placement}
        prefixIcon={props.prefixIcon}
        clearIcon={props.clearIcon}
        onUpdate:modelValue={handleUpdate}
        onChange={(v: string) => emit("change", v)}
        onClear={() => emit("clear")}
        onFocus={() => emit("focus")}
        onBlur={() => emit("blur")}
        onVisible-change={(v: boolean) => emit("visible-change", v)}
      />
    );
  },
});
