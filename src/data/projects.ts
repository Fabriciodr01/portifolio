/**
 * Cards in the Projects section. `stack` holds ids from data/tech.ts and drives both the card icons and the filter.
 * A `work` card stands for professional work whose code is private, so the stack used there is still represented.
 */
export type Project = {
  id: string
  kind: 'project' | 'work'
  title: string
  subtitle: string
  stack: string[]
  href: string
}

export const PROJECTS: Project[] = [
  {
    id: 'minha-visita',
    kind: 'work',
    title: 'Minha Visita',
    subtitle: 'Professional work: web and hybrid mobile front end',
    stack: ['vue', 'typescript', 'quasar', 'capacitor', 'graphql', 'cypress', 'jest'],
    href: '#experience',
  },
  {
    id: 'timeways-api',
    kind: 'project',
    title: 'timeways-api',
    subtitle: 'Calendar and event management REST API',
    stack: ['csharp', 'dotnet', 'efcore', 'postgres', 'jwt', 'swagger', 'xunit', 'docker', 'gh-actions'],
    href: 'https://github.com/Fabriciodr01/timeways-api',
  },
  {
    id: 'frontline',
    kind: 'project',
    title: 'FrontLine',
    subtitle: 'Turn-based multiplayer tactics game',
    stack: ['unity', 'csharp'],
    href: 'https://github.com/Fabriciodr01/FrontLine',
  },
  {
    id: 'portfolio',
    kind: 'project',
    title: 'This portfolio',
    subtitle: 'Interactive HUD-style personal site',
    stack: ['react', 'typescript', 'tailwind', 'vite', 'motion', 'three', 'gh-actions'],
    href: 'https://github.com/Fabriciodr01/portifolio',
  },
]
