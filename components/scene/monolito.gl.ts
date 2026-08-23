/**
 * O monólito estratificado — three.js imperativo, ZERO React.
 *
 * Retrato de um fato registrado: as camadas de Clean Architecture do
 * sistema em produção. O NÚMERO de lajes chega por opts.camadas, derivado
 * do conteúdo pela capa — este módulo não conhece o número, e fato nenhum
 * mora aqui: só desenho.
 *
 * A linguagem é desenho de corte de engenharia (seção arquitetônica,
 * stackup de PCB, vista explodida de manual técnico): nenhuma luz, nenhuma
 * sombra, nenhum material físico. As faces LATERAIS pintam o próprio
 * `ground` do documento (quase invisíveis contra a página, mas ocluem); as
 * faces HORIZONTAIS levam um patamar de VALOR chapado na direção de `ink`
 * — 8%, com o padrão técnico modulando dentro da faixa — porque é o
 * contraste plano-claro × lateral-escura que faz a massa ler como corte.
 * Completam o desenho o fresnel discreto em `rule` na silhueta e UMA
 * costura âmbar de ~1px por laje, na quina superior das faces laterais.
 * É desenho, não render.
 *
 * O contrato mais importante é getEdgeScreenY(): a cena DIZ ao documento
 * onde as arestas estão (px CSS a partir do topo do canvas, uma por laje,
 * índice 0 = laje de baixo). É por ele que o F3 posiciona os rótulos de
 * camada como DOM sobre o canvas e que, na resolução, o documento desenha
 * os fios exatamente onde as arestas pararam. O documento nunca adivinha.
 *
 * Performance é regra, não recomendação: NADA é alocado por frame — todo
 * Vector3/Color vive no closure, e getEdgeScreenY devolve SEMPRE o mesmo
 * array, mutado a cada chamada (quem precisar guardar, copia).
 *
 * As cores chegam prontas por opts.cores — lidas dos tokens pelo
 * componente. Nenhum hex mora aqui.
 */

import {
  BoxGeometry,
  Color,
  Group,
  Mesh,
  NoColorSpace,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three'

export type MonolitoOpts = {
  canvas: HTMLCanvasElement
  /** Quantas lajes — vem por prop, do conteúdo. O módulo não conhece o número. */
  camadas: number
  dprMax: number
  cores: {
    ground: string
    ink: string
    ink2: string
    rule: string
    accent: string
    hot: string
  }
}

export type Monolito = {
  /** 0..1 — o encadeamento inteiro do hero. Aplica o estado na hora:
   *  getEdgeScreenY logo depois já reflete o novo progresso. */
  setProgress(p: number): void
  /** Projeta a aresta frontal superior de cada laje para o espaço de tela
   *  e devolve o Y em px CSS a partir do topo do canvas — índice 0 = laje
   *  de baixo. Devolve o MESMO array em toda chamada, mutado (zero
   *  alocação); só é significativo para laje à frente da câmera. */
  getEdgeScreenY(): number[]
  /** Recalcula do getBoundingClientRect() do canvas, não do window. */
  resize(): void
  /** Um frame; quem chama o loop é o componente. */
  render(): void
  destroy(): void
}

/* ── Easing próprio, em função pura — o gsap não existe aqui dentro:
 *    este módulo não conhece o motor. ─────────────────────────────── */

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
/** easeInOutCubic — velocidade zero nas duas pontas, o que também garante
 *  transição C¹ entre as fases do encadeamento. */
const suave = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/* ── A composição. Proporção e coreografia são desenho (ajustáveis),
 *    não fato — o único dado de conteúdo é opts.camadas. ───────────── */

const LARG = 3.6 // largura da laje
const PROF = 2.2 // profundidade
const ESP = 0.22 // espessura — estrato com peso: o monólito é massa, não lasca

/* Fronteiras do mapeamento do progresso (0..1). */
const P1 = 0.12 // fim do REPOUSO
const P2 = 0.5 // fim da DELAMINAÇÃO
const P3 = 0.82 // fim da TRAVESSIA

/* Keyframes por parâmetro, nos quatro pontos [repouso, fim-delaminação,
 * fim-travessia, resolução]. Dentro de cada fase o trecho interpola com
 * `suave`; entre fases a continuidade é C¹ por construção.
 *
 *   REPOUSO      folga mínima, leve rotação em Y, câmera um pouco de
 *                baixo — o objeto lê quase como sólido único.
 *   DELAMINAÇÃO  folga mín→máx; o grupo gira em X para a axonometria
 *                explodida e a câmera sobe, olhando o corte de cima.
 *   TRAVESSIA    a câmera DESCE ENTRE as lajes (dist pequena, alvo
 *                abaixo) — as de cima e as de baixo passam em velocidades
 *                diferentes porque a paralaxe é de câmera, real.
 *   RESOLUÇÃO    rotX volta a ~0 e a câmera afasta com o fov estreitando:
 *                perspectiva comprimida, as lajes projetam como LINHAS
 *                quase horizontais e paralelas — o estado que faz
 *                getEdgeScreenY() virar posição de fio.               */
const K = {
  /* Na resolução, ESP + folga = 0.83 de propósito: é o passo de mundo que
   * projeta os fios com o espaçamento medido (193,8 px @969 de altura) —
   * mexer aqui mexe onde o documento desenha os fios. */
  folga: [0.033, 1.12, 1.12, 0.61],
  rotX: [0, 0.56, 0.56, 0],
  rotY: [-0.42, -0.74, -0.92, 0.03],
  camY: [-0.8, 2.2, -2.6, 0],
  dist: [4.5, 10, 2.8, 18],
  fov: [32, 32, 32, 14], // fov modesto — fov largo dá distorção de foto
  alvoY: [0.3, 0.4, -3.2, 0],
} as const

/* Respiro do repouso: rotação muito lenta em Y, por relógio interno.
 * Some com easing até p=0.30 para não brigar com a delaminação. */
const RESPIRO_VEL = 0.45 // rad/s — período ~14 s
const RESPIRO_AMP = 0.045 // rad
const pesoRespiro = (p: number) => 1 - suave(clamp01((p - P1) / (0.3 - P1)))

/* ── Shading de desenho, não de objeto: um ShaderMaterial por laje (mesmo
 *    código-fonte → um único programa no cache do renderer), zero luz,
 *    zero pós-processamento. ─────────────────────────────────────────── */

const VERT = /* glsl */ `
  varying vec3 vPos;  // posição local — o padrão vive no espaço da laje
  varying vec3 vNl;   // normal local — decide topo × lateral × fundo
  varying vec3 vNw;   // normal de mundo — fresnel
  varying vec3 vPw;   // posição de mundo — fresnel

  void main() {
    vPos = position;
    vNl = normal;
    vNw = normalize(mat3(modelMatrix) * normal);
    vec4 pw = modelMatrix * vec4(position, 1.0);
    vPw = pw.xyz;
    gl_Position = projectionMatrix * viewMatrix * pw;
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uGround;
  uniform vec3 uInk;
  uniform vec3 uInk2;
  uniform vec3 uRule;
  uniform vec3 uAccent;
  uniform vec3 uHot;
  uniform float uLaje;    // índice da laje — escolhe o padrão da face de cima
  uniform float uMeiaEsp; // metade da espessura — onde mora a quina

  varying vec3 vPos;
  varying vec3 vNl;
  varying vec3 vNw;
  varying vec3 vPw;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  /* Linha de grade de ~1px de tela, antialiasada por fwidth. */
  float grade(vec2 q) {
    vec2 w = fwidth(q) + 1e-5;
    vec2 d = abs(fract(q - 0.5) - 0.5) / w;
    return 1.0 - min(min(d.x, d.y), 1.0);
  }

  /* O padrão técnico procedural da face de cima, um por índice de laje.
   * Cheap de propósito: fract() em escalas diferentes e um hash simples —
   * nada de loop, nada de oitava empilhada. O ramo é em uniform, então o
   * controle de fluxo é uniforme e as derivadas (fwidth) são definidas. */
  float padrao(vec2 q, float v) {
    if (v < 0.5) {
      /* 0 — grade de células */
      return grade(q * 1.3);
    } else if (v < 1.5) {
      /* 1 — malha de trilhas: filas deslocadas por hash, com cortes */
      float fila = floor(q.y * 2.6);
      float desloca = hash21(vec2(fila, 7.0)) * 1.7;
      float qy = q.y * 2.6;
      float wy = fwidth(qy) + 1e-5;
      float trilha = 1.0 - min(abs(fract(qy - 0.5) - 0.5) / wy, 1.0);
      float corte = step(0.25, hash21(vec2(floor((q.x + desloca) * 1.4), fila)));
      return trilha * corte;
    } else if (v < 2.5) {
      /* 2 — grade fina */
      return grade(q * 4.2) * 0.75;
    } else if (v < 3.5) {
      /* 3 — blocos grossos */
      return step(0.62, hash21(floor(q * 1.1) + 3.0)) * 0.5;
    }
    /* 4 — pontos esparsos */
    vec2 cel = floor(q * 2.4);
    vec2 f = fract(q * 2.4) - 0.5;
    float r = length(f);
    float w = fwidth(r) + 1e-5;
    float ponto = 1.0 - smoothstep(0.1 - w, 0.1 + w, r);
    return ponto * step(0.55, hash21(cel + 11.0));
  }

  void main() {
    vec3 nl = normalize(vNl);
    vec3 V = normalize(cameraPosition - vPw);
    float fres = pow(1.0 - abs(dot(V, normalize(vNw))), 3.0);

    /* Horizontal cobre topo E fundo — o corte mostra os dois planos
     * (em repouso a câmera está embaixo e o que se vê é o fundo). */
    float horizontal = step(0.5, abs(nl.y));
    float lado = 1.0 - horizontal;

    /* A lateral fica em ground: quase invisível contra a página, mas
     * oclui. É o escuro do par claro×escuro que faz o corte ler. */
    vec3 cor = uGround;

    /* Plano horizontal: patamar de VALOR chapado por face — 8% na direção
     * de ink — com o padrão técnico modulando DENTRO da faixa (8%→12,5%),
     * nunca partindo do zero. É o que faz o objeto ler como massa, sem
     * gradiente, sem brilho, sem material: valor de lápis. */
    float v = mod(uLaje, 5.0);
    vec3 tinta = mix(uInk, uInk2, step(0.5, mod(v, 2.0)));
    cor = mix(cor, uInk, 0.08 * horizontal);
    cor = mix(cor, tinta, padrao(vPos.xz, v) * 0.045 * horizontal);

    /* Fresnel discreto na silhueta, em rule. Nada mais. */
    cor = mix(cor, uRule, fres * 0.85);

    /* A costura âmbar: ~1px na quina superior das faces laterais — o
     * único calor da composição, o que faz o objeto ler como corte.
     * Esquenta até hot no ângulo rasante. O teto em 35% da meia-espessura
     * é o que garante UMA costura por laje: no ângulo rasante o fwidth
     * cobre a face inteira e, sem o teto, a lateral toda acenderia —
     * era isso que dobrava a contagem de linhas. */
    float wq = min(fwidth(vPos.y) * 1.6, uMeiaEsp * 0.35) + 1e-5;
    float quina = step(uMeiaEsp - wq, vPos.y) * lado;
    cor = mix(cor, mix(uAccent, uHot, fres * 0.5), quina);

    gl_FragColor = vec4(cor, 1.0);
  }
`

export function criarMonolito(opts: MonolitoOpts): Monolito {
  const { canvas, camadas, dprMax, cores } = opts

  /* alpha: true — o ground do documento aparece atrás; clear transparente,
   * nunca clearColor opaco. */
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(K.fov[0], 1, 0.1, 60)
  const grupo = new Group()
  scene.add(grupo)

  /* NoColorSpace: o hex do token chega ao shader exatamente como está no
   * CSS — sem conversão para linear, porque isto é desenho gráfico e a
   * cor da página e a do canvas têm que ser a MESMA cor. */
  const parseCor = (s: string) => new Color().setStyle(s, NoColorSpace)

  /* Uniforms de cor compartilhados por referência entre os materiais;
   * só uLaje é próprio de cada um. Mesmo código-fonte de shader → o
   * renderer compila UM programa para as N lajes. */
  const uComuns = {
    uGround: { value: parseCor(cores.ground) },
    uInk: { value: parseCor(cores.ink) },
    uInk2: { value: parseCor(cores.ink2) },
    uRule: { value: parseCor(cores.rule) },
    uAccent: { value: parseCor(cores.accent) },
    uHot: { value: parseCor(cores.hot) },
    uMeiaEsp: { value: ESP / 2 },
  }

  const geometria = new BoxGeometry(LARG, ESP, PROF)
  const materiais: ShaderMaterial[] = []
  const lajes: Mesh[] = []

  for (let i = 0; i < camadas; i++) {
    const material = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { ...uComuns, uLaje: { value: i } },
    })
    const laje = new Mesh(geometria, material)
    grupo.add(laje)
    materiais.push(material)
    lajes.push(laje)
  }

  /* ── Pré-alocado no closure: nada de new em render/getEdgeScreenY. ── */
  const vProj = new Vector3()
  const arestasY: number[] = new Array<number>(camadas).fill(0)
  const estado = { folga: 0, rotX: 0, rotY: 0, camY: 0, dist: 0, fov: 0, alvoY: 0 }

  let progresso = 0
  let tempo = 0 // relógio do respiro — só avança quando render() roda
  let ultimoT = -1
  let altCss = 1

  function calcularEstado(p: number) {
    let i = 0
    let t = 0
    if (p <= P1) {
      i = 0
      t = 0
    } else if (p <= P2) {
      i = 0
      t = suave((p - P1) / (P2 - P1))
    } else if (p <= P3) {
      i = 1
      t = suave((p - P2) / (P3 - P2))
    } else {
      i = 2
      t = suave((p - P3) / (1 - P3))
    }
    estado.folga = mix(K.folga[i], K.folga[i + 1], t)
    estado.rotX = mix(K.rotX[i], K.rotX[i + 1], t)
    estado.rotY = mix(K.rotY[i], K.rotY[i + 1], t)
    estado.camY = mix(K.camY[i], K.camY[i + 1], t)
    estado.dist = mix(K.dist[i], K.dist[i + 1], t)
    estado.fov = mix(K.fov[i], K.fov[i + 1], t)
    estado.alvoY = mix(K.alvoY[i], K.alvoY[i + 1], t)
  }

  function aplicar() {
    calcularEstado(progresso)
    const passo = ESP + estado.folga
    const centro = (camadas - 1) / 2
    for (let i = 0; i < camadas; i++) {
      lajes[i].position.y = (i - centro) * passo
    }
    grupo.rotation.x = estado.rotX
    grupo.rotation.y =
      estado.rotY + Math.sin(tempo * RESPIRO_VEL) * RESPIRO_AMP * pesoRespiro(progresso)
    camera.position.set(0, estado.camY, estado.dist)
    camera.lookAt(0, estado.alvoY, 0)
    if (camera.fov !== estado.fov) {
      camera.fov = estado.fov
      camera.updateProjectionMatrix()
    }
  }

  function setProgress(p: number) {
    progresso = clamp01(p)
    aplicar() // na hora — getEdgeScreenY logo depois já é consistente
  }

  function getEdgeScreenY(): number[] {
    /* Independe da ordem de chamada: recalcula as matrizes de mundo aqui
     * (barato — meia dúzia de nós) em vez de confiar que um render passou. */
    scene.updateMatrixWorld()
    camera.updateMatrixWorld()
    for (let i = 0; i < camadas; i++) {
      /* O meio da aresta frontal superior da laje, no espaço local. */
      vProj
        .set(0, ESP / 2, PROF / 2)
        .applyMatrix4(lajes[i].matrixWorld)
        .project(camera)
      arestasY[i] = (1 - vProj.y) * 0.5 * altCss
    }
    return arestasY
  }

  function resize() {
    const r = canvas.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return
    altCss = r.height
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprMax))
    renderer.setSize(r.width, r.height, false) // o CSS do canvas é do componente
    camera.aspect = r.width / r.height
    camera.updateProjectionMatrix()
  }

  function render() {
    const agora = performance.now() / 1000
    /* Delta com teto: se o loop ficou parado (fora da viewport, blur), o
     * respiro não salta ao voltar. */
    if (ultimoT >= 0) tempo += Math.min(agora - ultimoT, 0.05)
    ultimoT = agora
    aplicar()
    renderer.render(scene, camera)
  }

  function destroy() {
    geometria.dispose()
    for (const m of materiais) m.dispose()
    renderer.dispose()
    renderer.forceContextLoss() // solta o contexto de verdade
  }

  resize()
  aplicar()

  return { setProgress, getEdgeScreenY, resize, render, destroy }
}
