import { Fragment } from 'react'
import { Section } from '@/components/layout/Section'
import { useBoot } from '@/components/boot/Boot'
import { Reveal } from '@/components/motion/Reveal'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { HudButton } from '@/components/ui/HudButton'
import { PhotoPanel } from '@/components/ui/PhotoPanel'
import { SITE } from '@/data/site'

const CONTACT = [
  { label: 'GitHub ↗', href: SITE.github, external: true },
  { label: 'LinkedIn ↗', href: SITE.linkedin, external: true },
  { label: 'Email', href: `mailto:${SITE.email}`, external: false },
]

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
            <HudButton href="#experience">EXPERIENCE</HudButton>
            <HudButton href="#projects">PROJECTS</HudButton>
          </Reveal>
          {/* The status bar hides its external links on phones, so contact lives here where everyone sees it. */}
          <Reveal delay={0.4} className="mt-6">
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="type-label">Contact //</span>
              {CONTACT.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="hud-link type-sub"
                >
                  {c.label}
                </a>
              ))}
            </p>
          </Reveal>
        </div>
        {/* Height-capped so the portrait never pushes the section past one desktop screen. */}
        <Reveal delay={0.2} className="mx-auto w-full max-w-xs lg:max-w-[calc(56dvh*0.8)]">
          <PhotoPanel src={`${import.meta.env.BASE_URL}images/profile.webp`} alt={`${SITE.name}, portrayed as an Elite Dangerous commander`} label="ID_01 // PERSONNEL" meta="CMDR" />
        </Reveal>
      </div>
    </Section>
  )
}
