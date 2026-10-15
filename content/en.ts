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
      cargo: 'Full-Stack Developer',
      empresa: 'oSeuMáximo',
      inicio: '2026-04',
      fim: null,
      onde: 'Remote · own client',
      resumo: 'A NestJS REST API and three React 19 SPAs for an education product in production.',
      stack: ['TypeScript', 'NestJS', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Docker'],
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
      resumo: 'Front-end and integrations for a React Native app, in a team with code review.',
      stack: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
    },
    {
      cargo: 'Full-Stack Developer',
      empresa: 'Freelance',
      inicio: '2023-03',
      fim: null,
      onde: 'Remote',
      resumo: 'Websites and systems for clients, from requirements to deploy.',
      stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    },
    {
      cargo: 'Programmer Analyst',
      empresa: 'Versatec',
      inicio: '2022-04',
      fim: '2023-03',
      onde: 'Caratinga, Brazil · on site',
      resumo: 'WordPress websites and PHP integrations for local clients.',
      stack: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
    },
  ],

  projetos: [
    {
      nome: 'oSeuMáximo',
      status: 'In production · private code',
      resumo: 'A study platform and a live-class scheduler: one back-end and three SPAs.',
      stack: ['NestJS', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe'],
      links: [
        { texto: 'oseumaximo.com', url: 'https://oseumaximo.com' },
        { texto: 'oseuprof.com', url: 'https://oseuprof.com' },
      ],
      destaque: true,
    },
    {
      nome: 'react-microfrontend',
      resumo: 'An e-commerce built as microfrontends with Module Federation, in a Turborepo monorepo.',
      stack: ['React 18', 'Webpack 5', 'Turborepo', 'Zustand', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/react-microfrontend',
      links: [{ texto: 'Demo', url: 'https://jonasmessias.github.io/react-microfrontend/' }],
      destaque: true,
    },
    {
      nome: 'spring-task-manager-api',
      resumo: 'A task REST API with JWT, refresh tokens in Redis and Google login.',
      stack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Docker'],
      repo: 'https://github.com/jonasmessias/spring-task-manager-api',
    },
    {
      nome: 'angular-task-manager',
      resumo: 'A Kanban board in Angular 20, without Zone.js, using the API above.',
      stack: ['Angular 20', 'Signals', 'TypeScript', 'Tailwind CSS'],
      repo: 'https://github.com/jonasmessias/angular-task-manager',
      links: [{ texto: 'Demo', url: 'https://task-manager-app-angular.vercel.app' }],
    },
    {
      nome: 'transacoes-simplificado',
      status: 'Study',
      resumo: 'A transfers API between users and merchants, in a single transaction.',
      stack: ['Java 21', 'Spring Boot 4.1', 'PostgreSQL', 'OpenFeign'],
      repo: 'https://github.com/jonasmessias/transacoes-simplificado',
    },
    {
      nome: 'aprocama',
      status: 'Private code',
      resumo: 'An institutional website with a Markdown blog and a contact form.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
      links: [{ texto: 'Website', url: 'https://aprocama.vercel.app' }],
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
    { grupo: 'Infra', itens: ['Docker', 'GitHub Actions', 'AWS S3', 'Sentry', 'Vercel'] },
    { grupo: 'Testing', itens: ['Vitest', 'Jest', 'Testing Library', 'Cypress'] },
  ],
  estudando: ['PHP', 'Laravel'],

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
