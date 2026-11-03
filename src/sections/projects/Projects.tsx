import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { TechIcon } from '@/components/ui/TechIcon'
import { PROJECTS } from '@/data/projects'
import { TECH_BY_ID } from '@/data/tech'
import { cn } from '@/lib/cn'
import { TechFilter } from './TechFilter'

// Public projects are numbered on their own; the work card is labelled separately.
const NUMBER = new Map(PROJECTS.filter((p) => p.kind === 'project').map((p, i) => [p.id, String(i + 1).padStart(2, '0')]))

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null)
  const shown = useMemo(() => (filter ? PROJECTS.filter((p) => p.stack.includes(filter)) : PROJECTS), [filter])
  const active = filter ? TECH_BY_ID.get(filter) : undefined
  const reduce = useReducedMotion()
  const track = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ prev: false, next: false })

  const measure = useCallback(() => {
    const el = track.current
    if (el) setEdges({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
  }, [])
  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, shown])

  // One card per press; the first child's width plus the gap is a card step.
  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Section id="projects">
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)]">
        <Reveal delay={0.1}><h2 className="type-title">Projects</h2></Reveal>
        <Reveal delay={0.2}>
          <TechFilter active={filter} onSelect={setFilter} />
        </Reveal>
      </div>

      <div className="mt-6 flex min-h-6 items-center gap-3" aria-live="polite">
        {active && (
          <>
            <span className="type-eyebrow">Filter // {active.name}</span>
            <button type="button" onClick={() => setFilter(null)} className="type-caption underline decoration-dim underline-offset-4 transition-colors hover:text-ed">
              Clear ×
            </button>
          </>
        )}
        <div className="ml-auto flex gap-1.5">
          {([[-1, '◀', 'Scroll projects left', edges.prev], [1, '▶', 'Scroll projects right', edges.next]] as const).map(([dir, glyph, label, enabled]) => (
            <button
              key={dir}
              type="button"
              aria-label={label}
              disabled={!enabled}
              onClick={() => step(dir)}
              className="type-caption grid size-8 place-items-center border border-ed/40 text-ed transition-colors hover:border-amber hover:bg-glow hover:text-amber disabled:cursor-default disabled:border-dim/30 disabled:bg-transparent disabled:text-dim"
            >
              {glyph}
            </button>
          ))}
        </div>
      </div>

      {/* Cards are sized so the next one is always cut at the edge (about 3.4 visible on desktop), and the
          edge fades while more remain: both tell the visitor the row scrolls sideways. `relative` makes it the
          containing block, so absolutely positioned descendants (sr-only labels) are clipped instead of widening the page. */}
      <motion.ul
        ref={track}
        layout
        onScroll={measure}
        className={cn(
          'relative mt-3 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-color:var(--color-ed)_transparent] [scrollbar-width:thin]',
          edges.next && '[mask-image:linear-gradient(to_right,#000_85%,transparent)]',
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout
              className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/1.6)] lg:w-[calc((100%-3.75rem)/3.4)]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <Panel label={p.kind === 'work' ? 'WORK // PROPRIETARY' : `PROJECT ${NUMBER.get(p.id)}`} className="h-full">
                <h3 className="type-heading">{p.title}</h3>
                <p className="type-sub mt-1">{p.subtitle}</p>
                {p.stack.length > 0 && (
                  <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-2 text-muted">
                    {p.stack.map((id) => {
                      const t = TECH_BY_ID.get(id)
                      return t && (
                        <li key={id} title={t.name} className={id === filter ? 'text-amber' : undefined}>
                          <TechIcon tech={t} className="size-4" />
                          <span className="sr-only">{t.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
                {p.kind === 'work' ? (
                  <a href={p.href} className="type-caption mt-4 inline-block underline decoration-dim underline-offset-4 transition-colors hover:text-ed">
                    Private code · see Experience ↓
                  </a>
                ) : (
                  <a href={p.href} target="_blank" rel="noreferrer" className="type-caption mt-4 inline-block underline decoration-dim underline-offset-4 transition-colors hover:text-ed">
                    Repository ↗
                  </a>
                )}
              </Panel>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  )
}
