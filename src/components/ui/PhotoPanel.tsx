import { useState } from 'react'
import { Panel } from '@/components/ui/Panel'

type Props = { src: string; alt: string; label: string; meta?: string }

/**
 * Portrait in a HUD panel. Expects a cut-out image (transparent background) and draws the backdrop itself: orange
 * glow, HUD grid, a slow reticle and scanlines sit behind the subject so its own colours stay untouched.
 * Falls back to a NO SIGNAL readout if the image fails to load.
 */
export function PhotoPanel({ src, alt, label, meta }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <Panel label={label} meta={meta}>
      <div className="group relative aspect-[4/5] overflow-hidden bg-void">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_35%,rgb(255_113_0/0.3),transparent_70%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <div aria-hidden className="hud-grid absolute inset-0" />
        <div aria-hidden className="absolute left-1/2 top-[33%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ed/20" />
        <div aria-hidden className="absolute left-1/2 top-[33%] aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ed/35 motion-safe:animate-[spin_60s_linear_infinite]" />
        <div aria-hidden className="scanlines absolute inset-0" />
        {failed ? (
          <p className="type-caption relative grid h-full place-items-center">No signal</p>
        ) : (
          <img
            src={src}
            alt={alt}
            width={530}
            height={701}
            decoding="async"
            onError={() => setFailed(true)}
            className="relative h-full w-full object-cover object-top drop-shadow-[0_0_16px_rgb(255_113_0/0.25)] transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
        {/* Fades the cropped bottom edge of the subject into the panel. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-panel to-transparent" />
        <Corners />
      </div>
    </Panel>
  )
}

/** Targeting brackets in the four corners of the frame. */
function Corners() {
  const base = 'pointer-events-none absolute size-5 border-ed'
  return (
    <div aria-hidden>
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} />
    </div>
  )
}
