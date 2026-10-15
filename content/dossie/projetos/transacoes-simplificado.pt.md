---
id: transacoes-simplificado
polo: 'projetos_publicos[id=transacoes-simplificado]'
locale: pt
nome: 'transacoes-simplificado'
repo: 'https://github.com/jonasmessias/transacoes-simplificado'
demo: null
estado: publico
_verificado_em: '2026-10-14'
ordem: 4
descricao:
  polo: 'projetos_publicos[id=transacoes-simplificado].descricao_longa'
  texto: 'A transferência roda numa única transação: valida o tipo de usuário e o saldo, consulta um autorizador externo via OpenFeign, atualiza as duas carteiras, grava o registro e dispara a notificação. Erros de domínio viram respostas HTTP num handler global, e o projeto sobe com Docker Compose.'
decisao:
  polo: 'projetos_publicos[id=transacoes-simplificado].bullet'
  texto: 'API REST de transferências entre usuários e lojistas em Java 21 e Spring Boot, com JPA e PostgreSQL: valida saldo, consulta um autorizador externo e notifica via OpenFeign, numa única transação.'
nota:
  polo: 'projetos_publicos[id=transacoes-simplificado].ressalva'
  texto: 'Projeto de estudo, sem testes automatizados.'
stack:
  polo: 'projetos_publicos[id=transacoes-simplificado].medido'
  itens: ['Java 21', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL', 'OpenFeign', 'Docker Compose']
_verificacao: 'Data = projetos_publicos[id=transacoes-simplificado].medido (gh api no repo público em 14/10/2026: pom.xml com Java 21 e Spring Boot 4.1; nenhum arquivo em src/test). OpenFeign entra pelo nome da biblioteca; o nome do starter não é usado por estar no vocabulário proibido.'
---
