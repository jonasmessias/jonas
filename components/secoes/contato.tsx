import { Objeto } from '@/components/motion/objeto'
import { IconeTech } from '@/components/ui/icone-tech'
import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'
import { ArrowRightIcon, ArrowUpRightIcon, EnvelopeSimpleIcon, FileArrowDownIcon, LinkedinLogoIcon } from '@phosphor-icons/react/ssr'
import type { ReactNode } from 'react'

type Props = { locale: Locale }

type Linha = { chave: string; icone: ReactNode; rotulo: string; valor: string; href: string; externo: boolean }

/** Contato: e-mail, LinkedIn e GitHub. O currículo só aparece se `cv` estiver preenchido no conteúdo. */
export function Contato({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)
  const icone = 'shrink-0 text-ink-2 transition-colors duration-300 ease-fluid group-hover:text-accent'

  const linhas: Linha[] = [
    {
      chave: 'email',
      icone: <EnvelopeSimpleIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.email,
      valor: c.contato.email,
      href: `mailto:${c.contato.email}`,
      externo: false,
    },
    {
      chave: 'linkedin',
      icone: <LinkedinLogoIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.linkedin,
      valor: c.contato.linkedin.texto,
      href: c.contato.linkedin.url,
      externo: true,
    },
    {
      chave: 'github',
      icone: <IconeTech rotulo="github" icone="github" size={18} className={icone} />,
      rotulo: ui.contato.github,
      valor: c.contato.github.texto,
      href: c.contato.github.url,
      externo: true,
    },
  ]
  if (c.cv) {
    linhas.push({
      chave: 'cv',
      icone: <FileArrowDownIcon size={18} weight="light" aria-hidden="true" className={icone} />,
      rotulo: ui.contato.baixarCv,
      valor: ui.contato.baixarCv,
      href: c.cv,
      externo: true,
    })
  }

  return (
    <Secao
      id="contato"
      titulo={ui.nav.contato}
      colunas
      // O octaedro: sob o título, na coluna que sobra em md+ (nunca sobre texto).
      ornamento={<Objeto forma="octaedro" className="mt-8 hidden size-24 md:block" />}
    >
      <ul className="flex flex-col">
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
