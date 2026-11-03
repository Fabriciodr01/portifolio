import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Panel } from '@/components/ui/Panel'

/** PHASE 2 placeholder: dossier text and the stack tabs go here. */
export function About() {
  return (
    <Section id="about" index={2}>
      <Reveal><Eyebrow>01 / Profile</Eyebrow></Reveal>
      <Reveal delay={0.1}><h2 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-none text-bone">About</h2></Reveal>
      <Reveal delay={0.2} className="mt-8">
        <Panel label="DOSSIER // FABRICIO" meta="PHASE 2"><p className="text-dim">About text and stack tabs load here.</p></Panel>
      </Reveal>
    </Section>
  )
}
