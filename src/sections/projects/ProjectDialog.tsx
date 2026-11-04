import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { HudButton } from '@/components/ui/HudButton'
import { Panel } from '@/components/ui/Panel'
import { TechIcon } from '@/components/ui/TechIcon'
import type { Project } from '@/data/projects'
import { TECH_BY_ID } from '@/data/tech'

type Props = { project: Project; label: string; onClose: () => void }

/**
 * Project details in a native modal <dialog>: the browser handles focus trapping, Esc and the inert background.
 * Clicking the backdrop (the dialog element itself, outside the panel) also closes it.
 */
export function ProjectDialog({ project, label, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  const work = project.kind === 'work'

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      // The close event is async: a cleanup close() followed by an immediate re-open (React StrictMode remount)
      // must not report the dialog as closed.
      onClose={() => !ref.current?.open && onClose()}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[88dvh] w-[min(42rem,calc(100vw-2.5rem))] overflow-visible bg-transparent p-0 text-ink backdrop:bg-void/80 backdrop:backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
        <Panel label={`${label} // DETAILS`} meta={work ? 'PROPRIETARY' : 'PUBLIC REPO'}>
          <div className="max-h-[calc(88dvh-6rem)] overflow-y-auto pr-1 [scrollbar-color:var(--color-ed)_transparent] [scrollbar-width:thin]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="project-dialog-title" className="type-heading">{project.title}</h3>
                <p className="type-sub mt-1">{project.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="hud-control type-caption text-hud shrink-0 px-2 py-1"
              >
                Close ×
              </button>
            </div>

            <p className="type-body mt-5">{project.summary}</p>

            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="type-body flex gap-3">
                  <span aria-hidden className="text-ed">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="type-label mt-6">Built with</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((id) => {
                const t = TECH_BY_ID.get(id)
                return t && (
                  <li key={id} className="type-sub flex items-center gap-2 border border-ed/40 px-2.5 py-1">
                    <TechIcon tech={t} className="size-4" />
                    {t.name}
                  </li>
                )
              })}
            </ul>

            <div className="mt-6">
              {work ? (
                <a href={project.href} onClick={onClose} className="hud-link type-caption">
                  Private code · see Experience ↓
                </a>
              ) : (
                <HudButton href={project.href} external>Repository ↗</HudButton>
              )}
            </div>
          </div>
        </Panel>
      </motion.div>
    </dialog>
  )
}
