import { motion, useReducedMotion } from 'motion/react'
import { SECTIONS, transmission } from '@/data/site'
import { cn } from '@/lib/cn'

type Props = { index: number; next?: { id: string; title: string } }

/** Outer end of a ruler: a short vertical bar with a diamond, so the faded tips still read as finished. */
const Cap = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn('flex shrink-0 items-center gap-1.5', className)}>
    <i className="size-1 rotate-45 bg-ed/60" />
    <i className="h-3 w-px bg-ed/60" />
  </span>
)

/**
 * Symmetric end-of-section rule: tick rulers on both sides that draw outward from a chamfered plate.
 * The plate links to the next section, or back to the top on the last one.
 */
export function SectionDivider({ index, next }: Props) {
  const reduce = useReducedMotion()
  const n = String(index).padStart(3, '0')
  const href = `#${next?.id ?? SECTIONS[0].id}`
  const draw = (origin: string) => ({
    className: cn('min-w-0 flex-1', origin),
    initial: reduce ? false : { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className="mt-12 snap:absolute snap:inset-x-10 snap:bottom-6 snap:mt-0">
      <div className="mx-auto flex max-w-6xl items-center gap-3 text-[11px] uppercase tracking-hud">
        <Cap />
        <motion.div {...draw('origin-right')}><div className="hud-ruler" /></motion.div>

        <a
          href={href}
          aria-label={next ? `End of ${transmission(index)}. Next section: ${next.title}` : `End of ${transmission(index)}. Back to top`}
          className="group clip-chamfer shrink-0 bg-ed/70 p-px transition-colors [--c:7px] hover:bg-ed"
        >
          <span className="clip-chamfer flex items-center gap-2 bg-void px-3.5 py-1.5 text-ed transition-colors [--c:6.6px] group-hover:bg-ed group-hover:text-void">
            <span className="sm:hidden">END_{n}</span>
            <span className="hidden sm:inline">END OF {transmission(index)}</span>
            <span className="hidden text-dim group-hover:text-void/60 sm:inline">//</span>
            <span className="hidden sm:inline">{next ? `NEXT: ${next.title}` : 'BACK TO TOP'}</span>
            <span
              aria-hidden
              className={cn('inline-block motion-safe:transition-transform', next ? 'group-hover:translate-y-0.5' : 'group-hover:-translate-y-0.5')}
            >
              {next ? '▾' : '▲'}
            </span>
          </span>
        </a>

        <motion.div {...draw('origin-left')}><div className="hud-ruler -scale-x-100" /></motion.div>
        <Cap className="flex-row-reverse" />
      </div>
    </div>
  )
}
