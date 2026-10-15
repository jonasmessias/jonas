import { IconeTech } from '@/components/ui/icone-tech'
import { Secao } from '@/components/ui/secao'
import { getUi } from '@/content/ui'
import { getPerfil } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { ArrowRightIcon, ArrowUpRightIcon, EnvelopeSimpleIcon, FileArrowDownIcon, LinkedinLogoIcon } from '@phosphor-icons/react/ssr'
import type { ReactNode } from 'react'

type Props = { locale: Locale }

type Linha = {
  chave: string
  icone: ReactNode
  rotulo: string
  valor: string
  href: string
  externo: boolean
}

/**
 * Contato: as duas linhas de disponibilidade abrem; depois a lista dividida
 * por fios — e-mail (endereço visível, decisão do contrato mestre),
 * LinkedIn, GitHub. A linha inteira é o link (≥ 44px). "Baixar CV" só
 * existe quando o dossiê tiver `cv` — hoje não tem (bloqueio B-1), e nada
 * aqui aponta para /cv.pdf.
 */
export function Contato({ locale }: Props) {
  const perfil = getPerfil(locale)
  const ui = getUi(locale)
  const icone = 'shrink-0 text-ink-2 transition-colors duration-300 ease-fluid group-hover:text-accent'

  const linhas: Linha[] = [
    {
      chave: 'email',
      icone: <EnvelopeSimpleIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.email,
      valor: perfil.contato.email.texto,
      href: `mailto:${perfil.contato.email.texto}`,
      externo: false,
    },
    {
      chave: 'linkedin',
      icone: <LinkedinLogoIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.linkedin,
      valor: perfil.contato.linkedin.texto,
      href: perfil.contato.linkedin.url,
      externo: true,
    },
    {
      chave: 'github',
      icone: <IconeTech rotulo="github" icone="github" size={18} className={icone} />,
      rotulo: ui.contato.github,
      valor: perfil.contato.github.texto,
      href: perfil.contato.github.url,
      externo: true,
    },
  ]
  if (perfil.cv) {
    linhas.push({
      chave: 'cv',
      icone: <FileArrowDownIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.baixarCv,
      valor: ui.contato.baixarCv,
      href: perfil.cv.url,
      externo: true,
    })
  }

  return (
    <Secao id="contato" titulo={ui.nav.contato} colunas>
      <ul className="flex flex-col gap-1 text-lead text-ink">
        {perfil.disponibilidade.map((d) => (
          <li key={d.polo}>{d.texto}</li>
        ))}
      </ul>

      <ul className="mt-10 flex flex-col">
        {linhas.map((l) => (
          <li key={l.chave} className="border-t border-rule last:border-b">
            <a
              href={l.href}
              className="group flex min-h-14 items-center gap-4 py-3 text-ink"
              {...(l.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.icone}
              <span className="w-20 shrink-0 font-mono text-micro text-ink-2">{l.rotulo}</span>
              <span className="link-draw min-w-0 text-sm wrap-anywhere" translate="no">
                {l.valor}
              </span>
              {l.externo ? (
                <>
                  <ArrowUpRightIcon size={14} weight="regular" aria-hidden="true" className={`ml-auto ${icone}`} />
                  <span className="sr-only"> ({ui.abreEmNovaAba})</span>
                </>
              ) : (
                <ArrowRightIcon size={14} weight="regular" aria-hidden="true" className={`ml-auto ${icone}`} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
