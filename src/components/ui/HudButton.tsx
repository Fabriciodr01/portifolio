import { motion } from 'motion/react'

type Props = { href: string; children: string; external?: boolean }

/** Link styled as a button with two cut corners; states come from the shared hud-frame pattern (see theme.css). */
export function HudButton({ href, children, external }: Props) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="hud-frame clip-notch inline-block p-px outline-none [--c:10px]"
    >
      <span className="hud-frame-body type-action text-hud clip-notch block bg-void px-6 py-3 [--c:9.6px]">{children}</span>
    </motion.a>
  )
}
