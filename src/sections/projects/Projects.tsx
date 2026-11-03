import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  return (
    <Section id="projects">
      <Reveal delay={0.1}><h2 className="type-title mt-6">Projects</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={0.1 * i}>
            <Panel label={`PROJECT ${String(i + 1).padStart(2, '0')}`} className="h-full">
              <h3 className="type-heading">{p.title}</h3>
              <p className="type-sub mt-1">{p.subtitle}</p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
