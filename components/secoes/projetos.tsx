import { Chip, Etiquetas } from '@/components/ui/etiqueta'
import { PainelFoco } from '@/components/ui/painel-foco'
import { Revelar } from '@/components/ui/revelar'
import { Secao } from '@/components/ui/secao'
import { getUi, type Ui } from '@/content/ui'
import { getCaseOsm, getExperiencias, getPerfil, getProjetos, type Projeto } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import type { ReactNode } from 'react'

type Props = { locale: Locale }

/** Quantas etiquetas o card do ecossistema mostra — apresentação; a lista inteira está na Experiência. */
const ETIQUETAS_NO_CARD = 8

const link =
  'group inline-flex min-h-11 items-center gap-1 font-mono text-micro text-accent transition-colors duration-300 ease-fluid hover:text-hot'

function LinkExterno({ href, children, ui }: { href: string; children: string; ui: Ui }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      <span className="link-draw">{children}</span>
      <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
      <span className="sr-only"> ({ui.abreEmNovaAba})</span>
    </a>
  )
}

/** Os links de um projeto da lista: código quando há repositório, site quando há demo. */
function LinksDoProjeto({ p, ui }: { p: Projeto; ui: Ui }) {
  if (!p.repo && !p.demo) return null
  return (
    <ul className="mt-4 flex flex-wrap items-center gap-x-6">
      {p.repo && (
        <li>
          <LinkExterno href={p.repo} ui={ui}>
            {ui.projetos.verCodigo}
          </LinkExterno>
        </li>
      )}
      {p.demo && (
        <li>
          <LinkExterno href={p.demo} ui={ui}>
            {p.repo ? ui.projetos.verDemo : ui.projetos.verSite}
          </LinkExterno>
        </li>
      )}
    </ul>
  )
}

/** O card em destaque: um PainelFoco dentro de um Revelar, ocupando a altura toda da célula. */
function Card({ id, atraso, children }: { id?: string; atraso: number; children: ReactNode }) {
  return (
    <Revelar as="li" atraso={atraso} className="flex">
      <PainelFoco as="article" id={id} className="flex w-full flex-col p-5 md:p-7">
        {children}
      </PainelFoco>
    </Revelar>
  )
}

/**
 * Projetos: dois cards em destaque (o ecossistema em produção e o primeiro
 * projeto público, por `ordem`) e, abaixo, a lista dos demais dividida por
 * fios. A honestidade é a regra: código privado é dito como é, com a prova
 * sendo o produto no ar; "Ver código" só aparece quando há repositório.
 * Fecha com um link só para o GitHub — não existe bloco "Outros".
 */
export function Projetos({ locale }: Props) {
  const ui = getUi(locale)
  const perfil = getPerfil(locale)
  const caso = getCaseOsm(locale)
  const experiencias = getExperiencias(locale)
  const projetos = getProjetos(locale)

  const experienciaDoCaso = experiencias.find((e) => e.case === caso.id)
  if (!experienciaDoCaso) throw new Error(`experiencias/*.${locale}.md: nenhuma entrada com case "${caso.id}"`)
  const [destaque, ...lista] = projetos
  if (!destaque) throw new Error(`projetos/*.${locale}.md: nenhum projeto`)

  return (
    <Secao id="projetos" titulo={ui.nav.projetos}>
      <ul className="grid gap-4 md:grid-cols-2">
        <Card id="projeto-osm" atraso={0}>
          {caso.codigo.estado === 'privado' && (
            <div>
              <Chip>{ui.projetos.codigoPrivado}</Chip>
            </div>
          )}
          <h3 className="mt-4 text-lg font-medium leading-snug text-ink md:text-xl">{caso.titulo}</h3>
          <p className="mt-2 font-mono text-micro text-ink-2">{caso.forma.texto}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{caso.codigo.texto}</p>
          <ul className="mt-4 flex flex-col">
            {caso.prova.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 flex-wrap items-center gap-x-2 gap-y-0 text-sm"
                >
                  <span className="inline-flex items-center gap-1 font-mono text-micro text-accent transition-colors duration-300 ease-fluid group-hover:text-hot">
                    <span className="link-draw" translate="no">
                      {p.nome}
                    </span>
                    <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
                  </span>
                  <span className="text-ink-2">{p.o_que_e}</span>
                  <span className="sr-only"> ({ui.abreEmNovaAba})</span>
                </a>
              </li>
            ))}
          </ul>
          <Etiquetas itens={experienciaDoCaso.stack.itens.slice(0, ETIQUETAS_NO_CARD)} className="mt-auto pt-6" />
        </Card>

        <Card atraso={0.1}>
          <h3 className="font-mono text-base font-medium text-ink md:text-lg wrap-anywhere" translate="no">
            {destaque.nome}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink">{destaque.descricao.texto}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">{destaque.decisao.texto}</p>
          {destaque.nota && <p className="mt-3 font-mono text-micro text-ink-2">{destaque.nota.texto}</p>}
          <div className="mt-auto pt-6">
            <Etiquetas itens={destaque.stack.itens} />
            <LinksDoProjeto p={destaque} ui={ui} />
          </div>
        </Card>
      </ul>

      <ul className="mt-12 flex flex-col">
        {lista.map((p) => (
          <li key={p.id} className="grid gap-3 border-t border-rule py-6 md:grid-cols-12 md:gap-8">
            <div className="flex flex-wrap items-center gap-3 self-start md:col-span-4 md:flex-col md:items-start">
              <h3 className="font-mono text-sm font-medium text-ink wrap-anywhere" translate="no">
                {p.nome}
              </h3>
              {p.estado === 'privado' && <Chip>{ui.projetos.codigoPrivado}</Chip>}
            </div>
            <div className="min-w-0 md:col-span-8">
              <p className="max-w-[65ch] text-sm leading-relaxed text-ink">{p.descricao.texto}</p>
              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink-2">{p.decisao.texto}</p>
              {p.nota && <p className="mt-3 font-mono text-micro text-ink-2">{p.nota.texto}</p>}
              <Etiquetas itens={p.stack.itens} className="mt-4" />
              <LinksDoProjeto p={p} ui={ui} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-rule pt-4">
        <LinkExterno href={perfil.contato.github.url} ui={ui}>
          {ui.projetos.maisNoGithub}
        </LinkExterno>
      </div>
    </Secao>
  )
}
