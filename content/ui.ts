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
 *
 * Os nomes de mês moram aqui porque são apresentação de uma data (o fato é
 * o `AAAA-MM` do dossiê); `lib/periodo.ts` os consome.
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
  meses: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  capa: {
    verProjetos: 'Ver projetos',
    github: 'GitHub',
    /** O alt da foto: só o nome entra depois, vindo do dossiê. */
    fotoDe: 'Foto de',
  },
  sobre: {
    formacao: 'Formação',
    idiomas: 'Idiomas',
  },
  experiencia: {
    atual: 'atual',
    /** "desde abr 2026" quando a experiência não terminou. */
    desde: 'desde',
    /** "abr 2022 a mar 2023" — o separador do período, sem travessão. */
    a: 'a',
  },
  stack: {
    titulo: 'Stack',
    estudando: 'Estudando',
  },
  projetos: {
    codigoPrivado: 'Código privado',
    verCodigo: 'Ver código',
    maisNoGithub: 'Mais no GitHub',
  },
  contato: {
    email: 'E-mail',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Currículo',
    baixarCv: 'Baixar em PDF',
  },
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
  meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  capa: {
    verProjetos: 'See projects',
    github: 'GitHub',
    fotoDe: 'Photo of',
  },
  sobre: {
    formacao: 'Education',
    idiomas: 'Languages',
  },
  experiencia: {
    atual: 'present',
    desde: 'since',
    a: 'to',
  },
  stack: {
    titulo: 'Stack',
    estudando: 'Studying',
  },
  projetos: {
    codigoPrivado: 'Private code',
    verCodigo: 'View code',
    maisNoGithub: 'More on GitHub',
  },
  contato: {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Résumé',
    baixarCv: 'Download PDF',
  },
  rodape: {
    codigoDoSite: 'Source of this site',
    voltarAoTopo: 'Back to top',
  },
} satisfies Ui

const ui: Record<Locale, Ui> = { pt, en }

export function getUi(locale: Locale): Ui {
  return ui[locale]
}
