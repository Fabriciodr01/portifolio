import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

const MAX_TILT = 6

/**
 * Tilts its content towards the mouse and moves a soft highlight under the pointer. Mouse only: touch scrolling
 * the project row should not wobble the cards, and reduced-motion users get a static card.
 */
export function TiltCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * MAX_TILT)
    rx.set((0.5 - py) * 2 * MAX_TILT)
    // The highlight position is plain CSS, so moving it never re-renders the card.
    e.currentTarget.style.setProperty('--glare-x', `${px * 100}%`)
    e.currentTarget.style.setProperty('--glare-y', `${py * 100}%`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group/tilt relative h-full"
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(circle_at_var(--glare-x,50%)_var(--glare-y,50%),rgb(255_176_102/0.12),transparent_55%)] group-hover/tilt:opacity-100"
      />
    </motion.div>
  )
}
