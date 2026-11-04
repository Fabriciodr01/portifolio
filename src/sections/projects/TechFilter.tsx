import { motion } from 'motion/react'
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import { TechIcon } from '@/components/ui/TechIcon'
import { TECH_GROUPS } from '@/data/tech'
import { cn } from '@/lib/cn'

type Props = { active: string | null; onSelect: (id: string | null) => void }
type Hover = { group: string; x: number; top: number; width: number; name: string }

// Vertical layout of a group, in px: label row, then the gap the leader line runs through, then the icon row.
const LABEL_H = 20
const GAP = 12
const LINE_Y = LABEL_H + GAP / 2
// The leader line turns up into the readout box this far from the group's right edge.
const ELBOW = 14
// Grace period before hiding, so sweeping across neighbouring icons hands over without the readout blinking.
const HIDE_DELAY = 90

/**
 * Grouped icon toggles. Pressing one filters the project cards; pressing it again clears the filter.
 * Hover or focus draws a leader line from the icon, through the gap above the row, to a readout box at the right end
 * of the group's label row, so the name never covers a neighbouring icon. The readout is absolutely positioned and
 * there is one per group whose text swaps in place, so hovering never changes the layout of the rows.
 */
export function TechFilter({ active, onSelect }: Props) {
  const [hover, setHover] = useState<Hover | null>(null)
  const hideTimer = useRef(0)
  // Last name shown per group, so a readout fading out keeps its text instead of going blank mid-fade.
  const lastName = useRef<Record<string, string>>({})
  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const show = (group: string, name: string) => (e: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    clearTimeout(hideTimer.current)
    const box = e.currentTarget.closest('[data-group]')?.getBoundingClientRect()
    const icon = e.currentTarget.getBoundingClientRect()
    if (box) setHover({ group, name, x: icon.left + icon.width / 2 - box.left, top: icon.top - box.top, width: box.width })
  }
  const hide = () => {
    clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setHover(null), HIDE_DELAY)
  }

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {TECH_GROUPS.map((g) => {
        const h = hover?.group === g.id ? hover : null
        const end = h ? h.width - ELBOW : 0
        if (h) lastName.current[g.id] = h.name
        return (
          <div key={g.id} data-group role="group" aria-label={g.label} className="relative min-w-60">
            <div className="flex items-center" style={{ height: LABEL_H }}>
              <p aria-hidden className="type-label whitespace-nowrap">
                <span className="text-dim">-={g.brackets[0]}</span> {g.label} <span className="text-dim">{g.brackets[1]}=-</span>
              </p>
            </div>
            <span
              aria-hidden
              className={cn(
                'type-caption pointer-events-none absolute right-0 top-0 flex items-center whitespace-nowrap border border-amber bg-void px-2 text-amber transition-[opacity,translate] duration-150',
                h ? 'translate-y-0 opacity-100' : 'translate-y-0.5 opacity-0',
              )}
              style={{ height: LABEL_H }}
            >
              {lastName.current[g.id]}
            </span>

            {h && (
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <span className="absolute w-px bg-amber" style={{ left: h.x, top: LINE_Y, height: h.top - LINE_Y }} />
                <motion.span
                  className="absolute h-px bg-amber"
                  style={{ left: Math.min(h.x, end), top: LINE_Y, width: Math.abs(end - h.x), originX: h.x <= end ? 0 : 1 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.12 }}
                />
                <span className="absolute w-px bg-amber" style={{ left: end, top: LABEL_H, height: LINE_Y - LABEL_H }} />
              </div>
            )}

            <ul className="flex flex-wrap gap-1.5" style={{ marginTop: GAP }}>
              {g.items.map((t) => {
                const pressed = active === t.id
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      aria-pressed={pressed}
                      aria-label={t.name}
                      onClick={() => onSelect(pressed ? null : t.id)}
                      onPointerEnter={show(g.id, t.name)}
                      onPointerLeave={hide}
                      onFocus={show(g.id, t.name)}
                      onBlur={hide}
                      className="hud-control grid size-10 place-items-center"
                    >
                      <TechIcon tech={t} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
