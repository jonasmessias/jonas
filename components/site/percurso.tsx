import { getMarkdownFiles } from '@/lib/markdown'
import { PercursoPalco } from './percurso-palco'

/**
 * Percurso (F5a): a travessia do tempo em quatro linhas — ano em display
 * gigante, organização e cargo — depois do trilho da F4b. É strip, não
 * seção de currículo: o detalhe profissional (bullets, local, stack) é do
 * CV; aqui a linha é só a passagem. RSC, estática por construção: TODO o
 * texto nasce aqui, no HTML do servidor; o PercursoPalco (cliente) recebe
 * isto como children e só anima por cima (a paralaxe diferencial dos anos
 * e o desenho dos fios). Sem JavaScript ou com reduced motion, o que se vê
 * é exatamente esta marcação: as quatro linhas em lista, na ordem
 * ascendente, fios desenhados, zero transform.
 *
 * Fatos de content/dossie/experiencias/*.<locale>.md, e de lá somente:
 * inicio, fim, organizacao e cargo. Campo obrigatório ausente derruba o
 * build — inviolável nº 2: fato não registrado não se escreve à mão em
 * componente. `local`, `bullets`, `polo`, `id`, `ordem` e campos com
 * prefixo `_` NÃO são renderizados. A sobreposição de períodos entre
 * autonomo e agio é real e registrada no polo — o próprio conteúdo diz que
 * o site não a esconde nem a arruma: as linhas vão na ordem ascendente e
 * pronto, sem rótulo de "simultâneo", asterisco ou nota de rodapé.
 *
 * ⚠️ A ORDEM é ASCENDENTE por `inicio`, NÃO por `ordem` — e não "conserte"
 * para `ordem` achando que alinha com o conteúdo. `ordem` no frontmatter
 * (osm 1 · agio 2 · autonomo 3 · versatec 4) é a ordem REVERSA do
 * currículo — mais recente primeiro — e serve ao currículo, não a esta
 * tela: percurso se lê do começo para o fim, então quem manda aqui é
 * `inicio` ascendente. Ordem é apresentação, nunca fato (mesmo raciocínio
 * de camadas._ordem em case-osm): mudar esta ordenação não muda fato
 * nenhum, mas usar `ordem` inverteria a travessia. `inicio` duplicado
 * derruba o build: ordem indefinida entre linhas na tela é bug silencioso
 * (o precedente é a `ordem` duplicada da F4b).
 *
 * O ano visível é APRESENTAÇÃO DERIVADA de inicio/fim, nunca fato novo:
 * `fim: null` é em curso e vira o traço aberto (`2023–`) — nada de
 * "atual", "presente" ou "hoje", que seria rótulo inventado; fim no mesmo
 * ano do início vira o ano só (`2025`); senão, o intervalo com travessão
 * curto (`2022–2023`).
 *
 * O rótulo acessível da seção também é derivado do conteúdo (as quatro
 * organizações, em ordem): messages/ não tem rótulo para esta seção e não
 * muda nesta task — texto de interface não se inventa em componente.
 *
 * Superfície de medição (papel que [data-peca] e [data-numero] têm nas
 * F4): [data-percurso], [data-percurso-linha] com data-inicio,
 * [data-percurso-ano], [data-percurso-org] e [data-percurso-cargo] existem
 * para a suíte de provas comparar a tela com o conteúdo — não são estilo
 * nem conteúdo.
 */

type Linha = {
  /** 'AAAA-MM' — chave de ordenação e data-inicio; nunca renderizado cru. */
  inicio: string
  /** O ano ou intervalo derivado — o único texto de data que aparece. */
  ano: string
  organizacao: string
  cargo: string
}

const PASTA = 'dossie/experiencias'

/** 'AAAA-MM' estrito — inicio (e fim não nulo) fora disto derruba o build. */
const FORMATO_MES = /^\d{4}-\d{2}$/

/** A regra do ano — apresentação derivada, nunca fato novo. */
function rotuloDoAno(inicio: string, fim: string | null): string {
  const anoInicio = inicio.slice(0, 4)
  if (fim === null) return `${anoInicio}–`
  const anoFim = fim.slice(0, 4)
  return anoFim === anoInicio ? anoInicio : `${anoInicio}–${anoFim}`
}

function getLinhas(locale: string): Linha[] {
  const arquivos = getMarkdownFiles(PASTA, locale)
  if (arquivos.length === 0) {
    throw new Error(
      `content/${PASTA}: nenhuma experiência encontrada para o locale "${locale}"`,
    )
  }

  const linhas = arquivos.map((arquivo): Linha => {
    const origem = `content/${PASTA}/${arquivo.slug}.${locale}.md`

    const inicio: unknown = arquivo.data?.inicio
    if (typeof inicio !== 'string' || !FORMATO_MES.test(inicio)) {
      throw new Error(
        `${origem}: campo "inicio" ausente ou fora do formato AAAA-MM no frontmatter`,
      )
    }

    /* `fim` tem que estar DECLARADO: null é em curso (caso real de
     * autonomo e osm); ausência não é em curso, é dado faltando — build
     * cai. String só no formato AAAA-MM. */
    const fimBruto: unknown = arquivo.data?.fim
    let fim: string | null
    if (fimBruto === null) {
      fim = null
    } else if (typeof fimBruto === 'string' && FORMATO_MES.test(fimBruto)) {
      fim = fimBruto
    } else {
      throw new Error(
        `${origem}: campo "fim" ausente ou malformado no frontmatter (esperava AAAA-MM, ou null para em curso — ausência não é em curso)`,
      )
    }

    const organizacao: unknown = arquivo.data?.organizacao
    if (typeof organizacao !== 'string' || organizacao.length === 0) {
      throw new Error(`${origem}: campo "organizacao" ausente no frontmatter`)
    }

    const cargo: unknown = arquivo.data?.cargo
    if (typeof cargo !== 'string' || cargo.length === 0) {
      throw new Error(`${origem}: campo "cargo" ausente no frontmatter`)
    }

    return {
      inicio,
      ano: rotuloDoAno(inicio, fim),
      organizacao,
      cargo,
    }
  })

  /* Ascendente por `inicio` — em 'AAAA-MM' a comparação lexicográfica É a
   * cronológica (zero à esquerda garantido pelo FORMATO_MES). */
  linhas.sort((a, b) => (a.inicio < b.inicio ? -1 : a.inicio > b.inicio ? 1 : 0))

  for (let i = 1; i < linhas.length; i += 1) {
    if (linhas[i].inicio === linhas[i - 1].inicio) {
      throw new Error(
        `content/${PASTA}: "inicio" ${linhas[i].inicio} duplicado entre experiências — a posição na tela ficaria indefinida`,
      )
    }
  }

  return linhas
}

export function Percurso({ locale }: { locale: string }) {
  const linhas = getLinhas(locale)

  /* O nome acessível da seção, derivado do conteúdo — ver o comentário do
   * topo: messages/ não tem rótulo para o percurso e não muda nesta task. */
  const rotulo = linhas.map((linha) => linha.organizacao).join(' · ')

  return (
    <PercursoPalco rotulo={rotulo}>
      <ol data-percurso-linhas>
        {linhas.map((linha) => (
          <li key={linha.inicio} data-percurso-linha data-inicio={linha.inicio}>
            {/* O ano em display gigante — é ele que sofre a paralaxe. */}
            <p
              data-percurso-ano
              className="font-display text-display text-ink"
            >
              {linha.ano}
            </p>
            <div>
              <p
                data-percurso-org
                className="font-display text-lead text-ink"
              >
                {linha.organizacao}
              </p>
              <p
                data-percurso-cargo
                className="mt-s-2 font-mono text-label uppercase text-ink-2"
              >
                {linha.cargo}
              </p>
            </div>
            {/* O fio que separa as linhas — o da última fecha a strip.
                data-reveal: o gate A-8 cobre o pré-paint; o palco assume
                por gsap.set e o desenha por scaleX no scrub. */}
            <div data-percurso-fio data-rule data-reveal aria-hidden="true" />
          </li>
        ))}
      </ol>
    </PercursoPalco>
  )
}
