import { TechIcon } from '@/components/ui/TechIcon'
import { TECH_GROUPS } from '@/data/tech'
import { cn } from '@/lib/cn'

type Props = { active: string | null; onSelect: (id: string | null) => void }

/** Grouped icon toggles. Pressing one filters the project cards; pressing it again clears the filter. */
export function TechFilter({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4">
      {TECH_GROUPS.map((g) => (
        <div key={g.id} role="group" aria-label={g.label}>
          <p aria-hidden className="type-label">
            <span className="text-dim">-={g.brackets[0]}</span> {g.label} <span className="text-dim">{g.brackets[1]}=-</span>
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {g.items.map((t) => {
              const pressed = active === t.id
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={pressed}
                    aria-label={t.name}
                    onClick={() => onSelect(pressed ? null : t.id)}
                    className={cn(
                      'group relative grid size-10 place-items-center border outline-none transition-colors',
                      pressed
                        ? 'border-amber bg-glow text-amber'
                        : 'border-ed/40 text-ed hover:border-amber hover:bg-glow hover:text-amber focus-visible:border-amber focus-visible:bg-glow focus-visible:text-amber',
                    )}
                  >
                    <TechIcon tech={t} />
                    {/* display:none rather than opacity-0: a transparent tooltip near the screen edge still widens the page. */}
                    <span
                      aria-hidden
                      className="type-caption pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap border border-ed/40 bg-void px-2 py-0.5 text-ink group-hover:block group-focus-visible:block"
                    >
                      {t.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
