import { useInView } from 'motion/react'
import { useRef } from 'react'
import { useBoot } from '@/components/boot/Boot'
import { Cursor } from '@/components/motion/Cursor'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Paragraphs that type themselves out the first time they scroll into view. The untyped remainder is rendered
 * invisible so lines never reflow while typing, and a zero-width wrapper keeps the cursor out of the layout.
 * Screen readers get the full text straight away.
 */
export function Dossier({ paragraphs }: { paragraphs: readonly string[] }) {
  const { done: booted } = useBoot()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const total = paragraphs.reduce((n, p) => n + p.length, 0)
  const typed = useTypewriter(total, { start: inView && booted, delay: 0.3, charsPerSecond: 160 })

  let offset = 0
  return (
    <div ref={ref} className="type-body space-y-3">
      {paragraphs.map((p) => {
        const shown = Math.min(p.length, Math.max(0, typed - offset))
        const writing = typed < total && typed >= offset && typed < offset + p.length
        offset += p.length
        return (
          <p key={p}>
            <span className="sr-only">{p}</span>
            <span aria-hidden>
              {p.slice(0, shown)}
              {writing && <span className="inline-block w-0"><Cursor /></span>}
              <span className="invisible">{p.slice(shown)}</span>
            </span>
          </p>
        )
      })}
    </div>
  )
}
