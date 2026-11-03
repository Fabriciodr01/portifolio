import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { BracketButton } from '@/components/ui/BracketButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Panel } from '@/components/ui/Panel'

/** PHASE 1 placeholder: title, buttons and the framed panel that will hold the 3D ship. */
export function Intro() {
  return (
    <Section id="intro" index={1}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal><Eyebrow>Portfolio / 001</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-[clamp(4rem,13vw,9.5rem)] font-extrabold uppercase leading-[0.85] text-bone">
              Fabricio<br /><span className="text-ed">Developer</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-lg text-amber">Full stack developer. Vue, TypeScript, C#.</p></Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <BracketButton href="#projects" variant="solid">PROJECTS</BracketButton>
            <BracketButton href="#about">ABOUT</BracketButton>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Panel label="SYS_01 // SHIP SCAN" meta="PHASE 1">
            <div className="grid aspect-[11/8] place-items-center text-dim">3D ship loads here</div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
