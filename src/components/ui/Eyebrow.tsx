import type { ReactNode } from 'react'

/** Small label with a leading rule, shown above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-hud text-ed">
      <span aria-hidden className="h-px w-9 bg-ed" />
      {children}
    </div>
  )
}
