import { getMarkdownFile } from '@/lib/markdown'
import { getTranslations } from 'next-intl/server'
import { FechoPalco } from './fecho-palco'

/**
 * O fecho (F5c): a disponibilidade registrada, os canais de contato e o
 * rodapé — a resolução da página; depois dela não vem mais nada. RSC,
 * estático por construção: TODO o texto nasce aqui, no HTML do servidor;
 * o FechoPalco (cliente) recebe isto como children e só anima por cima.
 * Sem JavaScript ou com reduced motion, o que se vê é exatamente esta
 * marcação: as duas linhas de disponibilidade, os três canais clicáveis,
 * o nome em wdth 125 (o estado final), o ano e o colofão — em fluxo, sem
 * transform.
 *
 * Fatos de content/dossie/perfil.<locale>.md, e de lá somente:
 * disponibilidade[].texto (VERBATIM, na ordem do array — nada de juntar
 * numa frase só nem de slogan por cima), contato.{email,linkedin,github}
 * e nome.texto. Campo obrigatório ausente derruba o build — inviolável
 * nº 2: fato não registrado não se escreve à mão em componente. `polo`,
 * `site`, `titulo`, `local`, `posicionamento` e campos com prefixo `_`
 * NÃO são renderizados.
 *
 * B-1 — o CV: o botão lê `cv.url`, que HOJE NÃO EXISTE no frontmatter
 * (só `_cv: null`, registro de ausência — o arquivo de CV publicado
 * contradiz o polo e está sob bloqueio). Ausente → o link não renderiza,
 * e isso é o comportamento correto, não erro: nada de placeholder, "em
 * breve", href="#" ou URL apontada à mão. Mesmo padrão do cvUrl da capa
 * (capa.tsx).
 *
 * Rótulos de interface (BAIXAR CV, o colofão) não são fato: vêm de
 * messages/<locale>.json, namespace `site`, lidos no servidor. O colofão
 * nomeia next, gsap e three (package.json → dependencies) e Archivo e
 * Martian Mono (app/fonts.ts) — conferidos contra o repo antes de a
 * string existir em messages/.
 *
 * O rótulo acessível da seção é derivado do conteúdo (as duas linhas de
 * disponibilidade, em ordem), padrão do percurso.tsx: messages/ não tem
 * rótulo para esta seção e não muda nesta task.
 *
 * O nome do rodapé fecha o laço da capa: mesmo objeto (nome.texto, uma
 * palavra por linha — a mesma apresentação derivada da capa), mesmo eixo
 * (wdth), gesto invertido — a capa comprime 125 → 62, aqui o scrub abre
 * 62 → 125. O estado BASE do CSS já é o final (wdth 125); o pouso
 * pré-motor em 62 é regra sob html.js no bloco F5c, e o scrub do
 * FechoPalco dirige o eixo por cima.
 *
 * Superfície de medição (papel que [data-peca] e [data-percurso-linha]
 * têm nas F4/F5a): [data-fecho], [data-disponibilidade], [data-canal]
 * com data-tipo="email|linkedin|github|cv", [data-rodape],
 * [data-rodape-nome] e [data-rodape-meta] existem para a suíte de provas
 * comparar a tela com o conteúdo — não são estilo nem conteúdo.
 */

type Fatos = {
  /** As linhas de disponibilidade, verbatim e na ordem do array. */
  disponibilidade: string[]
  email: string
  linkedin: { texto: string; url: string }
  github: { texto: string; url: string }
  /** B-1: `cv.url` NÃO existe hoje (só `_cv: null`, registro de ausência).
   *  Ausente → o link não renderiza. Nada de placeholder nem URL inventada. */
  cvUrl: string | undefined
  nome: string
}

function getFatos(locale: string): Fatos {
  const arquivo = `content/dossie/perfil.${locale}.md`
  const perfil = getMarkdownFile('dossie', 'perfil', locale)

  const brutoDisponibilidade: unknown = perfil?.data?.disponibilidade
  if (!Array.isArray(brutoDisponibilidade) || brutoDisponibilidade.length === 0) {
    throw new Error(
      `${arquivo}: campo "disponibilidade" ausente ou vazio no frontmatter`,
    )
  }
  const disponibilidade = brutoDisponibilidade.map((item: unknown, i): string => {
    const texto: unknown =
      typeof item === 'object' && item !== null
        ? (item as { texto?: unknown }).texto
        : undefined
    if (typeof texto !== 'string' || texto.length === 0) {
      throw new Error(
        `${arquivo}: campo "disponibilidade[${i}].texto" ausente no frontmatter`,
      )
    }
    return texto
  })

  const email: unknown = perfil?.data?.contato?.email?.texto
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error(
      `${arquivo}: campo "contato.email.texto" ausente no frontmatter`,
    )
  }

  const canalExterno = (chave: 'linkedin' | 'github') => {
    const texto: unknown = perfil?.data?.contato?.[chave]?.texto
    const url: unknown = perfil?.data?.contato?.[chave]?.url
    if (typeof texto !== 'string' || texto.length === 0) {
      throw new Error(
        `${arquivo}: campo "contato.${chave}.texto" ausente no frontmatter`,
      )
    }
    if (typeof url !== 'string' || url.length === 0) {
      throw new Error(
        `${arquivo}: campo "contato.${chave}.url" ausente no frontmatter`,
      )
    }
    return { texto, url }
  }

  const nome: unknown = perfil?.data?.nome?.texto
  if (typeof nome !== 'string' || nome.length === 0) {
    throw new Error(`${arquivo}: campo "nome.texto" ausente no frontmatter`)
  }

  return {
    disponibilidade,
    email,
    linkedin: canalExterno('linkedin'),
    github: canalExterno('github'),
    cvUrl: perfil?.data?.cv?.url,
    nome,
  }
}

type Canal = {
  tipo: 'email' | 'linkedin' | 'github' | 'cv'
  texto: string
  href: string
  /** Externo abre em outra aba com noopener noreferrer, como as F4. */
  externo: boolean
}

export async function Fecho({ locale }: { locale: string }) {
  const { disponibilidade, email, linkedin, github, cvUrl, nome } =
    getFatos(locale)
  const t = await getTranslations({ locale, namespace: 'site' })

  /* O nome acessível da seção, derivado do conteúdo — padrão do percurso. */
  const rotulo = disponibilidade.join(' · ')

  /* Apresentação derivada do fato, nunca fato novo: o mailto: é o esquema
   * padrão de um endereço de e-mail aplicado a contato.email.texto (o
   * único canal sem `url` registrada — o texto visível continua sendo o
   * endereço); e o nome quebra uma palavra por linha, a MESMA derivação
   * da capa — é o mesmo objeto fechando o laço. */
  const linhasNome = nome.split(' ')

  const canais: Canal[] = [
    { tipo: 'email', texto: email, href: `mailto:${email}`, externo: false },
    { tipo: 'linkedin', texto: linkedin.texto, href: linkedin.url, externo: true },
    { tipo: 'github', texto: github.texto, href: github.url, externo: true },
    /* B-1: sem cv.url no frontmatter não há entrada — ver o docblock. */
    ...(cvUrl
      ? [{ tipo: 'cv' as const, texto: t('cv'), href: cvUrl, externo: false }]
      : []),
  ]

  /* Ano de colofão, não afirmação sobre o Jonas — computado, nunca um
   * literal digitado. */
  const ano = new Date().getFullYear()

  return (
    <FechoPalco rotulo={rotulo}>
      <div data-fecho-plaquinha>
        {/* data-reveal em fios, linhas e canais: o gate A-8 cobre o
            pré-paint da entrada; o palco assume por gsap.set (scaleX 0 /
            clip fechado, opacity 1) e anima no scrub. */}
        <div data-rule data-fecho-fio data-reveal aria-hidden="true" />

        {disponibilidade.map((texto) => (
          <p
            key={texto}
            data-disponibilidade
            data-reveal
            className="font-display text-lead text-ink"
          >
            {texto}
          </p>
        ))}

        <ul data-fecho-canais className="font-mono text-label uppercase">
          {canais.map((canal) => (
            <li key={canal.tipo}>
              <a
                data-canal
                data-tipo={canal.tipo}
                data-link
                data-reveal
                href={canal.href}
                {...(canal.externo
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {canal.texto}
              </a>
            </li>
          ))}
        </ul>

        <div data-rule data-fecho-fio data-reveal aria-hidden="true" />
      </div>

      <footer data-rodape>
        {/* O nome — o gesto invertido da capa: entra em wdth 62 (pouso
            pré-motor, CSS F5c sob html.js) e o scrub abre até 125, o
            estado que o no-JS e o reduced motion já mostram. Uma palavra
            por linha (span block via CSS), como a capa. */}
        <p data-rodape-nome className="font-display text-mega uppercase text-ink">
          {linhasNome.map((linha) => (
            <span key={linha}>{linha}</span>
          ))}
        </p>

        <p data-rodape-meta className="font-mono text-micro uppercase text-ink-2">
          <span>{ano}</span>
          <span aria-hidden="true"> · </span>
          <span>{t('colofao')}</span>
        </p>
      </footer>
    </FechoPalco>
  )
}
