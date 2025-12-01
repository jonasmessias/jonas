import {
  GSAPReveal,
  GSAPSplitText,
} from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { DecorativeCorners } from '@/components/ui/decorative-corners'
import { MarkdownFile } from '@/lib/markdown'

interface ExperienceProps {
  experiences: MarkdownFile[]
}

const Experience = ({ experiences }: ExperienceProps) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <GSAPReveal from={{ opacity: 0, y: -30 }} duration={1}>
        <Text size="huge-2" weight="bold" className="mb-8 sm:mb-10 md:mb-12">
          <GSAPSplitText stagger={0.04}>Experience</GSAPSplitText>
        </Text>
      </GSAPReveal>

      <div className="space-y-6 sm:space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.slug} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: MarkdownFile
  index: number
}) => {
  const description = experience.content
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.trim().substring(1).trim())

  return (
    <GSAPReveal
      from={{ opacity: 0, x: -60, scale: 0.95 }}
      to={{ opacity: 1, x: 0, scale: 1 }}
      delay={0.3 + index * 0.2}
      duration={1}
    >
      <div className="group relative p-4 sm:p-5 md:p-6 border border-border hover:border-primary/50 transition-colors">
        <DecorativeCorners size="md" variant="hover" className="border-2" />

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 sm:mb-4">
          <div>
            <Text
              size="xl"
              weight="bold"
              className="mb-1 text-base sm:text-lg md:text-xl"
            >
              {experience.data.role}
            </Text>
            <Text size="lg" className="text-muted-foreground text-sm sm:text-base md:text-lg">
              {experience.data.company}
            </Text>
            <Text size="sm" className="text-muted-foreground text-xs sm:text-sm">
              {experience.data.location}
            </Text>
          </div>
          <Text
            size="md"
            className="text-muted-foreground md:text-right whitespace-nowrap text-xs sm:text-sm md:text-base"
          >
            {experience.data.period}
          </Text>
        </div>

        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 list-none">
          {description.map((item: string, i: number) => (
            <li key={i} className="flex gap-1.5 sm:gap-2">
              <span className="text-primary mt-1 sm:mt-1.5 text-xs sm:text-sm">
                ●
              </span>
              <Text
                size="md"
                className="text-muted-foreground flex-1 text-xs sm:text-sm md:text-base"
              >
                {item}
              </Text>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.data.technologies?.map((tech: string, i: number) => (
            <span
              key={i}
              className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm border border-primary/30 text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GSAPReveal>
  )
}

export default Experience
