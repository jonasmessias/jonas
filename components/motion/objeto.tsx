'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'

export type Forma = 'icosaedro' | 'dodecaedro' | 'octaedro'

type Props = { forma?: Forma; className?: string }

/** DPR máximo do canvas; acima disso só custa bateria. */
const DPR_MAX = 1.5
/** Quanto o ponteiro inclina o objeto e com que suavidade ele acompanha. */
const INCLINACAO = 0.55
const SEGUIR = 0.06

/**
 * O objeto: um sólido em linhas finas, na cor do acento. Gira devagar e se
 * inclina na direção do ponteiro. Três formas, uma por ponto da página:
 * o icosaedro ao lado do nome, o dodecaedro no canto vazio da escada do
 * caminho, o octaedro sob o título do contato — a mesma linguagem,
 * geometrias diferentes.
 *
 * O que todo mundo recebe é o SVG estático (as mesmas arestas, projetadas
 * aqui em build). O three.js só entra por import dinâmico, dentro do
 * efeito, depois do load e com a caixa na tela — e só com WebGL, sem
 * reduced motion e em tela ≥ md. A caixa tem tamanho fixo (a classe de
 * quem a usa), então nada pula quando o canvas chega ou não chega.
 */
export function Objeto({ forma = 'icosaedro', className }: Props) {
  const caixaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const caixa = caixaRef.current
    if (!caixa) return
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)')
    const larga = window.matchMedia('(min-width: 48rem)')
    if (reduzir.matches || !larga.matches || !temWebGL()) return

    let cancelado = false
    let desmontar: (() => void) | null = null

    const io = new IntersectionObserver(async ([entrada]) => {
      if (!entrada?.isIntersecting) return
      io.disconnect()
      await paginaPronta()
      const THREE = await import('three')
      if (cancelado) return
      desmontar = montar(THREE, caixa, FORMAS[forma], reduzir)
    })
    io.observe(caixa)

    return () => {
      cancelado = true
      io.disconnect()
      desmontar?.()
    }
  }, [forma])

  return (
    <div ref={caixaRef} aria-hidden="true" className={clsx('objeto', className)}>
      <svg viewBox="0 0 128 128" fill="none">
        {ARESTAS_SVG[forma].map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
    </div>
  )
}

function temWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

function paginaPronta() {
  return new Promise<void>((resolver) => {
    if (document.readyState === 'complete') resolver()
    else window.addEventListener('load', () => resolver(), { once: true })
  })
}

function corDoAcento() {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#ff8a1e'
}

function montar(THREE: typeof import('three'), caixa: HTMLDivElement, forma: Especificacao, reduzir: MediaQueryList) {
  const largura = caixa.clientWidth || 128
  const altura = caixa.clientHeight || 128

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_MAX))
  renderer.setSize(largura, altura, false)
  renderer.setClearColor(0x000000, 0)

  const cena = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, largura / altura, 0.1, 10)
  camera.position.z = 4.4

  const geometria = new THREE.EdgesGeometry(forma.geometria(THREE))
  const material = new THREE.LineBasicMaterial({ color: corDoAcento() })
  const objeto = new THREE.LineSegments(geometria, material)
  const [poseX, poseY] = forma.pose
  objeto.rotation.set(poseX, poseY, 0)
  cena.add(objeto)

  caixa.appendChild(renderer.domElement)
  caixa.setAttribute('data-3d', '')

  let quadro = 0
  let ultimo = 0
  let giro = poseY
  let alvoX = 0
  let alvoY = 0
  let incX = 0
  let incY = 0
  let naTela = true

  const passo = (agora: number) => {
    quadro = 0
    const dt = Math.min(64, agora - ultimo) / 16.7
    ultimo = agora
    giro += forma.giro * dt
    const k = 1 - Math.pow(1 - SEGUIR, dt)
    incX += (alvoX - incX) * k
    incY += (alvoY - incY) * k
    objeto.rotation.x = poseX + incX
    objeto.rotation.y = giro + incY
    renderer.render(cena, camera)
    if (naTela && !document.hidden && !reduzir.matches) quadro = requestAnimationFrame(passo)
  }

  const ligar = () => {
    if (quadro || !naTela || document.hidden || reduzir.matches) return
    ultimo = performance.now()
    quadro = requestAnimationFrame(passo)
  }

  const aoMover = (e: PointerEvent) => {
    alvoY = (e.clientX / window.innerWidth - 0.5) * INCLINACAO
    alvoX = (e.clientY / window.innerHeight - 0.5) * INCLINACAO
  }

  const io = new IntersectionObserver(([entrada]) => {
    naTela = Boolean(entrada?.isIntersecting)
    ligar()
  })
  io.observe(caixa)

  // O tema troca a cor do acento; o material acompanha.
  const mo = new MutationObserver(() => material.color.set(corDoAcento()))
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const aoVisibilidade = () => ligar()
  const aoPreferencia = () => {
    if (reduzir.matches) caixa.removeAttribute('data-3d')
    else {
      caixa.setAttribute('data-3d', '')
      ligar()
    }
  }

  window.addEventListener('pointermove', aoMover, { passive: true })
  document.addEventListener('visibilitychange', aoVisibilidade)
  reduzir.addEventListener('change', aoPreferencia)
  ligar()

  return () => {
    if (quadro) cancelAnimationFrame(quadro)
    io.disconnect()
    mo.disconnect()
    window.removeEventListener('pointermove', aoMover)
    document.removeEventListener('visibilitychange', aoVisibilidade)
    reduzir.removeEventListener('change', aoPreferencia)
    geometria.dispose()
    material.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
    caixa.removeAttribute('data-3d')
  }
}

/* ── As formas: vértices (para o SVG) e a geometria do three (para o canvas) ── */

type V3 = [number, number, number]

type Especificacao = {
  /** Os vértices do sólido, em qualquer escala; normalizados ao raio 1 (o mesmo das geometrias do three). */
  vertices: V3[]
  /** Pose inicial (rotation x, y) — a mesma no SVG e no canvas, para o crossfade não pular. */
  pose: [number, number]
  /** Giro contínuo em y (rad por quadro de 16,7ms). Negativo gira ao contrário. */
  giro: number
  geometria: (THREE: typeof import('three')) => import('three').BufferGeometry
}

const F = (1 + Math.sqrt(5)) / 2

/** As permutações cíclicas de (0, ±a, ±b): os 12 vértices do icosaedro e parte dos 20 do dodecaedro. */
function ciclicas(a: number, b: number): V3[] {
  const v: V3[] = []
  for (const sa of [-1, 1]) for (const sb of [-1, 1]) v.push([0, sa * a, sb * b], [sa * a, sb * b, 0], [sb * b, 0, sa * a])
  return v
}

const FORMAS: Record<Forma, Especificacao> = {
  icosaedro: {
    vertices: ciclicas(1, F),
    pose: [0.5, 0.6],
    giro: 0.004,
    geometria: (THREE) => new THREE.IcosahedronGeometry(1, 0),
  },
  dodecaedro: {
    vertices: [
      ...([-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as V3))) as V3[]),
      ...ciclicas(1 / F, F),
    ],
    pose: [0.35, 0.3],
    giro: -0.003,
    geometria: (THREE) => new THREE.DodecahedronGeometry(1, 0),
  },
  octaedro: {
    vertices: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    pose: [0.45, 0.8],
    giro: 0.005,
    geometria: (THREE) => new THREE.OctahedronGeometry(1, 0),
  },
}

/* ── O SVG estático: as arestas de cada sólido, projetadas em build ───── */

/** Uma aresta liga os pares à menor distância entre vértices (vale para os três sólidos regulares). */
function arestas(vertices: V3[]): [V3, V3][] {
  const raio = Math.hypot(...vertices[0])
  const vn = vertices.map(([x, y, z]) => [x / raio, y / raio, z / raio] as V3)
  const dist = (a: V3, b: V3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  let menor = Infinity
  for (let i = 0; i < vn.length; i++) for (let j = i + 1; j < vn.length; j++) menor = Math.min(menor, dist(vn[i], vn[j]))
  const lista: [V3, V3][] = []
  for (let i = 0; i < vn.length; i++)
    for (let j = i + 1; j < vn.length; j++) if (Math.abs(dist(vn[i], vn[j]) - menor) < 1e-6) lista.push([vn[i], vn[j]])
  return lista
}

/** A mesma pose inicial do objeto 3D (Euler XYZ do three: gira em y, depois em x), ortográfica, raio 52 em 128. */
function projetar([x, y, z]: V3, [rx, ry]: [number, number]) {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry)
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
  return { x: +(64 + x1 * 52).toFixed(2), y: +(64 - y2 * 52).toFixed(2) }
}

const ARESTAS_SVG = Object.fromEntries(
  (Object.keys(FORMAS) as Forma[]).map((f) => [
    f,
    arestas(FORMAS[f].vertices).map(([a, b]) => [projetar(a, FORMAS[f].pose), projetar(b, FORMAS[f].pose)] as const),
  ]),
) as Record<Forma, (readonly [{ x: number; y: number }, { x: number; y: number }])[]>
