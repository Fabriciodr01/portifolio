/** Dossier paragraphs for the About section, typed out when they scroll into view. */
export const SUMMARY = [
  "I'm a full stack software engineer: Vue 3, React and TypeScript on the front end; C# / .NET, Node.js, NestJS and Docker on the back end. I care about interfaces that feel good to use and architecture that keeps them easy to change. Open to full stack, front-end or back-end roles, remote or with relocation.",
  "At Minha Visita I was promoted from support to the core engineering team in two months. From there I shipped features to web and mobile with Vue, Quasar and Capacitor, built an Outlook-style recurrence scheduling engine localized in three languages, integrated REST and GraphQL APIs during a major front-end modernization, and cut load times with code splitting and caching, all covered by Cypress and Jest suites in CI.",
  "Before engineering I taught programming and game development to 40+ students, where I learned to explain technical decisions clearly to people at any level.",
  "Off the clock I build small games in Unity and GameMaker with my own Blender models, or I'm racing in Assetto Corsa Competizione and flying in Elite Dangerous. This site is where those worlds meet.",
]

export type Job = { id: string; role: string; company: string; period: string; place: string; points: string[] }

export const EXPERIENCE: Job[] = [
  {
    id: 'minha-visita-engineer',
    role: 'Software Engineer',
    company: 'Minha Visita',
    period: 'Nov 2024 – Jul 2026',
    place: 'Novo Hamburgo, RS · Hybrid',
    points: [
      'Built core features and responsive interfaces with Vue 3, TypeScript, Quasar and Capacitor, shipped to web and hybrid mobile.',
      'Designed an Outlook-style recurrence scheduling engine: custom repeat rules, edge cases and i18n in 3 languages.',
      'Integrated REST and GraphQL APIs during a major front-end modernization.',
      'Wrote Cypress E2E and Jest unit suites wired into CI/CD to stop regressions before release.',
      'Cut load times with async code splitting, smaller payloads, browser caching and render tuning.',
    ],
  },
  {
    id: 'minha-visita-support',
    role: 'Technical Support & Systems Analyst',
    company: 'Minha Visita',
    period: 'Sep 2024 – Nov 2024',
    place: 'Novo Hamburgo, RS',
    points: [
      'Traced production bugs to their root cause with SQL and application telemetry, cutting time to resolution.',
      'Triaged and patched critical issues alongside senior developers.',
      'Promoted to the core engineering team within two months.',
    ],
  },
  {
    id: 'happy-instructor',
    role: 'CS & Game Development Instructor',
    company: 'Happy',
    period: 'Feb 2023 – Aug 2024',
    place: 'Porto Alegre, RS',
    points: [
      'Taught programming fundamentals, logic and object-oriented design to 40+ students.',
      'Guided hands-on 2D and 3D game projects from first idea to finished build.',
      'Adapted complex technical concepts to each student\'s level.',
    ],
  },
]

export const EDUCATION = [
  { title: 'B.Tech in Digital Games / Applied Software Engineering', school: 'UNIASSELVI', period: 'Expected Feb 2027' },
  { title: 'Ultimate C# Masterclass (ASP.NET Core, EF Core, Clean Architecture)', school: 'Udemy', period: 'Completed' },
]
