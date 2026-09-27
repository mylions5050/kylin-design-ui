/**
 * 防抖（Debounce）—— 连续触发时，只在最后一次触发后等待 `delay` 毫秒再执行。
 *
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒），默认 300
 * @returns 防抖后的函数，附带 `cancel` 方法用于取消 pending 调用
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((q: string) => fetchResults(q), 300)
 * debouncedSearch('a')
 * debouncedSearch('ab')
 * debouncedSearch('abc')  // 只触发最后一次，300ms 后执行
 * debouncedSearch.cancel() // 取消 pending 调用
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = function (this: any, ...args: any[]) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounced as T & { cancel: () => void }
}

/**
 * 节流（Throttle）—— 连续触发时，保证在 `interval` 时间内至少执行一次。
 *
 * 适用于滚动 resize、鼠标移动等高频事件。
 *
 * @param fn - 需要节流的函数
 * @param interval - 时间间隔（毫秒），默认 300
 * @returns 节流后的函数，附带 `cancel` 方法用于取消 pending 调用
 *
 * @example
 * ```ts
 * const throttledScroll = throttle(() => handleScroll(), 100)
 * window.addEventListener('scroll', throttledScroll)
 * throttledScroll.cancel()
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number = 300,
): T & { cancel: () => void } {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    const remaining = interval - (now - lastTime)

    if (remaining <= 0) {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.apply(this, args)
    } else if (timer === null) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fn.apply(this, args)
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    lastTime = 0
  }

  return throttled as T & { cancel: () => void }
}