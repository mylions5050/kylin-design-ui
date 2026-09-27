import { ref } from 'vue'

// 单例状态：同一时刻全局只开一个 InfoPopover，开新关旧
export const activeId = ref<number | null>(null)

let seq = 0
export function nextId(): number {
  return seq++
}
