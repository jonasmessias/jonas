---
id: spring-task-manager
polo: 'projetos_publicos[id=spring-task-manager]'
locale: en
nome: 'spring-task-manager-api'
repo: 'https://github.com/jonasmessias/spring-task-manager-api'
demo: null
estado: publico
_verificado_em: '2026-08-16'
ordem: 2
descricao:
  polo: 'projetos_publicos[id=spring-task-manager].descricao_longa_en'
  texto: 'REST API of the task system, organized by domain (auth, workspaces, boards, lists and cards) into controllers, services and repositories, with Spring Data JPA on PostgreSQL. Email verification and password reset with expiring tokens, members with two-level access, HTML emails with Thymeleaf and Flyway migrations.'
decisao:
  polo: 'projetos_publicos[id=spring-task-manager].bullet_en'
  texto: 'REST API in Java 17 and Spring Boot 3.5: JWT with refresh tokens in Redis and PostgreSQL fallback, Google OAuth 2.0 login, emails via AWS SES, Swagger/OpenAPI and Docker Compose.'
nota:
  polo: 'projetos_publicos[id=spring-task-manager].quando_usar'
  texto: 'The oSeuMáximo back-end is private. This is the back-end anyone can open and read, and the public evidence of Redis.'
stack:
  polo: 'projetos_publicos[id=spring-task-manager].bullet_en'
  itens: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Google OAuth 2.0', 'AWS SES', 'Docker Compose', 'Swagger/OpenAPI']
_correcao: '2026-10-15: descricao became { polo, texto } and was rewritten from descricao_longa_en (the previous text said the fallback happens "when it does not answer", which the polo does not record). decisao.texto is now bullet_en verbatim. Java 17 and Spring Boot 3.5 match the polo (versoes_medidas 2026-10-14). Backing for "oSeuMáximo back-end is private": experiencias[id=osm].prova.'
---
