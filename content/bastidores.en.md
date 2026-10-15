---
id: bastidores
locale: en
titulo: 'How this site reaches you'
resumo: 'The site is simple on the surface; this is the path a fact travels to reach your screen.'
passos:
  - rotulo: 'Fact'
    detalhe: 'Born in a private record, with source and date. Each fact lives in one place only.'
    prova: 'content/dossie'
  - rotulo: 'Dossier'
    detalhe: 'Every published field carries a pointer to its fact; a missing field breaks the build.'
    prova: 'lib/dossie/esquema.ts'
  - rotulo: 'Local gates'
    detalhe: 'Banned terms, numbers re-measured against the code, and drift across résumé, LinkedIn, GitHub and site.'
    prova: null
  - rotulo: 'Pull Request'
    detalhe: 'Every PR runs typecheck, lint, build, content schema validation and a link check.'
    prova: '.github/workflows/ci.yml'
  - rotulo: 'Static build'
    detalhe: 'The site ships as ready-made HTML. Nothing runs on the server.'
    prova: 'next.config.ts'
  - rotulo: 'You'
    detalhe: 'The root sends you to /pt/ or /en/ based on your browser language.'
    prova: 'vercel.json'
semanal:
  texto: 'Every Monday, a workflow checks links, repository visibility and declared versions, and opens a PR with whatever needs attention. It never adds a fact.'
  prova: '.github/workflows/verificar-portfolio.yml'
---
