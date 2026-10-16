# jonas — site pessoal

Meu portfólio, em português e inglês: **[jonasmessias.dev.br](https://www.jonasmessias.dev.br)**

Next.js 15 (export estático) · React 19 · TypeScript · Tailwind CSS 4 · three.js · nginx · Docker ·
Cloudflare Tunnel

## Rodar

```bash
npm ci
npm run dev        # http://localhost:3000/pt/
npm run build      # gera o site estático em out/
```

## Onde editar

Todo o texto do site fica em dois arquivos:

- `content/pt.ts`: português
- `content/en.ts`: inglês

Os dois seguem a forma de `content/tipos.ts`. Se um tiver um campo que o outro não tem, o TypeScript
avisa. Rótulos de interface (menu, botões) ficam em `content/ui.ts`.

## Workflows

| workflow | quando | o que faz |
|---|---|---|
| **Checagem** (`ci.yml`) | todo push e PR | confere tipos, lint, build, peso da página e links |
| **Deploy** (`imagem.yml`) | push na `main` | monta a imagem Docker (nginx + site) e publica em `ghcr.io/jonasmessias/jonas` |
| **Atualizar portfolio** (`atualizar-portfolio.yml`) | toda segunda | o Claude olha os repositórios públicos com a topic `portfolio` e os pushes recentes, e abre um PR atualizando projetos e "Estudando". Com a topic `estudo`, o projeto ganha o selo Estudo |
| **Claude Code** (`claude.yml`) | quando eu escrevo `@claude` | responde ou faz a mudança pedida num issue ou PR. Só responde a mim |

Nada da IA vai ao ar sozinho: tudo vira PR, e o merge é meu.

## Como o site chega até você

```
git push → Checagem → Deploy publica a imagem → a VM busca a imagem → Cloudflare Tunnel → você
```

A VM (Oracle Cloud) não tem nenhuma porta aberta para a internet: o túnel da Cloudflare sai de dentro
para fora. Detalhes e passo a passo em [`infra/README.md`](infra/README.md).
