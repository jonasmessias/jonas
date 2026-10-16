import {
  BroomIcon,
  ChartLineIcon,
  CloudIcon,
  CreditCardIcon,
  CubeIcon,
  EnvelopeSimpleIcon,
  KeyIcon,
  LinkedinLogoIcon,
  LockKeyIcon,
  PaperPlaneTiltIcon,
  QueueIcon,
} from '@phosphor-icons/react/ssr'
import {
  siAngular,
  siClaude,
  siCss,
  siCursor,
  siCypress,
  siDocker,
  siExpo,
  siFastify,
  siFilezilla,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGithubcopilot,
  siGooglegemini,
  siGsap,
  siHtml5,
  siJavascript,
  siJest,
  siJquery,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPino,
  siPostgresql,
  siPrisma,
  siReact,
  siReacthookform,
  siReactquery,
  siReactrouter,
  siReacttable,
  siRedis,
  siRedux,
  siResend,
  siSentry,
  siShadcnui,
  siSpring,
  siSpringboot,
  siStorybook,
  siStripe,
  siSwagger,
  siTailwindcss,
  siTestinglibrary,
  siTurborepo,
  siTypescript,
  siVite,
  siVitest,
  siWebpack,
  siWordpress,
  siZod,
} from 'simple-icons'

/**
 * O mapa de ícones da stack: chave = nome da tecnologia em minúsculas, como
 * aparece no dossiê depois de `chaveDeRotulo` tirar versão e parêntese.
 *
 * Duas fontes, as duas renderizadas no servidor (zero JS no cliente):
 * - `marcas`: simple-icons, por import nomeado — o `tsc` acusa nome que
 *   mudar de versão. Vira <svg><path> no IconeTech.
 * - `simbolos`: phosphor (/ssr), para o que não tem marca em simple-icons
 *   (ou a teve removida a pedido do dono da marca): fila, estado, nuvem,
 *   chave, e-mail.
 *
 * Item que não casa com nenhuma chave sai só como texto — nunca ganha um
 * ícone errado. Quem renderiza pode também passar a chave explícita.
 *
 * Decisão do contrato mestre: hover do ícone em accent, não na cor da
 * marca. Por isso o hex da marca não é exposto.
 */
export const marcas = {
  // linguagens
  typescript: siTypescript,
  javascript: siJavascript,
  java: siOpenjdk, // o logotipo Java saiu do simple-icons; OpenJDK é a marca honesta
  php: siPhp,
  html: siHtml5,
  css: siCss,
  // front-end
  react: siReact,
  'react native': siReact, // usa o logotipo do React oficialmente
  expo: siExpo,
  'next.js': siNextdotjs,
  vite: siVite,
  webpack: siWebpack,
  'react router': siReactrouter,
  'tailwind css': siTailwindcss,
  'shadcn/ui': siShadcnui,
  storybook: siStorybook,
  'framer motion': siFramer,
  gsap: siGsap,
  angular: siAngular,
  jquery: siJquery,
  wordpress: siWordpress,
  // estado e dados
  'tanstack query': siReactquery,
  'react query': siReactquery,
  'tanstack table': siReacttable,
  redux: siRedux,
  'react hook form': siReacthookform,
  zod: siZod,
  // back-end
  'node.js': siNodedotjs,
  nestjs: siNestjs,
  fastify: siFastify,
  prisma: siPrisma,
  postgresql: siPostgresql,
  mysql: siMysql,
  redis: siRedis,
  'spring boot': siSpringboot,
  'spring data jpa': siSpring,
  'swagger/openapi': siSwagger,
  stripe: siStripe,
  resend: siResend,
  pino: siPino,
  sentry: siSentry,
  n8n: siN8n,
  // testes
  jest: siJest,
  vitest: siVitest,
  'react testing library': siTestinglibrary,
  cypress: siCypress,
  // entrega
  docker: siDocker,
  'docker compose': siDocker,
  'github actions': siGithubactions,
  github: siGithub,
  git: siGit,
  turborepo: siTurborepo,
  filezilla: siFilezilla,
  // ia
  claude: siClaude,
  'claude code': siClaude,
  'github copilot': siGithubcopilot,
  cursor: siCursor,
  gemini: siGooglegemini,
}

export const simbolos = {
  bullmq: QueueIcon,
  zustand: CubeIcon,
  'aws s3': CloudIcon,
  'aws ses': PaperPlaneTiltIcon,
  infinitepay: CreditCardIcon,
  argon2: LockKeyIcon,
  jose: KeyIcon,
  recharts: ChartLineIcon,
  dompurify: BroomIcon,
  'e-mail': EnvelopeSimpleIcon,
  email: EnvelopeSimpleIcon,
  linkedin: LinkedinLogoIcon,
}

export type ChaveIcone = keyof typeof marcas | keyof typeof simbolos

export function temIcone(chave: string): chave is ChaveIcone {
  return chave in marcas || chave in simbolos
}

/**
 * Do rótulo do dossiê à chave do mapa: corta a explicação depois do
 * travessão ("Angular 19 — zoneless…"), o parêntese final ("Cypress (E2E)",
 * "Next.js (App Router)") e a versão no fim ("React 18/19", "Prisma 7",
 * "Tailwind CSS 4"). Rótulo que vira frase ("Stripe e InfinitePay") não casa
 * e fica em texto — de propósito.
 */
export function chaveDeRotulo(rotulo: string): ChaveIcone | null {
  const base = rotulo
    .split(' — ')[0]
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/\s+\d[\d./]*$/, '')
    .trim()
    .toLowerCase()
  return temIcone(base) ? base : null
}
