import ClientPage from '@/app/client-page'
import { Header } from '@/components/globals/header'
import ScrollToTop from '@/components/globals/scroll-to-top'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Presentation from '@/components/sections/Presentation'
import Projects from '@/components/sections/Projects'
import Technologies from '@/components/sections/Technologies'
import { getExperiences, getProjects } from '@/lib/markdown'

export default function Home(props: any) {
  const { params } = props
  const locale = params?.locale
  const projects = getProjects(locale)
  const experiences = getExperiences(locale)

  return (
    <ClientPage projects={projects} experiences={experiences}>
      <Header />
      <Presentation />

      <div className="py-20 sm:py-24 border-t border-border/50">
        <About />
      </div>

      <div className="py-20 sm:py-24 border-t border-border/50">
        <Technologies />
      </div>

      <div className="py-20 sm:py-24 border-t border-border/50">
        <Projects projects={projects} />
      </div>

      <div className="py-20 sm:py-24 border-t border-border/50">
        <Experience experiences={experiences} />
      </div>

      <div className="pt-20 sm:pt-24 pb-12 border-t border-border/50">
        <Contact />
      </div>

      <ScrollToTop />
    </ClientPage>
  )
}
