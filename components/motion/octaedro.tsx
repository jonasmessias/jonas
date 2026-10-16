import type { SVGProps } from 'react'

/**
 * O octaedro: a forma da casa. Um único sólido, em linhas finas, em três
 * papéis — grande e em 3D na capa (components/motion/objeto.tsx), pequeno e
 * estático como marca de cada seção (components/ui/secao.tsx) e como a
 * última estação do caminho (components/secoes/caminho.tsx). Este módulo
 * não tem 'use client': é a projeção das arestas em build, o desenho que
 * todo mundo recebe — o three.js só entra por cima dele, na capa.
 */

type V3 = [number, number, number]

/** Pose (rotation x, y, Euler XYZ do three) — a mesma no SVG e no canvas, para o crossfade não pular. */
export const POSE_OCTAEDRO: [number, number] = [0.45, 0.8]

const VERTICES: V3[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

/** Uma aresta liga cada par de vértices que não são opostos: as 12 do octaedro. */
function arestas(): [V3, V3][] {
  const lista: [V3, V3][] = []
  for (let i = 0; i < VERTICES.length; i++)
    for (let j = i + 1; j < VERTICES.length; j++) {
      const [a, b] = [VERTICES[i], VERTICES[j]]
      if (a[0] + b[0] || a[1] + b[1] || a[2] + b[2]) lista.push([a, b])
    }
  return lista
}

/** Ortográfica, raio 52 em 128: gira em y, depois em x, como o three. */
function projetar([x, y, z]: V3, [rx, ry]: [number, number]) {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry)
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
  return { x: +(64 + x1 * 52).toFixed(2), y: +(64 - y2 * 52).toFixed(2) }
}

const ARESTAS_SVG = arestas().map(([a, b]) => [projetar(a, POSE_OCTAEDRO), projetar(b, POSE_OCTAEDRO)] as const)

/**
 * O octaedro estático: 12 arestas em currentColor, caixa 128×128. O traço
 * não escala (fica 1px em qualquer tamanho, dos 14px da marca aos 300px da
 * capa) — o mesmo fio de 1px do resto do site.
 */
export function Octaedro(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" fill="none" aria-hidden="true" {...props}>
      {ARESTAS_SVG.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}
