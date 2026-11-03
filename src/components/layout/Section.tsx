import type { ReactNode } from 'react'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { cn } from '@/lib/cn'

type Props = { id: string; index: number; last?: boolean; children: ReactNode; className?: string }

/** Full-screen snap section with a centered max-width container and a TRANSMISSION divider (except the last). */
export function Section({ id, index, last, children, className }: Props) {
  return (
    <section id={id} className={cn('snap-section relative flex min-h-dvh flex-col justify-center px-6 pb-20 pt-28 sm:px-10', className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
      {!last && <SectionDivider index={index} />}
    </section>
  )
}
