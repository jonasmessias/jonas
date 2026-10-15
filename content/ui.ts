import type { Locale } from '@/lib/locale'

/**
 * Rótulos de INTERFACE — botão, navegação, título de seção. Nunca fato:
 * data, número, empresa, cargo ou tecnologia moram em content/dossie/, com
 * ponteiro `polo:`. O português define a forma; o inglês tem que ter a
 * mesma (o `satisfies` acusa chave faltando).
 *
 * Atenção ao vocabulário: o check_deriva da bancada varre o HTML inteiro,
 * inclusive aria-label e o payload do App Router, palavra inteira e sem
 * diferenciar maiúsculas. "Principal" casa com um termo proibido — por isso
 * o skip link diz "Pular para o conteúdo" e a navegação se chama "Navegação".
 */
const pt = {
  pularParaConteudo: 'Pular para o conteúdo',
}

export type Ui = typeof pt

const en = {
  pularParaConteudo: 'Skip to content',
} satisfies Ui

const ui: Record<Locale, Ui> = { pt, en }

export function getUi(locale: Locale): Ui {
  return ui[locale]
}
