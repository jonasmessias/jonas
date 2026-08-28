---
id: engenharia
polo: 'competencias'
locale: pt
_nota_de_forma: 'Sem contador por categoria. Contar tecnologia é métrica de vaidade e cai quando a lista encolhe honestamente.'
_nota_de_selecao: 'Só entra o que tem lastro em polo/fatos.json. A lista do que ficou de fora, e por quê, está no relatório do GATE 1 — fora do conteúdo publicado, de propósito.'
grupos:
  - id: linguagens
    titulo: 'Linguagens'
    polo: 'competencias.frontend.grupos[Linguagens]'
    itens: ['TypeScript', 'JavaScript (ES6+)']
  - id: frontend
    titulo: 'Front-end'
    polo: 'competencias.frontend.grupos[Stack React] + competencias.frontend.grupos[Frameworks e Build]'
    itens: ['React 18/19', 'Hooks e Context API', 'React Router', 'Next.js (App Router)', 'Vite', 'Webpack', 'componentização, composição e reuso']
  - id: estado-e-dados
    titulo: 'Estado e dados no cliente'
    polo: 'competencias.frontend.grupos[Estado e Dados] + competencias.frontend.grupos[Consumo de APIs]'
    itens: ['Zustand', 'TanStack Query', 'Redux', 'TanStack Table', 'React Hook Form', 'Zod', 'APIs REST com Axios e interceptors de autenticação, refresh de token e tratamento de erros']
  - id: ui
    titulo: 'UI e Design System'
    polo: 'competencias.frontend.grupos[UI e Design System]'
    itens: ['Tailwind CSS', 'shadcn/ui (Radix)', 'Storybook', 'Framer Motion', 'GSAP', 'Recharts', 'HTML semântico e CSS']
  - id: performance-a11y
    titulo: 'Performance e acessibilidade'
    polo: 'competencias.frontend.grupos[Performance] + competencias.frontend.grupos[Acessibilidade e Segurança]'
    itens: ['code splitting e lazy loading em 2 das 3 aplicações do oSeuMáximo', 'redução de bundle size', 'otimização de assets', 'acessibilidade (a11y) e semântica de HTML', 'sanitização com DOMPurify']
    _atribuicao: 'A ressalva "em 2 das 3" é medida: o osm-app não tem React.lazy nem Suspense. Core Web Vitals não aparece aqui — só no bloco da Agio, onde há lastro.'
  - id: arquitetura
    titulo: 'Arquitetura'
    polo: 'competencias.frontend.grupos[Arquitetura] + competencias.backend.grupos[Node.js / NestJS]'
    itens: ['Clean Architecture em 5 camadas', 'ports & adapters e injeção de dependência', 'monorepo (Turborepo)', 'microfrontends com Module Federation']
  - id: backend
    titulo: 'Back-end'
    polo: 'competencias.backend.grupos[Node.js / NestJS] + competencias.backend.grupos[HTTP]'
    itens: ['Node.js', 'NestJS em monorepo com 2 aplicações (API e worker)', 'Fastify como plataforma do Nest, com helmet, CORS, rate limiting e cookies']
  - id: dados
    titulo: 'Dados'
    polo: 'competencias.backend.grupos[Dados]'
    itens: ['Prisma 7', 'PostgreSQL', 'modelagem de schema', 'versionamento por migration']
  - id: filas-cache
    titulo: 'Filas e cache'
    polo: 'competencias.backend.grupos[Filas e Cache]'
    itens: ['Redis', 'BullMQ', 'processamento assíncrono em worker separado', 'cache']
  - id: pagamentos
    titulo: 'Pagamentos'
    polo: 'competencias.pagamentos.grupos[Billing]'
    itens: ['Stripe e InfinitePay', 'multi-gateway e multi-moeda', 'assinatura mensal e vitalícia', 'período de carência', 'webhooks e testes de ciclo de assinatura com test clocks']
  - id: contrato
    titulo: 'Contrato e validação'
    polo: 'competencias.backend.grupos[Validação e Contrato]'
    itens: ['Zod (nestjs-zod)', 'class-validator', 'Swagger/OpenAPI com verificação de contrato no CI']
  - id: seguranca
    titulo: 'Segurança'
    polo: 'competencias.backend.grupos[Segurança]'
    itens: ['argon2', 'jose (JWT/JWS)', 'OAuth 2.0 e refresh token', 'RBAC', 'rate limiting', 'audit logging']
  - id: testes
    titulo: 'Testes e qualidade'
    polo: 'competencias.testes.grupos[Testes e Qualidade] + competencias.engenharia'
    itens: ['Vitest', 'Jest', 'React Testing Library', 'Cypress (E2E)', 'testes unitários e de integração', 'TDD', 'cobertura exigida em cada PR', 'SOLID, Clean Code e code review']
  - id: entrega
    titulo: 'Entrega e observabilidade'
    polo: 'competencias.devops.grupos[CI/CD] + competencias.devops.grupos[Containers e cloud] + competencias.devops.grupos[Observabilidade] + competencias.backend.grupos[Infra e serviços]'
    itens: ['GitHub Actions com lint, typecheck, testes e coverage em cada PR', 'Docker e Docker Compose', 'AWS S3 (presigned URL)', 'Resend (e-mail transacional)', 'feature flags', 'Sentry (Error Boundary e performance tracing)', 'logging estruturado com Pino']
  - id: ia
    titulo: 'Desenvolvimento com IA'
    polo: 'competencias.devops.grupos[Desenvolvimento com IA]'
    itens: ['Claude e Claude Code', 'GitHub Copilot', 'Cursor', 'ambiente próprio de agentes para um workspace de 4 repositórios: skills por repositório, classificação de tarefa por tipo, gates de qualidade e verificação de contrato entre back-end e front-end']
  - id: mobile
    titulo: 'Mobile'
    polo: 'competencias.frontend.grupos[Mobile]'
    itens: ['React Native', 'Expo (expo-router, React Navigation, NativeWind, Reanimated)']
  - id: secundarias
    titulo: 'Secundárias, com projeto público'
    polo: 'competencias.secundarias.grupos'
    itens: ['Angular 19 — zoneless change detection, standalone components, Signals API, Angular CDK', 'Java 17 com Spring Boot 3.5']
    _atribuicao: 'Secundárias de propósito. Cada uma tem um repositório público para abrir; nenhuma é o foco do trabalho.'
  - id: produto
    titulo: 'Processo e produto'
    polo: 'competencias.produto_e_cliente.grupos'
    itens: ['levantamento de requisitos funcionais e não funcionais direto com o cliente', 'negociação de escopo e prazo', 'ADR, runbook e documentação com CI que a valida', 'LGPD e consentimento tratados como requisito de produto']
---
