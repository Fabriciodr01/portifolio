import type { KeyboardEvent } from 'react'

/** DOM id of a tab button, so the keyboard handler can move focus and panels can point back with aria-labelledby. */
export const tabId = (group: string, id: string) => `${group}-tab-${id}`

/**
 * Keyboard handling for a WAI-ARIA tablist with automatic activation: arrow keys (along `orientation`), Home and End
 * select the neighbouring tab and move focus to it.
 */
export function useTabKeys(group: string, ids: readonly string[], active: string, select: (id: string) => void, orientation: 'horizontal' | 'vertical' = 'horizontal') {
  const [prev, next] = orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']
  return (e: KeyboardEvent) => {
    const i = ids.indexOf(active)
    const target =
      e.key === prev ? ids[(i - 1 + ids.length) % ids.length]
      : e.key === next ? ids[(i + 1) % ids.length]
      : e.key === 'Home' ? ids[0]
      : e.key === 'End' ? ids[ids.length - 1]
      : null
    if (!target) return
    e.preventDefault()
    select(target)
    document.getElementById(tabId(group, target))?.focus()
  }
}
