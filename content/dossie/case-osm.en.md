---
id: case-osm
polo: 'experiencias[id=osm]'
locale: en
titulo: 'oSeuMáximo — an education ecosystem in production'
ancora_experiencia: 'experiencias/osm'
codigo:
  polo: 'experiencias[id=osm].prova'
  estado: 'private'
  texto: 'The code is private — it belongs to the client and stays closed. What can be checked here are the two live products and the decisions described below.'
prova:
  - polo: 'experiencias[id=osm].prova'
    nome: 'oseumaximo.com'
    url: 'https://oseumaximo.com'
    o_que_e: 'the student learning platform'
  - polo: 'experiencias[id=osm].prova'
    nome: 'oseuprof.com'
    url: 'https://oseuprof.com'
    o_que_e: 'the live-class scheduler'
forma:
  polo: 'experiencias[id=osm].notas + experiencias[id=osm].bullets[id=osm-b6]'
  texto: '1 back-end and 3 SPAs'
camadas:
  polo: 'metricas.osm.itens[metrica=Camadas de Clean Architecture]'
  origem: 'libs/'
  itens: ['domain', 'application', 'adapters', 'infrastructure', 'shared']
  _forma: 'Directory names, not prose: they stay in English in both locales because that is how they exist in the code. The translation into "domain, application, adapters…" lives in the body, where it is explanation.'
  _ordem: 'NOT alphabetical, and do not "fix" it back to alphabetical thinking it aligns with the polo: the polo asserts no order at all — in engine/remede_metricas.js the "Camadas de Clean Architecture" measurer derives the list with .sort(), so the order shown in the polo is a residue of the sort, not a fact. The order published here is the one used by the prose in this same file (domain, application, adapters, infrastructure, shared), so that the same five items never appear in two different orders on the same screen. Order is presentation; changing this line changes no fact.'
metricas:
  medido_em: '2026-08-16'
  _metodo: 'node engine/remede_metricas.js, run against the source code on 2026-08-16'
  itens:
    - polo: 'metricas.osm.itens[metrica=Endpoints HTTP]'
      valor: 'more than 250'
      legenda: 'HTTP endpoints in the back-end'
      como: '@Get, @Post, @Put, @Patch and @Delete decorators across apps and libs'
    - polo: 'metricas.osm.itens[metrica=Controllers]'
      valor: 'more than 30'
      legenda: 'controllers'
      como: 'files containing @Controller('
    - polo: 'metricas.osm.itens[metrica=Modelos no schema Prisma]'
      valor: 'more than 70'
      legenda: 'models in the Prisma schema'
      como: '^model lines in schema.prisma'
    - polo: 'metricas.osm.itens[metrica=Domínios de use-case]'
      valor: 'more than 20'
      legenda: 'use-case domains'
      como: 'subfolders of libs/application/src/use-cases'
    - polo: 'metricas.osm.itens[metrica=Camadas de Clean Architecture]'
      valor: '5'
      legenda: 'Clean Architecture layers'
      como: 'libs/'
      _tipo: 'structural — published exact because it does not grow on its own'
    - polo: 'metricas.osm.itens[metrica=Aplicações no monorepo]'
      valor: '2'
      legenda: 'applications in the back-end monorepo: API and worker'
      como: 'apps/'
      _tipo: 'structural — published exact because it does not grow on its own'
    - polo: 'metricas.osm.itens[metrica=Migrations]'
      valor: 'more than 50'
      legenda: 'versioned migrations'
      como: 'folders in prisma/migrations'
    - polo: 'metricas.osm.itens[metrica=ARQUIVOS de teste no ecossistema]'
      valor: 'more than 300'
      legenda: 'test files across the ecosystem'
      como: '*.spec.ts/tsx and *.test.ts/tsx outside node_modules, across the 4 repositories'
    - polo: 'metricas.osm.itens[metrica=CASOS de teste no ecossistema]'
      valor: 'more than 2,800'
      legenda: 'test cases across the ecosystem'
      como: 'it( and test( blocks inside the test files'
      _atencao: 'CASES is not the same measurement as FILES. The two are never mixed.'
    - polo: 'metricas.osm.itens[metrica=Gateways de pagamento]'
      valor: '2'
      legenda: 'payment gateways: Stripe and InfinitePay'
      _tipo: 'structural — published exact because it does not grow on its own'
_nota_de_metodo: 'Site editorial policy, not copy: the numbers that grow over time are hedged on purpose — an exact number on a site that stays up for months rots without anyone lying.'
polo_refs:
  - 'experiencias[id=osm].notas'
  - 'experiencias[id=osm].autoria'
  - 'experiencias[id=osm].bullets[id=osm-b5]'
  - 'experiencias[id=osm].bullets[id=osm-b6]'
  - 'experiencias[id=osm].bullets[id=osm-b7]'
  - 'experiencias[id=osm].bullets[id=osm-b9]'
  - 'experiencias[id=osm].bullets[id=osm-b4]'
  - 'competencias.backend.grupos[Node.js / NestJS]'
  - 'competencias.pagamentos.grupos[Billing]'
  - 'metricas.osm'
---

## What it is

oSeuMáximo is an education ecosystem running in production, with two brands live: **oseumaximo.com**,
the student learning platform, and **oseuprof.com**, the live-class scheduler. Both are served by the
same back-end.

The code is private — it belongs to the client and stays closed. There is no repository to open here.
What can be checked are the two live products and the decisions below, each one with the reason it
was made.

## What I built

A REST API in NestJS and three React 19 SPAs on top of it: the learning platform, the live-class
scheduler and the admin/CRM panel. The back-end and two of the SPAs were built from scratch; the
third I took over from an existing codebase and have maintained since April 2026.

## Engineering decisions

**Clean Architecture in 5 layers.** The product rules — enrollment, subscription, scheduling — change
more slowly than the infrastructure around them. Separating domain, application, adapters,
infrastructure and shared code is what makes it possible to swap the ORM, the payment gateway or the
queue without rewriting the rules. The cost is indirection: for a simple CRUD it is more layering
than the problem asks for.

**OpenAPI contract verified in CI.** Three front-ends consume the same API. Without verification, a
field renamed in the back-end only shows up when a screen breaks — and it breaks for the user. With
it, the build fails if the contract drifts from the code, and the error surfaces in the Pull Request.

**Multi-gateway billing.** The audience sits on both sides, and one gateway does not serve both. The
checkout talks to two providers behind the same interface — InfinitePay in Brazil, Stripe elsewhere —
with multi-currency support, monthly and lifetime subscriptions, and a grace period before access is
cut off.

**SSO across the two brands.** Two domains, one account. The session moves from one domain to the
other through a one-time token instead of asking for a second login, and what each person can do is
decided by role (RBAC) and by feature flag — which also allows releasing a feature to one group
before releasing it to everyone.

**Queues for the work that must not hold the response.** Email, backups, payment webhooks and AI
calls left the request cycle and moved to BullMQ and Redis, processed by a separate worker — the
second application in the monorepo. The API stays fast even when the work behind it is slow.

## Evidence

Both products are live: **oseumaximo.com** and **oseuprof.com**.

The numbers were **measured in the source code on 2026-08-16**, and each one carries its counting
method.
