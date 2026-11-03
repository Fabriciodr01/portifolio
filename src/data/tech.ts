import {
  siCapacitor, siCypress, siDocker, siDotnet, siGithubactions, siGraphql, siJest, siJsonwebtokens, siPostgresql,
  siQuasar, siReact, siSwagger, siTailwindcss, siThreedotjs, siTypescript, siUnity, siVite, siVuedotjs,
} from 'simple-icons'

/**
 * Technologies shown in the Projects filter. Only add one here once a card in data/projects.ts uses it: every icon
 * on the page should be backed by public code or professional work. Icons come from simple-icons (CC0); brands it
 * does not carry (Microsoft's, mostly) get a short monogram instead.
 */
export type Tech = { id: string; name: string; path?: string; mono?: string }
export type TechGroup = { id: string; label: string; brackets: readonly [string, string]; items: Tech[] }

const icon = (id: string, si: { title: string; path: string }, name = si.title): Tech => ({ id, name, path: si.path })
const mono = (id: string, name: string, letters: string): Tech => ({ id, name, mono: letters })

export const TECH_GROUPS: TechGroup[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    brackets: ['<', '>'],
    items: [
      icon('vue', siVuedotjs, 'Vue'),
      icon('react', siReact),
      icon('typescript', siTypescript),
      icon('quasar', siQuasar),
      icon('capacitor', siCapacitor),
      icon('tailwind', siTailwindcss),
      icon('vite', siVite),
      mono('motion', 'Motion', 'Mo'),
      icon('three', siThreedotjs, 'three.js'),
      icon('cypress', siCypress),
      icon('jest', siJest),
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    brackets: ['(', ')'],
    items: [
      mono('csharp', 'C#', 'C#'),
      icon('dotnet', siDotnet, '.NET'),
      mono('efcore', 'Entity Framework Core', 'EF'),
      icon('graphql', siGraphql),
      icon('postgres', siPostgresql),
      icon('jwt', siJsonwebtokens, 'JWT'),
      icon('swagger', siSwagger),
      mono('xunit', 'xUnit', 'xU'),
      icon('docker', siDocker),
      icon('gh-actions', siGithubactions),
    ],
  },
  {
    id: 'games',
    label: 'GAMES',
    brackets: ['[', ']'],
    items: [icon('unity', siUnity)],
  },
]

export const TECH_BY_ID = new Map(TECH_GROUPS.flatMap((g) => g.items.map((t) => [t.id, t] as const)))
