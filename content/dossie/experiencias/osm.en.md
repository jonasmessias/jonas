---
id: osm
polo: 'experiencias[id=osm]'
locale: en
cargo: 'Full-Stack Developer'
organizacao: 'oSeuMáximo ecosystem'
setor: 'EdTech'
vinculo: 'Own client / Freelance'
local: 'Remote'
inicio: '2026-04'
fim: null
ordem: 1
peso: dominante
prova:
  polo: 'experiencias[id=osm].prova'
  urls: ['https://oseumaximo.com', 'https://oseuprof.com']
  nota: 'Source code is private, owned by the client. The evidence is the live products.'
case: 'case-osm'
bullets:
  - polo: 'experiencias[id=osm].bullets[id=osm-b1].junior'
    _correcao: 'Numbers come from metricas.osm, re-measured on 2026-08-16 — 257 endpoints, 35 controllers, 79 models, 23 domains — and published hedged. The bullet text in the polo says 260 / 36 / 25 and is stale (Tipo F1). The phrase "as the only developer" was removed under E-4.'
    texto: 'Built the REST API in NestJS that serves both brands of the ecosystem in production: more than 250 endpoints across more than 30 controllers over more than 70 data models, in a 5-layer Clean Architecture with more than 20 use-case domains.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b6].junior'
    texto: 'Built 3 SPAs with React 19, TypeScript and Vite — the learning platform, the live-class scheduler and the admin/CRM panel — with a feature-based architecture and layered components for reuse.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b3].junior'
    texto: 'Built an in-house Design System with shadcn/ui (Radix) and Tailwind CSS, with accessible components reused across the 3 React applications.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b7].junior'
    texto: 'Implemented multi-gateway, multi-currency checkout and billing with 2 payment providers (Stripe for international and InfinitePay for Brazil), with monthly and lifetime subscriptions and a grace period.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b9].junior'
    texto: 'Implemented cross-domain SSO through one-time tokens, route guards, role-based and feature-flag access control, and timezone-aware scheduling.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b5].junior'
    texto: 'Documented the API contract in OpenAPI/Swagger with automatic verification in CI — the build fails if the contract drifts from the code, keeping front-end and back-end from diverging.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b4].junior'
    _correcao: 'The polo bullet says "9 queue processors"; the 2026-08-16 measurement says 5 files and 14 named jobs (ai, backup, email, subscription, webhook). That number was one of those returned as wrong on 2026-08-13, so it is dropped here — the bullet ships without a count, naming the work that moved to the queue instead (Tipo F2).'
    texto: 'Kept the API fast under load by moving slow work — email, backups, payment webhooks and AI calls — to BullMQ and Redis queues, processed by a separate worker.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b11].junior'
    _correcao: 'Published hedged under R2: migrations only grow. Measured on 2026-08-16: 52.'
    texto: 'Modeled the data with Prisma 7 and PostgreSQL, with more than 50 versioned migrations.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b8].junior'
    texto: 'Worked with Zustand for client state and TanStack Query for server state, consuming REST APIs through Axios with interceptors for authentication, token refresh and error handling.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b12].junior'
    texto: 'Applied application security: password hashing with argon2, JWT/JWS with jose, rate limiting, helmet, RBAC and audit logging.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b2].junior'
    _correcao: 'The polo says "more than 310" and the 2026-08-16 measurement is above that. Published as "more than 300" so it stays true as the code moves (R2).'
    texto: 'Wrote more than 300 test files with Jest, Vitest and React Testing Library, with coverage enforced on every Pull Request by GitHub Actions.'
  - polo: 'experiencias[id=osm].bullets[id=osm-b10].junior'
    texto: 'Set up CI/CD in GitHub Actions with lint, typecheck, tests and coverage on every PR, containerized deployment with Docker and error monitoring with Sentry (Error Boundary and performance tracing).'
stack:
  polo: 'experiencias[id=osm].tech'
  itens: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'React 19', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Docker', 'GitHub Actions', 'Sentry', 'Stripe', 'AWS S3', 'Resend']
---
