import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

type Options = { start: boolean; delay?: number; charsPerSecond?: number }

/**
 * Number of characters revealed so far, out of `total`, once `start` turns true. Driven by elapsed time rather than
 * per-frame increments so a throttled tab catches up instead of crawling. Reduced motion gets the full text at once.
 */
export function useTypewriter(total: number, { start, delay = 0, charsPerSecond = 90 }: Options) {
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(reduce ? total : 0)

  useEffect(() => {
    if (reduce) {
      setTyped(total)
      return
    }
    if (!start) return
    let raf = 0
    const begin = performance.now() + delay * 1000
    const tick = (now: number) => {
      const n = Math.min(total, Math.max(0, Math.floor(((now - begin) / 1000) * charsPerSecond)))
      setTyped(n)
      if (n < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, start, delay, charsPerSecond, total])

  return typed
}
