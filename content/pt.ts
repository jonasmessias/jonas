import type { Conteudo } from './tipos'

/**
 * Todo o texto do site em português. Edite aqui e o site muda.
 * O inglês mora em content/en.ts, com a mesma forma.
 */
export const pt: Conteudo = {
  nome: 'Jonas Messias',
  cargo: 'Desenvolvedor de software',
  frase: 'Construo aplicações e sigo aprendendo sobre diferentes fundamentos e áreas do desenvolvimento.',
  local: 'Caratinga, MG',

  sobre: [
    'Sou desenvolvedor de software com experiência em projetos web. Gosto de entender como as partes de um sistema se conectam e contribuir em diferentes etapas, da arquitetura e do back-end à interface, cloud e infraestrutura.',
    'Continuo estudando e explorando novas tecnologias por meio de projetos práticos. Busco colaborar com equipes e participar de desafios que me ajudem a evoluir como profissional.',
  ],
  formacao: {
    curso: 'Bacharelado em Ciência da Computação',
    instituicao: 'Rede de Ensino Doctum',
    quando: 'concluído em março de 2026',
  },
  idiomas: [
    { idioma: 'Português', nivel: 'nativo' },
    { idioma: 'Inglês', nivel: 'intermediário a avançado' },
  ],

  experiencias: [
    {
      cargo: 'Desenvolvedor Full-Stack',
      empresa: 'oSeuMáximo',
      inicio: '2026-04',
      fim: null,
      onde: 'Remoto · cliente próprio',
      resumo: 'API REST em NestJS e três SPAs em React 19 para um produto de educação em produção.',
      stack: ['TypeScript', 'NestJS', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Docker'],
      links: [
        { texto: 'oseumaximo.com', url: 'https://oseumaximo.com' },
        { texto: 'oseuprof.com', url: 'https://oseuprof.com' },
      ],
    },
    {
      cargo: 'Desenvolvedor de Software',
      empresa: 'Agio',
      inicio: '2025-01',
      fim: '2025-08',
      onde: 'Caratinga, MG · híbrido',
      resumo: 'Front-end e integrações de um app em React Native, num time com code review.',
      stack: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
    },
    {
      cargo: 'Desenvolvedor Full-Stack',
      empresa: 'Autônomo',
      inicio: '2023-03',
      fim: null,
      onde: 'Remoto',
      resumo: 'Sites e sistemas para clientes, do levantamento de requisitos ao deploy.',
      stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    },
    {
      cargo: 'Analista Programador',
      empresa: 'Versatec',
      inicio: '2022-04',
      fim: '2023-03',
      onde: 'Caratinga, MG · presencial',
      resumo: 'Sites institucionais em WordPress e integrações em PHP para clientes da região.',
      stack: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
    },
  ],

  projetos: [
    {
      nome: 'oSeuMáximo',
      status: 'Em produção · código privado',
      resumo: 'Plataforma de estudos e agendador de aulas ao vivo: um back-end e três SPAs.',
      stack: ['NestJS', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe'],
      links: [
        { texto: 'oseumaximo.com', url: 'https://oseumaximo.com' },
        { texto: 'oseuprof.com', url: 'https://oseuprof.com' },
      ],
      destaque: true,
    },
    {
      nome: 'react-microfrontend',
      resumo: 'E-commerce em microfrontends com Module Federation, num monorepo com Turborepo.',
      stack: ['React 18', 'Webpack 5', 'Turborepo', 'Zustand', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/react-microfrontend',
      links: [{ texto: 'Demo', url: 'https://jonasmessias.github.io/react-microfrontend/' }],
      destaque: true,
    },
    {
      nome: 'spring-task-manager-api',
      resumo: 'API REST de tarefas com JWT, refresh token em Redis e login com Google.',
      stack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Docker'],
      repo: 'https://github.com/jonasmessias/spring-task-manager-api',
    },
    {
      nome: 'angular-task-manager',
      resumo: 'Kanban em Angular 20, sem Zone.js, consumindo a API acima.',
      stack: ['Angular 20', 'Signals', 'TypeScript', 'Tailwind CSS'],
      repo: 'https://github.com/jonasmessias/angular-task-manager',
      links: [{ texto: 'Demo', url: 'https://task-manager-app-angular.vercel.app' }],
    },
    {
      nome: 'transacoes-simplificado',
      status: 'Estudo',
      resumo: 'API de transferências entre usuários e lojistas numa única transação.',
      stack: ['Java 21', 'Spring Boot 4.1', 'PostgreSQL', 'OpenFeign'],
      repo: 'https://github.com/jonasmessias/transacoes-simplificado',
    },
    {
      nome: 'aprocama',
      status: 'Código privado',
      resumo: 'Site institucional com blog em Markdown e formulário de contato.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
      links: [{ texto: 'Site', url: 'https://aprocama.vercel.app' }],
    },
  ],

  stack: [
    { grupo: 'Linguagens', itens: ['TypeScript', 'JavaScript', 'Java', 'SQL'] },
    {
      grupo: 'Front-end',
      itens: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'React Native'],
    },
    { grupo: 'Back-end', itens: ['Node.js', 'NestJS', 'Fastify', 'Spring Boot', 'Prisma', 'Zod'] },
    { grupo: 'Dados', itens: ['PostgreSQL', 'Redis', 'BullMQ'] },
    { grupo: 'Infra', itens: ['Docker', 'GitHub Actions', 'AWS S3', 'Sentry', 'Vercel'] },
    { grupo: 'Testes', itens: ['Vitest', 'Jest', 'Testing Library', 'Cypress'] },
  ],
  estudando: ['PHP', 'Laravel'],

  caminho: {
    titulo: 'Como este site chega até você',
    passos: [
      { nome: 'Commit', detalhe: 'Escrevo a mudança e envio para o GitHub.' },
      { nome: 'Checagem', detalhe: 'O GitHub confere tipos, lint, build e links.' },
      { nome: 'Deploy', detalhe: 'A Vercel gera o site e publica.' },
      { nome: 'Você', detalhe: 'O site abre no seu idioma.' },
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
