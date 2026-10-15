import type { Locale } from '@/lib/locale'
import { en } from './en'
import { pt } from './pt'
import type { Conteudo } from './tipos'

const conteudo: Record<Locale, Conteudo> = { pt, en }

/** O conteúdo do site no idioma pedido. */
export function getConteudo(locale: Locale): Conteudo {
  return conteudo[locale]
}

export type { Conteudo, Experiencia, Link, Projeto } from './tipos'
