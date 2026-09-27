import type { ComputedRef, InjectionKey } from 'vue'

/** Context a KRow provides to its KCol children (for gutter padding). */
export interface RowContext {
  gutter: ComputedRef<number>
}

export const ROW_KEY: InjectionKey<RowContext> = Symbol('k-row')
