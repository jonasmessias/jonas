/**
 * O frame estático do monólito — a MESMA arte, parada. Não é um vazio
 * educado: quem tem prefers-reduced-motion ligado (ou chega antes de o
 * módulo WebGL descer, ou está sem JavaScript) vê a composição inteira,
 * só não vê ela se mover.
 *
 * SVG inline, sem canvas, sem JavaScript, sem asset externo. O mesmo
 * vocabulário da cena: laterais em `ground` (quase invisíveis contra a
 * página, mas ocluem — desenha-se de baixo para cima), plano horizontal
 * com o patamar de valor na direção de `ink`, arestas superiores em
 * `accent`, silhueta em `rule`. Cores por var(--color-*) no próprio SVG,
 * nunca hex — a fonte de token é uma só.
 *
 * aria-hidden porque a informação não está no desenho: os rótulos de
 * camada são DOM (F3).
 */

/* Axonometria fixa — projeção dimétrica achatada, a de stackup de PCB.
 * Constantes de desenho, não fato: o único dado de conteúdo é `camadas`.
 * As proporções espelham a cena (ESP/LARG = 0.22/3.6): a mesma arte tem
 * que ter a mesma massa nas duas formas. */
const KX = 0.866 // cos 30°
const KY = 0.275 // achatamento do plano de topo
const LARG = 340
const PROF = 220
const ESP = 21 // estrato com peso, como no WebGL — massa, não lasca
const FOLGA = 3 // costura fina — o repouso lê quase como sólido único
const MARGEM = 10

/* O mesmo patamar de valor da cena: plano horizontal ~10% na direção de
 * ink sobre ground (o shader faz 8%→12,5% com o padrão dentro da faixa;
 * aqui, parado, vale o meio da faixa). Derivado só de token — se o
 * navegador não souber color-mix, o atributo fill segura em ground. */
const VALOR_TOPO = 'color-mix(in srgb, var(--color-ink) 10%, var(--color-ground))'

type Ponto = readonly [number, number]

const pr = (x: number, y: number, z: number): Ponto => [
  (x - z) * KX,
  (x + z) * KY - y,
]

const f = (n: number) => n.toFixed(1)
const pts = (lista: Ponto[]) => lista.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')

export function FrameEstatico({
  camadas,
  className,
}: {
  camadas: number
  className?: string
}) {
  const alturaPilha = camadas * ESP + (camadas - 1) * FOLGA
  const minX = -PROF * KX - MARGEM
  const largura = (LARG + PROF) * KX + 2 * MARGEM
  const minY = -alturaPilha - MARGEM
  const altura = alturaPilha + (LARG + PROF) * KY + 2 * MARGEM

  /* Laje 0 é a de baixo — mesma convenção da cena. Desenhada primeiro,
   * cada laje seguinte oclui a anterior, como no WebGL. */
  const lajes = Array.from({ length: camadas }, (_, i) => {
    const y0 = i * (ESP + FOLGA)
    const y1 = y0 + ESP
    return {
      /* O contorno do sólido: hexágono topo-lados-fundo. */
      silhueta: pts([
        pr(0, y1, 0),
        pr(LARG, y1, 0),
        pr(LARG, y0, 0),
        pr(LARG, y0, PROF),
        pr(0, y0, PROF),
        pr(0, y1, PROF),
      ]),
      /* O plano horizontal — o que leva o patamar de valor. */
      topo: pts([
        pr(0, y1, 0),
        pr(LARG, y1, 0),
        pr(LARG, y1, PROF),
        pr(0, y1, PROF),
      ]),
      /* A quina vertical próxima — leitura de caixa, em rule. */
      quina: pts([pr(LARG, y1, PROF), pr(LARG, y0, PROF)]),
      /* A costura âmbar: as duas arestas superiores voltadas ao leitor. */
      aresta: pts([pr(LARG, y1, 0), pr(LARG, y1, PROF), pr(0, y1, PROF)]),
    }
  })

  return (
    <svg
      className={className}
      viewBox={`${f(minX)} ${f(minY)} ${f(largura)} ${f(altura)}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {lajes.map((laje, i) => (
        <g key={i}>
          <polygon
            points={laje.silhueta}
            fill="var(--color-ground)"
            stroke="var(--color-rule)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points={laje.topo}
            fill="var(--color-ground)"
            style={{ fill: VALOR_TOPO }}
          />
          <polyline
            points={laje.quina}
            fill="none"
            stroke="var(--color-rule)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={laje.aresta}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  )
}
