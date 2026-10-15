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
descricao:
  polo: 'projetos_publicos[id=spring-task-manager].descricao_longa'
  texto: 'API REST do sistema de tarefas, organizada por domínio (auth, workspaces, boards, listas e cards) em controllers, services e repositories, com Spring Data JPA sobre PostgreSQL. Verificação de e-mail e reset de senha com tokens que expiram, membros com acesso em dois níveis, e-mails HTML com Thymeleaf e migrations com Flyway.'
decisao:
  polo: 'projetos_publicos[id=spring-task-manager].bullet'
  texto: 'API REST em Java 17 e Spring Boot 3.5: JWT com refresh token em Redis e fallback para PostgreSQL, login com Google OAuth 2.0, e-mails via AWS SES, Swagger/OpenAPI e Docker Compose.'
nota:
  polo: 'projetos_publicos[id=spring-task-manager].quando_usar'
  texto: 'O back-end do oSeuMáximo é privado. Este é o back-end que dá para abrir e ler, e é a prova pública de Redis.'
stack:
  polo: 'projetos_publicos[id=spring-task-manager].bullet'
  itens: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Google OAuth 2.0', 'AWS SES', 'Docker Compose', 'Swagger/OpenAPI']
_correcao: '2026-10-15: descricao virou { polo, texto } e foi reescrita a partir de descricao_longa (o texto anterior dizia que o fallback acontece "quando ele não responde", o que o polo não registra: o polo diz "lido primeiro do cache e com fallback para o banco"). decisao.texto passou a ser o bullet literal (o anterior misturava itens da descricao_longa sob o ponteiro do bullet). Java 17 e Spring Boot 3.5 conferem com o bullet (versoes_medidas 14/10/2026). Lastro de "back-end do oSeuMáximo é privado": experiencias[id=osm].prova.'
---
