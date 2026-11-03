export const SITE = {
  name: 'Fabricio',
  handle: 'FABRICIO.DEV',
  github: 'https://github.com/Fabriciodr01',
  linkedin: 'https://www.linkedin.com/in/fabriciodr01',
} as const

/** Order here = order on the page = order in the nav. */
export const SECTIONS = [
  { id: 'intro', label: 'INTRO' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
] as const

export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id)
