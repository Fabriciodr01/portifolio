import { lazy, Suspense } from 'react'
import { ShipSpecs } from '@/components/ship/ShipSpecs'
import { Panel } from '@/components/ui/Panel'
import { SHIP } from '@/data/ship'

// three.js is most of the bundle weight; splitting it out keeps the first paint fast.
const ShipScan = lazy(() => import('@/components/ship/ShipScan'))

/** SYS_01 panel: the hologram, its typed spec sheet and the model credit. */
export function ShipPanel() {
  return (
    <Panel label="SYS_01 // SHIP SCAN" meta={SHIP.name}>
      <div className="relative aspect-[16/9] max-h-[20dvh] w-full">
        <Suspense fallback={<p className="type-caption grid h-full place-items-center">Scanning…</p>}>
          <ShipScan />
        </Suspense>
      </div>
      <div className="mt-4 border-t border-ed/30 pt-4">
        <ShipSpecs specs={SHIP.specs} delay={0.6} />
        <a
          href={SHIP.credit.url}
          target="_blank"
          rel="noreferrer"
          className="type-caption mt-3 inline-block underline decoration-dim underline-offset-4 transition-colors hover:text-ed"
        >
          {SHIP.credit.label} ↗
        </a>
      </div>
    </Panel>
  )
}
