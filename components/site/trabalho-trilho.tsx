import { getMarkdownFiles } from '@/lib/markdown'
import { getTranslations } from 'next-intl/server'
import { TrabalhoTrilhoPalco } from './trabalho-trilho-palco'

/**
 * Peças 02–04 de "Selected work" (F4b): os três repositórios públicos num
 * trilho horizontal dirigido por scrub, com o ordinal em display ao fundo.
 * Sem cartão e sem screenshot — o que existe é tipografia, fio e movimento.
 * RSC, estática por construção: TODO o texto nasce aqui, no HTML do
 * servidor; o TrabalhoTrilhoPalco (cliente) recebe isto como children e só
 * translada por cima. Sem JavaScript ou com reduced motion, as peças são
 * lista vertical no fluxo — ordinal, nome, descrição, stack e links
 * visíveis, links clicáveis.
 *
 * Desde a F4d cada peça é uma prancha que se monta: os títulos nascem num
 * DATUM comum (a linha de 1px de onde o nome pende — e o vão
 * ordinal→título é idêntico nas três peças por construção, com título de
 * 1 ou de 2 linhas), a stack é cota com tique de extremidade, e a peça se
 * desenha ao entrar em quadro. NADA disso mora aqui: datum e cota são
 * pseudo-elementos do bloco F4b do globals.css, e o desenho de entrada é
 * o canal --entrada escrito pelo palco — este arquivo segue sendo só a
 * marcação e os fatos.
 *
 * Fatos de content/dossie/projetos/*.<locale>.md, e de lá somente: nome,
 * descricao, stack.itens, repo e demo. Campo obrigatório ausente derruba o
 * build — inviolável nº 2: fato não registrado não se escreve à mão em
 * componente. `demo: null` é caso real (spring-task-manager): o link
 * simplesmente não renderiza — nada de URL inventada nem "em breve".
 * `decisao`, `nota`, `estado`, `polo`, `id` e campos com prefixo `_` NÃO
 * são renderizados: uma linha por peça é decisão de hierarquia — o detalhe
 * profissional é do CV, o site cria impacto.
 *
 * ⚠️ lib/markdown.ts ordena por `order`; estes arquivos declaram `ordem`.
 * A ordenação da lib não funciona aqui — quem ordena é este componente,
 * por `ordem` ascendente, e `ordem` ausente, não numérica ou duplicada
 * derruba o build: ordem indefinida em peças numeradas na tela é bug
 * silencioso.
 *
 * O ordinal 02–04 é apresentação derivada da posição (a seção 01 é a F4a),
 * como o L01..L05 da capa — nunca fato. O texto visível de cada link é o
 * próprio endereço sem o esquema: fato derivado do content, nenhum rótulo
 * novo de interface (messages/ não muda nesta task).
 *
 * Superfície de medição (papel que [data-numero] e [data-prova] têm na
 * F4a): [data-peca] com data-ordem, [data-peca-nome], [data-peca-descricao],
 * [data-peca-stack], [data-peca-ordinal] e [data-peca-link] existem para a
 * suíte de provas comparar a tela com o conteúdo — não são estilo nem
 * conteúdo. [data-peca-links] (o <ul> dos links, F4d) é gancho de ESTILO:
 * alvo do canal --entrada no CSS, porque a lista de links não tinha nome.
 */

type Peca = {
  ordem: number
  nome: string
  descricao: string
  stack: string[]
  repo: string
  demo: string | null
}

const PASTA = 'dossie/projetos'

function getPecas(locale: string): Peca[] {
  const arquivos = getMarkdownFiles(PASTA, locale)
  if (arquivos.length === 0) {
    throw new Error(
      `content/${PASTA}: nenhum projeto encontrado para o locale "${locale}"`,
    )
  }

  const pecas = arquivos.map((arquivo): Peca => {
    const origem = `content/${PASTA}/${arquivo.slug}.${locale}.md`

    const ordem: unknown = arquivo.data?.ordem
    if (typeof ordem !== 'number' || !Number.isFinite(ordem)) {
      throw new Error(
        `${origem}: campo "ordem" ausente ou não numérico no frontmatter — ordem indefinida em peças numeradas na tela é bug silencioso`,
      )
    }

    const nome: unknown = arquivo.data?.nome
    if (typeof nome !== 'string' || nome.length === 0) {
      throw new Error(`${origem}: campo "nome" ausente no frontmatter`)
    }

    const descricao: unknown = arquivo.data?.descricao
    if (typeof descricao !== 'string' || descricao.length === 0) {
      throw new Error(`${origem}: campo "descricao" ausente no frontmatter`)
    }

    const repo: unknown = arquivo.data?.repo
    if (typeof repo !== 'string' || repo.length === 0) {
      throw new Error(`${origem}: campo "repo" ausente no frontmatter`)
    }

    /* `demo` PODE ser null (caso real do spring-task-manager) — aí o link
     * não renderiza. Qualquer outro tipo é campo malformado: build cai. */
    const demo: unknown = arquivo.data?.demo
    if (demo != null && (typeof demo !== 'string' || demo.length === 0)) {
      throw new Error(
        `${origem}: campo "demo" malformado no frontmatter (esperava URL ou null)`,
      )
    }

    const itens: unknown = arquivo.data?.stack?.itens
    if (!Array.isArray(itens) || itens.length === 0) {
      throw new Error(
        `${origem}: campo "stack.itens" ausente ou vazio no frontmatter`,
      )
    }
    const stack = itens.map((item, i): string => {
      if (typeof item !== 'string' || item.length === 0) {
        throw new Error(
          `${origem}: campo "stack.itens[${i}]" vazio ou não textual no frontmatter`,
        )
      }
      return item
    })

    return {
      ordem,
      nome,
      descricao,
      stack,
      repo,
      demo: typeof demo === 'string' ? demo : null,
    }
  })

  pecas.sort((a, b) => a.ordem - b.ordem)

  for (let i = 1; i < pecas.length; i += 1) {
    if (pecas[i].ordem === pecas[i - 1].ordem) {
      throw new Error(
        `content/${PASTA}: "ordem" ${pecas[i].ordem} duplicada entre projetos — a posição na tela ficaria indefinida`,
      )
    }
  }

  return pecas
}

/** Apresentação do link: o endereço sem esquema nem barra final — o href
 *  segue íntegro; nenhum rótulo novo de interface. */
function semEsquema(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/** A seção 01 de "Selected work" é a F4a; o trilho começa no 02.
 *  Apresentação derivada da posição, nunca fato. */
const PRIMEIRO_ORDINAL = 2

/** Alvo do aria-labelledby da seção — contrato com o TrabalhoTrilhoPalco. */
const TITULO_ID = 'trabalho-trilho-titulo'

export async function TrabalhoTrilho({ locale }: { locale: string }) {
  const pecas = getPecas(locale)
  const t = await getTranslations({ locale, namespace: 'site' })

  return (
    <TrabalhoTrilhoPalco tituloId={TITULO_ID}>
      {/* Título acessível da seção: o rótulo de interface que já existe
          (messages/site.trabalho), só para leitor de tela — a hierarquia
          visual do trilho é ordinal + nome, sem cabeçalho próprio. */}
      <h2 id={TITULO_ID} className="sr-only">
        {t('trabalho')}
      </h2>

      <div data-trilho-janela>
        <div data-trilho-esteira>
          {pecas.map((peca, i) => {
            const ordinal = String(PRIMEIRO_ORDINAL + i).padStart(2, '0')
            const tituloPecaId = `trabalho-peca-${ordinal}-titulo`
            return (
              <article
                key={peca.repo}
                data-peca
                data-ordem={peca.ordem}
                aria-labelledby={tituloPecaId}
              >
                {/* Marca de prancha, não número de slide: atrás do conteúdo,
                    na cor do fio, decorativa. É o plano de fundo do paralaxe
                    no palco (a taxa e a fórmula vivem no
                    TrabalhoTrilhoPalco). */}
                <p
                  data-peca-ordinal
                  aria-hidden="true"
                  className="font-display text-display text-rule"
                >
                  {ordinal}
                </p>

                <div data-peca-conteudo>
                  <h3
                    id={tituloPecaId}
                    data-peca-nome
                    className="font-display text-display text-ink"
                  >
                    {peca.nome}
                  </h3>
                  <p
                    data-peca-descricao
                    className="mt-s-3 text-body text-ink-2"
                  >
                    {peca.descricao}
                  </p>
                  <ul
                    data-peca-stack
                    className="mt-s-4 flex flex-wrap gap-y-s-2 font-mono text-micro uppercase text-ink-2"
                  >
                    {peca.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ul
                    data-peca-links
                    className="mt-s-4 flex flex-wrap gap-x-s-4 gap-y-s-2"
                  >
                    <li>
                      <a
                        data-peca-link
                        data-link
                        href={peca.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-label uppercase"
                      >
                        {semEsquema(peca.repo)}
                      </a>
                    </li>
                    {peca.demo !== null && (
                      <li>
                        <a
                          data-peca-link
                          data-link
                          href={peca.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-label uppercase"
                        >
                          {semEsquema(peca.demo)}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        {/* O fio de base: a taxa 1,35× do paralaxe — corre na frente das
            peças, parece mais perto. Decoração pura; a largura vem do
            efeito (janela + 1,35× a travessia), em style inline. */}
        <div data-trilho-fio data-rule aria-hidden="true" />
      </div>
    </TrabalhoTrilhoPalco>
  )
}
