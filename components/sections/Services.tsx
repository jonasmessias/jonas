'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { SectionHeading } from '@/components/globals/section-heading'
import { Text } from '@/components/globals/text'
import Technologies from '@/components/sections/Technologies'
import { Boxes, Server, Sparkles, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ServiceCard {
  title: string
  desc: string
}

// Card order matches the i18n `services.cards` array:
// 1) SaaS & ecosystems, 2) Architecture & back-end, 3) Front-end & immersive.
const cardIcons: LucideIcon[] = [Boxes, Server, Sparkles]

const Services = () => {
  const t = useTranslations('services')
  const cards = t.raw('cards') as ServiceCard[]

  return (
    <section id="services" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
        className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
      >
        {cards.map((card, i) => {
          const Icon = cardIcons[i] ?? Boxes
          return (
            <div
              key={card.title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-5 sm:p-6 transition-colors hover:border-primary/50"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <Text
                tag="h3"
                weight="bold"
                className="text-lg sm:text-xl tracking-tight"
              >
                {card.title}
              </Text>
              <Text
                variant="body"
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
              >
                {card.desc}
              </Text>
            </div>
          )
        })}
      </GSAPReveal>

      <div className="mt-12 sm:mt-14">
        <Technologies />
      </div>
    </section>
  )
}

export default Services
