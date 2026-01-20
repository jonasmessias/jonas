import {
  GSAPReveal,
  GSAPSplitText,
} from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { SocialLinkCard } from '@/components/ui/social-link-card'
import { config } from '@/utils/config'
import Link from 'next/link'
import { HiDownload } from 'react-icons/hi'
import { SiGithub, SiLinkedin } from 'react-icons/si'

const Contact = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 relative">
      <ContactHeader />
      <SocialLinks />
      <Footer />
    </section>
  )
}

const ContactHeader = () => {
  return (
    <GSAPReveal
      from={{ opacity: 0, y: 50 }}
      duration={1}
      className="flex flex-col items-center gap-4 sm:gap-6 text-center relative"
    >
      <Text size="huge-2" weight="bold">
        <GSAPSplitText stagger={0.04}>Get in Touch</GSAPSplitText>
      </Text>

      <Text
        size="lg"
        variant="body"
        className="text-muted-foreground max-w-2xl px-4 sm:px-0"
      >
        Have a project in mind or just want to say hello? Feel free to reach
        out.
      </Text>

      <div className="relative group mt-3 sm:mt-4 w-full sm:w-auto">
        <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />

        <Link href={config.links.contact} className="block">
          <Text
            size="xl"
            weight="bold"
            className="inline-block px-4 py-3 sm:px-8 sm:py-4 border border-primary/30 text-primary hover:bg-primary/5 transition-all text-sm sm:text-base md:text-xl break-all sm:break-normal"
          >
            jonasmessias30@gmail.com
          </Text>
        </Link>
      </div>
    </GSAPReveal>
  )
}

const SocialLinks = () => {
  return (
    <GSAPReveal
      from={{ opacity: 0, y: 30, scale: 0.95 }}
      to={{ opacity: 1, y: 0, scale: 1 }}
      delay={0.3}
      duration={0.8}
      className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 relative"
    >
      <SocialLinkCard
        href={config.links.github}
        label="GitHub"
        icon={
          <SiGithub className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
        }
      />
      <SocialLinkCard
        href={config.links.linkedin}
        label="LinkedIn"
        icon={
          <SiLinkedin className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
        }
      />
    </GSAPReveal>
  )
}

const Footer = () => {
  return (
    <div className="mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-10 md:pt-12 border-t border-border/30">
      <GSAPReveal
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        stagger={0.15}
        duration={0.8}
        delay={0.4}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
          <AboutColumn />
          <QuickLinksColumn />
          <DownloadCVColumn />
        </div>
      </GSAPReveal>

      <Copyright />
    </div>
  )
}

const AboutColumn = () => {
  return (
    <div>
      <Text size="lg" weight="bold" className="mb-2 sm:mb-3">
        Jonas Messias
      </Text>
      <Text
        size="sm"
        variant="body"
        className="text-muted-foreground px-4 md:px-0"
      >
        Frontend developer specialized in React, Next.js, and modern web
        technologies.
      </Text>
    </div>
  )
}

const QuickLinksColumn = () => {
  const links = [
    { href: config.links.github, label: 'GitHub', external: true },
    { href: config.links.linkedin, label: 'LinkedIn', external: true },
    { href: config.links.contact, label: 'Email', external: false },
  ]

  return (
    <div>
      <Text size="md" weight="bold" className="mb-2 sm:mb-3">
        Quick Links
      </Text>
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

const DownloadCVColumn = () => {
  return (
    <div className="flex flex-col items-center md:items-end justify-center">
      <a
        href="/cv.pdf"
        download="Jonas_Messias_CV.pdf"
        className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-primary/30 text-primary hover:bg-primary/10 transition-all text-xs sm:text-sm"
      >
        <HiDownload className="text-base sm:text-lg" />
        <Text size="sm" weight="semibold">
          Download CV
        </Text>
      </a>
    </div>
  )
}

const Copyright = () => {
  return (
    <GSAPReveal
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      delay={0.8}
      duration={1}
    >
      <div className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-5 md:pt-6 border-t border-border/20 text-center">
        <Text size="xs" className="text-muted-foreground px-4 sm:px-0">
          © {new Date().getFullYear()} Jonas Messias. Built with Next.js &
          TypeScript.
        </Text>
      </div>
    </GSAPReveal>
  )
}

export default Contact
