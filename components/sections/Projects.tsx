'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { SectionHeading } from '@/components/globals/section-heading'
import { Text } from '@/components/globals/text'
import { OSMCaseStudy } from '@/components/sections/osm-case-study'
import { MarkdownFile } from '@/lib/markdown'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowUpRight } from 'react-icons/hi2'

interface ProjectsProps {
  projects: MarkdownFile[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const t = useTranslations('projects')
  const featuredProjects = projects.filter((p) => p.data.featured)

  return (
    <section
      id="projects"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <GSAPReveal from={{ opacity: 0, y: 32 }} duration={0.9}>
        <SectionHeading
          no={t('sectionNo')}
          title={t('title')}
          description={t('description')}
        />
      </GSAPReveal>

      <div className="mt-8 sm:mt-10">
        <OSMCaseStudy />
      </div>

      {featuredProjects.length > 0 && (
        <div className="mt-10 sm:mt-12">
          <Text
            variant="mono"
            size="sm"
            weight="semibold"
            className="text-muted-foreground uppercase tracking-[0.15em] text-xs"
          >
            {t('secondaryLabel')}
          </Text>

          <GSAPReveal
            from={{ opacity: 0, y: 32 }}
            delay={0.1}
            duration={0.9}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                cta={t('viewProject')}
              />
            ))}
          </GSAPReveal>
        </div>
      )}
    </section>
  )
}

const ProjectCard = ({
  project,
  cta,
}: {
  project: MarkdownFile
  cta: string
}) => {
  return (
    <Link
      href={project.data.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-lg border border-border overflow-hidden bg-card/40 transition-colors hover:border-primary/60"
      aria-label={`${cta}: ${project.data.title}`}
    >
      <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden bg-muted">
        <Image
          src={project.data.image}
          alt={project.data.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <Text
            tag="h4"
            weight="bold"
            className="text-base sm:text-lg md:text-xl tracking-tight"
          >
            {project.data.title}
          </Text>
          <HiArrowUpRight className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>

        <Text
          variant="body"
          className="mt-2 text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          {project.data.description}
        </Text>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.data.tags?.slice(0, 6).map((tag: string, i: number) => (
            <li
              key={i}
              className="rounded border border-border/60 px-2 py-0.5 font-mono text-[10px] sm:text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default Projects
