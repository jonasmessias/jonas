/**
 * Os idiomas do site. Registro seguro para cliente (nada de fs aqui).
 * `/es` foi aposentado: vercel.json o redireciona para `/pt` com 308.
 */
export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pt'

export function isLocale(valor: string): valor is Locale {
  return (locales as readonly string[]).includes(valor)
}

/** `<html lang>` e hreflang. */
export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }

/** Open Graph. */
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/** O seletor de idioma: o rótulo curto aparece; o nome vai para leitor de tela. */
export const rotuloLocale: Record<Locale, { curto: string; nome: string }> = {
  pt: { curto: 'PT', nome: 'Português' },
  en: { curto: 'EN', nome: 'English' },
}
