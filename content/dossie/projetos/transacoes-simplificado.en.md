---
id: transacoes-simplificado
polo: 'projetos_publicos[id=transacoes-simplificado]'
locale: en
nome: 'transacoes-simplificado'
repo: 'https://github.com/jonasmessias/transacoes-simplificado'
demo: null
estado: publico
_verificado_em: '2026-10-14'
ordem: 4
descricao:
  polo: 'projetos_publicos[id=transacoes-simplificado].descricao_longa_en'
  texto: 'Each transfer runs in a single transaction: it checks user type and balance, calls an external authorizer through OpenFeign, updates both wallets, saves the record and sends the notification. Domain errors become HTTP responses in a global handler, and the project runs with Docker Compose.'
decisao:
  polo: 'projetos_publicos[id=transacoes-simplificado].bullet_en'
  texto: 'REST API for transfers between users and merchants in Java 21 and Spring Boot, with JPA and PostgreSQL: checks balance, calls an external authorizer and notifies via OpenFeign, in a single transaction.'
nota:
  polo: 'projetos_publicos[id=transacoes-simplificado].ressalva'
  texto: 'A study project, with no automated tests.'
stack:
  polo: 'projetos_publicos[id=transacoes-simplificado].medido'
  itens: ['Java 21', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL', 'OpenFeign', 'Docker Compose']
_verificacao: 'Date = projetos_publicos[id=transacoes-simplificado].medido (gh api on the public repo, 2026-10-14: pom.xml with Java 21 and Spring Boot 4.1; no file under src/test). OpenFeign is named by the library; the starter name is not used because it is in the banned vocabulary.'
---
