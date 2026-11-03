import type { Tech } from '@/data/tech'
import { cn } from '@/lib/cn'

/** Brand glyph in the current text colour (the theme stays single-accent), or a monogram when no icon exists. */
export function TechIcon({ tech, className }: { tech: Tech; className?: string }) {
  if (tech.path) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={cn('size-5 fill-current', className)}>
        <path d={tech.path} />
      </svg>
    )
  }
  return (
    <span aria-hidden className={cn('grid size-5 place-items-center font-display text-[0.8rem] font-extrabold leading-none', className)}>
      {tech.mono}
    </span>
  )
}
