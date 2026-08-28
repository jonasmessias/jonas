import { localeNames, locales } from '@/i18n/config'
import { getMarkdownFile } from '@/lib/markdown'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Fragment } from 'react'
import { CapaDocumento } from './capa-documento'
import { CapaPalco } from './capa-palco'

/**
 * A capa da direção CORTE — RSC, estática por construção: o texto nasce
 * TODO aqui, no HTML do servidor; o CapaPalco (cliente) recebe isto como
 * children e só anima por cima. Sem JavaScript ou com reduced motion, o
 * que se vê é exatamente esta marcação, legível e íntegra.
 *
 * Fatos (nome, título, local, manifesto, CV) vêm de
 * content/dossie/perfil.<locale>.md; as camadas (nomes e quantidade) vêm de
 * content/dossie/case-osm.<locale>.md → camadas.itens, na ordem do array.
 * Campo obrigatório ausente derruba o build — inviolável nº 2: fato não
 * registrado não se escreve à mão dentro de componente. Campos com prefixo
 * `_` são registro de auditoria e NUNCA são renderizados.
 *
 * Rótulos de interface (ROLAR/SCROLL, BAIXAR CV) não são fato: vêm de
 * messages/<locale>.json, namespace `site`, lidos no servidor.
 *
 * O empilhamento que faz o nome atravessar o monólito: canvas em z-10
 * (no CapaPalco); as linhas do nome ficam em z-20 na BASE — inclusive no
 * repouso com motor vivo. A primeira ([data-atras]) só desce para z-0
 * quando o CapaPalco cria o eco do JONAS e marca [data-eco] no palco, e
 * é a dissolução do eco no scrub que engata o sanduíche — regras em
 * globals.css, mecanismo e medição no docblock do CapaPalco. Assim o
 * atravessamento é evento do scroll, e nem a arte parada (reduced/no-JS)
 * nem o repouso cobrem linha nenhuma. O <h1> NÃO leva z-index, transform
 * nem opacity — contexto de empilhamento próprio nele achataria as duas
 * palavras num plano só; quem se posiciona são os <span>.
 *
 * O canto superior esquerdo fica VAZIO em repouso, de propósito: é
 * conquistado pelo scroll — o nome comprimido (wdth 125 → 62) pousa ali.
 */

type Fatos = {
  nome: string
  titulo: string
  local: string
  /** O manifesto da capa — posicionamento.texto, aprovado no GATE 1. */
  manifesto: string
  /** B-1: `cv.url` NÃO existe hoje (só `_cv: null`, registro de ausência).
   *  Ausente → o link não renderiza. Nada de placeholder nem URL inventada. */
  cvUrl: string | undefined
}

function getFatos(locale: string): Fatos {
  const arquivo = `content/dossie/perfil.${locale}.md`
  const perfil = getMarkdownFile('dossie', 'perfil', locale)

  const nome: string | undefined = perfil?.data?.nome?.texto
  const titulo: string | undefined = perfil?.data?.titulo?.texto
  const local: string | undefined = perfil?.data?.local?.texto
  const manifesto: string | undefined = perfil?.data?.posicionamento?.texto

  if (!nome) throw new Error(`${arquivo}: campo "nome.texto" ausente no frontmatter`)
  if (!titulo) throw new Error(`${arquivo}: campo "titulo.texto" ausente no frontmatter`)
  if (!local) throw new Error(`${arquivo}: campo "local.texto" ausente no frontmatter`)
  if (!manifesto)
    throw new Error(`${arquivo}: campo "posicionamento.texto" ausente no frontmatter`)

  return { nome, titulo, local, manifesto, cvUrl: perfil?.data?.cv?.url }
}

/** As camadas do monólito (F2/F3b) — do conteúdo, nunca do código: os
 *  itens são os diretórios reais de libs/, registrados em case-osm com
 *  ponteiro para o polo, NA ORDEM do array (índice 0 = laje de baixo =
 *  L01). Campo ausente derruba o build — nunca se escrevem os cinco à
 *  mão, nem o `5`. */
function getCamadasItens(locale: string): string[] {
  const arquivo = `content/dossie/case-osm.${locale}.md`
  const caso = getMarkdownFile('dossie', 'case-osm', locale)
  const itens: unknown = caso?.data?.camadas?.itens
  if (
    !Array.isArray(itens) ||
    itens.length === 0 ||
    !itens.every((item): item is string => typeof item === 'string')
  ) {
    throw new Error(`${arquivo}: campo "camadas.itens" ausente no frontmatter`)
  }
  return itens
}

export async function Capa({ locale }: { locale: string }) {
  const { nome, titulo, local, manifesto, cvUrl } = getFatos(locale)
  const camadasItens = getCamadasItens(locale)
  const t = await getTranslations({ locale, namespace: 'site' })

  // Apresentação derivada do fato, nunca fato novo: o nome quebra uma
  // palavra por linha ("JONAS" / "MESSIAS") e o local troca a vírgula do
  // registro pelo interponto da capa ("CARATINGA · MG").
  const linhasNome = nome.split(' ')
  const partesLocal = local.split(', ')

  return (
    <CapaPalco camadas={camadasItens.length}>
      {/* Os fios do documento — um por aresta, [data-rule] de 1px, camada
          própria em z-0 ANTES do nome no DOM: o fio assume no mesmo plano
          em que a aresta do canvas vivia (atrás do nome, atrás do canvas),
          e o handoff troca aresta por fio sem trocar de plano. Decoração
          (aria-hidden), só existe visualmente sob html.js; o Y de cada um
          vem da cena via CapaDocumento. */}
      <div data-fios aria-hidden="true">
        {camadasItens.map((nomeCamada) => (
          <div key={nomeCamada} data-fio data-rule data-reveal />
        ))}
      </div>

      {/* Nav mínima no canto DIREITO: alternador de idioma e (quando o
          fato existir) o CV. O canto esquerdo fica vazio — é o alvo do
          nome. z-20: acima do canvas, clicável e legível sempre. */}
      <nav
        aria-label={t('nav')}
        className="relative z-20 flex items-baseline justify-end gap-x-s-4 pt-s-4 font-mono text-label uppercase text-ink-2"
      >
        <div className="flex items-baseline gap-x-s-2">
          {locales.map((l, i) => (
            <Fragment key={l}>
              {i > 0 && <span aria-hidden="true">|</span>}
              {locale === l ? (
                // O idioma ATIVO não é link — é estado, e estado é âmbar.
                <span aria-current="true" lang={l} className="text-accent">
                  {l.toUpperCase()}
                </span>
              ) : (
                <Link
                  href={`/${l}`}
                  lang={l}
                  hrefLang={l}
                  aria-label={`${l.toUpperCase()} — ${localeNames[l]}`}
                  className="hover:text-hot"
                >
                  {l.toUpperCase()}
                </Link>
              )}
            </Fragment>
          ))}
        </div>

        {cvUrl && (
          <a href={cvUrl} className="hover:text-hot">
            {t('cv')}
          </a>
        )}
      </nav>

      {/* O nome — o único --text-mega da página, aberto em wdth 125 (o
          scrub comprime até 62; scaleX deformaria a letra, o eixo não).
          O wrapper e o h1 são deliberadamente NÃO-posicionados; os spans
          de linha é que levam position + z-index, para participarem do
          mesmo contexto de empilhamento do canvas. */}
      <div className="flex flex-1 items-center">
        <h1
          data-name-mark
          className="font-display text-mega uppercase"
          style={{ fontVariationSettings: "'wdth' 125, 'wght' 700" }}
        >
          {linhasNome.map((linha, i) => (
            // position/z-index/display vêm do CSS de [data-name-linha]:
            // z-20 na base (nome inteiro na frente da arte, inclusive no
            // repouso); data-atras só desce para z-0 sob [data-eco], que
            // o motor marca ao criar o eco — ver CapaPalco.
            <span key={linha} data-name-linha data-atras={i === 0 ? '' : undefined}>
              {linha}
            </span>
          ))}
        </h1>
      </div>

      {/* O documento da F3b — manifesto, rótulos de camada e fios do
          handoff. TODO o texto nasce aqui, no servidor; o CapaDocumento
          (cliente) recebe isto como children e pendura no scrub da F3a.
          Sem JavaScript ou com reduced motion, o CSS deixa isto no fluxo:
          o manifesto por extenso e as cinco camadas em lista. */}
      <CapaDocumento>
        <p data-manifesto data-reveal className="text-lead">
          {manifesto}
        </p>

        {/* Uma entrada por camada, na ordem do array (índice 0 = laje de
            baixo = L01). O ordinal é apresentação derivada do índice; o
            nome é o diretório real de libs/, em minúsculas no HTML — a
            caixa alta é do CSS. */}
        <ol data-camadas className="font-mono text-micro uppercase">
          {camadasItens.map((nomeCamada, i) => (
            <li key={nomeCamada} data-camada data-reveal>
              <span data-camada-texto>
                <span className="text-accent">{`L${String(i + 1).padStart(2, '0')}`}</span>{' '}
                <span className="text-ink-2">{nomeCamada}</span>
              </span>
            </li>
          ))}
        </ol>

      </CapaDocumento>

      {/* O pé da capa — cargo · local, o fio e a instrução de rolagem. */}
      <div data-meta className="relative z-20 pb-s-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-s-4 gap-y-s-2 font-mono text-label uppercase text-ink-2">
          <p>{titulo}</p>
          <p>
            {partesLocal.map((parte, i) => (
              <Fragment key={parte}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                {parte}
              </Fragment>
            ))}
          </p>
        </div>

        <div data-rule className="mt-s-3" />

        <p className="pt-s-3 font-mono text-micro uppercase text-ink-2">
          <span aria-hidden="true">↓ </span>
          {t('role')}
        </p>
      </div>
    </CapaPalco>
  )
}
