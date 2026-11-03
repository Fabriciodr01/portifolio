/** Dossier paragraphs for the About section, typed out when they scroll into view. */
export const SUMMARY = [
  'I build web and cross-platform mobile apps end to end: the interface people use, the APIs behind it and the pipeline that ships it. The tools change from project to project; the projects below can be filtered by any of them.',
  'At Minha Visita I moved from support to the core engineering team in two months, then built an Outlook-style recurrence engine in three languages and helped modernize how the front end talks to the API.',
  'I care about software that stays fast and stable: lean bundles, caching, automated tests in CI and clean architecture. Before that, I taught programming and game development to 40+ students.',
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
