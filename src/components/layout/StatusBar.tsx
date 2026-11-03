import { motion } from 'motion/react'
import { SECTIONS, SITE } from '@/data/site'
import { cn } from '@/lib/cn'

const ext = 'text-ink/70 transition-colors hover:text-ed'

/** Fixed top bar: status on the left, section nav on the right. The active section gets an animated underline. */
export function StatusBar({ active }: { active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-void via-void/90 to-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 text-xs uppercase tracking-hud sm:px-10">
        <a href="#intro" className="flex items-center gap-3 text-ed">
          <span className="size-1.5 animate-pulse rounded-full bg-ed shadow-[0_0_8px] shadow-ed" />
          <span>
            <span className="hidden sm:inline">{SITE.handle} // </span>ONLINE
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-7">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={cn('relative py-1 transition-colors', active === s.id ? 'text-amber' : 'text-ink/70 hover:text-ed')}
                >
                  <span className="text-dim">/ </span>
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
