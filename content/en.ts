import type { Conteudo } from './tipos'

/**
 * All site text in English. Same shape as content/pt.ts.
 */
export const en: Conteudo = {
  nome: 'Jonas Messias',
  cargo: 'Software developer',
  frase: 'I build applications and keep learning about different fundamentals and areas of development.',
  local: 'Caratinga, Brazil',

  sobre: [
    "I'm a software developer with experience in web projects. I like understanding how the parts of a system connect and contributing at different stages, from architecture and back-end to interface, cloud and infrastructure.",
    "I keep studying and exploring new technologies through hands-on projects. I'm looking to work with teams and take on challenges that help me grow as a professional.",
    'I know how to use AI for productivity. I use coding agents, such as Claude Code, to support code analysis, implementation and review, always reviewing the result.',
  ],
  formacao: {
    curso: 'B.Sc. in Computer Science',
    instituicao: 'Rede de Ensino Doctum',
    quando: 'completed in March 2026',
  },
  idiomas: [
    { idioma: 'Portuguese', nivel: 'native' },
    { idioma: 'English', nivel: 'intermediate to advanced' },
  ],

  experiencias: [
    {
      cargo: 'Full Stack Developer',
      empresa: 'Freelance',
      inicio: '2023-03',
      fim: null,
      onde: 'Remote',
      resumo:
        'My biggest client is oSeuMáximo, an education platform in production that I built end to end: the NestJS API and the three React apps. I built billing with PIX, installments and foreign-currency subscriptions, made sure paying customers never lost access, protected revenue against defaults and chargebacks, and created assisted sales through WhatsApp. I also refactored the checkout with AI agents, from 994 to 184 lines in 6 tested PRs, and served other clients across more than 100 deliveries, from websites to custom systems.',
      stack: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Docker', 'GitHub Actions', 'Sentry', 'Stripe', 'AWS S3', 'Resend', 'n8n'],
      links: [
        { texto: 'oseumaximo.com', url: 'https://oseumaximo.com' },
        { texto: 'oseuprof.com', url: 'https://oseuprof.com' },
      ],
    },
    {
      cargo: 'Software Developer',
      empresa: 'Agio',
      inicio: '2025-01',
      fim: '2025-08',
      onde: 'Caratinga, Brazil · hybrid',
      resumo:
        'I worked in a team with code review, refinement and planning. I led 2 projects from start to delivery, including the front-end and integrations of a React Native app with Expo, and used AI to meet tight client deadlines.',
      stack: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'React Query', 'Zod', 'Jest', 'Vitest', 'PostgreSQL'],
    },
    {
      cargo: 'Programmer Analyst',
      empresa: 'Versatec',
      inicio: '2022-04',
      fim: '2023-03',
      onde: 'Caratinga, Brazil · on site',
      resumo:
        'I delivered more than 10 WordPress websites, with PHP integrations, for local clients.',
      stack: ['WordPress', 'PHP', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'MySQL'],
    },
  ],

  projetos: [
    {
      nome: 'oSeuMáximo',
      status: 'In production · private code',
      resumo:
        'An education ecosystem in production: a study platform, a live-class scheduler and an admin panel, all on the same API. It has payments with Stripe and InfinitePay, single sign-on across both sites and AI-generated flashcards.',
      stack: ['TypeScript', 'NestJS', 'React 19', 'Vite', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Zustand', 'Stripe', 'Docker', 'GitHub Actions', 'Sentry', 'Jest', 'Vitest'],
      links: [
        { texto: 'oseumaximo.com', url: 'https://oseumaximo.com' },
        { texto: 'oseuprof.com', url: 'https://oseuprof.com' },
      ],
      destaque: true,
    },
    {
      nome: 'react-microfrontend',
      resumo:
        'An online store split into microfrontends (storefront, catalog and cart) that load at runtime and deploy separately. The parts talk through events instead of importing each other, and share a design system.',
      stack: ['React 18', 'TypeScript', 'Webpack 5', 'Module Federation', 'Turborepo', 'Zustand', 'Tailwind CSS', 'Jest', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/react-microfrontend',
      links: [{ texto: 'Demo', url: 'https://jonasmessias.github.io/react-microfrontend/' }],
      destaque: true,
    },
    {
      nome: 'spring-task-manager-api',
      status: 'Study',
      resumo:
        'API for a Kanban-style task system, with JWT or Google login, refresh tokens in Redis and emails through AWS SES. It ran on an EC2 instance with an RDS database and automatic deploys from GitHub Actions.',
      stack: ['Java 17', 'Spring Boot 3.5', 'Spring Data JPA', 'PostgreSQL', 'Redis', 'OAuth 2.0', 'AWS EC2', 'AWS RDS', 'AWS S3', 'AWS SES', 'Docker', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/spring-task-manager-api',
    },
    {
      nome: 'angular-task-manager',
      status: 'Study',
      resumo:
        'The Kanban front-end in Angular 20, without Zone.js and with state in Signals, using the API above. Sessions renew themselves: an interceptor swaps the expired token and retries the request.',
      stack: ['Angular 20', 'TypeScript', 'Signals', 'RxJS', 'Angular CDK', 'Tailwind CSS'],
      repo: 'https://github.com/jonasmessias/angular-task-manager',
      links: [{ texto: 'Demo', url: 'https://task-manager-app-angular.vercel.app' }],
    },
    {
      nome: 'transacoes-simplificado',
      status: 'Study',
      resumo:
        'A transfers API between users and merchants. Each transfer runs in a single transaction: it checks the balance, asks an external authorizer and notifies both sides.',
      stack: ['Java 21', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL', 'OpenFeign', 'Docker'],
      repo: 'https://github.com/jonasmessias/transacoes-simplificado',
    },
    {
      nome: 'aprocama',
      status: 'Private code',
      resumo:
        'An institutional website with a blog written in Markdown and rendered on the server with Next.js. The contact form is validated with Zod and sent by email.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Zod'],
      links: [{ texto: 'Website', url: 'https://aprocama.vercel.app' }],
    },
    {
      nome: 'jonas',
      resumo:
        'This website, in Portuguese and English, with its text in TypeScript files and published as a Docker image with nginx.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'three.js', 'Docker'],
      repo: 'https://github.com/jonasmessias/jonas',
    },
  ],

  stack: [
    { grupo: 'Languages', itens: ['TypeScript', 'JavaScript', 'Java', 'SQL'] },
    {
      grupo: 'Front-end',
      itens: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'React Native'],
    },
    { grupo: 'Back-end', itens: ['Node.js', 'NestJS', 'Fastify', 'Spring Boot', 'Prisma', 'Zod'] },
    { grupo: 'Data', itens: ['PostgreSQL', 'Redis', 'BullMQ'] },
    { grupo: 'Infra', itens: ['Docker', 'GitHub Actions', 'AWS EC2', 'AWS RDS', 'AWS S3', 'AWS SES', 'Sentry', 'Vercel'] },
    { grupo: 'Testing', itens: ['Vitest', 'Jest', 'Testing Library', 'Cypress'] },
    { grupo: 'AI agents', itens: ['Claude Code'] },
  ],
  estudando: ['PHP', 'Laravel', 'three.js'],

  caminho: {
    titulo: 'How this site reaches you',
    passos: [
      { nome: 'Commit', detalhe: 'I write the change and push it to GitHub.' },
      { nome: 'Checks', detalhe: 'GitHub checks types, lint, build and links.' },
      { nome: 'Deploy', detalhe: 'Vercel builds the site and publishes it.' },
      { nome: 'You', detalhe: 'The site opens in your language.' },
    ],
  },

  contato: {
    email: 'jonasmessias30@gmail.com',
    linkedin: { texto: 'linkedin.com/in/jonasmessias', url: 'https://linkedin.com/in/jonasmessias' },
    github: { texto: 'github.com/jonasmessias', url: 'https://github.com/jonasmessias' },
  },
  site: 'https://www.jonasmessias.dev.br',
  repositorio: 'https://github.com/jonasmessias/jonas',
}
