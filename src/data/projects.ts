import { EXPERIENCE } from '@/data/profile'

/**
 * Cards in the Projects section. `stack` holds ids from data/tech.ts and drives both the card icons and the filter.
 * A `work` card stands for professional work whose code is private, so the stack used there is still represented.
 * `summary` and `highlights` fill the details dialog; for public projects they follow each repository's README.
 */
export type Project = {
  id: string
  kind: 'project' | 'work'
  title: string
  subtitle: string
  summary: string
  highlights: string[]
  stack: string[]
  href: string
}

export const PROJECTS: Project[] = [
  {
    id: 'minha-visita',
    kind: 'work',
    title: 'Minha Visita',
    subtitle: 'Professional work: web and hybrid mobile front end',
    summary: 'Front-end engineering on a product shipped to web and hybrid mobile. The code is proprietary, so this card lists what I worked on.',
    highlights: EXPERIENCE[0].points,
    stack: ['vue', 'typescript', 'quasar', 'capacitor', 'graphql', 'cypress', 'jest'],
    href: '#experience',
  },
  {
    id: 'timeways-api',
    kind: 'project',
    title: 'timeways-api',
    subtitle: 'Calendar and event management REST API',
    summary: 'A layered ASP.NET Core / .NET 10 API (Api, Application, Domain, Infrastructure), built to get hands-on back-end experience while moving from front end to full stack.',
    highlights: [
      'User registration and login with JWT authentication and authorization.',
      'Event CRUD with ownership rules, FluentValidation and global exception handling.',
      'PostgreSQL through Entity Framework Core migrations, documented with Swagger / OpenAPI.',
      'Unit and integration tests with xUnit and Testcontainers.',
      'Docker Compose for local runs and a GitHub Actions pipeline that formats, builds and tests.',
    ],
    stack: ['csharp', 'dotnet', 'efcore', 'postgres', 'jwt', 'swagger', 'xunit', 'docker', 'gh-actions'],
    href: 'https://github.com/Fabriciodr01/timeways-api',
  },
  {
    id: 'frontline',
    kind: 'project',
    title: 'FrontLine',
    subtitle: 'Turn-based multiplayer tactics game',
    summary: 'A two-player, grid-based tactics game in Unity 6, built as an academic study of software design patterns applied to real gameplay systems.',
    highlights: [
      'Command pattern for every player action: move, shoot, throw grenade, end turn.',
      'Explicit game state machine with validated transitions between phases.',
      'Enemy AI composed from a behavior tree of selector, sequence and action nodes.',
      'Service locator and C# events keep combat, line of sight and map logic decoupled from the views.',
      'Action points, line of sight, grenades and smoke on a grid battlefield.',
    ],
    stack: ['unity', 'csharp'],
    href: 'https://github.com/Fabriciodr01/FrontLine',
  },
  {
    id: 'portfolio',
    kind: 'project',
    title: 'This portfolio',
    subtitle: 'Interactive HUD-style personal site',
    summary: 'This site: an Elite Dangerous inspired HUD built to show front-end craft without getting in the way of the content.',
    highlights: [
      'Federal Corvette hologram in react-three-fiber, from a 22 MB OBJ reduced to a 168 KB edge and hull file by a custom script.',
      'Custom fresnel and scanline shader with a clipping-plane scan-in.',
      'Theme tokens and a type scale in Tailwind CSS v4, with AA contrast for every text role.',
      'Every animation respects prefers-reduced-motion; three.js loads only when the ship is about to appear.',
      'Built with Vite and deployed to GitHub Pages by GitHub Actions.',
    ],
    stack: ['react', 'typescript', 'tailwind', 'vite', 'motion', 'three', 'gh-actions'],
    href: 'https://github.com/Fabriciodr01/portifolio',
  },
]
