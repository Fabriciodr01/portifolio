import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { SUMMARY } from '@/data/profile'

export function About() {
  return (
    <Section id="about">
      <Reveal delay={0.1}><h2 className="type-title mt-6">About</h2></Reveal>
      <Reveal delay={0.2} className="mt-8">
        <Panel label="DOSSIER // FABRICIO" meta="PHASE 2">
          <div className="type-body max-w-3xl space-y-3">
            {SUMMARY.map((line) => <p key={line}>{line}</p>)}
          </div>
        </Panel>
      </Reveal>
    </Section>
  )
}
