'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { SectionHeading } from '@/components/globals/section-heading'
import { Text } from '@/components/globals/text'
import { useTranslations } from 'next-intl'

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
    </section>
  )
}

export default About
