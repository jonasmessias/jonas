'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { ParallaxBackground } from '@/components/ui/parallax-background'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'

interface Stat {
  value: string
  label: string
}

const Presentation = () => {
  return (
    <section
      id="home"
      className="min-h-svh flex flex-col justify-center relative overflow-hidden pt-28 sm:pt-24 pb-12 sm:pb-16"
    >
      <ParallaxBackground />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-12 lg:gap-16 items-center relative z-10 w-full">
          <TextContent />
          <ImageContent />
        </div>
      </div>
    </section>
  )
}

const TextContent = () => {
  const t = useTranslations('hero')
  const stats = t.raw('stats') as Stat[]

  return (
    <div className="flex flex-col gap-5 md:gap-6 relative text-center md:text-left">
      <GSAPReveal from={{ opacity: 0, y: 24 }} duration={0.8}>
        <Text
          variant="mono"
          size="sm"
          weight="semibold"
          className="uppercase tracking-[0.2em] text-xs sm:text-sm inline-flex flex-wrap items-center gap-x-2 gap-y-1 justify-center md:justify-start"
        >
          <span className="text-foreground">{t('name')}</span>
          <span aria-hidden className="text-muted-foreground">
            {'//'}
          </span>
          <span className="text-primary">{t('kicker')}</span>
        </Text>
      </GSAPReveal>

      <GSAPReveal from={{ opacity: 0, y: 32 }} delay={0.1} duration={0.9}>
        <Text
          tag="h1"
          weight="bold"
          className="leading-[1.08] tracking-tight text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t('title')}
        </Text>
      </GSAPReveal>

      <GSAPReveal from={{ opacity: 0, y: 20 }} delay={0.25} duration={0.9}>
        <Text
          variant="body"
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed"
        >
          {t('subtitle')}
        </Text>
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, y: 16 }}
        delay={0.4}
        duration={0.8}
        className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
      >
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t('ctaStart')}
          <HiArrowRight className="text-lg transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm sm:text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {t('ctaCases')}
        </a>
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, y: 16 }}
        delay={0.55}
        duration={0.8}
        className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-t border-border/60 pt-6"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 text-center md:text-left"
          >
            <span className="font-mono text-lg sm:text-xl font-bold text-foreground tabular-nums leading-none">
              {stat.value}
            </span>
            <span className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
              {stat.label}
            </span>
          </div>
        ))}
      </GSAPReveal>
    </div>
  )
}

const ImageContent = () => {
  return (
    <GSAPReveal
      from={{ opacity: 0, scale: 0.92 }}
      to={{ opacity: 1, scale: 1 }}
      delay={0.2}
      duration={1}
      className="flex justify-center md:justify-end relative order-first md:order-last"
    >
      <div className="relative group">
        <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-primary" />

        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 relative overflow-hidden rounded-sm">
          <Image
            src="/me.jpeg"
            alt="Jonas Messias"
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
            priority
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
        </div>
      </div>
    </GSAPReveal>
  )
}

export default Presentation
