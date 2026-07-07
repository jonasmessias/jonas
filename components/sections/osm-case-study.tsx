'use client'

import { GSAPReveal } from '@/components/animations/gsap-animations'
import { Text } from '@/components/globals/text'
import { useTranslations } from 'next-intl'
import { HiArrowUpRight, HiCheck } from 'react-icons/hi2'

type AppKey = 'platform' | 'app' | 'admin' | 'prof'

interface EcosystemApp {
  key: AppKey
  name: string
  url?: string
  stack: string[]
}

const apps: EcosystemApp[] = [
  {
    key: 'platform',
    name: 'osm-platform',
    stack: ['NestJS', 'Fastify', 'PostgreSQL', 'Redis', 'Prisma', 'BullMQ'],
  },
  {
    key: 'app',
    name: 'osm-app',
    url: 'https://oseumaximo.com',
    stack: ['React 19', 'Vite', 'Tailwind v4', 'shadcn/ui', 'TanStack Query'],
  },
  {
    key: 'admin',
    name: 'osm-admin',
    stack: ['React 19', 'Vite 6', 'Tailwind v4', 'RBAC'],
  },
  {
    key: 'prof',
    name: 'oseuprof-app',
    url: 'https://oseuprof.com',
    stack: ['React 19', 'shadcn/ui', 'framer-motion', 'Zod', 'Cypress'],
  },
]

export const OSMCaseStudy = () => {
  const t = useTranslations('projects.osm')
  const highlights = t.raw('highlights') as string[]

  return (
    <GSAPReveal from={{ opacity: 0, y: 40 }} duration={1}>
      <article className="relative overflow-hidden rounded-xl border border-primary/30 bg-card/50">
        {/* Ambient accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative p-6 sm:p-8 md:p-10">
          {/* Header */}
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('badge')}
          </span>

          <div className="mt-4 flex flex-col gap-2">
            <Text
              tag="h3"
              weight="bold"
              className="text-3xl sm:text-4xl md:text-5xl tracking-tight"
            >
              {t('title')}
            </Text>
            <Text
              variant="mono"
              className="text-primary text-sm sm:text-base"
            >
              {t('tagline')}
            </Text>
          </div>

          <Text
            variant="body"
            className="mt-4 max-w-3xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {t('overview')}
          </Text>

          {/* Highlights */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/50 px-3 py-1.5 text-xs sm:text-sm text-foreground/90"
              >
                <HiCheck className="text-primary text-sm shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>

          {/* Ecosystem apps */}
          <div className="mt-8 sm:mt-10">
            <Text
              variant="mono"
              size="sm"
              weight="semibold"
              className="text-muted-foreground uppercase tracking-[0.15em] text-xs"
            >
              {t('appsLabel')}
            </Text>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {apps.map((app) => (
                <AppCard key={app.key} app={app} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </GSAPReveal>
  )
}

const AppCard = ({ app }: { app: EcosystemApp }) => {
  const t = useTranslations('projects.osm')

  return (
    <div className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-background/40 p-4 sm:p-5 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm font-semibold text-foreground">
            {app.name}
          </span>
          <span className="font-mono text-xs text-primary">
            {t(`apps.${app.key}.role`)}
          </span>
        </div>
        {app.url ? (
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-accent transition-colors hover:text-primary"
            aria-label={`${t('live')} — ${app.name}`}
          >
            {t('live')}
            <HiArrowUpRight className="text-sm" />
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground">
            {t('private')}
          </span>
        )}
      </div>

      <Text
        variant="body"
        size="sm"
        className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
      >
        {t(`apps.${app.key}.desc`)}
      </Text>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {app.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
