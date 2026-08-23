import { locales, type Locale } from '@/i18n/config'
import { getMarkdownFile } from '@/lib/markdown'
import { ImageResponse } from 'next/og'

/**
 * Card de Open Graph — 1200×630, um por locale, gerado no build.
 *
 * Card tipográfico: os dois fatos vêm de content/dossie/perfil.<locale>.md
 * (nome.texto e posicionamento.texto) e NADA é escrito aqui. Campos com
 * prefixo `_` são registro de auditoria e NUNCA são lidos. Campo ausente
 * derruba o build — mesmo padrão do site-header e do layout.
 *
 * As cores são os tokens da base clara do design system (globals.css),
 * literais porque o Satori não enxerga o CSS do site:
 *   #faf9f7 ground · #1a1918 ink · #6e6a64 ink-3 · #e3e0da rule
 * O OG não tem modo escuro: a base clara é a identidade; a escura, adaptação.
 *
 * A fonte: o Satori não usa next/font — precisa dos bytes. Buscamos o TTF
 * estático do Source Serif 4 no Google Fonts em tempo de build (o build já
 * depende de alcançar o Google: app/fonts.ts usa next/font/google). O
 * user-agent legado é o que faz o css2 responder TTF estático por peso em
 * vez de woff2 variável — o Satori não lê woff2 nem instancia eixo variável.
 * Se a busca falhar, o build FALHA com a causa; cair no sans padrão seria
 * publicar um card fora da identidade em silêncio.
 *
 * O `alt` é estático e em pt — divergência deliberada, não esquecimento:
 * a única via do Next para alt por locale é generateImageMetadata, e com
 * ela a rota ganha um segmento de id (/pt/opengraph-image/<id>), o caminho
 * sem id passa a responder 404 e a geração vira on-demand — contra o gate
 * de verificação e contra "gerado no build". Medido no route-loader:
 * node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js.
 * O pt é o x-default do site (i18n/config.ts).
 */

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * O generateStaticParams do layout não alcança esta rota: rota de metadata
 * compila para route handler, e layout não envolve route handler. Sem este
 * export a rota sai ƒ (on-demand) no build — medido na tabela de rotas — e
 * "gerada no build" é o combinado. O route-loader do Next re-exporta os
 * named exports deste arquivo para a rota gerada, então declarar aqui basta.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const perfilPt = getMarkdownFile('dossie', 'perfil', 'pt')
const nomePt: string | undefined = perfilPt?.data?.nome?.texto
if (!nomePt) {
  throw new Error('dossie/perfil.pt.md: nome.texto ausente no frontmatter')
}
export const alt = `Cartão tipográfico com o nome e o posicionamento de ${nomePt}`

/**
 * TTF estático do Source Serif 4 num peso, via css2 do Google Fonts.
 * Dois passos: o CSS declara a URL do .ttf em fonts.gstatic.com; depois
 * baixamos os bytes. force-cache: uma busca por peso no build, compartilhada
 * entre os dois locales.
 */
async function loadSourceSerif4(weight: 500 | 600): Promise<ArrayBuffer> {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@${weight}&display=swap`,
    {
      // UA legado → o Google serve TTF estático instanciado no peso pedido.
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' },
      cache: 'force-cache',
    },
  )
  if (!cssRes.ok) {
    throw new Error(
      `opengraph-image: css2 do Google Fonts respondeu ${cssRes.status} para Source Serif 4 w${weight}`,
    )
  }
  const css = await cssRes.text()
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('truetype'\)/)
  if (!match) {
    throw new Error(
      `opengraph-image: css2 não declarou TTF (format 'truetype') para Source Serif 4 w${weight}`,
    )
  }
  const ttfRes = await fetch(match[1], { cache: 'force-cache' })
  if (!ttfRes.ok) {
    throw new Error(
      `opengraph-image: download do TTF respondeu ${ttfRes.status} para Source Serif 4 w${weight}`,
    )
  }
  return ttfRes.arrayBuffer()
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    // Rota de imagem, não página: falhar alto no lugar de notFound().
    throw new Error(`opengraph-image: locale desconhecido "${locale}"`)
  }

  const perfil = getMarkdownFile('dossie', 'perfil', locale as Locale)
  const nome: string | undefined = perfil?.data?.nome?.texto
  const posicionamento: string | undefined = perfil?.data?.posicionamento?.texto

  if (!nome || !posicionamento) {
    // Inviolável nº 2: fato não registrado não se escreve à mão.
    // Falhar o build é o comportamento certo; inventar fallback, não.
    throw new Error(
      `dossie/perfil.${locale}.md: nome.texto ou posicionamento.texto ausente`,
    )
  }

  const [serif500, serif600] = await Promise.all([
    loadSourceSerif4(500),
    loadSourceSerif4(600),
  ])

  return new ImageResponse(
    (
      // O card é o cabeçalho de documento em escala de preview: o nome em
      // `meta` sobre um fio de 1px, e o posicionamento como a maior voz.
      // Alinhado à esquerda, respiro nas quatro bordas, nada além disso.
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#faf9f7', // ground
          padding: 80,
          fontFamily: 'Source Serif 4',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #e3e0da', // rule
            paddingBottom: 26,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: '#6e6a64', // ink-3
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            {nome}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: '#1a1918', // ink
              lineHeight: 1.4,
            }}
          >
            {posicionamento}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Source Serif 4', data: serif500, weight: 500, style: 'normal' },
        { name: 'Source Serif 4', data: serif600, weight: 600, style: 'normal' },
      ],
    },
  )
}
