import {
  defineComponent,
  computed,
  ref,
  watch,
  cloneVNode,
  type PropType,
  type VNodeChild,
  type CSSProperties,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KCheckbox from '@/components/checkbox/index'
import KButton from '@/components/button/index'
import KInput from '@/components/input/index'
import KIcon from '@/components/icon/index'
import KScroll from '@/components/scrollbar/index'
import KPagination from '@/components/pagination/index'
import type { TransferItem, TransferDirection, TransferKey } from './types'
import './index.scss'

const [b, e] = createBem('k-transfer')

/**
 * KTransfer —— 双栏穿梭选择框（交互参考 antd Transfer）。
 *
 * 左侧为源列表（未选中项）、右侧为目标列表（已选中项），中间放置穿梭按钮。
 * 展示顺序始终按 dataSource 的原始顺序，不随穿梭操作改变。
 *
 * 复用已有组件组合：KCheckbox（行勾选 / 表头全选与半选）、KButton（穿梭按钮）、
 * KInput（搜索框）、KScroll（列表滚动）、KPagination（分页）、KIcon。
 *
 * 常用交互：
 *  - 点击行内 KCheckbox 勾选（disabled 项不可勾选），表头 KCheckbox 控制当前列表全选 / 半选；
 *  - 中间按钮把勾选项在两栏间穿梭，无可移动项时按钮禁用；
 *  - showSearch 开启后每栏顶部出现搜索框，默认按 label 不区分大小写匹配，
 *    可用 filterOption 自定义过滤；全选范围是"过滤后"的可用项；
 *  - 两栏高度始终对齐：列表体固定 listHeight 高，不因某栏内容少而变矮。
 *
 * 高级能力：
 *  - actions 传字符串数组使用默认按钮并显示文字；传元素数组（VNode）直接作为操作按钮，
 *    组件会注入 disabled 与 onClick（可做带 loading 的自定义按钮）；
 *  - footer 插槽自定义面板底部；status 添加 error / warning 状态边框；
 *  - showPagination 开启分页（复用 KPagination），适配大数据量；
 *  - 默认作用域插槽可完全接管列表体（接收 direction / filteredItems / selectedKeys /
 *    onItemSelect / onItemSelectAll），配合 KTable / KTree 实现表格穿梭框、树穿梭框；
 *    全选等批量勾选用 onItemSelectAll(keys, selected) 一次同步，避免逐行更新；
 *  - classNames / styles 按 root / list / operation / item 语义化结构定制样式。
 */
export default defineComponent({
  name: 'KTransfer',
  props: {
    /** 全量数据源（顺序即展示顺序） */
    dataSource: {
      type: Array as PropType<TransferItem[]>,
      required: true,
      default: () => [],
    },
    /** 目标列表的 key 集合（v-model） */
    modelValue: {
      type: Array as PropType<TransferKey[]>,
      default: () => [],
    },
    /** 两栏标题，[源列表, 目标列表] */
    titles: {
      type: Array as PropType<string[]>,
      default: () => ['列表 1', '列表 2'],
    },
    /**
     * 自定义操作按钮：[右移, 左移]。
     * 传字符串数组时使用默认按钮并显示文字；传元素数组时直接渲染该元素
     * （组件注入 disabled 与 onClick，可用于带 loading 状态的自定义按钮）；不传只显示箭头。
     */
    actions: {
      type: Array as PropType<Array<string | VNodeChild>>,
      default: () => [],
    },
    /** 是否显示搜索框 */
    showSearch: { type: Boolean, default: false },
    /** 搜索框占位文本 */
    placeholder: { type: String, default: '请输入搜索内容' },
    /** 自定义搜索过滤：(输入关键字, 数据项) => 是否命中，默认按 label 不区分大小写 includes */
    filterOption: {
      type: Function as PropType<(inputValue: string, item: TransferItem) => boolean>,
      default: undefined,
    },
    /** 是否禁用整个穿梭框 */
    disabled: { type: Boolean, default: false },
    /** 列表可滚动区域高度（px），两栏列表体固定此高度保证对齐 */
    listHeight: { type: Number, default: 240 },
    /** 两栏均分剩余宽度（各 50% 扣除中间按钮列），适合表格穿梭框等宽内容场景；listStyle.width 设置后忽略此项 */
    equalWidth: { type: Boolean, default: false },
    /** 是否显示表头全选框 */
    showSelectAll: { type: Boolean, default: true },
    /** 状态样式：error / warning（面板边框着色），空字符串为默认 */
    status: {
      type: String as PropType<'' | 'error' | 'warning'>,
      default: '',
    },
    /** 面板宽高定制：{ width, height }；设置 height 后列表体自动撑满剩余空间 */
    listStyle: {
      type: Object as PropType<{ width?: number | string; height?: number | string }>,
      default: undefined,
    },
    /** 是否分页（大数据量场景，复用 KPagination） */
    showPagination: { type: Boolean, default: false },
    /** 每页条数（showPagination 时生效） */
    pageSize: { type: Number, default: 10 },
    /** 语义化结构类名：key 为 root / list / operation / item */
    classNames: {
      type: Object as PropType<Record<string, string>>,
      default: undefined,
    },
    /** 语义化结构样式：key 为 root / list / operation / item */
    styles: {
      type: Object as PropType<Record<string, CSSProperties>>,
      default: undefined,
    },
  },
  emits: {
    /** 值变化（v-model），参数：目标 key 集合 */
    'update:modelValue': (_keys: TransferKey[]) => true,
    /** 穿梭完成，参数：目标 key 集合、方向、本次移动的 key 集合 */
    change: (_keys: TransferKey[], _direction: TransferDirection, _moveKeys: TransferKey[]) => true,
    /** 勾选项变化，参数：[源列表勾选, 目标列表勾选] */
    selectChange: (_sourceChecked: TransferKey[], _targetChecked: TransferKey[]) => true,
    /** 搜索关键字变化，参数：方向、关键字 */
    search: (_direction: TransferDirection, _value: string) => true,
  },
  setup(props, { emit, slots }) {
    const targetKeySet = computed(() => new Set(props.modelValue))

    /** 源列表 / 目标列表勾选集合（用 Set 便于增删查） */
    const sourceChecked = ref(new Set<TransferKey>())
    const targetChecked = ref(new Set<TransferKey>())

    const sourceQuery = ref('')
    const targetQuery = ref('')

    /** 两栏各自分页页码（从 1 开始） */
    const sourcePage = ref(1)
    const targetPage = ref(1)

    /** 按 dataSource 原始顺序切分两栏数据 */
    const leftList = computed(() => props.dataSource.filter((i) => !targetKeySet.value.has(i.key)))
    const rightList = computed(() => props.dataSource.filter((i) => targetKeySet.value.has(i.key)))

    /** 单栏过滤逻辑：优先 filterOption，默认按 label 不区分大小写 includes */
    const matchItem = (query: string, item: TransferItem): boolean => {
      if (!query) return true
      if (props.filterOption) return props.filterOption(query, item)
      return item.label.toLowerCase().includes(query.trim().toLowerCase())
    }

    const filteredLeft = computed(() =>
      leftList.value.filter((i) => matchItem(sourceQuery.value, i)),
    )
    const filteredRight = computed(() =>
      rightList.value.filter((i) => matchItem(targetQuery.value, i)),
    )

    /** 分页：搜索关键字变化回到第一页；列表变化时收拢越界页码 */
    const totalPagesOf = (total: number) => Math.max(1, Math.ceil(total / props.pageSize))
    watch(sourceQuery, () => (sourcePage.value = 1))
    watch(targetQuery, () => (targetPage.value = 1))
    watch(filteredLeft, (v) => {
      if (sourcePage.value > totalPagesOf(v.length)) sourcePage.value = 1
    })
    watch(filteredRight, (v) => {
      if (targetPage.value > totalPagesOf(v.length)) targetPage.value = 1
    })

    const pagedOf = (list: TransferItem[], page: number): TransferItem[] =>
      props.showPagination ? list.slice((page - 1) * props.pageSize, page * props.pageSize) : list

    /** 某栏"过滤后可勾选项"（排除 disabled，全选 / 可移动判定都用它） */
    const selectableOf = (list: TransferItem[]): TransferItem[] =>
      list.filter((i) => !i.disabled)

    /** 表头全选框状态：勾中数 = 过滤后可用项总数 → 全选；> 0 → 半选（不受分页影响） */
    const headerStateOf = (checked: Set<TransferKey>, list: TransferItem[]) => {
      const selectable = selectableOf(list)
      const checkedCount = selectable.filter((i) => checked.has(i.key)).length
      return {
        checked: selectable.length > 0 && checkedCount === selectable.length,
        indeterminate: checkedCount > 0 && checkedCount < selectable.length,
        count: checkedCount,
      }
    }

    const sourceHeader = computed(() => headerStateOf(sourceChecked.value, filteredLeft.value))
    const targetHeader = computed(() => headerStateOf(targetChecked.value, filteredRight.value))

    /** 切换单行勾选（点击行任意位置均可，KCheckbox 自身 stopPropagation 不影响行内点击） */
    const toggleItem = (checked: Set<TransferKey>, key: TransferKey, next: boolean, side: 'source' | 'target') => {
      const n = new Set(checked)
      next ? n.add(key) : n.delete(key)
      if (side === 'source') sourceChecked.value = n
      else targetChecked.value = n
      emit('selectChange', [...sourceChecked.value], [...targetChecked.value])
    }

    /** 批量勾选 / 取消一批 key（单次状态更新，供表格穿梭框全选等场景一次性同步） */
    const toggleItems = (checked: Set<TransferKey>, keys: TransferKey[], next: boolean, side: 'source' | 'target') => {
      const n = new Set(checked)
      keys.forEach((k) => (next ? n.add(k) : n.delete(k)))
      if (side === 'source') sourceChecked.value = n
      else targetChecked.value = n
      emit('selectChange', [...sourceChecked.value], [...targetChecked.value])
    }

    /** 全选 / 取消全选当前栏过滤后的可用项（全选 → 取消；半选或未选 → 全选，antd 同款行为） */
    const toggleAll = (side: 'source' | 'target') => {
      const list = side === 'source' ? filteredLeft.value : filteredRight.value
      const header = side === 'source' ? sourceHeader.value : targetHeader.value
      const n = new Set<TransferKey>()
      if (!header.checked) selectableOf(list).forEach((i) => n.add(i.key))
      if (side === 'source') sourceChecked.value = n
      else targetChecked.value = n
      emit('selectChange', [...sourceChecked.value], [...targetChecked.value])
    }

    /** 当前栏是否存在可移动的勾选项（决定按钮可用性） */
    const canMove = (checked: Set<TransferKey>, list: TransferItem[]): boolean =>
      selectableOf(list).some((i) => checked.has(i.key))

    const canMoveRight = computed(() => canMove(sourceChecked.value, filteredLeft.value))
    const canMoveLeft = computed(() => canMove(targetChecked.value, filteredRight.value))

    /** 穿梭：收集可移动的勾选项，更新 targetKeys（保持 dataSource 原始顺序），清空对应勾选 */
    const moveTo = (direction: TransferDirection) => {
      const checked = direction === 'right' ? sourceChecked.value : targetChecked.value
      const list = direction === 'right' ? filteredLeft.value : filteredRight.value
      const moveKeys = selectableOf(list)
        .filter((i) => checked.has(i.key))
        .map((i) => i.key)
      if (!moveKeys.length) return

      const targetSet = new Set(props.modelValue)
      if (direction === 'right') moveKeys.forEach((k) => targetSet.add(k))
      else moveKeys.forEach((k) => targetSet.delete(k))

      // 统一按 dataSource 原始顺序输出，避免两栏内顺序错乱
      const keys = props.dataSource.filter((i) => targetSet.has(i.key)).map((i) => i.key)
      emit('update:modelValue', keys)
      emit('change', keys, direction, moveKeys)

      if (direction === 'right') sourceChecked.value = new Set()
      else targetChecked.value = new Set()
      emit('selectChange', [...sourceChecked.value], [...targetChecked.value])
    }

    const handleSearch = (side: 'source' | 'target', v: string) => {
      if (side === 'source') sourceQuery.value = v
      else targetQuery.value = v
      // 对外统一用穿梭方向：source → left（移回源列表方向），target → right
      emit('search', side === 'source' ? 'left' : 'right', v)
    }

    /** 单行渲染：有 item 插槽则自定义，否则渲染 label 文本 */
    const renderItem = (item: TransferItem): VNodeChild =>
      slots.item?.({ item }) ?? item.label

    /** 语义化结构的类名与样式（classNames / styles props） */
    const semClass = (key: string) => props.classNames?.[key]
    const semStyle = (key: string) => props.styles?.[key]

    /** 数值转带 px 的字符串（Vue 3 style 绑定不会自动加单位） */
    const px = (v?: number | string) => (typeof v === 'number' ? `${v}px` : v)

    /** 列表体高度：面板设置 height 后列表撑满剩余空间，否则固定 listHeight 保证两栏对齐 */
    const bodyStyle = computed<CSSProperties>(() =>
      props.listStyle?.height != null
        ? { flex: '1 1 0%', minHeight: 0 }
        : { height: `${props.listHeight}px` },
    )
    const scrollHeight = computed(() =>
      props.listStyle?.height != null ? '100%' : props.listHeight,
    )

    /** 面板尺寸样式：宽度始终生效；高度作为面板整体高度，列表体撑满剩余空间 */
    const panelStyle = computed<CSSProperties>(() => {
      const hasWidth = props.listStyle?.width != null
      return {
        width: px(props.listStyle?.width),
        height: px(props.listStyle?.height),
        // 宽度优先级：listStyle.width 固定 > equalWidth 均分 > 默认 340px
        flex: hasWidth ? 'none' : props.equalWidth ? '1 1 0%' : undefined,
      }
    })

    /** 面板列表体（默认插槽可完全接管，用于表格 / 树穿梭框） */
    const renderList = (
      list: TransferItem[],
      checked: Set<TransferKey>,
      side: 'source' | 'target',
    ) => {
      if (slots.default) {
        const direction: TransferDirection = side === 'source' ? 'left' : 'right'
        return slots.default({
          direction,
          filteredItems: list,
          selectedKeys: [...checked],
          onItemSelect: (key: TransferKey, selected: boolean) =>
            toggleItem(checked, key, selected, side),
          onItemSelectAll: (keys: TransferKey[], selected: boolean) =>
            toggleItems(checked, keys, selected, side),
          disabled: props.disabled,
        })
      }
      if (!list.length) {
        return (
          <div class={e('empty')}>
            <KIcon name="column-horizontal" class={e('empty-icon')} />
            <span>暂无数据</span>
          </div>
        )
      }
      return (
        <KScroll height={scrollHeight.value}>
          <ul class={[e('list'), semClass('list')]} style={semStyle('list')}>
            {list.map((item) => (
              <li
                key={item.key}
                class={[
                  e('item'),
                  semClass('item'),
                  item.disabled && 'is-disabled',
                  checked.has(item.key) && 'is-checked',
                ]}
                style={semStyle('item')}
                onClick={() => {
                  if (!props.disabled && !item.disabled) {
                    toggleItem(checked, item.key, !checked.has(item.key), side)
                  }
                }}
              >
                <KCheckbox
                  checked={checked.has(item.key)}
                  disabled={props.disabled || item.disabled}
                  onUpdate:checked={(next: boolean) => {
                    if (!props.disabled && !item.disabled) {
                      toggleItem(checked, item.key, next, side)
                    }
                  }}
                />
                <span class={e('item-label')}>{renderItem(item)}</span>
              </li>
            ))}
          </ul>
        </KScroll>
      )
    }

    /** 面板：标题头（全选 + 标题 + 计数）+ 搜索框 + 列表 + 分页 + footer 插槽 */
    const renderPanel = (side: 'source' | 'target') => {
      const isSource = side === 'source'
      const direction: TransferDirection = isSource ? 'left' : 'right'
      const fullList = isSource ? filteredLeft.value : filteredRight.value
      const list = pagedOf(fullList, isSource ? sourcePage.value : targetPage.value)
      const checked = isSource ? sourceChecked.value : targetChecked.value
      const header = isSource ? sourceHeader.value : targetHeader.value
      const title = props.titles[isSource ? 0 : 1] ?? ''
      const query = isSource ? sourceQuery.value : targetQuery.value
      return (
        <div class={e('panel')} style={panelStyle.value}>
          <div class={e('panel-header')}>
            {props.showSelectAll && (
              <KCheckbox
                checked={header.checked}
                indeterminate={header.indeterminate}
                disabled={props.disabled}
                onUpdate:checked={() => toggleAll(side)}
              />
            )}
            <span class={e('panel-title')}>{title}</span>
            <span class={e('panel-count')}>{header.count}/{selectableOf(fullList).length}</span>
          </div>
          {props.showSearch && (
            <div class={e('panel-search')}>
              <KInput
                modelValue={query}
                placeholder={props.placeholder}
                clearable
                disabled={props.disabled}
                prefixIcon="search"
                onUpdate:modelValue={(v: string | number) =>
                  handleSearch(side, String(v))
                }
              />
            </div>
          )}
          <div class={e('panel-body')} style={bodyStyle.value}>
            {renderList(list, checked, side)}
          </div>
          {props.showPagination && (
            <div class={e('panel-pagination')}>
              <KPagination
                simple
                currentPage={isSource ? sourcePage.value : targetPage.value}
                pageSize={props.pageSize}
                total={fullList.length}
                onPageChange={(p: number) =>
                  isSource ? (sourcePage.value = p) : (targetPage.value = p)
                }
              />
            </div>
          )}
          {slots.footer && (
            <div class={e('panel-footer')}>{slots.footer({ direction })}</div>
          )}
        </div>
      )
    }

    /**
     * 中间穿梭按钮区：actions[0] 右移、actions[1] 左移。
     * 字符串 → 默认按钮显示文字；元素（VNode）→ cloneVNode 注入 disabled / onClick，
     * 元素自身 onClick 保留（合并触发）；不传只显示箭头图标。
     */
    const renderAction = (action: string | VNodeChild | undefined, direction: TransferDirection) => {
      const can = direction === 'right' ? canMoveRight.value : canMoveLeft.value
      const disabled = props.disabled || !can
      if (action != null && typeof action !== 'string') {
        return cloneVNode(action as any, { disabled, onClick: () => moveTo(direction) })
      }
      if (action) {
        return (
          <KButton
            type="primary"
            plain
            disabled={disabled}
            onClick={() => moveTo(direction)}
          >
            {action}
          </KButton>
        )
      }
      return (
        <KButton
          type="primary"
          square
          width={32}
          height={32}
          disabled={disabled}
          onClick={() => moveTo(direction)}
        >
          <KIcon name={direction === 'right' ? 'arrow-right-bold' : 'arrow-left-bold'} />
        </KButton>
      )
    }

    const renderOperations = () => (
      <div class={[e('operations'), semClass('operation')]} style={semStyle('operation')}>
        {renderAction(props.actions[0], 'right')}
        {renderAction(props.actions[1], 'left')}
      </div>
    )

    return () => (
      <div
        class={[
          b(),
          props.disabled && 'is-disabled',
          props.status && `is-${props.status}`,
          semClass('root'),
        ]}
        style={{
          // listStyle.height 存在时（如 '100%'），根同步撑满外层容器，面板才有确定的父高
          height: props.listStyle?.height != null ? '100%' : undefined,
          ...semStyle('root'),
        }}
      >
        {renderPanel('source')}
        {renderOperations()}
        {renderPanel('target')}
      </div>
    )
  },
})
