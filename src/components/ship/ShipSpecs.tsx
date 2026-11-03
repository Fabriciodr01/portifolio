import { useInView } from 'motion/react'
import { useRef } from 'react'
import { useBoot } from '@/components/boot/Boot'
import { Cursor } from '@/components/motion/Cursor'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/cn'

type Props = { specs: ReadonlyArray<readonly [string, string]>; delay?: number }

// Rows longer than this would collide with the neighbouring column on a narrow panel, so they span both.
const WIDE_ROW = 20

/**
 * Spec sheet that types itself out row by row, label first then value, with a block cursor at the write head.
 * The typed text is decorative (aria-hidden); a plain <dl> carries the same data for screen readers.
 */
export function ShipSpecs({ specs, delay = 0 }: Props) {
  const { done: booted } = useBoot()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const total = specs.reduce((sum, [k, v]) => sum + k.length + v.length, 0)
  const typed = useTypewriter(total, { start: inView && booted, delay })

  let offset = 0
  return (
    <div ref={ref}>
      <dl className="sr-only">
        {specs.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div aria-hidden className="type-readout grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
        {specs.map(([k, v]) => {
          const label = k.slice(0, Math.max(0, typed - offset))
          const value = v.slice(0, Math.max(0, typed - offset - k.length))
          const cursorHere = typed < total && typed >= offset && typed < offset + k.length + v.length
          offset += k.length + v.length
          return (
            <div key={k} className={cn('flex min-h-[1.65em] items-baseline gap-2', k.length + v.length > WIDE_ROW && 'sm:col-span-2')}>
              <span>{label}</span>
              {label.length === k.length && <span className="min-w-3 flex-1 border-b border-dotted border-dim/50" />}
              <span className="whitespace-nowrap text-amber">{value}</span>
              {cursorHere && <Cursor />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
