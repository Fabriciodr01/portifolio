import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = { label?: string; meta?: string; children: ReactNode; className?: string; interactive?: boolean }

/**
 * Cut-corner HUD panel: an orange 1px outline around a dark body, with an optional header strip.
 * `interactive` switches the outline and body to the shared hover pattern (hud-frame), for panels that act as cards.
 */
export function Panel({ label, meta, children, className, interactive }: Props) {
  return (
    <div className={cn('clip-chamfer p-px [--c:16px]', interactive ? 'hud-frame' : 'bg-ed', className)}>
      <div className={cn('clip-chamfer h-full bg-panel [--c:15.6px]', interactive && 'hud-frame-body')}>
        {(label || meta) && (
          <div className="flex justify-between gap-4 border-b border-ed/40 px-5 py-2 type-label">
            <span className="truncate">{label}</span>
            <span className="hidden whitespace-nowrap sm:inline">{meta}</span>
          </div>
        )}
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
