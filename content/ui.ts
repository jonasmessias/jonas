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
  nav: {
    rotulo: 'Navegação',
    sobre: 'Sobre',
    experiencia: 'Experiência',
    stack: 'Stack',
    projetos: 'Projetos',
    contato: 'Contato',
  },
  idioma: 'Idioma',
  tema: 'Alternar entre tema claro e escuro',
  menu: {
    rotulo: 'Menu',
    abrir: 'Abrir menu',
    fechar: 'Fechar menu',
  },
  abreEmNovaAba: 'abre em nova aba',
  rodape: {
    codigoDoSite: 'Código deste site',
    voltarAoTopo: 'Voltar ao topo',
  },
}

export type Ui = typeof pt

const en = {
  pularParaConteudo: 'Skip to content',
  nav: {
    rotulo: 'Navigation',
    sobre: 'About',
    experiencia: 'Experience',
    stack: 'Stack',
    projetos: 'Projects',
    contato: 'Contact',
  },
  idioma: 'Language',
  tema: 'Switch between light and dark theme',
  menu: {
    rotulo: 'Menu',
    abrir: 'Open menu',
    fechar: 'Close menu',
  },
  abreEmNovaAba: 'opens in a new tab',
  rodape: {
    codigoDoSite: 'Source of this site',
    voltarAoTopo: 'Back to top',
  },
} satisfies Ui

const ui: Record<Locale, Ui> = { pt, en }

export function getUi(locale: Locale): Ui {
  return ui[locale]
}
