import { getMarkdownFile } from '@/lib/markdown'
import { getTranslations } from 'next-intl/server'
import { TrabalhoOsmPalco } from './trabalho-osm-palco'

/**
 * Seção 01 de "Selected work" (F4a): o case do oSeuMáximo como BLOCO DE
 * LEGENDA da prancha de corte — os números estruturais do sistema cercados
 * por fios, com as duas provas no ar embaixo. RSC, estática por construção:
 * TODO o texto nasce aqui, no HTML do servidor, com os três números já no
 * VALOR FINAL (inclusive o wdth 125 em que a contagem termina); o
 * TrabalhoOsmPalco (cliente) recebe isto como children e só anima por cima
 * (zera e conta de volta no scrub). Sem JavaScript ou com reduced motion,
 * o que se vê é exatamente esta marcação, íntegra e clicável.
 *
 * Fatos de content/dossie/case-osm.<locale>.md, e de lá somente: título,
 * forma do sistema, os três números estruturais, o aviso de código privado
 * e as duas provas no ar. Campo obrigatório ausente derruba o build —
 * inviolável nº 2: fato não registrado não se escreve à mão em componente.
 * Campos com prefixo `_` são registro de auditoria: `_tipo` é LIDO para
 * filtrar quais métricas são estruturais ("vai exato porque não cresce
 * sozinho" — é o conteúdo que declara, nunca uma lista de nomes aqui), e
 * nenhum campo `_` é renderizado. `valor` que não case com /^\d+$/ derruba
 * o build: número hedgeado ("mais de 250") nunca pode virar contador.
 *
 * O rótulo "Trabalho selecionado" é interface, não fato: messages/, como
 * nav, cv e role. O ordinal 01 da seção e a numeração 01–03 das linhas da
 * legenda são apresentação derivada do índice, como o L01..L05 da capa.
 *
 * Superfície de medição (papel que [data-camada] e [data-fio] já têm na
 * capa): [data-numero] com data-valor, [data-numero-legenda], [data-codigo]
 * e [data-prova] existem para a suíte de provas comparar a tela com o
 * conteúdo — não são estilo nem conteúdo.
 */

type Metrica = {
  valor: string
  legenda: string
}

type Prova = {
  nome: string
  url: string
  o_que_e: string
}

type Fatos = {
  titulo: string
  forma: string
  metricas: Metrica[]
  codigo: string
  provas: Prova[]
}

function getFatos(locale: string): Fatos {
  const arquivo = `content/dossie/case-osm.${locale}.md`
  const caso = getMarkdownFile('dossie', 'case-osm', locale)

  const titulo: string | undefined = caso?.data?.titulo
  const forma: string | undefined = caso?.data?.forma?.texto
  const codigo: string | undefined = caso?.data?.codigo?.texto

  if (!titulo) throw new Error(`${arquivo}: campo "titulo" ausente no frontmatter`)
  if (!forma) throw new Error(`${arquivo}: campo "forma.texto" ausente no frontmatter`)
  if (!codigo) throw new Error(`${arquivo}: campo "codigo.texto" ausente no frontmatter`)

  const itens: unknown = caso?.data?.metricas?.itens
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error(`${arquivo}: campo "metricas.itens" ausente no frontmatter`)
  }

  /* O filtro é `_tipo` PRESENTE, nunca uma lista de nomes escrita à mão:
   * é o próprio conteúdo que declara qual métrica é estrutural. */
  const estruturais = itens.filter(
    (item) => item != null && item._tipo !== undefined,
  )
  if (estruturais.length !== 3) {
    throw new Error(
      `${arquivo}: esperava exatamente 3 métricas estruturais (com "_tipo"); encontrei ${estruturais.length}`,
    )
  }

  const metricas = estruturais.map((item): Metrica => {
    const valor: unknown = item.valor
    const legenda: unknown = item.legenda
    /* Gate, não defesa: se alguém marcar `_tipo` num número que cresce
     * (hedgeado, "mais de 250"), o build TEM que quebrar. */
    if (typeof valor !== 'string' || !/^\d+$/.test(valor)) {
      throw new Error(
        `${arquivo}: métrica estrutural com "valor" que não é inteiro exato (${JSON.stringify(valor)}) — número hedgeado nunca vira contador`,
      )
    }
    if (typeof legenda !== 'string' || legenda.length === 0) {
      throw new Error(`${arquivo}: métrica estrutural sem "legenda"`)
    }
    return { valor, legenda }
  })

  const prova: unknown = caso?.data?.prova
  if (!Array.isArray(prova) || prova.length === 0) {
    throw new Error(`${arquivo}: campo "prova" ausente ou vazio no frontmatter`)
  }
  const provas = prova.map((item, i): Prova => {
    const nome: unknown = item?.nome
    const url: unknown = item?.url
    const oQueE: unknown = item?.o_que_e
    if (typeof nome !== 'string' || nome.length === 0) {
      throw new Error(`${arquivo}: campo "prova[${i}].nome" ausente no frontmatter`)
    }
    if (typeof url !== 'string' || url.length === 0) {
      throw new Error(`${arquivo}: campo "prova[${i}].url" ausente no frontmatter`)
    }
    if (typeof oQueE !== 'string' || oQueE.length === 0) {
      throw new Error(`${arquivo}: campo "prova[${i}].o_que_e" ausente no frontmatter`)
    }
    return { nome, url, o_que_e: oQueE }
  })

  return { titulo, forma, metricas, codigo, provas }
}

/** A posição desta peça em "Selected work" — apresentação derivada do
 *  índice (a primeira das quatro; o trilho da F4b traz as outras três),
 *  nunca fato. */
const INDICE_PECA = 1

/** Alvo do aria-labelledby da seção — contrato com o TrabalhoOsmPalco. */
const TITULO_ID = 'trabalho-osm-titulo'

export async function TrabalhoOsm({ locale }: { locale: string }) {
  const { titulo, forma, metricas, codigo, provas } = getFatos(locale)
  const t = await getTranslations({ locale, namespace: 'site' })

  return (
    <TrabalhoOsmPalco tituloId={TITULO_ID}>
      {/* O cabeçalho da prancha: ordinal + rótulo de interface, o título e
          a forma do sistema. Nada disto anima — visível em qualquer p. */}
      <header className="pt-s-4">
        <p className="font-mono text-label uppercase text-ink-2">
          {String(INDICE_PECA).padStart(2, '0')} · {t('trabalho')}
        </p>
        <h2 id={TITULO_ID} className="mt-s-3 font-display text-display text-ink">
          {titulo}
        </h2>
        <p className="mt-s-3 font-mono text-label uppercase text-ink-2">{forma}</p>
      </header>

      {/* A legenda da prancha: os três números estruturais CERCADOS por
          fios — um fio acima de cada linha, um fechando embaixo. A legenda
          vai verbatim: ela já contém o substantivo, o número não precisa de
          rótulo extra. O gêmeo sr-only mantém o valor estável para leitor
          de tela enquanto o visível (aria-hidden, como o eco da capa)
          conta no scrub. flex-1 centra o bloco no palco de 100dvh e absorve
          a folga — a separação entre blocos se adapta à viewport. */}
      <div className="flex flex-1 items-center py-s-5">
        <div className="w-full">
          <ol>
            {metricas.map((metrica, i) => (
              <li key={metrica.legenda}>
                <div data-trabalho-fio data-rule data-reveal aria-hidden="true" />
                <div className="flex items-baseline gap-x-s-4 py-s-3">
                  <span className="font-mono text-micro text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="sr-only">{metrica.valor}</span>
                  <span
                    data-numero
                    data-valor={metrica.valor}
                    data-reveal
                    aria-hidden="true"
                    className="font-display text-display text-ink"
                    style={{ fontVariationSettings: "'wdth' 125, 'wght' 600" }}
                  >
                    {metrica.valor}
                  </span>
                  <span
                    data-numero-legenda
                    className="font-mono text-micro uppercase text-ink-2"
                  >
                    {metrica.legenda}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <div data-trabalho-fio data-rule data-reveal aria-hidden="true" />
        </div>
      </div>

      {/* A prova no ar: o aviso de código privado e os dois produtos,
          links reais — clicáveis com ou sem motor. */}
      <div className="flex flex-col gap-y-s-4 pb-s-4">
        <p data-codigo data-trabalho-prova data-reveal className="text-body text-ink-2">
          {codigo}
        </p>
        <ul className="flex flex-wrap gap-x-s-7 gap-y-s-3">
          {provas.map((prova) => (
            <li key={prova.url} data-trabalho-prova data-reveal>
              <a
                data-prova
                data-link
                href={prova.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lead"
              >
                {prova.nome}
              </a>
              <p className="mt-s-1 font-mono text-micro uppercase text-ink-2">
                {prova.o_que_e}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </TrabalhoOsmPalco>
  )
}
