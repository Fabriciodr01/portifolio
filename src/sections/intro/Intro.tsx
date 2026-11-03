import { Fragment, lazy, Suspense } from 'react'
import { Section } from '@/components/layout/Section'
import { useBoot } from '@/components/boot/Boot'
import { Reveal } from '@/components/motion/Reveal'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { ShipSpecs } from '@/components/ship/ShipSpecs'
import { HudButton } from '@/components/ui/HudButton'
import { Panel } from '@/components/ui/Panel'
import { SHIP } from '@/data/ship'
import { SITE } from '@/data/site'

// three.js is most of the bundle weight; splitting it out keeps the first paint fast.
const ShipScan = lazy(() => import('@/components/ship/ShipScan'))

export function Intro() {
  const { done } = useBoot()
  return (
    <Section id="intro">
      <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal delay={0.1}>
            {/* 13vh on desktop, capped by width so "Dias da Rosa" never overflows a phone or the grid column. */}
            <h1 aria-label={SITE.name} className="font-display text-[min(13vh,15vw)] font-extrabold uppercase leading-[0.85] text-bone lg:text-[min(13vh,11vw,9.5rem)]">
              <ScrambleText text="Fabricio" play={done} />
              <br />
              <ScrambleText text="Dias da Rosa" play={done} className="text-ed" />
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="type-lead mt-6">
              {/* Each part stays whole and the separator travels with the second, so a wrap never strands the "·". */}
              {SITE.role.split(' · ').map((part, i) => (
                <Fragment key={part}>
                  {i > 0 && ' '}
                  <span className="whitespace-nowrap">{i > 0 && '· '}{part}</span>
                </Fragment>
              ))}
            </p>
            <p className="type-meta mt-3">
              <span className="whitespace-nowrap"><span className="text-muted">LOC:</span> {SITE.location}</span> <span className="whitespace-nowrap"><span className="text-ed">//</span> {SITE.availability}</span>
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <HudButton href="#about">ABOUT</HudButton>
            <HudButton href="#projects">PROJECTS</HudButton>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Panel label="SYS_01 // SHIP SCAN" meta={SHIP.name}>
            <div className="relative aspect-[16/9] max-h-[25dvh] w-full">
              <Suspense fallback={<p className="type-caption grid h-full place-items-center">Scanning…</p>}>
                <ShipScan />
              </Suspense>
            </div>
            <div className="mt-4 border-t border-ed/30 pt-4">
              <ShipSpecs specs={SHIP.specs} delay={0.6} />
              <a
                href={SHIP.credit.url}
                target="_blank"
                rel="noreferrer"
                className="type-caption mt-3 inline-block underline decoration-dim underline-offset-4 transition-colors hover:text-ed"
              >
                {SHIP.credit.label} ↗
              </a>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
