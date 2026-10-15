/**
 * A forma do conteúdo do site. O português (content/pt.ts) e o inglês
 * (content/en.ts) seguem esta forma; se um tiver um campo que o outro não
 * tem, o TypeScript acusa.
 */

export type Link = { texto: string; url: string }

export type Experiencia = {
  cargo: string
  empresa: string
  /** 'AAAA-MM'. `fim: null` = atual. */
  inicio: string
  fim: string | null
  /** Uma linha: onde e como (ex.: "Remoto", "Caratinga, MG · presencial"). */
  onde: string
  /** Uma frase sobre o que você fez. */
  resumo: string
  stack: string[]
  links?: Link[]
}

export type Projeto = {
  nome: string
  /** Uma ou duas frases. */
  resumo: string
  stack: string[]
  /** Etiqueta pequena acima do nome (ex.: "Em produção", "Código privado"). */
  status?: string
  /** Repositório público. Sem repo, não aparece "Ver código". */
  repo?: string
  /** Site ou demo no ar. */
  links?: Link[]
  /** Os destaques aparecem em cards grandes, no topo. */
  destaque?: boolean
}

export type Conteudo = {
  nome: string
  cargo: string
  /** A frase de baixo do nome, no topo do site. */
  frase: string
  local: string

  sobre: string[]
  formacao: { curso: string; instituicao: string; quando: string }
  idiomas: { idioma: string; nivel: string }[]

  experiencias: Experiencia[]
  projetos: Projeto[]

  /** Cada grupo é uma linha da seção Stack. Só nomes. */
  stack: { grupo: string; itens: string[] }[]
  /** O que você está estudando agora. Lista vazia esconde a linha. */
  estudando: string[]

  /** "Como este site chega até você": passos curtos, em linguagem simples. */
  caminho: { titulo: string; passos: { nome: string; detalhe: string }[] }

  contato: { email: string; linkedin: Link; github: Link }
  /** O endereço do site no ar (sem barra no fim). */
  site: string
  /** O repositório deste site (link do rodapé). */
  repositorio: string
  /** Link do currículo em PDF. Sem ele, o botão não aparece. */
  cv?: string
}
