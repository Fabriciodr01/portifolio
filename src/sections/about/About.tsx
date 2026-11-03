import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Panel } from '@/components/ui/Panel'

/** PHASE 2 placeholder: dossier text and the stack tabs go here. */
export function About() {
  return (
    <Section id="about">
      <Reveal delay={0.1}><h2 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-none text-bone">About</h2></Reveal>
      <Reveal delay={0.2} className="mt-8">
        <Panel label="DOSSIER // FABRICIO" meta="PHASE 2">
          {/* TODO: real About text (dossier) and the FRONTEND / BACKEND / GAMES tabs. */}
          <p className="text-dim">TODO: About text and stack tabs load here.</p>
        </Panel>
      </Reveal>
    </Section>
  )
}
