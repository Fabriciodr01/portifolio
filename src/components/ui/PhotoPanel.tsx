import { useState } from 'react'
import { Panel } from '@/components/ui/Panel'

type Props = { src: string; alt: string; label: string; meta?: string }

/**
 * Portrait in a HUD panel: shown as an orange monochrome scan (grayscale photo under a colour-blend layer) that
 * fades to the real photo on hover. Falls back to a NO SIGNAL readout if the image fails to load.
 */
export function PhotoPanel({ src, alt, label, meta }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <Panel label={label} meta={meta}>
      <div className="group relative aspect-[4/5] overflow-hidden bg-void">
        {failed ? (
          <p className="type-caption grid h-full place-items-center">No signal</p>
        ) : (
          <>
            <img
              src={src}
              alt={alt}
              width={800}
              height={1000}
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover grayscale contrast-110 transition-[filter] duration-500 group-hover:grayscale-0 group-hover:contrast-100"
            />
            <div aria-hidden className="absolute inset-0 bg-ed mix-blend-color transition-opacity duration-500 group-hover:opacity-0" />
            <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
          </>
        )}
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
