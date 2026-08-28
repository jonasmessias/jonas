---
id: osm
polo: 'experiencias[id=osm]'
locale: pt
cargo: 'Desenvolvedor Full-Stack'
organizacao: 'Ecossistema oSeuMáximo'
setor: 'EdTech'
vinculo: 'Cliente próprio / Freelance'
local: 'Remoto'
inicio: '2026-04'
fim: null
ordem: 1
peso: dominante
prova:
  polo: 'experiencias[id=osm].prova'
  urls: ['https://oseumaximo.com', 'https://oseuprof.com']
  nota: 'Código-fonte privado, do cliente. A prova são os produtos no ar.'
case: 'case-osm'
bullets:
  - polo: 'experiencias[id=osm].bullets[id=osm-b1].junior'
    _correcao: 'Números vêm de metricas.osm, remedidos em 16/08/2026 — 257 endpoints, 35 controllers, 79 modelos, 23 domínios — e publicados hedgeados. O texto do bullet no polo diz 260 / 36 / 25 e está velho (Tipo F1). A expressão "como único desenvolvedor" foi removida por E-4.'
    texto: 'Desenvolvi a API REST em NestJS que serve as duas marcas do ecossistema em produção: mais de 250 endpoints em mais de 30 controllers sobre mais de 70 modelos de dados, em Clean Architecture de 5 camadas e mais de 20 domínios de use-case.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b6].junior'
    texto: 'Desenvolvi 3 SPAs com React 19, TypeScript e Vite — plataforma de estudos, agendador de aulas ao vivo e painel administrativo/CRM — com arquitetura por features e componentes em camadas para reuso.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b3].junior'
    texto: 'Construí um Design System próprio com shadcn/ui (Radix) e Tailwind CSS, com componentes acessíveis reaproveitados pelas 3 aplicações React.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b7].junior'
    texto: 'Implementei checkout e billing multi-gateway e multi-moeda com 2 provedores de pagamento (Stripe para internacional e InfinitePay para Brasil), com assinaturas mensal e vitalícia e período de carência.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b9].junior'
    texto: 'Implementei SSO cross-domain por one-time token, route guards, controle de acesso por papel e feature flag, e agendamento timezone-aware.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b5].junior'
    texto: 'Documentei o contrato da API em OpenAPI/Swagger com verificação automática no CI — o build quebra se o contrato divergir do código, impedindo que front-end e back-end divirjam.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b4].junior'
    _correcao: 'O bullet do polo diz "9 processadores de fila"; a medição de 16/08/2026 diz 5 arquivos e 14 jobs nomeados (ai, backup, email, subscription, webhook). Esse número foi um dos devolvidos como errados em 13/08/2026, então aqui ele sai — o bullet vai sem contagem, nomeando o trabalho que foi para a fila (Tipo F2).'
    texto: 'Mantive a API rápida sob carga movendo o trabalho lento — e-mail, backup, webhook de pagamento e chamada de IA — para filas em BullMQ e Redis, processadas por um worker separado.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b11].junior'
    _correcao: 'Publicado hedgeado por R2: migrations só crescem. Medido em 16/08/2026: 52.'
    texto: 'Modelei os dados com Prisma 7 e PostgreSQL, com mais de 50 migrations versionadas.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b8].junior'
    texto: 'Trabalhei com Zustand para estado de cliente e TanStack Query para server state, consumindo APIs REST via Axios com interceptors de autenticação, refresh de token e tratamento de erros.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b12].junior'
    texto: 'Apliquei segurança de aplicação: hash de senha com argon2, JWT/JWS com jose, rate limiting, helmet, RBAC e audit logging.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b2].junior'
    _correcao: 'O polo diz "mais de 310" e a medição de 16/08/2026 está acima disso. Publicado como "mais de 300" para continuar verdadeiro quando o código andar (R2).'
    texto: 'Escrevi mais de 300 arquivos de teste com Jest, Vitest e React Testing Library, com cobertura exigida em cada Pull Request pelo GitHub Actions.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b10].junior'
    texto: 'Configurei CI/CD em GitHub Actions com lint, typecheck, testes e coverage em cada PR, deploy containerizado com Docker e monitoramento de erros com Sentry (Error Boundary e performance tracing).'
stack:
  polo: 'experiencias[id=osm].tech'
  itens: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'React 19', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Docker', 'GitHub Actions', 'Sentry', 'Stripe', 'AWS S3', 'Resend']
---
