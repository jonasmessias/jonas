/**
 * O tema, do lado do TypeScript. Seguro para cliente (nada de fs).
 *
 * `corDeFundo` é a cópia em TS do token `--color-ground` dos dois temas de
 * app/globals.css — serve ao `viewport.themeColor` e ao script de tema, que
 * precisam do valor antes de qualquer CSS resolver. Mudou lá, muda aqui.
 */

export type Tema = 'light' | 'dark'

export const CHAVE_TEMA = 'tema'

export const corDeFundo: Record<Tema, string> = {
  light: '#f4f1ea',
  dark: '#0e0d0c',
}

/**
 * Aplica o tema no documento: `data-theme` no <html>, e a cor da barra do
 * navegador nos dois `<meta name="theme-color">` que o viewport gera (um por
 * esquema). Os dois recebem a mesma cor, então qualquer que case reporta o
 * tema escolhido. Usada pelo alternador; o script de tema repete a mesma
 * lógica em texto, porque roda antes de qualquer módulo carregar.
 */
export function aplicarTema(tema: Tema) {
  document.documentElement.dataset.theme = tema
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = corDeFundo[tema]
  })
}

/**
 * O script síncrono que vai como primeiro filho do <body>: lê a escolha
 * gravada, cai no sistema, põe data-theme antes do primeiro paint (sem
 * flash), acrescenta html.js só quando não há reduced motion e ajusta o
 * theme-color. Tudo em try/catch — localStorage pode lançar em modo privado.
 */
export const scriptDeTema = `(function(){try{var d=document.documentElement,m=matchMedia,t=localStorage.${CHAVE_TEMA};if(t!=='light'&&t!=='dark')t=m('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t;if(!m('(prefers-reduced-motion: reduce)').matches)d.classList.add('js');var c=t==='light'?'${corDeFundo.light}':'${corDeFundo.dark}';document.querySelectorAll('meta[name="theme-color"]').forEach(function(e){e.content=c})}catch(e){}})()`
