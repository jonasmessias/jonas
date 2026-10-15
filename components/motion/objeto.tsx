'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'

type Props = { className?: string }

/** DPR máximo do canvas; acima disso só custa bateria. */
const DPR_MAX = 1.5
/** Giro contínuo (rad por quadro de 16,7ms) e quanto o ponteiro inclina o objeto. */
const GIRO = 0.004
const INCLINACAO = 0.55
const SEGUIR = 0.06

/**
 * O objeto: um icosaedro em linhas finas, na cor do acento, ao lado do
 * nome. Gira devagar e se inclina na direção do ponteiro.
 *
 * O que todo mundo recebe é o SVG estático (as mesmas arestas, projetadas
 * aqui em build). O three.js só entra por import dinâmico, dentro do
 * efeito, depois do load e com a caixa na tela — e só com WebGL, sem
 * reduced motion e em tela ≥ md. A caixa tem tamanho fixo (a classe de
 * quem a usa), então nada pula quando o canvas chega ou não chega.
 */
export function Objeto({ className }: Props) {
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
      desmontar = montar(THREE, caixa, reduzir)
    })
    io.observe(caixa)

    return () => {
      cancelado = true
      io.disconnect()
      desmontar?.()
    }
  }, [])

  return (
    <div ref={caixaRef} aria-hidden="true" className={clsx('objeto', className)}>
      <svg viewBox="0 0 128 128" fill="none">
        {ARESTAS_SVG.map(([a, b], i) => (
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

function montar(THREE: typeof import('three'), caixa: HTMLDivElement, reduzir: MediaQueryList) {
  const largura = caixa.clientWidth || 128
  const altura = caixa.clientHeight || 128

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_MAX))
  renderer.setSize(largura, altura, false)
  renderer.setClearColor(0x000000, 0)

  const cena = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, largura / altura, 0.1, 10)
  camera.position.z = 4.4

  const geometria = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 0))
  const material = new THREE.LineBasicMaterial({ color: corDoAcento() })
  const objeto = new THREE.LineSegments(geometria, material)
  objeto.rotation.set(0.5, 0.6, 0)
  cena.add(objeto)

  caixa.appendChild(renderer.domElement)
  caixa.setAttribute('data-3d', '')

  let quadro = 0
  let ultimo = 0
  let giro = 0.6
  let alvoX = 0
  let alvoY = 0
  let incX = 0
  let incY = 0
  let naTela = true

  const passo = (agora: number) => {
    quadro = 0
    const dt = Math.min(64, agora - ultimo) / 16.7
    ultimo = agora
    giro += GIRO * dt
    const k = 1 - Math.pow(1 - SEGUIR, dt)
    incX += (alvoX - incX) * k
    incY += (alvoY - incY) * k
    objeto.rotation.x = 0.5 + incX
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

/* ── O SVG estático: as 30 arestas do icosaedro, projetadas em build ───── */

type V3 = [number, number, number]

function arestasIcosaedro(): [V3, V3][] {
  const f = (1 + Math.sqrt(5)) / 2
  const v: V3[] = []
  for (const a of [-1, 1]) for (const b of [-f, f]) v.push([0, a, b], [a, b, 0], [b, 0, a])
  const n = Math.hypot(1, f)
  const vn = v.map(([x, y, z]) => [x / n, y / n, z / n] as V3)
  const arestas: [V3, V3][] = []
  for (let i = 0; i < vn.length; i++)
    for (let j = i + 1; j < vn.length; j++) {
      const d = Math.hypot(vn[i][0] - vn[j][0], vn[i][1] - vn[j][1], vn[i][2] - vn[j][2])
      if (Math.abs(d - 2 / n) < 1e-6) arestas.push([vn[i], vn[j]])
    }
  return arestas
}

function projetar([x, y, z]: V3) {
  // A mesma pose inicial do objeto 3D (rotation 0.5, 0.6), ortográfica, raio 52 em 128.
  const rx = 0.5
  const ry = 0.6
  const y1 = y * Math.cos(rx) - z * Math.sin(rx)
  const z1 = y * Math.sin(rx) + z * Math.cos(rx)
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry)
  return { x: +(64 + x2 * 52).toFixed(2), y: +(64 - y1 * 52).toFixed(2) }
}

const ARESTAS_SVG = arestasIcosaedro().map(([a, b]) => [projetar(a), projetar(b)] as const)
