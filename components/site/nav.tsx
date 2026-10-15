'use client'

import { AlternadorTema } from '@/components/ui/alternador-tema'
import type { Ui } from '@/content/ui'
import { htmlLang, locales, rotuloLocale, type Locale } from '@/lib/locale'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

type Props = {
  /** O nome, do conteúdo — chega pronto do layout (RSC). */
  nome: string
  locale: Locale
  ui: Pick<Ui, 'nav' | 'idioma' | 'tema' | 'menu'>
}

/** As âncoras da página, na ordem das seções. A seção de bastidores se lê rolando. */
const SECOES = ['sobre', 'experiencia', 'stack', 'projetos', 'contato'] as const

/**
 * Troca de idioma como links simples para a página estática do outro
 * idioma: o atual é marcado, não linkado para fora. O rótulo curto aparece;
 * o nome completo vai para o leitor de tela.
 */
function TrocaDeIdioma({ locale, rotulo, className }: { locale: Locale; rotulo: string; className?: string }) {
  return (
    <ul aria-label={rotulo} className={clsx('flex items-center gap-1 font-mono text-label', className)}>
      {locales.map((l) => {
        const atual = l === locale
        return (
          <li key={l}>
            <a
              href={`/${l}/`}
              hrefLang={htmlLang[l]}
              lang={htmlLang[l]}
              aria-current={atual ? 'page' : undefined}
              className={clsx(
                'flex h-11 min-w-11 items-center justify-center px-2 transition-colors duration-300 ease-fluid',
                atual ? 'text-ink' : 'text-ink-2 hover:text-ink',
              )}
            >
              {rotuloLocale[l].curto}
              <span className="sr-only"> {rotuloLocale[l].nome}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function Nav({ nome, locale, ui }: Props) {
  const [aberto, setAberto] = useState(false)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const primeiroLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!aberto) return
    const botao = botaoRef.current
    // O que está atrás do overlay não existe para Tab nem para leitor de tela.
    const atras = document.querySelectorAll('main, footer')
    atras.forEach((el) => el.setAttribute('inert', ''))
    // Trava de rolagem enquanto o overlay cobre a página — não é máscara de
    // estouro: some junto com o menu.
    document.body.style.overflow = 'hidden'
    primeiroLinkRef.current?.focus()
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    // O overlay é md:hidden: crescer além de md fecha, senão a trava fica.
    const mq = window.matchMedia('(min-width: 768px)')
    const aoMudarLargura = () => mq.matches && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    mq.addEventListener('change', aoMudarLargura)
    return () => {
      atras.forEach((el) => el.removeAttribute('inert'))
      document.body.style.overflow = ''
      window.removeEventListener('keydown', aoTeclar)
      mq.removeEventListener('change', aoMudarLargura)
      botao?.focus()
    }
  }, [aberto])

  const fechar = () => setAberto(false)
  const links = SECOES.map((id) => ({ href: `#${id}`, rotulo: ui.nav[id] }))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-ground">
        <nav aria-label={ui.nav.rotulo} className="mx-auto flex h-header max-w-5xl items-center gap-2 px-4 md:px-8">
          <a href="#topo" onClick={fechar} translate="no" className="-ml-2 flex h-11 items-center px-2 font-mono text-sm text-ink">
            {nome}
          </a>

          <ul className="ml-auto hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex h-11 items-center px-3 text-sm text-ink-2 transition-colors duration-300 ease-fluid hover:text-ink"
                >
                  <span className="link-draw">{l.rotulo}</span>
                </a>
              </li>
            ))}
          </ul>

          <TrocaDeIdioma locale={locale} rotulo={ui.idioma} className="hidden border-l border-rule pl-3 md:flex" />

          <AlternadorTema rotulo={ui.tema} className="ml-auto md:ml-0" />

          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? ui.menu.fechar : ui.menu.abrir}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            data-menu-icone=""
            className="relative -mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
          >
            <span className={clsx('absolute h-px w-4 bg-current', aberto ? 'rotate-45' : '-translate-y-[3px]')} />
            <span className={clsx('absolute h-px w-4 bg-current', aberto ? '-rotate-45' : 'translate-y-[3px]')} />
          </button>
        </nav>
      </header>

      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label={ui.menu.rotulo}
        data-menu=""
        data-aberto={aberto ? '' : undefined}
        className="fixed inset-x-0 top-header bottom-0 z-40 flex flex-col justify-between overscroll-contain bg-ground px-4 pt-10 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li key={l.href} data-item="" style={{ '--i': i } as React.CSSProperties}>
              <a
                ref={i === 0 ? primeiroLinkRef : undefined}
                href={l.href}
                onClick={fechar}
                className="-ml-2 flex min-h-11 items-center px-2 py-2 text-lead font-medium text-ink"
              >
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>
        <div data-item="" style={{ '--i': links.length } as React.CSSProperties} className="border-t border-rule pt-4">
          <TrocaDeIdioma locale={locale} rotulo={ui.idioma} className="-ml-2" />
        </div>
      </div>
    </>
  )
}
