import {
  GSAPReveal,
  GSAPSplitText,
} from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { TechnologyCard } from '@/components/ui/technology-card'
import {
  SiGit,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

const technologies = [
  { icon: SiReact, name: 'React' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiVite, name: 'Vite' },
  { icon: SiJest, name: 'Jest' },
  { icon: SiTailwindcss, name: 'Tailwind CSS' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiGit, name: 'Git' },
]

const Technologies = () => {
  return (
    <section
      id="technologies-section"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <GSAPReveal from={{ opacity: 0, y: -50 }} duration={1}>
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <Text size="huge-2" weight="bold">
            <GSAPSplitText stagger={0.03}>Tech Stack</GSAPSplitText>
          </Text>
          <Text
            className="text-muted-foreground max-w-2xl text-center px-4 sm:px-0"
            size="lg"
          >
            Modern technologies for building fast, reliable, and scalable web
            applications.
          </Text>
        </div>
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, scale: 0.5, rotate: -10 }}
        to={{ opacity: 1, scale: 1, rotate: 0 }}
        stagger={0.1}
        duration={0.8}
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 md:grid-cols-4">
          {technologies.map((tech, index) => (
            <TechnologyCard key={index} icon={tech.icon} name={tech.name} />
          ))}
        </div>
      </GSAPReveal>
    </section>
  )
}

export default Technologies
