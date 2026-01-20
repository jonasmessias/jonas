'use client'

import {
  GSAPReveal,
  GSAPSplitText,
} from '@/components/animations/gsap-animations'
import ScrollFade from '@/components/animations/scroll-fade'
import Line from '@/components/globals/line'
import ScrollIndicator from '@/components/globals/scroll-indicator'
import { Text } from '@/components/globals/text'
import { DecorativeCorners } from '@/components/ui/decorative-corners'
import { ParallaxBackground } from '@/components/ui/parallax-background'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { HiDownload } from 'react-icons/hi'

const Presentation = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 sm:pt-20 pb-8 sm:pb-0"
    >
      <ParallaxBackground />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10 w-full">
          <TextContent />
          <ImageContent />
        </div>

        <ScrollFade
          className="absolute bottom-0 left-0 right-0"
          fadeOutOnScroll
          start="top top"
          end="200px top"
        >
          <ScrollIndicator />
        </ScrollFade>
      </div>
    </section>
  )
}

const TextContent = () => {
  const t = useTranslations('hero')

  return (
    <div className="flex flex-col gap-4 md:gap-6 relative text-center md:text-left">
      <div className="absolute -left-8 top-0 h-full hidden md:block">
        <Line
          orientation="vertical"
          audioSrc="/sounds/3-oct-e.wav"
          volume={0.2}
          animation={{ delay: 0.3, duration: 1.2, from: 'top' }}
        />
      </div>

      <GSAPReveal from={{ opacity: 0, y: 100 }} duration={1.2}>
        <Text
          size="huge-3"
          weight="bold"
          className="leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <GSAPSplitText delay={0.5} stagger={0.05} duration={0.8}>
            {t('title')}
          </GSAPSplitText>
          <br />
          <GSAPSplitText delay={0.8} stagger={0.05} duration={0.8}>
            {t('subtitle')}
          </GSAPSplitText>
        </Text>
      </GSAPReveal>

      <GSAPReveal
        from={{ opacity: 0, x: -50 }}
        to={{ opacity: 1, x: 0 }}
        delay={1.5}
        duration={1}
      >
        <Text
          size="lg"
          variant="body"
          className="text-muted-foreground border-primary/30 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0"
        >
          {t('description')}
        </Text>
      </GSAPReveal>

      <DownloadCVButton />
    </div>
  )
}

const DownloadCVButton = () => {
  const t = useTranslations('hero')

  return (
    <GSAPReveal
      from={{ opacity: 0, scale: 0.8 }}
      to={{ opacity: 1, scale: 1 }}
      delay={1.8}
      duration={0.8}
      className="mx-auto md:mx-0"
    >
      <a
        href="/cv.pdf"
        download="Jonas_Messias_CV.pdf"
        className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all w-fit text-sm sm:text-base"
      >
        <DecorativeCorners size="sm" variant="hover" />
        <HiDownload className="text-xl group-hover:scale-110 transition-transform" />
        <Text size="md" weight="bold">
          {t('downloadCV')}
        </Text>
      </a>
    </GSAPReveal>
  )
}

const ImageContent = () => {
  return (
    <GSAPReveal
      from={{ opacity: 0, scale: 0.8, rotate: -5 }}
      to={{ opacity: 1, scale: 1, rotate: 0 }}
      delay={0.5}
      duration={1.2}
      className="flex justify-center md:justify-end relative order-first md:order-last"
    >
      <div className="relative group">
        <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-primary" />

        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 relative overflow-hidden">
          <Image
            src="/me.jpeg"
            alt="Jonas Messias"
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
            priority
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
        </div>
      </div>
    </GSAPReveal>
  )
}

export default Presentation
