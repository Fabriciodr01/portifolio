import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = { children: ReactNode; delay?: number; className?: string }

/** Fades and slides content in once when it scrolls into view. Skips the movement for reduced-motion users. */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
