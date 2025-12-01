import {
  GSAPReveal,
  GSAPSplitText,
} from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { DecorativeCorners } from '@/components/ui/decorative-corners'
import { MarkdownFile } from '@/lib/markdown'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectsProps {
  projects: MarkdownFile[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const featuredProjects = projects.filter((p) => p.data.featured)
  const projectCount = featuredProjects.length

  const gridClasses =
    projectCount === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <GSAPReveal from={{ opacity: 0, y: -50 }} duration={1}>
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <Text size="huge-2" weight="bold">
            <GSAPSplitText stagger={0.04}>Featured Projects</GSAPSplitText>
          </Text>
          <Text
            size="lg"
            className="text-muted-foreground text-center max-w-2xl px-4 sm:px-0"
          >
            A selection of projects showcasing frontend architecture,
            performance optimization, and modern development practices.
          </Text>
        </div>
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, y: 100 }}
        to={{ opacity: 1, y: 0 }}
        stagger={0.2}
        duration={1}
      >
        <div className={gridClasses}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </GSAPReveal>
    </section>
  )
}

const ProjectCard = ({ project }: { project: MarkdownFile }) => {
  return (
    <Link
      href={project.data.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="group relative border border-border/50 overflow-hidden hover:border-primary transition-all h-full flex flex-col">
        <DecorativeCorners size="md" variant="hover" className="z-10 border-2" />

        <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={project.data.image}
            alt={project.data.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 md:p-6 bg-background relative flex flex-col flex-grow">
          <div className="absolute top-0 left-0 w-full h-px bg-primary" />
          <Text size="xl" weight="bold" className="mb-2 text-base sm:text-lg md:text-xl">
            {project.data.title}
          </Text>
          <Text
            size="md"
            className="text-muted-foreground mb-3 sm:mb-4 flex-grow text-sm sm:text-base"
          >
            {project.data.description}
          </Text>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
            {project.data.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 border border-primary/30 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Projects

