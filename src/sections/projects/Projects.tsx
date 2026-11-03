import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { PROJECTS } from '@/data/projects'

/** PHASE 3 placeholder: project cards (filters, tilt, expandable details) go here. */
export function Projects() {
  return (
    <Section id="projects">
      <Reveal delay={0.1}><h2 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-none text-bone">Projects</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={0.1 * i}>
            <Panel label={`PROJECT ${String(i + 1).padStart(2, '0')}`} className="h-full">
              <h3 className="font-display text-3xl font-extrabold uppercase text-bone">{p.title}</h3>
              <p className="mt-1 text-sm uppercase tracking-wider text-ed">{p.subtitle}</p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
