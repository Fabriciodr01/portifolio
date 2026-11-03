import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const LINES = [
  ['INITIALISING HUD', 'OK'],
  ['LOADING PROFILE: DIAS DA ROSA, F.', 'OK'],
  ['SHIP SCAN: FEDERAL CORVETTE', 'OK'],
  ['COMMS', 'ONLINE'],
] as const
const STEP = 0.24
const HOLD = 0.35
export const BOOT_SECONDS = LINES.length * STEP + HOLD
const SEEN_KEY = 'boot-seen'

type BootState = { done: boolean; endsAt: number }
const BootContext = createContext<BootState>({ done: true, endsAt: 0 })

/** `done` flips once the overlay starts leaving; `endsAt` lets entrance animations queue up behind it. */
export const useBoot = () => useContext(BootContext)

function alreadySeen() {
  try { return sessionStorage.getItem(SEEN_KEY) === '1' } catch { return false }
}

/**
 * Short boot sequence over the page on the first visit of a session. Skipped for reduced motion and on any input,
 * so it never stands between a recruiter and the content for more than a moment.
 */
export function BootProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [state, setState] = useState<BootState>(() =>
    reduce || alreadySeen() ? { done: true, endsAt: 0 } : { done: false, endsAt: performance.now() + BOOT_SECONDS * 1000 },
  )

  useEffect(() => {
    if (state.done) return
    const finish = () => setState({ done: true, endsAt: 0 })
    const timer = setTimeout(finish, BOOT_SECONDS * 1000)
    const events = ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, finish, { once: true, passive: true }))
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* private mode: boot just replays next visit */ }
    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, finish))
    }
  }, [state.done])

  return (
    <BootContext.Provider value={state}>
      {children}
      <AnimatePresence>{!state.done && <BootOverlay key="boot" />}</AnimatePresence>
    </BootContext.Provider>
  )
}

function BootOverlay() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-void px-6"
      exit={{ clipPath: ['inset(0% 0% 0% 0%)', 'inset(49.8% 0% 49.8% 0%)', 'inset(50% 50% 50% 50%)'] }}
      transition={{ duration: 0.45, times: [0, 0.7, 1], ease: 'easeIn' }}
    >
      <div className="w-full max-w-lg">
        <p className="type-eyebrow flex items-center gap-3">
          <span className="size-1.5 animate-pulse rounded-full bg-ed shadow-[0_0_8px] shadow-ed" />
          FABRICIO.DEV // BOOT SEQUENCE
        </p>
        <motion.div
          className="mt-4 h-px origin-left bg-ed"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: LINES.length * STEP, ease: 'linear' }}
        />
        <ul className="mt-5 space-y-2">
          {LINES.map(([label, status], i) => (
            <motion.li
              key={label}
              className="type-meta flex items-baseline gap-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * STEP, duration: 0.15 }}
            >
              <span className="text-dim">&gt;</span>
              <span className="truncate">{label}</span>
              <span className="min-w-4 flex-1 border-b border-dotted border-dim/60" />
              <motion.span
                className="text-ed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * STEP + STEP * 0.7, duration: 0.05 }}
              >
                {status}
              </motion.span>
            </motion.li>
          ))}
        </ul>
        <p className="type-caption mt-6">Press any key to skip</p>
      </div>
    </motion.div>
  )
}
