#!/usr/bin/env node
/**
 * checa-saida — o que dá para garantir sobre o export só com este repositório (roda no CI,
 * depois do build). As listas de termos proibidos NÃO estão aqui de propósito: elas pertencem
 * a um registro privado e são conferidas na bancada antes de cada PR (ver README).
 *
 *   node scripts/checa-saida.mjs        (lê out/ e scripts/orcamento.json)
 *
 * - os arquivos que a hospedagem estática precisa existem
 * - nenhum padrão de telefone no HTML (página pública é ímã de spam; o e-mail converte)
 * - o link do currículo (/cv.pdf e /cv-en.pdf) liberado em 23/10/2026: o currículo publicado passou a
 *   bater com o registro (check_deriva do cockpit limpo), que era a condição da trava
 * - sem middleware (incompatível com export)
 * - First Load de /pt/ e /en/: soma gzip dos <script> do HTML servido ≤ orçamento
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const OUT = path.resolve('out')
const orcamento = JSON.parse(fs.readFileSync('scripts/orcamento.json', 'utf8'))
const falhas = []

for (const f of ['index.html', '404.html', 'pt/index.html', 'en/index.html', 'sitemap.xml', 'robots.txt', 'avatar.jpg'])
  if (!fs.existsSync(path.join(OUT, f))) falhas.push(`out/${f} não existe`)
for (const f of ['middleware.ts', 'middleware.js', 'src/middleware.ts'])
  if (fs.existsSync(f)) falhas.push(`${f} existe — middleware não roda em export estático`)

const htmls = []
;(function andar(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) andar(p)
    else if (e.name.endsWith('.html')) htmls.push(p)
  }
})(OUT)

const TELEFONE = /(?:\+?55\s?)?\(?\b\d{2}\)?\s?9\d{4}[-\s]?\d{4}\b/
for (const arq of htmls) {
  const rel = path.relative(OUT, arq)
  const html = fs.readFileSync(arq, 'utf8')
  const texto = html.replace(/<[^>]+>/g, ' ')
  if (TELEFONE.test(texto)) falhas.push(`${rel}: padrão de telefone`)
}

const medidas = []
for (const loc of ['pt', 'en']) {
  const arq = path.join(OUT, loc, 'index.html')
  if (!fs.existsSync(arq)) continue
  const html = fs.readFileSync(arq, 'utf8')
  const srcs = [...html.matchAll(/<script\b([^>]*)>/g)]
    .map((m) => m[1])
    .filter((attrs) => !/\bnoModule\b/i.test(attrs))
    .map((attrs) => attrs.match(/\bsrc="([^"]+)"/)?.[1])
    .filter((s) => s && s.startsWith('/_next/'))
  const bytes = [...new Set(srcs)].reduce((soma, s) => {
    const f = path.join(OUT, decodeURIComponent(s.split('?')[0]))
    if (!fs.existsSync(f)) falhas.push(`${s}: citado no HTML e ausente de out/`)
    return soma + (fs.existsSync(f) ? zlib.gzipSync(fs.readFileSync(f)).length : 0)
  }, 0)
  const kb = bytes / 1024
  medidas.push(`/${loc}/ ${kb.toFixed(1)} kB`)
  if (kb > orcamento.firstLoadKb) falhas.push(`/${loc}/: First Load ${kb.toFixed(1)} kB > ${orcamento.firstLoadKb} kB`)
}

console.log(`checa-saida: ${htmls.length} HTML · First Load ${medidas.join(' · ')} (teto ${orcamento.firstLoadKb} kB)`)
for (const f of falhas) console.log(`  FALHA ${f}`)
if (falhas.length) process.exit(1)
console.log('  ok')
