import type { ReactNode } from 'react'

/** Small outlined tag, used for technologies and #hashtags. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-block border border-ed px-2.5 text-sm text-ed">{children}</span>
}
