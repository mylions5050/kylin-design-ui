import { ref } from 'vue'
import type { ColModal, ColumnType } from './types'
import type { TreeRows } from './useTreeRows'

/**
 * 弹窗隐藏后的兜底表单数据：KDialog 常驻渲染（保证离场动画），
 * 动画结束清数据前 slot 仍会以空态执行一次
 */
export const EMPTY_COL_MODAL: ColModal = { mode: 'create', name: '', type: 'text', submit: () => {} }

/**
 * Column-config modal layer: the add/edit column dialog. `openCreateModal`
 * takes a submit callback that knows where to insert (append / left / right);
 * `openEditModal` pre-fills (echoes) the targeted column.
 *
 * 关闭分两步：先 `modalVisible = false` 让 KDialog 播完离场动画，
 * 动画结束（onClosed）后调 `clearModal` 清数据——若直接置 null 会同步卸载
 * KDialog，离场动画被跳过。
 */
export function useColumnModal(treeRows: TreeRows) {
  const colModal = ref<ColModal | null>(null)
  const modalVisible = ref(false)

  function openCreateModal(submit: (name: string, type: ColumnType) => void) {
    colModal.value = { mode: 'create', name: '', type: 'text', submit }
    modalVisible.value = true
  }
  function openEditModal(c: number) {
    const col = treeRows.columns.value[c]
    colModal.value = {
      mode: 'edit',
      name: col.name,
      type: col.type,
      submit: (name, type) => {
        treeRows.columns.value[c] = { name, type }
      },
    }
    modalVisible.value = true
  }
  function confirmColModal() {
    const m = colModal.value
    if (!m) return
    const name = m.name.trim()
    if (!name) return
    m.submit(name, m.type)
    modalVisible.value = false
  }
  function cancelColModal() {
    modalVisible.value = false
  }
  /** 离场动画结束后清数据（KDialog onClosed 回调） */
  function clearModal() {
    colModal.value = null
  }

  return {
    colModal,
    modalVisible,
    openCreateModal,
    openEditModal,
    confirmColModal,
    cancelColModal,
    clearModal,
  }
}
