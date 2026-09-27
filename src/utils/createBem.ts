/**
 * BEM class-name helper.
 *
 * @example
 * const b = createBem('supper-table')
 * b.b            // 'supper-table'
 * b.e('cell')    // 'supper-table__cell'
 * b.m('open')    // 'supper-table--open'
 * b.em('cell','selected') // 'supper-table__cell--selected'
 *
 * // with Vue class arrays (falsy values are ignored):
 * <td class={[b.e('cell'), selected && b.em('cell', 'selected')]}>
 */
export interface Bem {
  /** block name */
  b: string
  /** block__element */
  e: (el: string) => string
  /** block--modifier */
  m: (mod: string) => string
  /** block__element--modifier */
  em: (el: string, mod: string) => string
}

export function createBem(block: string): Bem {
  return {
    b: block,
    e: (el) => `${block}__${el}`,
    m: (mod) => `${block}--${mod}`,
    em: (el, mod) => `${block}__${el}--${mod}`,
  }
}
