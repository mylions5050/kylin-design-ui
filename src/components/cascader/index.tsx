import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  type PropType,
  type VNode,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KInput from '@/components/input/index'
import KIcon from '@/components/icon/index'
import KPopper from '@/components/popper/index'
import KScroll from '@/components/scrollbar/index'
import KCheckbox from '@/components/checkbox/index'
import KTag from '@/components/tag/index'
import KRadio from '@/components/radio/index'
import type {
  CascaderExpandTrigger,
  CascaderFieldNames,
  CascaderValue,
} from './types'
import './index.scss'

const [b, e] = createBem('k-cascader')

type RawOption = Record<string, any>
type Val = string | number

/**
 * Cascader 级联选择器。
 *
 * 触发器外观与 KSelect / KTreeSelect 一致；下拉面板按列展示各级选项，
 * 点击（或悬浮）带子级的选项逐级下钻，点击叶子节点完成选择。
 * 支持单选 / 多选（KCheckbox 勾选 + KTag 回显）、可选任意级（changeOnSelect）、
 * 自定义字段名（fieldNames）、自定义回显格式（displayRender）与尺寸。
 */
export default defineComponent({
  name: 'KCascader',
  props: {
    /** 级联数据源（嵌套结构，叶子节点的 value 为选中值） */
    options: { type: Array as PropType<RawOption[]>, required: true },
    /** 当前选中值（v-model）：单选为标量，多选为标量数组 */
    modelValue: { type: [String, Number, Array] as PropType<CascaderValue>, default: '' },
    /** 占位文本 */
    placeholder: { type: String, default: '请选择' },
    /** 是否多选：面板内以 KCheckbox 勾选，触发器以 KTag 回显 */
    multiple: { type: Boolean, default: false },
    /** 是否可选任意一级（点击父级也算选中并关闭面板） */
    changeOnSelect: { type: Boolean, default: false },
    /** 自定义 options 的字段名 */
    fieldNames: { type: Object as PropType<CascaderFieldNames>, default: undefined },
    /** 单选回显格式化：入参为各级 label 数组，返回展示文本 */
    displayRender: {
      type: Function as PropType<(labels: string[]) => string>,
      default: undefined,
    },
    /** 尺寸（透传触发器 KInput 与多选 KTag） */
    size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否可清空（悬浮触发器时出现清除图标） */
    clearable: { type: Boolean, default: false },
    /** 是否可搜索：触发器可输入关键字，面板平铺展示匹配叶子的完整路径（不区分大小写） */
    filterable: { type: Boolean, default: false },
    /** 触发器前缀图标（KIcon name） */
    prefixIcon: { type: String, default: '' },
    /** 触发器后缀展开箭头图标（KIcon name），默认 arrow-down */
    suffixIcon: { type: String, default: 'arrow-down' },
    /** 二级展开的触发方式 */
    expandTrigger: { type: String as PropType<CascaderExpandTrigger>, default: 'click' },
    /** 多选时触发器最多展示的 tag 数，超出折叠为 +N */
    maxTagCount: { type: Number, default: undefined },
    /** 下拉面板最大高度（每列） */
    maxHeight: { type: [String, Number], default: '240px' },
  },
  emits: [
    /** v-model：选中值变化时触发，单选载荷为标量、多选为标量数组 */
    'update:modelValue',
    /** 选中值变化时触发，载荷同 update:modelValue */
    'change',
    /** 单选选中节点时触发，载荷为完整路径选项数组（根 → 选中节点） */
    'select',
    /** 多选勾选发生变化时触发，载荷为（根 → 叶）路径选项数组的数组 */
    'check',
    /** 下拉面板展开/收起时触发，载荷为布尔值 */
    'visibleChange',
    /** 点击清空图标时触发 */
    'clear',
  ],
  setup(props, { emit }) {
    const triggerRef = ref<HTMLElement | null>(null)
    const visible = ref(false)
    /** 面板内已下钻的路径（各级选中的 value） */
    const path = ref<Val[]>([])
    /** 搜索关键字（filterable 开启时生效） */
    const query = ref('')

    /* ===================== 字段访问与数据查找 ===================== */

    const fieldName = computed(() => ({
      label: 'label',
      value: 'value',
      children: 'children',
      ...props.fieldNames,
    }))
    const labelOf = (o: RawOption): string => o[fieldName.value.label]
    const valueOf = (o: RawOption): Val => o[fieldName.value.value]
    const childrenOf = (o: RawOption): RawOption[] | undefined => o[fieldName.value.children]
    const disabledOf = (o: RawOption): boolean => !!o.disabled

    /** 在 options 中按 value 查找选项所在层级（DFS 记录路径） */
    const findPath = (nodes: RawOption[], value: Val, trail: RawOption[] = []): RawOption[] | undefined => {
      for (const node of nodes) {
        const next = [...trail, node]
        if (valueOf(node) === value) return next
        const kids = childrenOf(node)
        if (kids?.length) {
          const found = findPath(kids, value, next)
          if (found) return found
        }
      }
      return undefined
    }

    /** 单选：当前选中值的完整路径选项（根 → 叶） */
    const selectedPath = computed<RawOption[]>(() => {
      const v = props.modelValue
      if (props.multiple || v === '' || v == null) return []
      return findPath(props.options, v as Val) ?? []
    })

    /** 单选触发器回显文本：各级 label 以 " / " 连接，displayRender 可定制 */
    const displayText = computed(() => {
      const labels = selectedPath.value.map(labelOf)
      if (props.displayRender) return props.displayRender(labels)
      return labels.join(' / ')
    })

    /* ===================== 多选 ===================== */

    /** 多选选中集合 */
    const checkedValues = computed<Set<Val>>(() => {
      const v = props.modelValue
      return new Set(props.multiple && Array.isArray(v) ? v : [])
    })

    /** 节点子树内可选叶子（disabled 选项不参与勾选） */
    const selectableLeaves = (o: RawOption): Val[] => {
      if (disabledOf(o)) return []
      const kids = childrenOf(o)
      if (!kids?.length) return [valueOf(o)]
      return kids.flatMap(selectableLeaves)
    }

    /** 节点勾选状态：all 全选 / partial 半选 / none 未选 */
    const nodeCheckState = (o: RawOption): 'all' | 'partial' | 'none' => {
      const leaves = selectableLeaves(o)
      const set = checkedValues.value
      const count = leaves.filter((v) => set.has(v)).length
      if (!leaves.length || count === 0) return 'none'
      return count === leaves.length ? 'all' : 'partial'
    }

    /** 多选 tag 回显：按 modelValue 顺序还原每个选中叶子的路径文本 */
    const selectedTags = computed<{ value: Val; text: string }[]>(() => {
      const v = props.modelValue
      if (!props.multiple || !Array.isArray(v)) return []
      return v.flatMap((val) => {
        const p = findPath(props.options, val)
        return p ? [{ value: val, text: p.map(labelOf).join('/') }] : []
      })
    })

    const visibleTags = computed(() =>
      props.maxTagCount != null ? selectedTags.value.slice(0, props.maxTagCount) : selectedTags.value,
    )
    const restTagCount = computed(() => selectedTags.value.length - visibleTags.value.length)

    /** 多选勾选 / 取消一个节点（父级联动其子树叶子） */
    const toggleMultiple = (o: RawOption) => {
      const leaves = selectableLeaves(o)
      if (!leaves.length) return
      const set = new Set(checkedValues.value)
      const willCheck = nodeCheckState(o) !== 'all'
      if (willCheck) leaves.forEach((v) => set.add(v))
      else leaves.forEach((v) => set.delete(v))
      const arr = [...set]
      emit('update:modelValue', arr)
      emit('change', arr)
      // check 事件回传当前全部选中叶子的路径
      emit(
        'check',
        arr.map((v) => findPath(props.options, v) ?? []),
      )
    }

    /** 移除一个 tag（阻断冒泡，不切换面板） */
    const removeTag = (v: Val, ev: Event) => {
      ev.stopPropagation()
      const arr = [...checkedValues.value].filter((x) => x !== v)
      emit('update:modelValue', arr)
      emit('change', arr)
      emit(
        'check',
        arr.map((x) => findPath(props.options, x) ?? []),
      )
    }

    /* ===================== 搜索 ===================== */

    interface SearchItem {
      node: RawOption
      pathOptions: RawOption[]
      label: string
    }

    /** 是否处于搜索结果展示状态（输入了非空关键字） */
    const searching = computed(() => props.filterable && query.value.trim() !== '')

    /** 匹配关键字的叶子节点平铺列表（按完整路径匹配、不区分大小写） */
    const searchList = computed<SearchItem[]>(() => {
      if (!searching.value) return []
      const q = query.value.trim().toLowerCase()
      const result: SearchItem[] = []
      const walk = (nodes: RawOption[], trail: RawOption[]) => {
        for (const o of nodes) {
          const next = [...trail, o]
          const kids = childrenOf(o)
          if (kids?.length) {
            walk(kids, next)
          } else {
            const label = next.map(labelOf).join(' / ')
            if (label.toLowerCase().includes(q)) {
              result.push({ node: o, pathOptions: next, label })
            }
          }
        }
      }
      walk(props.options, [])
      return result
    })

    /** 搜索结果 label 渲染：匹配关键字片段高亮（不区分大小写） */
    const renderHl = (label: string, q: string) => {
      if (!q) return label
      const lower = label.toLowerCase()
      const ql = q.toLowerCase()
      const parts: VNode[] = []
      let idx = 0
      let found = lower.indexOf(ql)
      while (found !== -1) {
        if (found > idx) parts.push(<span>{label.slice(idx, found)}</span>)
        parts.push(<span class={e('option-hl')}>{label.slice(found, found + q.length)}</span>)
        idx = found + q.length
        found = lower.indexOf(ql, idx)
      }
      if (idx < label.length) parts.push(<span>{label.slice(idx)}</span>)
      return parts
    }

    /** 点击搜索结果项：单选提交并关面板；多选勾选后保持面板继续输入 */
    const handleSearchPick = (item: SearchItem) => {
      if (disabledOf(item.node)) return
      if (props.multiple) {
        toggleMultiple(item.node)
        return
      }
      emit('update:modelValue', valueOf(item.node))
      emit('change', valueOf(item.node))
      emit('select', item.pathOptions)
      close()
    }

    /* ===================== 面板列计算 ===================== */

    /** 面板当前应展示的各级列：根列 + 按 path 逐级下钻 */
    const columns = computed<RawOption[][]>(() => {
      const cols: RawOption[][] = [props.options]
      let cur = props.options
      for (const v of path.value) {
        const next = cur.find((o) => valueOf(o) === v) && childrenOf(cur.find((o) => valueOf(o) === v)!)
        if (!next?.length) break
        cols.push(next)
        cur = next
      }
      return cols
    })

    /* ===================== 显隐与交互 ===================== */

    const setVisible = (v: boolean) => {
      if (props.disabled) return
      visible.value = v
      if (v) {
        // 打开时回显已选路径便于继续浏览，并清空上一次的搜索关键字
        path.value = selectedPath.value.slice(0, -1).map(valueOf)
        query.value = ''
      }
      emit('visibleChange', v)
    }

    /** 上次 toggle 时间戳（参考 KSelect：150ms 内重复触发忽略，防 focus/click 竞态闪开闪关） */
    const lastToggleTime = ref(0)

    const handleTriggerClick = (ev: MouseEvent) => {
      const now = Date.now()
      if (lastToggleTime.value && now - lastToggleTime.value < 150) return
      lastToggleTime.value = now
      // 可搜索时开着面板点击输入框区域不关闭（对齐 KSelect：input 点击只负责打开），
      // 点击其他区域正常 toggle
      if (
        props.filterable &&
        (ev.target as HTMLElement | null)?.closest?.('input') &&
        visible.value
      ) {
        return
      }
      setVisible(!visible.value)
    }

    const close = () => {
      visible.value = false
      query.value = ''
      emit('visibleChange', false)
    }

    /** 输入关键字：确保面板展开（注意先展开再赋值，避免 setVisible 清空关键字） */
    const handleQueryInput = (v: string) => {
      if (!visible.value) setVisible(true)
      query.value = v
    }

    /** 下钻到某级（截断该级之后的路径） */
    const expandTo = (level: number, o: RawOption) => {
      path.value = [...path.value.slice(0, level), valueOf(o)]
    }

    /** 浏览路径是否已偏离当前选中路径（用于控制旧选中高亮的显隐） */
    const isOffSelectedPath = computed(() => {
      const sp = selectedPath.value.slice(0, -1).map(valueOf)
      if (path.value.length > sp.length) return true
      for (let i = 0; i < path.value.length; i++) {
        if (path.value[i] !== sp[i]) return true
      }
      return false
    })

    /** 依据面板路径 + 选中选项，还原完整路径选项数组（根 → 选中节点） */
    const resolvePathOptions = (level: number, node: RawOption): RawOption[] => {
      const result: RawOption[] = []
      let cur = props.options
      for (let i = 0; i < level; i++) {
        const opt = cur.find((o) => valueOf(o) === path.value[i])
        if (!opt) break
        result.push(opt)
        cur = childrenOf(opt) ?? []
      }
      result.push(node)
      return result
    }

    /** 提交单选选中值（不关面板） */
    const commit = (level: number, node: RawOption) => {
      emit('update:modelValue', valueOf(node))
      emit('change', valueOf(node))
      emit('select', resolvePathOptions(level, node))
    }

    /** 提交单选选中值并收起面板 */
    const finish = (level: number, node: RawOption) => {
      commit(level, node)
      close()
    }

    /** 点击 / 悬浮选项：多选下钻与勾选；changeOnSelect 选中并展示下一级；否则下钻 / 叶子选中 */
    const handleOption = (level: number, option: RawOption, byHover: boolean) => {
      if (disabledOf(option)) return
      const expandByHover = byHover && props.expandTrigger === 'hover'
      const kids = childrenOf(option)
      if (props.multiple) {
        // 多选：勾选由 checkbox / 叶子行点击处理，点击父级仅下钻展示下一级
        if (byHover) {
          if (expandByHover && kids?.length) expandTo(level, option)
          return
        }
        if (kids?.length) expandTo(level, option)
        else toggleMultiple(option)
        return
      }
      if (kids?.length) {
        if (props.changeOnSelect && !byHover) {
          // 可选任意一级：选中该级并保持面板展开、继续展示下一级
          commit(level, option)
          expandTo(level, option)
          return
        }
        if (!byHover || expandByHover) expandTo(level, option)
        return
      }
      if (byHover) return
      finish(level, option)
    }

    /** 下拉面板每列最大高度 */
    const maxHeightStyle = computed(() =>
      typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
    )

    /** 是否有选中值（决定清空图标显隐） */
    const hasValue = computed(() => {
      const v = props.modelValue
      return props.multiple ? Array.isArray(v) && v.length > 0 : v !== '' && v != null
    })

    /** 单选：该选项是否为当前已选路径上的节点（面板回显高亮 / KRadio 勾中） */
    const isOptionSelected = (level: number, option: RawOption): boolean => {
      // 浏览路径已偏离选中路径后，不再显示旧选中高亮（重新选择过程中旧高亮应清除）
      if (isOffSelectedPath.value) return false
      const node = selectedPath.value[level]
      return !!node && valueOf(node) === valueOf(option)
    }

    /** 清空选中（与 KSelect 一致：阻断冒泡，不切换面板） */
    const handleClearClick = (ev: MouseEvent) => {
      ev.stopPropagation()
      const empty = props.multiple ? [] : ''
      emit('update:modelValue', empty)
      emit('change', empty)
      emit('clear')
    }

    const onDocKeydown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && visible.value) close()
    }
    onMounted(() => document.addEventListener('keydown', onDocKeydown))
    onBeforeUnmount(() => document.removeEventListener('keydown', onDocKeydown))

    return () => (
      <div class={b()}>
        <div
          ref={triggerRef}
          class={[e('trigger'), props.disabled && 'is-disabled', visible.value && 'is-open']}
          onClick={handleTriggerClick}
        >
          {props.multiple ? (
            <div class={[e('tags'), `is-${props.size}`]}>
              {props.prefixIcon && (
                <KIcon name={props.prefixIcon} class={e('tags-prefix')} />
              )}
              {visibleTags.value.map((t) => (
                <KTag
                  key={t.value}
                  type="primary"
                  size={props.size === 'default' ? 'small' : props.size}
                  closable
                  onClose={(ev: Event) => removeTag(t.value, ev)}
                >
                  {t.text}
                </KTag>
              ))}
              {restTagCount.value > 0 && (
                <span class={e('tags-more')}>+{restTagCount.value}</span>
              )}
              {props.filterable && !props.disabled && (
                <input
                  class={e('tags-input')}
                  value={query.value}
                  placeholder={
                    !visibleTags.value.length && restTagCount.value === 0
                      ? props.placeholder
                      : ''
                  }
                  onInput={(ev: Event) => handleQueryInput((ev.target as HTMLInputElement).value)}
                  onKeydown={(ev: KeyboardEvent) => {
                    // 输入框为空时 Backspace 删除最后一个 tag（与 KSelect 行为一致）
                    if (ev.key === 'Backspace' && !query.value) {
                      const last = selectedTags.value[selectedTags.value.length - 1]
                      if (last) removeTag(last.value, ev)
                    }
                  }}
                />
              )}
              {!props.filterable && !visibleTags.value.length && restTagCount.value === 0 && (
                <span class={e('placeholder')}>{props.placeholder}</span>
              )}
            </div>
          ) : (
            <KInput
              readonly={!props.filterable}
              modelValue={props.filterable && visible.value ? query.value : displayText.value}
              placeholder={
                props.filterable && visible.value && displayText.value
                  ? displayText.value
                  : props.placeholder
              }
              disabled={props.disabled}
              size={props.size}
              prefixIcon={props.prefixIcon || undefined}
              onUpdate:modelValue={(v: string | number) => handleQueryInput(String(v))}
              class={e('input')}
            >
              {{
                // 单选：清空与展开箭头放入 KInput suffix 插槽，由 KInput 内部布局，
                // 避免绝对定位到 trigger 右侧而超出输入框（KInput 自带 max-width）
                suffix: () => (
                  <>
                    {props.clearable && hasValue.value && !props.disabled && (
                      <KIcon name="close-bold" class={e('clear')} onClick={handleClearClick} />
                    )}
                    <KIcon name={props.suffixIcon} class={[e('caret'), visible.value && 'is-open']} />
                  </>
                ),
              }}
            </KInput>
          )}
          {props.multiple && (
            <>
              {props.clearable && hasValue.value && !props.disabled && (
                <KIcon name="close-bold" class={e('clear')} onClick={handleClearClick} />
              )}
              <KIcon name={props.suffixIcon} class={[e('caret'), visible.value && 'is-open']} />
            </>
          )}
        </div>
        <KPopper
          visible={visible.value}
          onUpdate:visible={(v: boolean) => {
            if (!v && visible.value) close()
          }}
          triggerRef={triggerRef}
          scrollFollow={true}
          placement="bottom-start"
          transition="slide-fade"
        >
          <div class={e('panel')}>
            {searching.value ? (
              // 搜索结果列：平铺展示匹配叶子的完整路径
              <KScroll class={[e('col'), e('search')]} max-height={maxHeightStyle.value}>
                {searchList.value.length ? (
                  <ul class={e('column')}>
                    {searchList.value.map((item) => {
                      const state = props.multiple ? nodeCheckState(item.node) : 'none'
                      const isSelected =
                        !props.multiple && props.modelValue === valueOf(item.node)
                      return (
                        <li
                          key={valueOf(item.node)}
                          class={[
                            e('option'),
                            isSelected && 'is-selected',
                            disabledOf(item.node) && 'is-disabled',
                          ]}
                          onClick={() => handleSearchPick(item)}
                        >
                          {props.multiple ? (
                            // KCheckbox 自身会 stopPropagation，外层 span 收不到点击，
                            // 改为监听其 update:checked 触发勾选
                            <span class={e('option-check')}>
                              <KCheckbox
                                checked={state === 'all'}
                                indeterminate={state === 'partial'}
                                disabled={disabledOf(item.node)}
                                onUpdate:checked={() => toggleMultiple(item.node)}
                              />
                            </span>
                          ) : null}
                          <span class={e('option-label')}>
                            {renderHl(item.label, query.value.trim())}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div class={e('empty')}>
                    <KIcon name="column-horizontal" class={e('empty-icon')} />
                    <span>无匹配数据</span>
                  </div>
                )}
              </KScroll>
            ) : (
              columns.value.map((col, level) => (
              <KScroll key={level} class={e('col')} max-height={maxHeightStyle.value}>
                <ul class={e('column')}>
                  {col.map((option) => {
                    const state = props.multiple ? nodeCheckState(option) : 'none'
                    const isSelected = !props.multiple && isOptionSelected(level, option)
                    return (
                      <li
                        key={valueOf(option)}
                        class={[
                          e('option'),
                          (path.value[level] === valueOf(option) || isSelected) && 'is-selected',
                          disabledOf(option) && 'is-disabled',
                        ]}
                        onClick={() => handleOption(level, option, false)}
                        onMouseenter={() => handleOption(level, option, true)}
                      >
                        {props.multiple ? (
                          // KCheckbox 自身会 stopPropagation，外层 span 收不到点击，
                          // 改为监听其 update:checked 触发勾选
                          <span class={e('option-check')}>
                            <KCheckbox
                              checked={state === 'all'}
                              indeterminate={state === 'partial'}
                              disabled={disabledOf(option)}
                              onUpdate:checked={() => toggleMultiple(option)}
                            />
                          </span>
                        ) : (
                          props.changeOnSelect && (
                            // 可选任意一级时前置 KRadio 提示单选语义，勾选状态跟随已选路径
                            <KRadio
                              modelValue={(isSelected ? valueOf(option) : undefined) as never}
                              value={valueOf(option) as never}
                              disabled={disabledOf(option)}
                              class={e('option-radio')}
                            />
                          )
                        )}
                        <span class={e('option-label')}>{labelOf(option)}</span>
                        {!!childrenOf(option)?.length && (
                          <KIcon name="arrow-right-bold" class={e('option-arrow')} />
                        )}
                      </li>
                    )
                  })}
                </ul>
              </KScroll>
              ))
            )}
          </div>
        </KPopper>
      </div>
    )
  },
})
