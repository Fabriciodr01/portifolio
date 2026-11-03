import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { SECTIONS, transmission, type SectionId } from '@/data/site'
import { cn } from '@/lib/cn'

type Props = { id: SectionId; children: ReactNode; className?: string }

/**
 * Page section. Number, eyebrow and divider target all come from its position in SECTIONS.
 * Mobile: natural height, divider in the flow. `snap:` (desktop): full screen, snap point, divider pinned to the bottom.
 */
export function Section({ id, children, className }: Props) {
  const i = SECTIONS.findIndex((s) => s.id === id)
  const { title } = SECTIONS[i]
  const next = SECTIONS[i + 1]

  return (
    <section
      id={id}
      className={cn(
        'relative flex scroll-mt-14 flex-col justify-center px-5 pb-10 pt-12 sm:px-10',
        i === 0 && 'pt-24',
        'snap:min-h-dvh snap:scroll-mt-0 snap:snap-start snap:snap-always snap:pb-24 snap:pt-28',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal><Eyebrow>{transmission(i + 1)} / {title}</Eyebrow></Reveal>
        {children}
      </div>
      <SectionDivider index={i + 1} next={next && { id: next.id, title: next.title }} />
    </section>
  )
}
