import { getMarkdownFile } from '@/lib/markdown'
import type { Locale } from '@/lib/locale'
import fs from 'fs'
import path from 'path'
import type { z } from 'zod'
import * as E from './esquema'

/**
 * Os loaders do dossiê: cada seção do site pede o que precisa por aqui, e
 * só por aqui. Lê o arquivo do idioma pedido (sem cair no outro idioma),
 * valida pelo esquema e devolve tipado. Erro derruba o build com o arquivo
 * e o campo — nunca há fallback inventado.
 */

const RAIZ = path.join(process.cwd(), 'content')

function validar<T extends z.ZodType>(esquema: T, dados: unknown, arquivo: string): z.infer<T> {
  const r = esquema.safeParse(dados)
  if (!r.success) {
    const problemas = r.error.issues.map((i) => `  - ${i.path.join('.') || '(raiz)'}: ${i.message}`).join('\n')
    throw new Error(`content/${arquivo}: frontmatter inválido\n${problemas}`)
  }
  return r.data
}

function ler(pasta: string, slug: string, locale: Locale) {
  const arquivo = path.posix.join(pasta, `${slug}.${locale}.md`)
  const md = getMarkdownFile(pasta, slug, locale)
  if (!md || md.locale !== locale) throw new Error(`content/${arquivo}: arquivo ausente`)
  return { arquivo, md }
}

function lerPasta<T extends z.ZodType>(pasta: string, locale: Locale, esquema: T): z.infer<T>[] {
  const sufixo = `.${locale}.md`
  const slugs = fs
    .readdirSync(path.join(RAIZ, pasta))
    .filter((f) => f.endsWith(sufixo))
    .map((f) => f.slice(0, -sufixo.length))
  const itens = slugs.map((slug) => {
    const { arquivo, md } = ler(pasta, slug, locale)
    return validar(esquema, md.data, arquivo) as z.infer<T> & { ordem: number }
  })
  const vistas = new Set<number>()
  for (const item of itens) {
    if (vistas.has(item.ordem)) throw new Error(`content/${pasta}: "ordem" ${item.ordem} repetida`)
    vistas.add(item.ordem)
  }
  return itens.sort((a, b) => a.ordem - b.ordem)
}

/** O corpo em markdown, como parágrafos de texto puro: linha em branco
 *  separa parágrafos; quebra de linha dentro de um parágrafo vira espaço. */
function paragrafos(corpo: string): string[] {
  return corpo
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
}

export function getPerfil(locale: Locale): E.Perfil {
  const { arquivo, md } = ler('dossie', 'perfil', locale)
  return validar(E.Perfil, md.data, arquivo)
}

export function getSobre(locale: Locale): E.Sobre {
  const { arquivo, md } = ler('dossie', 'sobre', locale)
  const sobre = validar(E.Sobre, md.data, arquivo)
  const corpo = paragrafos(md.content)
  if (corpo.length === 0) throw new Error(`content/${arquivo}: corpo vazio`)
  return { ...sobre, paragrafos: corpo }
}

export function getEngenharia(locale: Locale): E.Engenharia {
  const { arquivo, md } = ler('dossie', 'engenharia', locale)
  return validar(E.Engenharia, md.data, arquivo)
}

export function getExperiencias(locale: Locale): E.Experiencia[] {
  return lerPasta('dossie/experiencias', locale, E.Experiencia)
}

export function getProjetos(locale: Locale): E.Projeto[] {
  return lerPasta('dossie/projetos', locale, E.Projeto)
}

export function getCaseOsm(locale: Locale): E.CaseOsm {
  const { arquivo, md } = ler('dossie', 'case-osm', locale)
  return validar(E.CaseOsm, md.data, arquivo)
}

export function getBastidores(locale: Locale): E.Bastidores {
  const { arquivo, md } = ler('', 'bastidores', locale)
  return validar(E.Bastidores, md.data, arquivo)
}

export type { Bastidores, CaseOsm, Engenharia, Experiencia, Perfil, Projeto, Sobre } from './esquema'
