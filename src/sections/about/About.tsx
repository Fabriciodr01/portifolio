import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'
import { SUMMARY } from '@/data/profile'

/** PHASE 2 placeholder: the typed dossier, stack tabs and experience (all in data/profile.ts) go here. */
export function About() {
  return (
    <Section id="about">
      <Reveal delay={0.1}><h2 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-none text-bone">About</h2></Reveal>
      <Reveal delay={0.2} className="mt-8">
        <Panel label="DOSSIER // FABRICIO" meta="PHASE 2">
          <div className="max-w-3xl space-y-3">
            {SUMMARY.map((line) => <p key={line}>{line}</p>)}
          </div>
        </Panel>
      </Reveal>
    </Section>
  )
}
