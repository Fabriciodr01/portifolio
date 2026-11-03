import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_+=*'
const FRAME_MS = 45
const SETTLE_MS = 55

type Props = { text: string; className?: string; play?: boolean }

/**
 * Text that decodes from random glyphs, left to right. Plays on hover and whenever `play` turns true.
 * Each character keeps its real glyph invisible underneath so the scrambled ones never change the layout.
 */
export function ScrambleText({ text, className, play }: Props) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)
  const raf = useRef(0)

  const run = useCallback(() => {
    if (reduce) return
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    let last = 0
    const tick = (now: number) => {
      const settled = Math.floor((now - start) / SETTLE_MS)
      if (now - last >= FRAME_MS || settled >= text.length) {
        last = now
        setOut([...text].map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''))
      }
      if (settled < text.length) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [text, reduce])

  useEffect(() => { if (play) run() }, [play, run])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return (
    <span aria-hidden className={`whitespace-nowrap ${className ?? ''}`} onPointerEnter={run}>
      {[...text].map((ch, i) => (
        <span key={i} className="relative inline-block">
          <span className="invisible">{ch === ' ' ? ' ' : ch}</span>
          <span className="absolute inset-0 text-center">{out[i] === ' ' ? ' ' : out[i]}</span>
        </span>
      ))}
    </span>
  )
}
