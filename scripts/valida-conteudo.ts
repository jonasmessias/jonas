/**
 * Valida o conteúdo inteiro antes do build (npm run valida, e prebuild):
 * cada arquivo pelo esquema, nos dois idiomas, mais as regras que cruzam
 * arquivos. Sai com 1 e a lista de problemas; com 0 e um resumo.
 */
import * as D from '@/lib/dossie'
import { locales, type Locale } from '@/lib/locale'

const problemas: string[] = []

function tentar<T>(rotulo: string, fn: () => T): T | undefined {
  try {
    return fn()
  } catch (e) {
    problemas.push(`${rotulo}: ${(e as Error).message}`)
    return undefined
  }
}

const porLocale = Object.fromEntries(
  locales.map((l: Locale) => [
    l,
    {
      perfil: tentar(`perfil.${l}`, () => D.getPerfil(l)),
      sobre: tentar(`sobre.${l}`, () => D.getSobre(l)),
      engenharia: tentar(`engenharia.${l}`, () => D.getEngenharia(l)),
      experiencias: tentar(`experiencias.${l}`, () => D.getExperiencias(l)),
      projetos: tentar(`projetos.${l}`, () => D.getProjetos(l)),
      caseOsm: tentar(`case-osm.${l}`, () => D.getCaseOsm(l)),
      bastidores: tentar(`bastidores.${l}`, () => D.getBastidores(l)),
    },
  ]),
) as unknown as Record<Locale, Record<string, unknown>>

// Os dois idiomas descrevem a mesma coisa: mesmos ids, na mesma ordem.
for (const chave of ['experiencias', 'projetos'] as const) {
  const ids = locales.map((l) =>
    ((porLocale[l][chave] as { id: string }[] | undefined) ?? []).map((x) => x.id).join(','),
  )
  if (new Set(ids).size > 1) problemas.push(`${chave}: pt e en divergem (${ids.join(' × ')})`)
}
const grupos = locales.map((l) =>
  ((porLocale[l].engenharia as D.Engenharia | undefined)?.grupos ?? []).map((g) => g.id).join(','),
)
if (new Set(grupos).size > 1) problemas.push('engenharia: ids de grupo divergem entre pt e en')

for (const l of locales) {
  for (const x of (porLocale[l].experiencias as D.Experiencia[] | undefined) ?? []) {
    if (x.fim && x.fim < x.inicio) problemas.push(`experiencias/${x.id}.${l}: fim antes do início`)
  }
  for (const p of (porLocale[l].projetos as D.Projeto[] | undefined) ?? []) {
    if (p.estado === 'publico' && !p.repo) problemas.push(`projetos/${p.id}.${l}: público sem repo`)
    if (p.estado === 'privado' && p.repo) problemas.push(`projetos/${p.id}.${l}: privado com repo`)
    if (!p.repo && !p.demo) problemas.push(`projetos/${p.id}.${l}: sem repo e sem demo — nada para abrir`)
  }
}

if (problemas.length) {
  console.error(`valida-conteudo: ${problemas.length} problema(s)\n\n${problemas.join('\n\n')}`)
  process.exit(1)
}
const resumo = locales
  .map((l) => {
    const c = porLocale[l]
    return `${l}: ${(c.experiencias as unknown[]).length} experiências, ${(c.projetos as unknown[]).length} projetos`
  })
  .join(' · ')
console.log(`valida-conteudo: ok (${resumo})`)
