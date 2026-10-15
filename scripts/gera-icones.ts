/**
 * Gera public/icones.svg — o sprite dos ícones de marca (simple-icons).
 *
 * Por que sprite e não <path> inline: com o caminho inline, cada ícone sai duas
 * vezes no HTML (no SVG e no payload do App Router), e os números do desenho
 * viram texto que os gates de termos leem. Em 15/10/2026 o caminho de um ícone
 * ("…-.691 1.811…") casou com um número proibido da lista de termos. No sprite,
 * o desenho mora num arquivo estático e a página só diz <use href="#chave">.
 *
 * Roda no prebuild; o arquivo gerado é commitado (o dev server também o serve).
 */
import fs from 'node:fs'
import { marcas } from '@/content/icones'

const simbolos = Object.entries(marcas)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([chave, marca]) => `  <symbol id="${chave}" viewBox="0 0 24 24"><path d="${marca.path}"/></symbol>`)

const svg = `<svg xmlns="http://www.w3.org/2000/svg">\n<!-- gerado por scripts/gera-icones.ts — não editar à mão -->\n${simbolos.join('\n')}\n</svg>\n`
fs.writeFileSync('public/icones.svg', svg)
console.log(`gera-icones: ${simbolos.length} símbolos em public/icones.svg (${(svg.length / 1024).toFixed(1)} kB)`)
