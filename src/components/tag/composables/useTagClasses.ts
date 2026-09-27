import { computed, type ComputedRef } from 'vue'
import { createBem } from '@/utils/create-bem'

// 这里定义 Tag 组件的 props 类型，便于类型安全
export interface TagProps {
  type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
  size: 'small' | 'default' | 'large'
  sizeNum?: number
  rounded?: boolean
  closable?: boolean
  dark?: boolean
  plain?: boolean
  disabled?: boolean
  color?: string
  backgroundColor?: string
  borderColor?: string
  icon?: string
}

const [b, , m, v] = createBem('tag')

/**
 * Build the root tag's class list from props.
 *
 * Variants (v): `tag--primary`, `tag--large` — structural, fixed per instance.
 * States (m): `is-closable`, `is-disabled`, ... — transient, toggled at runtime.
 */
export function useTagClasses(props: TagProps): ComputedRef<unknown[]> {
  return computed(() => {
    return [
      b(),
      v(props.type ?? 'default', true),
      v(props.size ?? 'default', true),
      {
        [v('rounded', true)]: props.rounded,
        [v('closable', true)]: props.closable,
        [m('dark', true)]: props.dark,
        [m('plain', true)]: props.plain,
        [m('disabled', true)]: props.disabled,
      },
    ]
  })
}