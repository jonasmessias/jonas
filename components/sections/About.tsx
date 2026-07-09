'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { SectionHeading } from '@/components/globals/section-heading'
import { Text } from '@/components/globals/text'
import { useTranslations } from 'next-intl'

const practices: { key: string; items: string[] }[] = [
  {
    key: 'testing',
    items: ['Jest', 'Vitest', 'React Testing Library', 'Cypress'],
  },
  {
    key: 'performance',
    items: ['Code splitting', 'Lazy loading', 'Memoization', 'Core Web Vitals'],
  },
  {
    key: 'accessibility',
    items: ['WCAG AA', 'Keyboard nav', 'ARIA', 'Reduced motion'],
  },
  {
    key: 'observability',
    items: ['Sentry', 'Structured logs (Pino)'],
  },
  {
    key: 'security',
    items: ['JWT', 'OAuth2', 'Argon2', 'SSO multi-tenant'],
  },
  {
    key: 'delivery',
    items: ['CI/CD (GitHub Actions)', 'Docker', 'AWS'],
  },
]

const About = () => {
  const t = useTranslations('about')
  const paragraphs = t.raw('paragraphs') as string[]

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <GSAPReveal from={{ opacity: 0, y: 32 }} duration={0.9}>
        <SectionHeading no={t('sectionNo')} title={t('title')} />
      </GSAPReveal>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-8 md:gap-12">
        <GSAPReveal from={{ opacity: 0, y: 24 }} delay={0.1} duration={0.9}>
          <Text
            tag="p"
            weight="semibold"
            className="text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight text-balance"
          >
            {t('lead')}
          </Text>
        </GSAPReveal>

        <GSAPReveal
          from={{ opacity: 0, y: 24 }}
          delay={0.2}
          duration={0.9}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {paragraphs.map((paragraph, i) => (
            <Text
              key={i}
              variant="body"
              className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
            >
              {paragraph}
            </Text>
          ))}
        </GSAPReveal>
      </div>

      <GSAPReveal
        from={{ opacity: 0, y: 24 }}
        delay={0.25}
        duration={0.9}
        className="mt-10 sm:mt-12"
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {t('practicesTitle')}
        </span>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practices.map((group) => (
            <div
              key={group.key}
              className="rounded-lg border border-border bg-card/40 p-4 sm:p-5"
            >
              <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary">
                {t(`practices.${group.key}`)}
              </span>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border/60 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GSAPReveal>
    </section>
  )
}

export default About
