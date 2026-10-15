import { z } from 'zod'

/**
 * O esquema do dossiê — a forma que todo arquivo de content/ tem que ter
 * para o build passar. É a trava do inviolável nº 2 no código: um fato
 * publicado carrega o ponteiro `polo:` do registro que o sustenta, e campo
 * que falta derruba o `next build` com o arquivo e o caminho do campo.
 *
 * - `looseObject`: chaves que o esquema não nomeia passam — são as de
 *   auditoria (`_correcao`, `_verificado_em`…), que nunca se renderizam.
 * - Texto é `z.string()`, nunca `coerce`: o YAML transforma `2026-08-16`
 *   sem aspas em Date, e isso tem que falhar com a dica de pôr aspas.
 */

const texto = z.string({ error: 'texto ausente (ou data YAML sem aspas)' }).trim().min(1)
const url = z.url({ protocol: /^https$/, error: 'URL https esperada' })
const mes = z.string().regex(/^\d{4}-\d{2}$/, 'mês no formato AAAA-MM, entre aspas')
const dia = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'data no formato AAAA-MM-DD, entre aspas')

const Ponteiro = z.looseObject({ polo: texto })
export const Fato = Ponteiro.extend({ texto })
const Lista = Ponteiro.extend({ itens: z.array(texto).min(1) })

export const Perfil = z.looseObject({
  id: z.literal('perfil'),
  polo: texto,
  locale: texto,
  nome: Fato,
  titulo: Fato,
  posicionamento: Fato,
  local: Fato,
  disponibilidade: z.array(Fato).min(1),
  contato: z.looseObject({
    email: Fato,
    linkedin: Fato.extend({ url }),
    github: Fato.extend({ url }),
  }),
  site: Ponteiro.extend({ url }),
  repositorio_do_site: Ponteiro.extend({ url }).optional(),
  /** B-1: o botão do CV só existe quando este campo existir. */
  cv: Ponteiro.extend({ url }).optional(),
})

export const Sobre = z.looseObject({
  id: z.literal('sobre'),
  polo: texto,
  locale: texto,
  formacao: Ponteiro.extend({ curso: texto, instituicao: texto, conclusao: mes, conclusao_texto: texto }),
  certificacoes: z.array(Ponteiro.extend({ nome: texto, emissor: texto, data: mes })),
  idiomas: z.array(Ponteiro.extend({ idioma: texto, nivel: texto })).min(1),
})

export const Engenharia = z.looseObject({
  id: z.literal('engenharia'),
  polo: texto,
  locale: texto,
  grupos: z.array(z.looseObject({ id: texto, titulo: texto, polo: texto, itens: z.array(texto).min(1) })).min(1),
})

export const Experiencia = z.looseObject({
  id: texto,
  polo: texto,
  locale: texto,
  cargo: texto,
  organizacao: texto,
  setor: texto.optional(),
  vinculo: texto,
  local: texto,
  modalidade: texto.optional(),
  inicio: mes,
  fim: mes.nullable(),
  ordem: z.number().int().positive(),
  peso: z.enum(['dominante', 'medio', 'baixo']),
  prova: Ponteiro.extend({ urls: z.array(url).min(1), nota: texto.optional() }).optional(),
  case: texto.optional(),
  nota_de_bloco: Fato.optional(),
  bullets: z.array(Fato).min(1),
  stack: Lista,
})

export const Projeto = z.looseObject({
  id: texto,
  polo: texto,
  locale: texto,
  nome: texto,
  repo: url.nullable(),
  demo: url.nullable(),
  estado: z.enum(['publico', 'privado']),
  _verificado_em: dia,
  ordem: z.number().int().positive(),
  descricao: Fato,
  decisao: Fato,
  nota: Fato.optional(),
  stack: Lista,
})

export const CaseOsm = z.looseObject({
  id: z.literal('case-osm'),
  polo: texto,
  locale: texto,
  titulo: texto,
  // `estado` é chave de máquina; o arquivo en historicamente a escreve em inglês.
  codigo: Ponteiro.extend({
    estado: z
      .enum(['privado', 'publico', 'private', 'public'])
      .transform((e) => (e === 'private' || e === 'privado' ? 'privado' : 'publico')),
    texto,
  }),
  prova: z.array(Ponteiro.extend({ nome: texto, url, o_que_e: texto })).min(1),
  forma: Fato,
})

/** Não é fato sobre o Jonas: é fato sobre o site — por isso sem `polo:`. */
export const Bastidores = z.looseObject({
  id: z.literal('bastidores'),
  locale: texto,
  titulo: texto,
  resumo: texto,
  passos: z
    .array(z.looseObject({ rotulo: texto, detalhe: texto, prova: texto.nullable() }))
    .min(2),
  semanal: z.looseObject({ texto, prova: texto }),
})

export type Perfil = z.infer<typeof Perfil>
export type Sobre = z.infer<typeof Sobre> & { paragrafos: string[] }
export type Engenharia = z.infer<typeof Engenharia>
export type Experiencia = z.infer<typeof Experiencia>
export type Projeto = z.infer<typeof Projeto>
export type CaseOsm = z.infer<typeof CaseOsm>
export type Bastidores = z.infer<typeof Bastidores>
