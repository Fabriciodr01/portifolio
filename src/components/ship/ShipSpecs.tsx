import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useBoot } from '@/components/boot/Boot'
import { cn } from '@/lib/cn'

type Props = { specs: ReadonlyArray<readonly [string, string]>; delay?: number }

const CHARS_PER_SECOND = 90
// Rows longer than this would collide with the neighbouring column on a narrow panel, so they span both.
const WIDE_ROW = 20

/**
 * Spec sheet that types itself out row by row, label first then value, with a block cursor at the write head.
 * The typed text is decorative (aria-hidden); a plain <dl> carries the same data for screen readers.
 */
export function ShipSpecs({ specs, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  const { done: booted } = useBoot()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const total = specs.reduce((sum, [k, v]) => sum + k.length + v.length, 0)
  const [typed, setTyped] = useState(reduce ? total : 0)

  useEffect(() => {
    if (reduce || !inView || !booted) return
    let raf = 0
    const start = performance.now() + delay * 1000
    const tick = (now: number) => {
      const n = Math.max(0, Math.floor(((now - start) / 1000) * CHARS_PER_SECOND))
      setTyped(Math.min(n, total))
      if (n < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, inView, booted, delay, total])

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
              {cursorHere && <span className="inline-block h-[1em] w-[0.6em] translate-y-[0.15em] animate-blink bg-ed" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
