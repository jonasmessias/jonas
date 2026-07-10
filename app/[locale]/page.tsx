import ClientPage from '@/app/client-page'
import { Header } from '@/components/globals/header'
import ScrollToTop from '@/components/globals/scroll-to-top'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Presentation from '@/components/sections/Presentation'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import { getExperiences, getProjects } from '@/lib/markdown'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
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
        <Services />
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
