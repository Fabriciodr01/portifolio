import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { BracketButton } from '@/components/ui/BracketButton'
import { Panel } from '@/components/ui/Panel'

/** PHASE 1 placeholder: title, buttons and the framed panel that will hold the 3D ship. */
export function Intro() {
  return (
    <Section id="intro">
      <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal delay={0.1}>
            {/* 13vh on desktop, capped by width so "Dias da Rosa" never overflows a phone or the grid column. */}
            <h1 className="font-display text-[min(13vh,15vw)] font-extrabold uppercase leading-[0.85] text-bone lg:text-[min(13vh,11vw,9.5rem)]">
              Fabricio<br /><span className="text-ed">Dias da Rosa</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-lg text-amber">Full stack developer. Vue, TypeScript, C#.</p></Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <BracketButton href="#about">ABOUT</BracketButton>
            <BracketButton href="#projects">PROJECTS</BracketButton>
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
