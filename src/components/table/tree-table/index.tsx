import { defineComponent, ref, computed, type PropType, type VNode } from 'vue'
import { createBem } from '@/utils/create-bem'
import type { BaseTableColumn } from '../types'
import chevronDown from '@/assets/icons/chevron-down.svg?url'
import ScrollBar from '@/components/scrollbar/index'
import './index.scss'

const [b, e, m] = createBem('tree-table')

/**
 * Row shape tree-table recurses on. `children`/`hasChildren` drive the expand
 * model; the index signature keeps per-field access permissive for the
 * generic `rowKey` lookup and lazy-loaded children cases.
 */
export interface TreeTableRow {
  children?: TreeTableRow[]
  hasChildren?: boolean
  [key: string]: any
}

// Internal alias so the non-generic setup body reads cleanly.
type TreeNode = TreeTableRow

const _TreeTable = defineComponent({
  name: 'TreeTable',
  props: {
    data: { type: Array as PropType<TreeNode[]>, required: true },
    columns: { type: Array as PropType<BaseTableColumn<TreeNode>[]>, required: true },
    rowKey: { type: String, default: 'id' },
    lazy: { type: Boolean, default: false },
    load: {
      type: Function as PropType<
        (row: TreeNode, resolve: (children: TreeNode[]) => void) => void
      >,
      default: undefined,
    },
    indent: { type: Number, default: 20 },
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    maxHeight: { type: [Number, String] as PropType<number | string>, default: undefined },
  },
  setup(props) {
    const expandedKeys = ref<Set<string | number>>(new Set())
    const loadingKeys = ref<Set<string | number>>(new Set())
    const childrenMap = ref<Record<string | number, TreeNode[]>>({})

    const getChildren = (row: TreeNode) =>
      row.children?.length ? row.children : childrenMap.value[row[props.rowKey]] ?? []

    /** Whether this row has children to expand (loaded, known from data, or declared via `hasChildren` for lazy load). */
    const hasChildren = (row: TreeNode) =>
      !!(
        row.children?.length ||
        childrenMap.value[row[props.rowKey]]?.length ||
        (props.lazy && row.hasChildren)
      )

    /** Flatten the tree into visible rows (depth-first, honoring expanded state). */
    const flatRows = computed(() => {
      const result: { row: TreeNode; level: number }[] = []
      const walk = (nodes: TreeNode[], level: number) => {
        nodes.forEach((node) => {
          result.push({ row: node, level })
          if (expandedKeys.value.has(node[props.rowKey])) {
            walk(getChildren(node), level + 1)
          }
        })
      }
      walk(props.data, 0)
      return result
    })

    const isExpanded = (row: TreeNode) => expandedKeys.value.has(row[props.rowKey])

    /** Toggle expansion; for lazy rows with `hasChildren`, trigger `load` and cache the result. */
    const toggle = (row: TreeNode) => {
      const key = row[props.rowKey]
      if (expandedKeys.value.has(key)) {
        expandedKeys.value.delete(key)
        expandedKeys.value = new Set(expandedKeys.value)
        return
      }
      if (
        props.lazy &&
        props.load &&
        row.hasChildren &&
        !getChildren(row).length &&
        !childrenMap.value[key]
      ) {
        loadingKeys.value.add(key)
        loadingKeys.value = new Set(loadingKeys.value)
        props.load(row, (children) => {
          childrenMap.value = { ...childrenMap.value, [key]: children }
          loadingKeys.value.delete(key)
          loadingKeys.value = new Set(loadingKeys.value)
          expandedKeys.value.add(key)
          expandedKeys.value = new Set(expandedKeys.value)
        })
        return
      }
      expandedKeys.value.add(key)
      expandedKeys.value = new Set(expandedKeys.value)
    }

    return () => (
      <ScrollBar height={props.height} maxHeight={props.maxHeight} class={b()}>
        <table class={e('table')}>
          <thead>
            <tr>
              {props.columns.map((col) => (
                <th key={col.field}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flatRows.value.map(({ row, level }) => (
              <tr key={row[props.rowKey]}>
                {props.columns.map((col, idx) => (
                  <td key={col.field}>
                    {idx === 0 ? (
                      <span
                        style={{ paddingLeft: `${level * props.indent}px` }}
                        class={e('cell')}
                      >
                        {hasChildren(row) ? (
                          <img
                            src={chevronDown}
                            class={[e('toggle'), m('open', isExpanded(row))]}
                            alt=""
                            onClick={() => toggle(row)}
                          />
                        ) : (
                          <span class={e('toggle-placeholder')} />
                        )}
                        {loadingKeys.value.has(row[props.rowKey])
                          ? '加载中...'
                          : row[col.field ?? '']}
                      </span>
                    ) : (
                      row[col.field ?? '']
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollBar>
    )
  },
})

// Public generic JSX signature: <TreeTable :data="rows" :columns="cols" />
// infers T from `data` (T[]) and `columns` (BaseTableColumn<T>[]).
export type TreeTableProps<T extends TreeTableRow = TreeTableRow> = {
  data: T[]
  columns: BaseTableColumn<T>[]
  rowKey?: string
  lazy?: boolean
  load?: (row: T, resolve: (children: T[]) => void) => void
  indent?: number
  height?: number | string
  maxHeight?: number | string
}

export default _TreeTable as unknown as <T extends TreeTableRow = TreeTableRow>(
  props: TreeTableProps<T>,
) => VNode
