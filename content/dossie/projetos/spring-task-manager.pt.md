---
id: spring-task-manager
polo: 'projetos_publicos[id=spring-task-manager]'
locale: pt
nome: 'spring-task-manager-api'
repo: 'https://github.com/jonasmessias/spring-task-manager-api'
demo: null
estado: publico
_verificado_em: '2026-08-16'
ordem: 2
descricao: 'A prova pública de back-end: refresh token cacheado em Redis, com leitura no cache primeiro e volta ao PostgreSQL quando ele não responde.'
decisao:
  polo: 'projetos_publicos[id=spring-task-manager].bullet'
  texto: 'API REST em Java 17 e Spring Boot 3.5, modular por domínio: JWT com refresh token cacheado em Redis (cache-first com fallback para PostgreSQL), login social com Google OAuth 2.0, controle de acesso em dois níveis, e-mails HTML via AWS SES, audit logging, Docker Compose e Swagger/OpenAPI.'
nota:
  polo: 'projetos_publicos[id=spring-task-manager].quando_usar'
  texto: 'O back-end do oSeuMáximo é privado. Este é o back-end que dá para abrir e ler, e é a única prova pública de Redis.'
stack:
  polo: 'projetos_publicos[id=spring-task-manager].bullet'
  itens: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Google OAuth 2.0', 'AWS SES', 'Docker Compose', 'Swagger/OpenAPI']
---
