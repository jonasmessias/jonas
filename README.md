# jonas — site pessoal

Portfólio de uma página em dois idiomas (`/pt/` e `/en/`), servido como **HTML estático**: o
`next build` escreve tudo em `out/` e nada roda no servidor.

**No ar:** <https://jonasdev.vercel.app>

Stack: Next.js 15 (App Router, `output: 'export'`) · React 19 · TypeScript · Tailwind CSS 4 ·
conteúdo em Markdown (gray-matter) validado com Zod · ícones `simple-icons` e Phosphor, renderizados
no servidor.

## Rodar

```bash
npm ci
npm run dev                 # http://localhost:3000/pt/
npm run build               # valida o conteúdo e exporta para out/
python3 -m http.server 8080 -d out    # serve o export como a hospedagem serve
```

Na raiz, `/` leva para `/pt/` ou `/en/` pelo idioma do navegador — isso mora em `vercel.json`, porque
export estático não tem middleware (`public/index.html` é a reserva, com meta-refresh).

## De onde vem o conteúdo

Todo texto factual mora em `content/dossie/` — Markdown com frontmatter, um arquivo por idioma
(`*.pt.md`, `*.en.md`). **Cada campo publicado carrega um ponteiro `polo:`** para o registro de
fatos de onde ele foi derivado. Esse registro é privado e fica fora deste repositório; aqui nenhum
fato é escrito à mão.

- `lib/dossie/esquema.ts` — o esquema Zod de cada tipo de arquivo. Campo que falta, ponteiro
  ausente ou data YAML sem aspas **derrubam o build**, com o arquivo e o campo.
- `lib/dossie/index.ts` — a única porta de leitura: `getPerfil`, `getSobre`, `getExperiencias`,
  `getProjetos`, `getCaseOsm`, `getEngenharia`, `getBastidores`.
- Chaves com prefixo `_` são registro de auditoria (correções, datas de verificação) e nunca
  aparecem no site.
- `content/ui.ts` — rótulos de interface (navegação, botões, títulos), tipados por idioma. Nunca fato.
- `content/bastidores.*.md` — a seção "Como este site chega até você": fatos **sobre o site**, cada
  passo com o arquivo deste repositório que o prova.

## Gates

| onde | o quê |
|---|---|
| `npm run valida` (também `prebuild`) | o conteúdo inteiro pelo esquema, nos dois idiomas, mais as regras entre arquivos |
| CI (`.github/workflows/ci.yml`) | typecheck · lint · valida · build · `scripts/checa-saida.mjs` (arquivos do export, nenhum telefone, nenhum link para o CV bloqueado, orçamento de First Load em `scripts/orcamento.json`) · links do HTML (lychee) |
| bancada local, antes de cada PR | termos proibidos e números remedidos contra o código, lidos do registro privado — o corpo do PR traz a saída |
| toda segunda (`.github/workflows/verificar-portfolio.yml`) | confere links, visibilidade dos repositórios e versões declaradas; abre um PR com as pendências. **Só pode editar `_verificado_em`** — o robô verifica, não afirma |

## Publicar

`master` é produção: **push na `master` faz deploy na Vercel.** Toda mudança entra por branch +
Pull Request, e o merge é do dono.

**O currículo em PDF não é linkado** enquanto a versão publicada não bater com o registro de fatos.
O botão de baixar o CV só aparece quando o perfil ganhar o campo `cv.url`.

## Tema

Escuro por padrão; claro por escolha (gravada em `localStorage`) ou, sem JavaScript, pelo sistema.
Um script síncrono aplica o tema antes da primeira pintura — sem flash. O âmbar da identidade mede
2,1:1 sobre o fundo claro: lá ele só pinta o que é decorativo; texto e foco usam o acento queimado.
