import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { EDUCATION, EXPERIENCE } from '@/data/profile'
import { tabId, useTabKeys } from '@/hooks/useTabKeys'
import { cn } from '@/lib/cn'

const GROUP = 'job'
const IDS = EXPERIENCE.map((j) => j.id)

/** Service record: positions as a vertical tablist on the left, the selected one's log on the right. */
export function Experience() {
  const [active, setActive] = useState(IDS[0])
  const onKeyDown = useTabKeys(GROUP, IDS, active, setActive, 'vertical')
  const job = EXPERIENCE.find((j) => j.id === active) ?? EXPERIENCE[0]

  return (
    <Section id="experience">
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <div>
          <Reveal delay={0.1}><h2 className="type-title">Experience</h2></Reveal>
          <Reveal delay={0.2} className="mt-6">
            <div role="tablist" aria-label="Positions" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-1.5">
              {EXPERIENCE.map((j) => {
                const selected = j.id === active
                return (
                  <button
                    key={j.id}
                    id={tabId(GROUP, j.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${GROUP}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(j.id)}
                    className={cn('group clip-notch p-px text-left outline-none transition-colors [--c:8px]', selected ? 'bg-ed' : 'bg-ed/30 hover:bg-ed/70 focus-visible:bg-amber')}
                  >
                    <span className={cn('clip-notch block px-4 py-2.5 transition-colors [--c:7.6px]', selected ? 'bg-glow' : 'bg-void group-hover:bg-panel')}>
                      <span className={cn('type-meta block', selected && 'text-amber')}>{j.role}</span>
                      <span className="type-caption block">{j.company} · {j.period}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-5">
            <h3 className="type-label">Training</h3>
            <ul className="mt-2 space-y-1.5">
              {EDUCATION.map((e) => (
                <li key={e.title}>
                  <span className="type-body block">{e.title}</span>
                  <span className="type-caption block">{e.school} · {e.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="lg:self-start">
          <Panel label={`LOG // ${job.company}`} meta={job.period}>
            <div id={`${GROUP}-panel`} role="tabpanel" aria-labelledby={tabId(GROUP, job.id)}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="type-heading">{job.role}</h3>
                  <p className="type-caption mt-1">{job.place}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="type-body flex gap-3">
                        <span aria-hidden className="text-ed">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
