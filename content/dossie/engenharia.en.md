---
id: engenharia
polo: 'competencias'
locale: en
_nota_de_forma: 'No per-category counters. Counting technologies is a vanity metric, and it drops when the list shrinks honestly.'
_nota_de_selecao: 'Only what has backing in polo/fatos.json gets in. The list of what was left out, and why, lives in the GATE 1 report — outside the published content, on purpose.'
grupos:
  - id: linguagens
    titulo: 'Languages'
    polo: 'competencias.frontend.grupos[Linguagens]'
    itens: ['TypeScript', 'JavaScript (ES6+)']
  - id: frontend
    titulo: 'Front-end'
    polo: 'competencias.frontend.grupos[Stack React] + competencias.frontend.grupos[Frameworks e Build]'
    itens: ['React 18/19', 'Hooks and Context API', 'React Router', 'Next.js (App Router)', 'Vite', 'Webpack', 'component design, composition and reuse']
  - id: estado-e-dados
    titulo: 'Client state and data'
    polo: 'competencias.frontend.grupos[Estado e Dados] + competencias.frontend.grupos[Consumo de APIs]'
    itens: ['Zustand', 'TanStack Query', 'Redux', 'TanStack Table', 'React Hook Form', 'Zod', 'REST APIs with Axios interceptors for auth, token refresh and error handling']
  - id: ui
    titulo: 'UI and Design System'
    polo: 'competencias.frontend.grupos[UI e Design System]'
    itens: ['Tailwind CSS', 'shadcn/ui (Radix)', 'Storybook', 'Framer Motion', 'GSAP', 'Recharts', 'semantic HTML and CSS']
  - id: performance-a11y
    titulo: 'Performance and accessibility'
    polo: 'competencias.frontend.grupos[Performance] + competencias.frontend.grupos[Acessibilidade e Segurança]'
    itens: ['code splitting and lazy loading in 2 of the 3 oSeuMáximo applications', 'bundle size reduction', 'asset optimization', 'accessibility (a11y) and semantic HTML', 'sanitization with DOMPurify']
    _atribuicao: 'The "2 of the 3" caveat is measured, not modest: osm-app has no React.lazy and no Suspense. Core Web Vitals is absent here on purpose — it only appears in the Agio block, where it has backing.'
  - id: arquitetura
    titulo: 'Architecture'
    polo: 'competencias.frontend.grupos[Arquitetura] + competencias.backend.grupos[Node.js / NestJS]'
    itens: ['Clean Architecture in 5 layers', 'ports and adapters, dependency injection', 'monorepo (Turborepo)', 'microfrontends with Module Federation']
  - id: backend
    titulo: 'Back-end'
    polo: 'competencias.backend.grupos[Node.js / NestJS] + competencias.backend.grupos[HTTP]'
    itens: ['Node.js', 'NestJS in a monorepo with 2 applications (API and worker)', 'Fastify as the Nest platform, with helmet, CORS, rate limiting and cookies']
  - id: dados
    titulo: 'Data'
    polo: 'competencias.backend.grupos[Dados]'
    itens: ['Prisma 7', 'PostgreSQL', 'schema modeling', 'migration-based versioning']
  - id: filas-cache
    titulo: 'Queues and cache'
    polo: 'competencias.backend.grupos[Filas e Cache]'
    itens: ['Redis', 'BullMQ', 'async processing in a separate worker', 'caching']
  - id: pagamentos
    titulo: 'Payments'
    polo: 'competencias.pagamentos.grupos[Billing]'
    itens: ['Stripe and InfinitePay', 'multi-gateway and multi-currency', 'monthly and lifetime subscriptions', 'grace period', 'webhooks and subscription-cycle tests with test clocks']
  - id: contrato
    titulo: 'Contract and validation'
    polo: 'competencias.backend.grupos[Validação e Contrato]'
    itens: ['Zod (nestjs-zod)', 'class-validator', 'Swagger/OpenAPI with contract verification in CI']
  - id: seguranca
    titulo: 'Security'
    polo: 'competencias.backend.grupos[Segurança]'
    itens: ['argon2', 'jose (JWT/JWS)', 'OAuth 2.0 and refresh tokens', 'RBAC', 'rate limiting', 'audit logging']
  - id: testes
    titulo: 'Testing and quality'
    polo: 'competencias.testes.grupos[Testes e Qualidade] + competencias.engenharia'
    itens: ['Vitest', 'Jest', 'React Testing Library', 'Cypress (E2E)', 'unit and integration tests', 'TDD', 'coverage enforced on every PR', 'SOLID, Clean Code and code review']
  - id: entrega
    titulo: 'Delivery and observability'
    polo: 'competencias.devops.grupos[CI/CD] + competencias.devops.grupos[Containers e cloud] + competencias.devops.grupos[Observabilidade] + competencias.backend.grupos[Infra e serviços]'
    itens: ['GitHub Actions with lint, typecheck, tests and coverage on every PR', 'Docker and Docker Compose', 'AWS S3 (presigned URLs)', 'Resend (transactional email)', 'feature flags', 'Sentry (Error Boundary and performance tracing)', 'structured logging with Pino']
  - id: ia
    titulo: 'Development with AI'
    polo: 'competencias.devops.grupos[Desenvolvimento com IA]'
    itens: ['Claude and Claude Code', 'GitHub Copilot', 'Cursor', 'a custom agent setup for a 4-repository workspace: per-repo skills, task classification by type, quality gates and cross-contract verification between back-end and front-end']
  - id: mobile
    titulo: 'Mobile'
    polo: 'competencias.frontend.grupos[Mobile]'
    itens: ['React Native', 'Expo (expo-router, React Navigation, NativeWind, Reanimated)']
  - id: secundarias
    titulo: 'Secondary, each with a public project'
    polo: 'competencias.secundarias.grupos'
    itens: ['Angular 19 — zoneless change detection, standalone components, Signals API, Angular CDK', 'Java 17 with Spring Boot 3.5']
    _atribuicao: 'Secondary on purpose. Each one has a public repository to open; neither is the focus of the work.'
  - id: produto
    titulo: 'Process and product'
    polo: 'competencias.produto_e_cliente.grupos'
    itens: ['functional and non-functional requirements gathered directly with the client', 'scope and deadline negotiation', 'ADRs, runbooks and documentation with CI that validates it', 'LGPD and consent handled as a product requirement']
---
