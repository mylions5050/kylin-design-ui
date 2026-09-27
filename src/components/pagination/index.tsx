import { defineComponent, computed, ref, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import KInput from '@/components/input/index'
import KSelect from '@/components/select/index'
import './index.scss'

const [b, e, m, v] = createBem('pagination')

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    total: { type: Number, required: true },
    entityLabel: { type: String, default: undefined },
    /** 是否显示快速跳转（第一页/最后一页） */
    showQuickJumper: { type: Boolean, default: false },
    /** 是否显示每页条数切换器 */
    showSizeChanger: { type: Boolean, default: false },
    /** 极简模式：仅「< 输入页码 / 总页数 >」，适合穿梭框等窄空间场景 */
    simple: { type: Boolean, default: false },
    /** 尺寸：default 32px 按钮 / small 24px 按钮，适合表格、穿梭框等紧凑场景 */
    size: {
      type: String as PropType<'default' | 'small'>,
      default: 'default',
    },
    /** 每页条数选项 */
    pageSizeOptions: {
      type: Array as () => number[],
      default: () => [10, 20, 50, 100],
    },
  },
  emits: ['change', 'pageChange', 'update:pageSize'],
  setup(props, { emit, slots }) {
    /* ================== 极简模式状态 ================== */
    /** 编辑中的页码暂存（空字符串表示未编辑，展示当前页） */
    const simpleInput = ref('')

    /** 回车（原生 change） / 失焦提交：解析输入页码并夹取到 [1, 总页数]，非法输入还原当前页 */
    const commitSimple = () => {
      const v = parseInt(simpleInput.value, 10)
      if (!Number.isNaN(v)) go(v)
      simpleInput.value = ''
    }

    const totalPages = computed(() =>
      props.pageSize > 0 ? Math.max(1, Math.ceil(props.total / props.pageSize)) : 1,
    )
    const rangeStart = computed(() =>
      props.total === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1,
    )
    const rangeEnd = computed(() => Math.min(props.currentPage * props.pageSize, props.total))

    const pageList = computed<(number | '...')[]>(() => {
      const tp = totalPages.value
      const cur = props.currentPage
      if (tp <= 7) return Array.from({ length: tp }, (_, i) => i + 1)
      const out: (number | '...')[] = [1]
      const left = Math.max(2, cur - 1)
      const right = Math.min(tp - 1, cur + 1)
      if (left > 2) out.push('...')
      for (let i = left; i <= right; i++) out.push(i)
      if (right < tp - 1) out.push('...')
      out.push(tp)
      return out
    })

    const sizeOptions = computed(() =>
      props.pageSizeOptions.map((s) => ({ value: s, label: `${s} 条/页` })),
    )

    function go(p: number) {
      const tp = totalPages.value
      if (tp <= 1) return
      const clamped = Math.min(Math.max(1, p), tp)
      if (clamped === props.currentPage) return
      const payload = { page: clamped, pageSize: props.pageSize }
      emit('change', payload)
      emit('pageChange', clamped)
    }

    function onPageSizeChange(val: string | number) {
      const size = Number(val)
      if (size === props.pageSize) return
      emit('update:pageSize', size)
      const payload = { page: 1, pageSize: size }
      emit('change', payload)
      emit('pageChange', 1)
    }

    const ChevronLeft = () => (
      <span style="display:inline-flex;transform:scaleX(-1)"><KIcon name="arrow-right" size={12} /></span>
    )
    const ChevronRight = () => (
      <KIcon name="arrow-right" size={12} />
    )

    return () => {
      const tp = totalPages.value
      const isFirst = props.currentPage <= 1
      const isLast = props.currentPage >= tp

      // 极简模式：「< [页码输入框] / 总页数 >」，回车或失焦跳转
      if (props.simple) {
        return (
          <div class={[b(), v('simple', true), v('small', props.size === 'small')]}>
            <KButton
              text
              aria-label="上一页"
              disabled={isFirst}
              class={[e('btn'), e('btn--nav'), m('inactive', isFirst)]}
              onClick={() => go(props.currentPage - 1)}
            >
              <ChevronLeft />
            </KButton>
            <div class={e('simple-input')}>
              <KInput
                modelValue={simpleInput.value || String(props.currentPage)}
                onUpdate:modelValue={(val: string | number) => (simpleInput.value = String(val))}
                onChange={() => commitSimple()}
                onBlur={() => commitSimple()}
              />
            </div>
            <span class={e('simple-sep')}>/</span>
            <span class={e('simple-total')}>{tp}</span>
            <KButton
              text
              aria-label="下一页"
              disabled={isLast}
              class={[e('btn'), e('btn--nav'), m('inactive', isLast)]}
              onClick={() => go(props.currentPage + 1)}
            >
              <ChevronRight />
            </KButton>
          </div>
        )
      }

      return (
        <div class={[b(), v('small', props.size === 'small')]}>
          <span class={e('summary')}>
            {slots.summary?.() ?? `${rangeStart.value} - ${rangeEnd.value} / ${props.total} ${props.entityLabel ?? '条'}`}
          </span>
          <div class={e('controls')}>
            {/* 左侧箭头组：双左箭头 + 左箭头 */}
            <span class={e('arrow-group')}>
              {props.showQuickJumper && (
                <KButton
                  text
                  aria-label="第一页"
                  disabled={isFirst}
                  class={[e('btn'), e('btn--nav')]}
                  onClick={() => go(1)}
                >
                  <KIcon name="arrow-double-left" size={14} />
                </KButton>
              )}
              <KButton
                text
                aria-label="上一页"
                disabled={isFirst}
                class={[e('btn'), e('btn--nav'), m('inactive', isFirst)]}
                onClick={() => go(props.currentPage - 1)}
              >
                <ChevronLeft />
              </KButton>
            </span>

            {/* 页码 */}
            {pageList.value.map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} class={e('ellipsis')}><KIcon name="elipsis" size={14} /></span>
              ) : (
                <KButton
                  key={`p-${p}`}
                  disabled={p === props.currentPage}
                  class={[e('btn'), m('active', p === props.currentPage)]}
                  onClick={() => go(p)}
                >
                  {p}
                </KButton>
              ),
            )}

            {/* 右侧箭头组：右箭头 + 双右箭头 */}
            <span class={e('arrow-group')}>
              <KButton
                text
                aria-label="下一页"
                disabled={isLast}
                class={[e('btn'), e('btn--nav'), m('inactive', isLast)]}
                onClick={() => go(props.currentPage + 1)}
              >
                <ChevronRight />
              </KButton>
              {props.showQuickJumper && (
                <KButton
                  text
                  aria-label="最后一页"
                  disabled={isLast}
                  class={[e('btn'), e('btn--nav')]}
                  onClick={() => go(tp)}
                >
                  <KIcon name="arrow-double-right" size={14} />
                </KButton>
              )}
            </span>

            {/* 右侧每页条数切换 */}
            {props.showSizeChanger && (
              <div class={e('size-changer')}>
                <KSelect
                  modelValue={props.pageSize}
                  options={sizeOptions.value}
                  onChange={onPageSizeChange}
                />
              </div>
            )}
          </div>
        </div>
      )
    }
  },
})