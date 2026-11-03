import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useBoot } from '@/components/boot/Boot'

type Props = { children: ReactNode; delay?: number; className?: string }

/**
 * Fades and slides content in once when it scrolls into view. Skips the movement for reduced-motion users.
 * Content already on screen during the boot sequence waits for it, so the entrance plays as the overlay leaves.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  const { done, endsAt } = useBoot()
  const wait = done ? 0 : Math.max(0, (endsAt - performance.now()) / 1000)
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay + wait, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
