export const SUMMARY = [
  'Software engineer building web and cross-platform mobile apps, front to back.',
  'On the front end I work with Vue 3, React, TypeScript and Quasar; on the back end with C# / .NET Core, Node.js and NestJS.',
  'I care about performance (code splitting, payload reduction, caching), automated tests (Cypress, Jest, xUnit), Docker and CI/CD, clean architecture and SOLID.',
]

export type StackTab = { id: 'frontend' | 'backend' | 'games'; label: string; items: string[] }

export const STACK: StackTab[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    items: ['Vue 3 (Composition API)', 'React', 'TypeScript', 'JavaScript (ES6+)', 'Quasar', 'Capacitor', 'Pinia / Vuex', 'HTML5', 'CSS3 / Sass', 'Cypress', 'Jest'],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    items: ['C#', '.NET Core / ASP.NET', 'Entity Framework Core', 'Node.js', 'NestJS', 'REST', 'GraphQL', 'JWT', 'PostgreSQL', 'SQL Server', 'Firebase', 'Docker', 'GitHub Actions', 'xUnit'],
  },
  {
    id: 'games',
    label: 'GAMES',
    items: ['Unity', 'C#', 'GameMaker Studio 2', 'GML', 'Blender', '2D / 3D'],
  },
]

export type Job = { role: string; company: string; period: string; place: string; points: string[] }

export const EXPERIENCE: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Minha Visita',
    period: 'Nov 2024 – Jul 2026',
    place: 'Novo Hamburgo, RS · Hybrid',
    points: [
      'Core features and responsive interfaces with Vue 3, TypeScript, Quasar and Capacitor (web + hybrid mobile).',
      'REST and GraphQL integration during a major front-end modernization.',
      'Outlook-style recurrence scheduling engine with custom rules and i18n in 3 languages.',
      'E2E tests with Cypress and unit tests with Jest, wired into CI/CD.',
      'Performance work: async code splitting, smaller payloads, caching, render tuning.',
    ],
  },
  {
    role: 'Technical Support & Systems Analyst',
    company: 'Minha Visita',
    period: 'Sep 2024 – Nov 2024',
    place: 'Novo Hamburgo, RS',
    points: [
      'Root-cause analysis of production bugs with SQL and telemetry.',
      'Promoted to the core engineering team within two months.',
    ],
  },
  {
    role: 'Computer Science & Game Development Instructor',
    company: 'Happy',
    period: 'Feb 2023 – Aug 2024',
    place: 'Porto Alegre, RS',
    points: ['Taught programming fundamentals, OOP and 2D/3D game development to 40+ students.'],
  },
]

export const EDUCATION = [
  { title: 'B.Tech in Digital Games / Applied Software Engineering', school: 'UNIASSELVI', period: 'Expected Jul 2026' },
  { title: 'Ultimate C# Masterclass (ASP.NET Core, EF Core, Clean Architecture)', school: 'Udemy', period: 'Completed' },
]
