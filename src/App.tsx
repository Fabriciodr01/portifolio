import { Backdrop } from '@/components/layout/Backdrop'
import { StatusBar } from '@/components/layout/StatusBar'
import { SECTION_IDS } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { About } from '@/sections/about/About'
import { Intro } from '@/sections/intro/Intro'
import { Projects } from '@/sections/projects/Projects'

export default function App() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <>
      <Backdrop />
      <StatusBar active={active} />
      <main>
        <Intro />
        <About />
        <Projects />
      </main>
    </>
  )
}
