import type { ReactNode } from 'react'

/**
 * Hover and keyboard-focus state for a project card: it grows slightly and a translucent orange fill sweeps up
 * inside the chamfered outline. Reduced motion keeps the colour change but drops the growth and the sweep.
 */
export function HoverCard({ children }: { children: ReactNode }) {
  return (
    <div className="group/card relative h-full transition-transform duration-300 ease-out hover:scale-[1.025] focus-within:scale-[1.025] motion-reduce:transform-none">
      {children}
      <div
        aria-hidden
        className="clip-chamfer pointer-events-none absolute inset-px origin-bottom scale-y-0 bg-ed/10 transition-transform duration-500 ease-out [--c:15.6px] group-hover/card:scale-y-100 group-focus-within/card:scale-y-100 motion-reduce:scale-y-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:group-hover/card:opacity-100 motion-reduce:group-focus-within/card:opacity-100"
      />
    </div>
  )
}
