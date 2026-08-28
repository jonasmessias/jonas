---
id: case-osm
polo: 'experiencias[id=osm]'
locale: pt
titulo: 'oSeuMáximo — um ecossistema de educação em produção'
ancora_experiencia: 'experiencias/osm'
codigo:
  polo: 'experiencias[id=osm].prova'
  estado: 'privado'
  texto: 'O código é privado — é de cliente, e continua fechado. O que dá para verificar aqui são os dois produtos no ar e as decisões descritas abaixo.'
prova:
  - polo: 'experiencias[id=osm].prova'
    nome: 'oseumaximo.com'
    url: 'https://oseumaximo.com'
    o_que_e: 'plataforma de estudos do aluno'
  - polo: 'experiencias[id=osm].prova'
    nome: 'oseuprof.com'
    url: 'https://oseuprof.com'
    o_que_e: 'agendador de aulas ao vivo'
forma:
  polo: 'experiencias[id=osm].notas + experiencias[id=osm].bullets[id=osm-b6]'
  texto: '1 back-end e 3 SPAs'
camadas:
  polo: 'metricas.osm.itens[metrica=Camadas de Clean Architecture]'
  origem: 'libs/'
  itens: ['domain', 'application', 'adapters', 'infrastructure', 'shared']
  _forma: 'Nomes de diretório, não prosa: ficam em inglês nos dois locales porque é assim que existem no código. A tradução para "domínio, aplicação, adaptadores…" mora no corpo, onde é explicação.'
  _ordem: 'NÃO é alfabética, e não "conserte" para alfabética achando que alinha com o polo: o polo não afirma ordem nenhuma — em engine/remede_metricas.js o medidor "Camadas de Clean Architecture" deriva a lista com .sort(), então a ordem que aparece no polo é resíduo do sort, não fato. A ordem publicada aqui é a da prosa deste mesmo arquivo (domínio, aplicação, adaptadores, infraestrutura, compartilhado), para os mesmos cinco itens não aparecerem em duas ordens diferentes na mesma tela. Ordem é apresentação; mudar esta linha não muda fato nenhum.'
metricas:
  medido_em: '2026-08-16'
  _metodo: 'node engine/remede_metricas.js, executado contra o código em 16/08/2026'
  itens:
    - polo: 'metricas.osm.itens[metrica=Endpoints HTTP]'
      valor: 'mais de 250'
      legenda: 'endpoints HTTP no back-end'
      como: 'decorators @Get, @Post, @Put, @Patch e @Delete em apps e libs'
    - polo: 'metricas.osm.itens[metrica=Controllers]'
      valor: 'mais de 30'
      legenda: 'controllers'
      como: 'arquivos com @Controller('
    - polo: 'metricas.osm.itens[metrica=Modelos no schema Prisma]'
      valor: 'mais de 70'
      legenda: 'modelos no schema Prisma'
      como: 'linhas ^model em schema.prisma'
    - polo: 'metricas.osm.itens[metrica=Domínios de use-case]'
      valor: 'mais de 20'
      legenda: 'domínios de use-case'
      como: 'subpastas de libs/application/src/use-cases'
    - polo: 'metricas.osm.itens[metrica=Camadas de Clean Architecture]'
      valor: '5'
      legenda: 'camadas de Clean Architecture'
      como: 'libs/'
      _tipo: 'estrutural — vai exato porque não cresce sozinho'
    - polo: 'metricas.osm.itens[metrica=Aplicações no monorepo]'
      valor: '2'
      legenda: 'aplicações no monorepo do back-end: API e worker'
      como: 'apps/'
      _tipo: 'estrutural — vai exato porque não cresce sozinho'
    - polo: 'metricas.osm.itens[metrica=Migrations]'
      valor: 'mais de 50'
      legenda: 'migrations versionadas'
      como: 'pastas em prisma/migrations'
    - polo: 'metricas.osm.itens[metrica=ARQUIVOS de teste no ecossistema]'
      valor: 'mais de 300'
      legenda: 'arquivos de teste no ecossistema'
      como: '*.spec.ts/tsx e *.test.ts/tsx fora de node_modules, nos 4 repositórios'
    - polo: 'metricas.osm.itens[metrica=CASOS de teste no ecossistema]'
      valor: 'mais de 2.800'
      legenda: 'casos de teste no ecossistema'
      como: 'blocos it( e test( dentro dos arquivos de teste'
      _atencao: 'CASOS não é a mesma medida que ARQUIVOS. As duas nunca se misturam.'
    - polo: 'metricas.osm.itens[metrica=Gateways de pagamento]'
      valor: '2'
      legenda: 'gateways de pagamento: Stripe e InfinitePay'
      _tipo: 'estrutural — vai exato porque não cresce sozinho'
_nota_de_metodo: 'Política editorial do site, não copy: os números que crescem com o tempo aparecem hedgeados de propósito — um número cravado num site que fica meses no ar apodrece sem ninguém mentir.'
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

## O que é

O oSeuMáximo é um ecossistema de educação em produção, com duas marcas no ar: **oseumaximo.com**, a
plataforma de estudos do aluno, e **oseuprof.com**, o agendador de aulas ao vivo. As duas são
servidas pelo mesmo back-end.

O código é privado — é de cliente, e continua fechado. Não há repositório para abrir aqui. O que dá
para verificar são os dois produtos no ar e as decisões abaixo, cada uma com o motivo que a fez ser
tomada.

## O que eu construí

Uma API REST em NestJS e três SPAs em React 19 sobre ela: a plataforma de estudos, o agendador de
aulas ao vivo e o painel administrativo/CRM. O back-end e duas das SPAs saíram do zero; a terceira eu
assumi de uma base já existente e mantenho desde abril de 2026.

## Decisões de engenharia

**Clean Architecture em 5 camadas.** A regra de negócio do produto — matrícula, assinatura,
agendamento — muda mais devagar que a infraestrutura em volta dela. Separar domínio, aplicação,
adaptadores, infraestrutura e código compartilhado é o que permite trocar o ORM, o gateway de
pagamento ou a fila sem reescrever a regra. O custo é indireção: para um CRUD simples, é mais camada
do que o problema pede.

**Contrato OpenAPI verificado no CI.** São três front-ends consumindo a mesma API. Sem verificação,
um campo renomeado no back-end só aparece quando alguma tela quebra — e aparece para o usuário. Com
a verificação, o build quebra se o contrato divergir do código, e o erro aparece no Pull Request.

**Billing multi-gateway.** O público está dos dois lados, e um gateway só não atende os dois. O
checkout fala com dois provedores por trás da mesma interface — InfinitePay no Brasil, Stripe fora —
com multi-moeda, assinatura mensal e vitalícia, e período de carência antes de cortar o acesso.

**SSO entre as duas marcas.** Dois domínios, uma conta. A sessão passa de um domínio para o outro
por um token de uso único, em vez de pedir login de novo, e o que cada pessoa pode fazer é decidido
por papel (RBAC) e por feature flag — o que também permite liberar uma funcionalidade para um grupo
antes de liberar para todo mundo.

**Fila para o que não pode segurar a resposta.** E-mail, backup, webhook de pagamento e chamada de
IA saíram do ciclo da requisição e foram para BullMQ e Redis, processados por um worker separado —
a segunda aplicação do monorepo. A API responde rápido mesmo quando o trabalho por trás é lento.

## Prova

Os dois produtos estão no ar: **oseumaximo.com** e **oseuprof.com**.

Os números foram **medidos no código em 16/08/2026**, e cada um vem com o método de contagem.
