import { useInView } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { ShipSpecs } from '@/components/ship/ShipSpecs'
import { Panel } from '@/components/ui/Panel'
import { SHIP } from '@/data/ship'

// three.js is most of the bundle weight; it is split out and only requested once the panel is about to scroll into
// view, so visitors who never reach the About section never download it.
const ShipScan = lazy(() => import('@/components/ship/ShipScan'))
const scanning = <p className="type-caption grid h-full place-items-center">Scanning…</p>

/** SYS_01 panel: the hologram, its typed spec sheet and the model credit. */
export function ShipPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '400px 0px' })
  return (
    <Panel label="SYS_01 // SHIP SCAN" meta={SHIP.name}>
      <div ref={ref} className="relative aspect-[16/9] max-h-[20dvh] w-full">
        {near ? <Suspense fallback={scanning}><ShipScan /></Suspense> : scanning}
      </div>
      <div className="mt-4 border-t border-ed/30 pt-4">
        <ShipSpecs specs={SHIP.specs} delay={0.6} />
        <a
          href={SHIP.credit.url}
          target="_blank"
          rel="noreferrer"
          className="hud-link type-caption mt-3 inline-block"
        >
          {SHIP.credit.label} ↗
        </a>
      </div>
    </Panel>
  )
}
