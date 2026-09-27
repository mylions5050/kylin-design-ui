import { computed, type ComputedRef } from 'vue'
import { createBem } from '@/utils/create-bem'
import type { ButtonProps } from '../types'

const [b, , m, v] = createBem('k-btn')

/**
 * Build the root button's class list from props.
 *
 * Variants (`v`): `k-btn--primary`, `k-btn--large` — structural, fixed per instance.
 * States (`m`): `is-plain`, `is-disabled`, `is-loading`, … — transient, toggled at runtime.
 *
 * Extracted so other button-like components (icon-button, split-button, …) can
 * reuse the same class model without duplicating the prop-to-class mapping.
 */
export function useButtonClasses(props: ButtonProps): ComputedRef<unknown[]> {
  return computed(() => {
    const isInteractiveDisabled = props.disabled || props.loading
    return [
      b(),
      v(props.type ?? 'default', true),
      v(props.size ?? 'middle', true),
      {
        [m('plain', true)]: props.plain,
        [m('round', true)]: props.round,
        [m('circle', true)]: props.circle,
        [m('square', true)]: props.square,
        [m('text', true)]: props.text,
        [m('link', true)]: props.link,
        // is-disabled now means "interactively disabled", covering both disabled and loading
        [m('disabled', true)]: isInteractiveDisabled,
        [m('loading', true)]: props.loading,
        [m('dark', true)]: props.dark,
      },
    ]
  })
}
