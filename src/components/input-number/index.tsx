import { computed, defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import KInput from '@/components/input/index'
import KIcon from '@/components/icon/index'
import { createBem } from '@/utils/create-bem'
import './index.scss'

const [b, e, m, v] = createBem('k-input-number')

/** 悬浮精度修正：消除 0.1 + 0.2 之类的浮点误差，再交给 toFixed */
const floatFix = (n: number) => Number(n.toFixed(10))

export default defineComponent({
  name: 'KInputNumber',
  props: {
    /** 绑定值（number）；清空输入框时为 null */
    modelValue: { type: Number as PropType<number | null | undefined>, default: undefined },
    /** 允许的最小值（失焦与步进时收敛） */
    min: { type: Number, default: -Infinity },
    /** 允许的最大值（失焦与步进时收敛） */
    max: { type: Number, default: Infinity },
    /** 步长，可以是小数 */
    step: { type: Number, default: 1 },
    /** 数值精度（小数位数），展示与步进结果都按它取齐 */
    precision: { type: Number, default: undefined },
    /** 是否显示增减按钮 */
    controls: { type: Boolean, default: true },
    /** 增减按钮位置：default 左右两侧灰底按钮 / right 右侧上下箭头（hover 或聚焦时出现） */
    controlsPosition: {
      type: String as PropType<'default' | 'right'>,
      default: 'default',
    },
    /** 格式化展示（非输入态生效），如千分位：value => value.toLocaleString() */
    formatter: { type: Function as PropType<(value: number) => string>, default: undefined },
    /** 解析用户输入为数值，与 formatter 搭配使用，如去掉千分位逗号 */
    parser: { type: Function as PropType<(value: string) => number>, default: undefined },
    /** 状态：primary / error / warning / success / info，控制边框与聚焦阴影颜色 */
    status: {
      type: String as PropType<'' | 'primary' | 'error' | 'warning' | 'success' | 'info'>,
      default: '',
    },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    size: {
      type: String as () => 'small' | 'default' | 'large',
      default: 'default',
    },
  },
  emits: ['update:modelValue', 'change', 'blur', 'focus'],
  setup(props, { emit, slots }) {
    const focused = ref(false)
    /* 用户正在输入的原始内容；null 表示未在输入，此时展示格式化后的值 */
    const userInput = ref<string | null>(null)

    const format = (n: number) =>
      props.precision != null ? n.toFixed(props.precision) : String(n)

    /* 展示值：输入中显示原始内容，否则显示 formatter / 精度处理后的值 */
    const display = computed(() => {
      if (focused.value && userInput.value != null) return userInput.value
      if (props.modelValue == null) return ''
      return props.formatter ? props.formatter(props.modelValue) : format(props.modelValue)
    })

    const parse = (s: string): number | null => {
      const t = s.trim()
      if (t === '' || t === '-' || t === '.') return null
      const n = props.parser ? props.parser(t) : Number(t)
      return typeof n === 'number' && Number.isNaN(n) ? null : n
    }

    const clamp = (n: number) => {
      let v = Math.min(Math.max(n, props.min), props.max)
      if (props.precision != null) v = Number(v.toFixed(props.precision))
      return v
    }

    const emitValue = (n: number | null) => {
      if (n !== props.modelValue) {
        emit('update:modelValue', n)
        emit('change', n)
      }
    }

    /* ================= 输入 ================= */

    const handleInput = (val: string) => {
      userInput.value = val
      const n = parse(val)
      if (n === null) {
        /* 清空或中间态（"-" / 无效字符）：仅清空时对外同步 null */
        if (val.trim() === '' && props.modelValue != null) {
          emit('update:modelValue', null)
          emit('change', null)
        }
        return
      }
      emitValue(floatFix(n))
    }

    const handleFocus = () => {
      focused.value = true
      emit('focus')
    }

    /* ================= 失焦收敛 ================= */

    const handleBlur = () => {
      focused.value = false
      if (userInput.value != null) {
        const n = parse(userInput.value)
        if (n !== null) {
          emitValue(clamp(floatFix(n)))
        }
        /* 无效内容不提交：userInput 置空后展示值自动回退为当前绑定值 */
        userInput.value = null
      }
      emit('blur')
    }

    /* ================= 步进 ================= */

    /* 空值时的步进基准：有 min 从 min 起步，否则从 0 起步 */
    const stepBase = computed(() =>
      props.modelValue != null ? props.modelValue : Number.isFinite(props.min) ? props.min : 0,
    )

    const minusDisabled = computed(
      () =>
        props.disabled ||
        props.readonly ||
        (props.modelValue != null && props.modelValue <= props.min),
    )
    const plusDisabled = computed(
      () =>
        props.disabled ||
        props.readonly ||
        (props.modelValue != null && props.modelValue >= props.max),
    )

    const onStep = (dir: 1 | -1) => () => {
      if (props.disabled || props.readonly) return
      emitValue(clamp(floatFix(stepBase.value + dir * props.step)))
      userInput.value = null
    }

    const showControls = computed(() => props.controls && !props.readonly)
    const isRight = computed(() => props.controlsPosition === 'right')

    /* ================= 按钮 ================= */

    const renderMinus = () => (
      <span
        class={[e('btn'), e('btn-minus'), m('disabled', minusDisabled.value)]}
        onClick={onStep(-1)}
      >
        <KIcon name="minus-bold" />
      </span>
    )

    const renderPlus = () => (
      <span
        class={[e('btn'), e('btn-plus'), m('disabled', plusDisabled.value)]}
        onClick={onStep(1)}
      >
        <KIcon name="add-bold" />
      </span>
    )

    /* 右侧上下箭头（上下堆叠） */
    const renderRightControls = () => (
      <span class={e('controls')}>
        <span
          class={[e('btn'), e('btn-up'), m('disabled', plusDisabled.value)]}
          onClick={onStep(1)}
        >
          <KIcon name="arrow-up-bold" />
        </span>
        <span
          class={[e('btn'), e('btn-down'), m('disabled', minusDisabled.value)]}
          onClick={onStep(-1)}
        >
          <KIcon name="arrow-down-bold" />
        </span>
      </span>
    )

    return () => (
      <div
        class={[
          b(),
          v('controls-left', showControls.value && !isRight.value),
          v('controls-right', showControls.value && isRight.value),
          v(`status-${props.status}`, props.status !== ''),
          v('has-prefix-suffix', !!slots.prefix || !!slots.suffix),
          m('focused', focused.value),
          m('disabled', props.disabled),
        ]}
      >
        <KInput
          modelValue={display.value}
          onUpdate:modelValue={handleInput}
          type="text"
          size={props.size}
          disabled={props.disabled}
          readonly={props.readonly}
          placeholder={props.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {{
            prefix: () => (
              <>
                {showControls.value && !isRight.value && renderMinus()}
                {slots.prefix && <span class={e('prefix')}>{slots.prefix()}</span>}
              </>
            ),
            suffix: () => (
              <>
                {slots.suffix && <span class={e('suffix')}>{slots.suffix()}</span>}
                {showControls.value &&
                  (isRight.value ? renderRightControls() : renderPlus())}
              </>
            ),
          }}
        </KInput>
      </div>
    )
  },
})
