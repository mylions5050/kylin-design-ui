/**
 * createBem: BEM class generator.
 *
 * const [b, e, m, v] = createBem('k-btn')
 * b()                 => 'k-btn'           (block)
 * e('icon')           => 'k-btn__icon'     (element)
 * m('disabled', true)  => 'is-disabled'     (state modifier — `is-` prefix)
 * m('disabled', false) => ''
 * v('primary', true)   => 'k-btn--primary'  (variant modifier — `block--` prefix)
 * v('primary', false)  => ''
 *
 * `m` = state (is-loading, is-disabled, …) — transient, toggled at runtime.
 * `v` = variant (k-btn--primary, k-btn--large) — structural, fixed per instance.
 */
export function createBem(block: string) {
  return [
    () => block,
    (el?: string) => (el ? `${block}__${el}` : block),
    (mod: string, val?: boolean) => {
      if (val === false || val === undefined || val === null) return ''
      return `is-${mod}`
    },
    (variant: string, val?: boolean) => {
      if (val === false || val === undefined || val === null) return ''
      return `${block}--${variant}`
    },
  ] as const
}
