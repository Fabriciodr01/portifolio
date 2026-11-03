export const SITE = {
  name: 'Fabricio',
  handle: 'FABRICIO.DEV',
  github: 'https://github.com/Fabriciodr01',
  linkedin: 'https://www.linkedin.com/in/fabriciodr01',
} as const

/**
 * Order here = order on the page = order in the nav.
 * `label` is the nav text, `title` feeds the eyebrow ("TRANSMISSION_001 / PORTFOLIO") and the divider ("NEXT: PROFILE").
 */
export const SECTIONS = [
  { id: 'intro', label: 'INTRO', title: 'PORTFOLIO' },
  { id: 'about', label: 'ABOUT', title: 'PROFILE' },
  { id: 'projects', label: 'PROJECTS', title: 'PROJECTS' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id)

/** 1 -> "TRANSMISSION_001" */
export const transmission = (n: number) => `TRANSMISSION_${String(n).padStart(3, '0')}`
