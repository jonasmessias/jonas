import { getMarkdownFile } from '@/lib/markdown'
import { Fragment } from 'react'
import { CapacidadesPalco } from './capacidades-palco'

/**
 * Capacidades (F5b): quatro palavras enormes — as capacidades — e o painel
 * com os termos da ativa, depois do percurso. RSC, estática por
 * construção: TODO o texto nasce aqui, no HTML do servidor; o
 * CapacidadesPalco (cliente) recebe isto como children e só instala a
 * entrada e a interação por cima. Sem JavaScript ou com reduced motion, o
 * que se vê é exatamente esta marcação em fluxo: as quatro capacidades e
 * TODOS os seus itens visíveis ao mesmo tempo, nada esperando interação.
 *
 * Fatos de content/dossie/engenharia.<locale>.md, e de lá somente: por
 * grupo, `titulo` e `itens`. Campo obrigatório ausente derruba o build —
 * inviolável nº 2. `polo`, `id` e campos com prefixo `_` NÃO são
 * renderizados (id é lido só para filtrar).
 *
 * ⚠️ O arquivo tem 18 grupos; esta seção usa EXATAMENTE 4, por id e na
 * ordem de IDS — a ordem do arquivo não manda aqui. Dois pontos que
 * parecem detalhe e não são:
 *
 * - O `titulo` vai VERBATIM, inclusive "Entrega e observabilidade", que
 *   tem três palavras. Não se encurta título para caber no conceito de
 *   "palavra enorme": título é fato registrado com ponteiro para o polo, e
 *   o layout é que se adapta a ele (a caixa da palavra quebra linha se
 *   precisar), nunca o contrário.
 * - O grupo `performance-a11y` fica FORA, de propósito: ele carrega a
 *   ressalva "em 2 das 3 aplicações" e o gate de atribuição exige que
 *   "code splitting" só apareça acompanhado dela. Não renderizá-lo
 *   elimina a classe inteira de risco — não o inclua "para completar".
 *
 * O ordinal 01–04 é apresentação derivada da posição (como o 02–04 da
 * F4b e o L01..L05 da capa), nunca fato. O molde dentro da caixa é a
 * MESMA palavra (mesmo fato) em wdth 125, invisível e aria-hidden: reserva
 * a largura final para a palavra visível abrir dentro dela sem mover nada
 * — geometria, não conteúdo (o CSS do bloco F5b é o outro lado disso).
 *
 * O rótulo acessível da seção é derivado do conteúdo (os quatro títulos,
 * em ordem), como o percurso fez: messages/ não tem rótulo para esta
 * seção e não muda nesta task. Cada gatilho é <button type="button"> com
 * aria-expanded + aria-controls ligando ao seu <ul>; cada <ul> aponta de
 * volta pelo aria-labelledby.
 *
 * Superfície de medição (papel que [data-peca] e [data-percurso-linha]
 * têm nas F4/F5a): [data-capacidades], [data-capacidade] com data-id e
 * data-ativa no ativo, [data-capacidade-itens] com data-de, e
 * [data-capacidades-painel] existem para a suíte de provas comparar a
 * tela com o conteúdo — não são estilo nem conteúdo.
 */

type Grupo = {
  id: string
  titulo: string
  itens: string[]
}

const PASTA = 'dossie'
const ARQUIVO = 'engenharia'

/* Os quatro desta seção, por id e NESTA ordem — travada no contrato da
 * F5b, não derivada do arquivo. Grupo que sumiu do conteúdo derruba o
 * build, nunca desaparece da tela em silêncio. */
const IDS = ['frontend', 'backend', 'arquitetura', 'entrega'] as const

function getGrupos(locale: string): Grupo[] {
  const origem = `content/${PASTA}/${ARQUIVO}.${locale}.md`

  const arquivo = getMarkdownFile(PASTA, ARQUIVO, locale)
  if (!arquivo) {
    throw new Error(`${origem}: arquivo não encontrado`)
  }

  const grupos: unknown = arquivo.data?.grupos
  if (!Array.isArray(grupos)) {
    throw new Error(
      `${origem}: campo "grupos" ausente ou não é lista no frontmatter`,
    )
  }

  return IDS.map((id): Grupo => {
    const bruto: unknown = grupos.find(
      (grupo: unknown) =>
        typeof grupo === 'object' &&
        grupo !== null &&
        (grupo as { id?: unknown }).id === id,
    )
    if (!bruto) {
      throw new Error(
        `${origem}: grupo "${id}" não encontrado — os quatro ids desta seção são obrigatórios`,
      )
    }

    const titulo: unknown = (bruto as { titulo?: unknown }).titulo
    if (typeof titulo !== 'string' || titulo.length === 0) {
      throw new Error(`${origem}: grupo "${id}" sem campo "titulo"`)
    }

    const itens: unknown = (bruto as { itens?: unknown }).itens
    if (
      !Array.isArray(itens) ||
      itens.length === 0 ||
      !itens.every((item) => typeof item === 'string' && item.length > 0)
    ) {
      throw new Error(
        `${origem}: grupo "${id}" sem "itens" (esperava lista não vazia de strings)`,
      )
    }

    return { id, titulo, itens }
  })
}

export function Capacidades({ locale }: { locale: string }) {
  const grupos = getGrupos(locale)

  /* O nome acessível da seção, derivado do conteúdo — padrão do percurso. */
  const rotulo = grupos.map((grupo) => grupo.titulo).join(' · ')

  return (
    <CapacidadesPalco rotulo={rotulo}>
      <div data-capacidades-lista>
        {grupos.map((grupo, i) => (
          <Fragment key={grupo.id}>
            {/* data-reveal: o gate A-8 cobre o pré-paint da entrada; o
                palco assume por gsap.set e abre por clip-path no scrub. */}
            <button
              type="button"
              id={`capacidade-${grupo.id}`}
              data-capacidade
              data-id={grupo.id}
              data-ativa={i === 0 ? '' : undefined}
              data-reveal
              aria-expanded={i === 0}
              aria-controls={`capacidade-itens-${grupo.id}`}
              className="block py-s-4 text-left font-display text-display text-ink"
            >
              <span
                data-capacidade-ordinal
                aria-hidden="true"
                className="mb-s-2 block font-mono text-micro uppercase text-ink-2"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span data-capacidade-caixa>
                <span data-capacidade-molde aria-hidden="true">
                  {grupo.titulo}
                </span>
                <span data-capacidade-palavra>{grupo.titulo}</span>
              </span>
            </button>
            {/* O fio que separa as palavras — o da última fecha a pilha. */}
            <div data-capacidade-fio data-rule data-reveal aria-hidden="true" />
          </Fragment>
        ))}
      </div>
      <div data-capacidades-painel>
        {grupos.map((grupo, i) => (
          <ul
            key={grupo.id}
            id={`capacidade-itens-${grupo.id}`}
            data-capacidade-itens
            data-de={grupo.id}
            data-ativa={i === 0 ? '' : undefined}
            aria-labelledby={`capacidade-${grupo.id}`}
          >
            {grupo.itens.map((item) => (
              <li
                key={item}
                className="font-mono text-micro uppercase text-ink-2"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </CapacidadesPalco>
  )
}
