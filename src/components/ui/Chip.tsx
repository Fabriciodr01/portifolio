import type { ReactNode } from 'react'

/** Small outlined tag, used for technologies and #hashtags. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="type-sub inline-block border border-ed px-2.5">{children}</span>
}
