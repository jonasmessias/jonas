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
    'Sei usar IA a favor da produtividade. Uso agentes de programação, como o Claude Code, para apoiar a análise, a implementação e a revisão de código, sempre revisando o resultado.',
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
      cargo: 'Desenvolvedor Full Stack',
      empresa: 'Freelancer',
      inicio: '2023-03',
      fim: null,
      onde: 'Remoto',
      resumo:
        'Meu maior cliente é o oSeuMáximo, uma plataforma de educação em produção que construí de ponta a ponta: a API em NestJS e as três aplicações React. Fiz a cobrança com PIX, parcelamento e assinatura em moeda estrangeira, garanti que cliente pagante não perdesse o acesso, protegi a receita contra inadimplência e chargebacks e criei a venda assistida pelo WhatsApp. Também refatorei o checkout com agentes de IA, de 994 para 184 linhas em 6 PRs com testes, e atendi outros clientes em mais de 100 entregas, de sites a sistemas sob medida.',
      stack: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Docker', 'GitHub Actions', 'Sentry', 'Stripe', 'AWS S3', 'Resend', 'n8n'],
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
      resumo:
        'Trabalhei em time, com code review, refinamento e planning. Conduzi 2 projetos do início à entrega, incluindo o front-end e as integrações de um app em React Native com Expo, e usei IA para cumprir prazos apertados do cliente.',
      stack: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'React Query', 'Zod', 'Jest', 'Vitest', 'PostgreSQL'],
    },
    {
      cargo: 'Analista Programador',
      empresa: 'Versatec',
      inicio: '2022-04',
      fim: '2023-03',
      onde: 'Caratinga, MG · presencial',
      resumo:
        'Entreguei mais de 10 sites institucionais em WordPress, com integrações em PHP para clientes da região.',
      stack: ['WordPress', 'PHP', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'MySQL'],
    },
  ],

  projetos: [
    {
      nome: 'oSeuMáximo',
      status: 'Em produção · código privado',
      resumo:
        'Ecossistema de educação em produção: plataforma de estudos, agendador de aulas ao vivo e painel administrativo, todos sobre a mesma API. Tem pagamentos com Stripe e InfinitePay, login único entre os dois sites e flashcards gerados por IA.',
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
        'Loja virtual dividida em microfrontends (vitrine, catálogo e carrinho) que carregam em tempo de execução e fazem deploy separado. As partes conversam por eventos, sem importar umas às outras, e compartilham um design system.',
      stack: ['React 18', 'TypeScript', 'Webpack 5', 'Module Federation', 'Turborepo', 'Zustand', 'Tailwind CSS', 'Jest', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/react-microfrontend',
      links: [{ texto: 'Demo', url: 'https://jonasmessias.github.io/react-microfrontend/' }],
      destaque: true,
    },
    {
      nome: 'spring-task-manager-api',
      status: 'Estudo',
      resumo:
        'API de um sistema de tarefas no estilo Kanban, com login por JWT ou Google, refresh token em Redis e e-mails pelo AWS SES. Rodou numa EC2 com banco no RDS e deploy automático pelo GitHub Actions.',
      stack: ['Java 17', 'Spring Boot 3.5', 'Spring Data JPA', 'PostgreSQL', 'Redis', 'OAuth 2.0', 'AWS EC2', 'AWS RDS', 'AWS S3', 'AWS SES', 'Docker', 'GitHub Actions'],
      repo: 'https://github.com/jonasmessias/spring-task-manager-api',
    },
    {
      nome: 'angular-task-manager',
      status: 'Estudo',
      resumo:
        'Front-end do Kanban em Angular 20, sem Zone.js e com estado em Signals, consumindo a API acima. A sessão se renova sozinha: um interceptor troca o token vencido e repete a requisição.',
      stack: ['Angular 20', 'TypeScript', 'Signals', 'RxJS', 'Angular CDK', 'Tailwind CSS'],
      repo: 'https://github.com/jonasmessias/angular-task-manager',
      links: [{ texto: 'Demo', url: 'https://task-manager-app-angular.vercel.app' }],
    },
    {
      nome: 'transacoes-simplificado',
      status: 'Estudo',
      resumo:
        'API de transferências entre usuários e lojistas. Cada transferência roda numa única transação: valida o saldo, consulta um autorizador externo e notifica as partes.',
      stack: ['Java 21', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL', 'OpenFeign', 'Docker'],
      repo: 'https://github.com/jonasmessias/transacoes-simplificado',
    },
    {
      nome: 'aprocama',
      status: 'Código privado',
      resumo:
        'Site institucional com blog escrito em Markdown e renderizado no servidor com Next.js. O formulário de contato é validado com Zod e enviado por e-mail.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Zod'],
      links: [{ texto: 'Site', url: 'https://aprocama.vercel.app' }],
    },
    {
      nome: 'jonas',
      resumo:
        'Este site, em português e inglês, com o texto em arquivos TypeScript e publicado como imagem Docker com nginx.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'three.js', 'Docker'],
      repo: 'https://github.com/jonasmessias/jonas',
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
    { grupo: 'Infra', itens: ['Docker', 'GitHub Actions', 'AWS EC2', 'AWS RDS', 'AWS S3', 'AWS SES', 'Sentry', 'Vercel'] },
    { grupo: 'Testes', itens: ['Vitest', 'Jest', 'Testing Library', 'Cypress'] },
    { grupo: 'Agentes de IA', itens: ['Claude Code'] },
  ],
  estudando: ['PHP', 'Laravel', 'three.js'],

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
