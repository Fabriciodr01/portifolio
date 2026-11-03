import type { ReactNode } from 'react'

/** Small label with a leading rule, shown above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="type-eyebrow flex items-center gap-4">
      <span aria-hidden className="h-px w-9 bg-ed" />
      {children}
    </div>
  )
}
