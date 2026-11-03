import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { TechIcon } from '@/components/ui/TechIcon'
import { PROJECTS } from '@/data/projects'
import { TECH_BY_ID } from '@/data/tech'
import { TechFilter } from './TechFilter'

// Public projects are numbered on their own; the work card is labelled separately.
const NUMBER = new Map(PROJECTS.filter((p) => p.kind === 'project').map((p, i) => [p.id, String(i + 1).padStart(2, '0')]))

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null)
  const shown = useMemo(() => (filter ? PROJECTS.filter((p) => p.stack.includes(filter)) : PROJECTS), [filter])
  const active = filter ? TECH_BY_ID.get(filter) : undefined

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
      </div>

      <motion.ul layout className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout
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
