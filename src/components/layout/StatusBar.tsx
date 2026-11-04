import { motion } from 'motion/react'
import { SECTIONS, SITE } from '@/data/site'
import { cn } from '@/lib/cn'

const ext = 'type-nav transition-colors hover:text-amber'

/** Fixed top bar: status on the left, section nav on the right. The active section gets an animated underline. */
export function StatusBar({ active }: { active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-void via-void/90 to-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 type-nav sm:px-10">
        {/* Phones show only the status dot so all five section links fit on one line. */}
        <a href="#intro" aria-label="Back to top" className="type-nav flex shrink-0 items-center gap-3 text-ed">
          <span className="size-1.5 rounded-full motion-safe:animate-pulse bg-ed shadow-[0_0_8px] shadow-ed" />
          <span aria-hidden className="hidden sm:inline">{SITE.handle} // ONLINE</span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-3.5 sm:gap-7">
            {SECTIONS.map((s, i) => (
              // On phones the brand link already returns to the top, so the first item gives its room to the others.
              <li key={s.id} className={cn(i === 0 && 'hidden sm:block')}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={cn('type-nav relative whitespace-nowrap py-1 transition-colors', active === s.id ? 'text-amber' : 'hover:text-amber')}
                >
                  <span className="hidden text-dim sm:inline">/ </span>
                  {s.label}
                  {active === s.id && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-ed" />}
                </a>
              </li>
            ))}
            <li className="hidden md:block">
              <a href={SITE.github} target="_blank" rel="noreferrer" className={ext}><span className="text-dim">/ </span>GITHUB</a>
            </li>
            <li className="hidden md:block">
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={ext}><span className="text-dim">/ </span>LINKEDIN</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto h-px max-w-6xl bg-ed/30" />
    </header>
  )
}
