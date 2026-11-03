import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { ShipPanel } from '@/components/ship/ShipPanel'
import { Panel } from '@/components/ui/Panel'
import { SUMMARY } from '@/data/profile'
import { Dossier } from './Dossier'

// Title and ship stack on the left; the dossier stretches to the full height of that column on the right.
export function About() {
  return (
    <Section id="about">
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <div>
          <Reveal delay={0.1}><h2 className="type-title">About</h2></Reveal>
          <Reveal delay={0.3} className="mt-4">
            <ShipPanel />
          </Reveal>
        </div>
        <Reveal delay={0.2} className="h-full">
          <Panel label="DOSSIER // F. DIAS DA ROSA" meta="PROFILE" className="h-full">
            <Dossier paragraphs={SUMMARY} />
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
