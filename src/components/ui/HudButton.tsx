import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

type Props = { href: string; children: string; variant?: 'solid' | 'outline'; external?: boolean }

/**
 * Button with two cut corners. The 1px outline is the outer element's background showing around an inset inner
 * element (a CSS border would be cut off by the clip-path). clip-path also hides the global focus outline, so
 * keyboard focus reuses the hover state instead.
 */
export function HudButton({ href, children, variant = 'outline', external }: Props) {
  const solid = variant === 'solid'
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group clip-notch inline-block p-px outline-none transition-colors [--c:10px]',
        solid ? 'bg-ed hover:bg-amber focus-visible:bg-amber' : 'bg-ed/60 hover:bg-amber focus-visible:bg-amber',
      )}
    >
      <span
        className={cn(
          'type-action clip-notch block px-6 py-3 transition-colors [--c:9.6px]',
          solid
            ? 'bg-ed text-void group-hover:bg-amber group-focus-visible:bg-amber'
            : 'bg-void group-hover:bg-glow group-hover:text-amber group-focus-visible:bg-glow group-focus-visible:text-amber',
        )}
      >
        {children}
      </span>
    </motion.a>
  )
}
