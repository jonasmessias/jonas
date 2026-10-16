'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import { Octaedro, POSE_OCTAEDRO } from './octaedro'

type Props = { className?: string }

/** DPR máximo do canvas; acima disso só custa bateria. */
const DPR_MAX = 1.5
/** Quanto o ponteiro inclina o objeto e com que suavidade ele acompanha. */
const INCLINACAO = 0.55
const SEGUIR = 0.06
/** Giro contínuo em y (rad por quadro de 16,7ms): lento, de peça em vitrine. */
const GIRO = 0.0035

/**
 * O objeto: o octaedro da casa em 3D, linhas finas na cor do acento. Gira
 * devagar e se inclina na direção do ponteiro. É o único canvas da página —
 * ocupa as quatro colunas da direita na capa (components/secoes/capa.tsx);
 * as outras aparições do octaedro são o SVG estático (./octaedro.tsx).
 *
 * O que todo mundo recebe é o SVG estático (as mesmas arestas, projetadas
 * em build). O three.js só entra por import dinâmico, dentro do efeito,
 * depois do load e com a caixa na tela — e só com WebGL, sem reduced
 * motion e em tela ≥ md. A caixa tem tamanho fixo (a classe de quem a
 * usa), então nada pula quando o canvas chega ou não chega. Se a caixa
 * muda de tamanho (a grade é fluida), o canvas acompanha.
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
      <Octaedro />
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
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_MAX))
  renderer.setClearColor(0x000000, 0)

  const cena = new THREE.Scene()
  // Câmera ortográfica: a mesma projeção do SVG, então o crossfade não pula
  // e o objeto não "engorda" quando a caixa cresce. Raio 1 em 128/52 ≈ 1,23.
  const meio = 64 / 52
  const camera = new THREE.OrthographicCamera(-meio, meio, meio, -meio, 0.1, 10)
  camera.position.z = 4

  const geometria = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1, 0))
  const material = new THREE.LineBasicMaterial({ color: corDoAcento() })
  const objeto = new THREE.LineSegments(geometria, material)
  const [poseX, poseY] = POSE_OCTAEDRO
  objeto.rotation.set(poseX, poseY, 0)
  cena.add(objeto)

  const medir = () => {
    const lado = Math.max(1, Math.round(caixa.clientWidth || 128))
    renderer.setSize(lado, lado, false)
  }
  medir()

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
    giro += GIRO * dt
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

  const ro = new ResizeObserver(() => {
    medir()
    renderer.render(cena, camera)
  })
  ro.observe(caixa)

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
    ro.disconnect()
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
