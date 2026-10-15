---
id: bastidores
locale: pt
titulo: 'Como este site chega até você'
resumo: 'O site é simples na superfície; este é o caminho que um fato percorre até chegar à sua tela.'
passos:
  - rotulo: 'Fato'
    detalhe: 'Nasce num registro privado, com fonte e data. Cada fato mora num lugar só.'
    prova: 'content/dossie'
  - rotulo: 'Dossiê'
    detalhe: 'Cada campo publicado carrega o ponteiro do seu fato; campo que falta derruba o build.'
    prova: 'lib/dossie/esquema.ts'
  - rotulo: 'Gates locais'
    detalhe: 'Termos proibidos, números remedidos contra o código e deriva entre currículo, LinkedIn, GitHub e site.'
    prova: null
  - rotulo: 'Pull Request'
    detalhe: 'Cada PR passa por typecheck, lint, build, esquema do conteúdo e verificação de links.'
    prova: '.github/workflows/ci.yml'
  - rotulo: 'Build estático'
    detalhe: 'O site sai como HTML pronto. Nada roda no servidor.'
    prova: 'next.config.ts'
  - rotulo: 'Você'
    detalhe: 'A raiz leva para /pt/ ou /en/ conforme o idioma do seu navegador.'
    prova: 'vercel.json'
semanal:
  texto: 'Toda segunda, um workflow confere os links, a visibilidade dos repositórios e as versões declaradas, e abre um PR com as pendências. Ele nunca acrescenta fato.'
  prova: '.github/workflows/verificar-portfolio.yml'
---
