# jonas — site pessoal

Site de página única em dois idiomas (`/pt` e `/en`): um dossiê renderizado no servidor,
composto por nove seções em `components/dossie/`.

Stack: Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · Markdown com gray-matter.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Conteúdo

Todo o conteúdo mora em `content/dossie/`, em Markdown com frontmatter, um arquivo por
idioma (`*.pt.md` e `*.en.md`). As seções o consomem via `lib/markdown.ts`; strings de
interface (rótulos, navegação) ficam em `messages/`.

**Os fatos derivam de um polo fora deste repositório.** Nenhum fato — texto de perfil,
experiência, projeto, métrica — é editado à mão aqui: ele nasce no polo e é derivado para
`content/dossie/`. Este repo carrega apenas a apresentação.
