#!/usr/bin/env node
/**
 * verifica-links — a parte determinística da verificação semanal (sem IA).
 *
 *   node scripts/verifica-links.mjs [--saida .github/verificacao/links.md]
 *
 * Junta toda URL que o conteúdo publica (repo, demo, prova, contato, site) e:
 *   - faz GET em cada uma (segue redirect). LinkedIn responde 999 a qualquer robô: vira
 *     "não verificável", não falha.
 *   - para cada github.com/<dono>/<repo>, confere pela API (gh) que continua público e não arquivado.
 * Escreve uma tabela em markdown e sai com 0 sempre; o número de falhas vai para GITHUB_OUTPUT
 * (`falhas=N`) para o workflow decidir. Nunca edita conteúdo.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const args = process.argv.slice(2)
const iSaida = args.indexOf('--saida')
const SAIDA = iSaida >= 0 ? args[iSaida + 1] : null

const urls = new Map() // url → arquivos que a citam
function anotar(url, arquivo) {
  if (typeof url !== 'string' || !/^https?:\/\//.test(url)) return
  if (!urls.has(url)) urls.set(url, new Set())
  urls.get(url).add(arquivo)
}
function varrer(valor, arquivo, chave = '') {
  if (Array.isArray(valor)) return valor.forEach((v) => varrer(v, arquivo, chave))
  if (valor && typeof valor === 'object')
    return Object.entries(valor).forEach(([k, v]) => !k.startsWith('_') && varrer(v, arquivo, k))
  if (['repo', 'demo', 'url', 'urls'].includes(chave)) anotar(valor, arquivo)
}

;(function andar(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) andar(p)
    else if (e.name.endsWith('.md')) varrer(matter(fs.readFileSync(p, 'utf8')).data, path.relative('.', p))
  }
})('content')

const UA = 'Mozilla/5.0 (verificacao-semanal; +https://github.com/jonasmessias/jonas)'
const linhas = []
let falhas = 0
for (const [url, arquivos] of [...urls].sort()) {
  let estado = ''
  let ok = true
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA } })
    if (r.status === 999) estado = '999 (não verificável: bloqueia robôs)'
    else {
      estado = String(r.status)
      ok = r.ok
    }
  } catch (e) {
    estado = `erro: ${e.message}`
    ok = false
  }
  const gh = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/)
  if (gh && ok) {
    try {
      const [privado, arquivado] = JSON.parse(
        execFileSync('gh', ['api', `repos/${gh[1]}/${gh[2]}`, '--jq', '[.private,.archived]'], { encoding: 'utf8' }),
      )
      if (privado || arquivado) {
        ok = false
        estado += privado ? ' · PRIVADO' : ' · ARQUIVADO'
      } else estado += ' · público'
    } catch (e) {
      estado += ` · visibilidade não verificada (${e.message.split('\n')[0]})`
    }
  }
  if (!ok) falhas++
  linhas.push(`| ${ok ? 'ok' : '**FALHA**'} | ${url} | ${estado} | ${[...arquivos].join('<br>')} |`)
}

const md = [
  `### Links e repositórios (${urls.size} URLs, ${falhas} falha(s))`,
  '',
  '| | URL | resposta | citada em |',
  '|---|---|---|---|',
  ...linhas,
  '',
].join('\n')

if (SAIDA) {
  fs.mkdirSync(path.dirname(SAIDA), { recursive: true })
  fs.writeFileSync(SAIDA, md)
}
console.log(md)
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `falhas=${falhas}\n`)
