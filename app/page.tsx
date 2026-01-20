import ClientPage from '@/app/client-page'
import { Header } from '@/components/globals/header'
import Line from '@/components/globals/line'
import ScrollToTop from '@/components/globals/scroll-to-top'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Presentation from '@/components/sections/Presentation'
import Projects from '@/components/sections/Projects'
import Technologies from '@/components/sections/Technologies'
import { getExperiences, getProjects } from '@/lib/markdown'

export default function Home() {
  const projects = getProjects()
  const experiences = getExperiences()

  return (
    <ClientPage projects={projects} experiences={experiences}>
      <Header />
      <Presentation />
      <div className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/50 via-primary/20 to-transparent dark:from-primary/40 dark:via-primary/15 blur-3xl" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/30 via-transparent to-transparent dark:from-primary/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-r from-transparent via-primary/20 to-transparent dark:via-primary/10 blur-2xl" />
        </div>
        <Line
          className="absolute -top-4 left-0 w-full h-8"
          audioSrc="/sounds/2-oct-c.wav"
          volume={0.3}
          animation={{ delay: 0.2, duration: 1, from: 'center' }}
        />
        <Technologies />
      </div>

      <div className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/50 via-primary/20 to-transparent dark:from-primary/40 dark:via-primary/15 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-primary/30 via-transparent to-transparent dark:from-primary/20 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-bl from-primary/25 via-transparent to-transparent dark:from-primary/15 blur-3xl" />
        </div>
        <Line
          className="absolute -top-4 left-0 w-full h-8"
          animation={{ delay: 0.3, duration: 1.2, from: 'right' }}
        />
        <Experience experiences={experiences} />
      </div>

      <div className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/40 via-primary/20 to-primary/40 dark:from-primary/30 dark:via-primary/15 dark:to-primary/30 blur-3xl" />
          <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-gradient-to-r from-primary/30 via-transparent to-transparent dark:from-primary/20 blur-2xl" />
          <div className="absolute top-2/3 right-0 w-[300px] h-[300px] bg-gradient-to-l from-primary/30 via-transparent to-transparent dark:from-primary/20 blur-2xl" />
        </div>
        <Line
          className="absolute -top-4 left-0 w-full h-8"
          audioSrc="/sounds/2-oct-c.wav"
          volume={0.3}
          animation={{ delay: 0.2, duration: 1.4, from: 'left' }}
        />
        <Projects projects={projects} />
      </div>

      <div className="bg-gradient-to-b from-background via-background to-muted/10 pt-24 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-25 dark:opacity-15"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          }}
        >
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/40 via-primary/15 to-transparent dark:from-primary/30 dark:via-primary/10" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/50 via-primary/20 to-transparent dark:from-primary/40 dark:via-primary/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/40 via-transparent to-transparent dark:from-primary/30 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-primary/30 via-transparent to-transparent dark:from-primary/20 blur-2xl" />
        </div>
        <Line
          className="absolute -top-4 left-0 w-full h-8"
          animation={{ delay: 0.4, duration: 1.5, from: 'center' }}
        />
        <Contact />
      </div>
      <ScrollToTop />
    </ClientPage>
  )
}
