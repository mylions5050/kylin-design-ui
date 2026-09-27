import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Run `handler` whenever a `mousedown` lands outside `target`.
 *
 * @param target  ref to the element considered "inside"
 * @param handler called when the press is outside the target
 */
export function useOutsideClick(
  target: Ref<HTMLElement | null>,
  handler: () => void,
): void {
  function onMousedown(e: MouseEvent) {
    const el = target.value
    if (el && !el.contains(e.target as Node)) handler()
  }
  onMounted(() => document.addEventListener('mousedown', onMousedown))
  onUnmounted(() => document.removeEventListener('mousedown', onMousedown))
}
