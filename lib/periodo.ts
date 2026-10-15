/**
 * Do `AAAA-MM` do dossiê (o fato, validado pelo esquema) ao "mês AAAA" da
 * tela (apresentação). Os nomes de mês vêm de content/ui.ts, por idioma.
 * Nenhuma data nasce aqui — a função só reescreve a que recebeu.
 */
export function mesAno(meses: readonly string[], aaaaMm: string): string {
  const [ano, mes] = aaaaMm.split('-')
  return `${meses[Number(mes) - 1]} ${ano}`
}
