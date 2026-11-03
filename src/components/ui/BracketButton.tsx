import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

type Props = { href: string; children: string; variant?: 'solid' | 'outline'; external?: boolean }

/** [ LABEL ] button. Brackets slide in on hover. Solid = primary action. */
export function BracketButton({ href, children, variant = 'outline', external }: Props) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group inline-flex items-center gap-2 border px-5 py-3 text-sm uppercase tracking-hud transition-colors',
        variant === 'solid'
          ? 'border-ed bg-ed text-void hover:border-amber hover:bg-amber'
          : 'border-ed/60 text-ed hover:border-ed hover:bg-ed/10',
      )}
    >
      <span aria-hidden className="transition-transform group-hover:-translate-x-1">[</span>
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">]</span>
    </motion.a>
  )
}
