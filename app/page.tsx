import ClientPage from "@/app/client-page"
import { Header } from "@/components/globals/header"
import Line from "@/components/globals/line"
import Contact from "@/components/sections/Contact"
import Experience from "@/components/sections/Experience"
import Presentation from "@/components/sections/Presentation"
import Projects from "@/components/sections/Projects"
import Technologies from "@/components/sections/Technologies"
import { getExperiences, getProjects } from "@/lib/markdown"

export default function Home() {
  const projects = getProjects()
  const experiences = getExperiences()

  return (
    <ClientPage projects={projects} experiences={experiences}>
      <Header />
      <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
      <div className="flex flex-col gap-24 pt-12">
        <Presentation />
        <Line audioSrc="/sounds/2-oct-c.wav" volume={0.3} />
        <Technologies />
        <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
        <Experience experiences={experiences} />
        <Line audioSrc="/sounds/2-oct-c.wav" volume={0.3} />
        <Projects projects={projects} />
        <Line audioSrc="/sounds/3-oct-e.wav" volume={0.3} />
        <Contact />
      </div>
    </ClientPage>
  )
}
