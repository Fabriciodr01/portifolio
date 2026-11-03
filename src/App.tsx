import { MotionConfig } from 'motion/react'
import { BootProvider } from '@/components/boot/Boot'
import { Backdrop } from '@/components/layout/Backdrop'
import { StatusBar } from '@/components/layout/StatusBar'
import { SECTION_IDS } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { About } from '@/sections/about/About'
import { Experience } from '@/sections/experience/Experience'
import { Intro } from '@/sections/intro/Intro'
import { Projects } from '@/sections/projects/Projects'

export default function App() {
  const active = useActiveSection(SECTION_IDS)
  return (
    // reducedMotion="user" drops transform/layout animations (nav underline slide, tap scale) for every
    // Motion component when the OS asks for reduced motion; opacity fades still run.
    <MotionConfig reducedMotion="user">
      <BootProvider>
        <Backdrop />
        <StatusBar active={active} />
        <main>
          <Intro />
          <About />
          <Experience />
          <Projects />
        </main>
      </BootProvider>
    </MotionConfig>
  )
}
