'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { SectionHeading } from '@/components/globals/section-heading'
import { useTranslations } from 'next-intl'
import { IconType } from 'react-icons'
import {
  SiAmazonwebservices,
  SiAngular,
  SiApachekafka,
  SiAxios,
  SiDocker,
  SiExpress,
  SiFastify,
  SiFramer,
  SiGithubactions,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiRabbitmq,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedis,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
  SiZod,
} from 'react-icons/si'

type CategoryKey =
  | 'frontend'
  | 'libraries'
  | 'backend'
  | 'architecture'
  | 'infra'
  | 'data'

interface TechItem {
  name: string
  icon?: IconType
}

const stack: { key: CategoryKey; items: TechItem[] }[] = [
  {
    key: 'frontend',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Angular', icon: SiAngular },
      { name: 'Vite', icon: SiVite },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer },
    ],
  },
  {
    key: 'libraries',
    items: [
      { name: 'TanStack Query', icon: SiReactquery },
      { name: 'Zustand' },
      { name: 'Axios', icon: SiAxios },
      { name: 'Zod', icon: SiZod },
      { name: 'React Hook Form', icon: SiReacthookform },
      { name: 'React Router', icon: SiReactrouter },
    ],
  },
  {
    key: 'backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'Fastify', icon: SiFastify },
      { name: 'Express', icon: SiExpress },
      { name: 'Java · Spring', icon: SiSpring },
      { name: 'PHP · Laravel', icon: SiLaravel },
    ],
  },
  {
    key: 'architecture',
    items: [
      { name: 'Module Federation', icon: SiWebpack },
      { name: 'Microfrontends' },
      { name: 'Clean Architecture' },
      { name: 'Modular Monoliths' },
    ],
  },
  {
    key: 'infra',
    items: [
      { name: 'AWS', icon: SiAmazonwebservices },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kafka', icon: SiApachekafka },
      { name: 'RabbitMQ', icon: SiRabbitmq },
      { name: 'Redis', icon: SiRedis },
      { name: 'GitHub Actions', icon: SiGithubactions },
    ],
  },
  {
    key: 'data',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
]

const Technologies = () => {
  const t = useTranslations('technologies')

  return (
    <section
      id="technologies"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <GSAPReveal from={{ opacity: 0, y: 32 }} duration={0.9}>
        <SectionHeading
          no={t('sectionNo')}
          title={t('title')}
          description={t('description')}
        />
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, y: 32 }}
        delay={0.1}
        duration={0.9}
        className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
      >
        {stack.map((category) => (
          <CategoryBlock
            key={category.key}
            label={t(`categories.${category.key}`)}
            items={category.items}
          />
        ))}
      </GSAPReveal>
    </section>
  )
}

const CategoryBlock = ({
  label,
  items,
}: {
  label: string
  items: TechItem[]
}) => {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-sm font-medium uppercase tracking-[0.15em] text-primary">
          {label}
        </span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <li
              key={item.name}
              className="group inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/50 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary/60"
            >
              {Icon ? (
                <Icon className="text-base text-muted-foreground transition-colors group-hover:text-primary" />
              ) : (
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                />
              )}
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Technologies
