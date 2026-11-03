import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

const Diamond = ({ filled }: { filled?: boolean }) => (
  <span className={cn('inline-block size-1.5 rotate-45 border border-ed', filled && 'bg-ed')} />
)

/** "TRANSMISSION_001" rule shown at the bottom of a section. Lines draw outward when it scrolls into view. */
export function SectionDivider({ index }: { index: number }) {
  const label = `TRANSMISSION_${String(index).padStart(3, '0')}`
  const line = 'h-px flex-1 bg-gradient-to-r from-transparent to-ed/60'
  const draw = {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' as const },
  }
  return (
    <div aria-hidden className="absolute inset-x-6 bottom-6 sm:inset-x-10">
      <div className="mx-auto flex max-w-6xl items-center gap-4 text-[11px] uppercase tracking-hud text-ed">
        <motion.i className={cn(line, 'origin-right')} {...draw} />
        <span className="flex items-center gap-2 whitespace-nowrap">
          <Diamond /> {label} <span className="text-dim">/ / /</span> <Diamond filled />
        </span>
        <motion.i className={cn(line, 'origin-left rotate-180')} {...draw} />
      </div>
    </div>
  )
}
