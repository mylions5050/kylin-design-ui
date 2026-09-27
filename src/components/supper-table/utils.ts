import type { RowNode } from './types'

let _id = 0

/** Monotonic id generator for row nodes (used as stable Vue keys). */
export function newId(): number {
  return ++_id
}

/** Create an empty row with `colCount` blank cells. */
export function newRow(colCount: number): RowNode {
  return {
    id: newId(),
    cells: Array.from({ length: colCount }, () => ''),
    children: [],
  }
}

/** Deep-clone a row (new ids, cells and subtree copied). */
export function cloneRow(node: RowNode): RowNode {
  return {
    id: newId(),
    cells: [...node.cells],
    children: node.children.map(cloneRow),
  }
}

/** Visit every node in the tree (depth-first), including nested children. */
export function forEachNode(
  list: RowNode[],
  fn: (n: RowNode) => void,
): void {
  list.forEach((n) => {
    fn(n)
    if (n.children.length) forEachNode(n.children, fn)
  })
}
