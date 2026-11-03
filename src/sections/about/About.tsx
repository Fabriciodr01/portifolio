import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { ShipPanel } from '@/components/ship/ShipPanel'
import { Panel } from '@/components/ui/Panel'
import { SUMMARY } from '@/data/profile'
import { Dossier } from './Dossier'

// Mirrors the Intro (visual left, text right) to break the pattern; on phones the text comes first.
export function About() {
  return (
    <Section id="about">
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-end">
        <Reveal delay={0.3} className="order-2 lg:order-1">
          <ShipPanel />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal delay={0.1}><h2 className="type-title">About</h2></Reveal>
          <Reveal delay={0.2} className="mt-6">
            <Panel label="DOSSIER // F. DIAS DA ROSA" meta="PROFILE">
              <Dossier paragraphs={SUMMARY} />
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
