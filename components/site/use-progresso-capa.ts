'use client'

import type { MonolitoHandle } from '@/components/scene/monolito'
import { createContext, useContext, type RefObject } from 'react'

/**
 * O canal por onde a F3b (rótulos de camada, manifesto, handoff dos fios)
 * lê o progresso do palco da capa. UM ScrollTrigger existe (no CapaPalco)
 * e ele é a única verdade — nada de triggers paralelos com ranges
 * próprios: quem precisa do progresso se pendura AQUI.
 *
 * - `progresso`: o p corrente (0–1 do range da seção), lido sem re-render.
 * - `monolito`: o handle da cena (setProgress / getEdgeScreenY) — é por
 *   ele que os fios da F3b encontram as arestas na tela.
 * - `aoScrub`: registra um ouvinte chamado a cada update do scrub (e uma
 *   vez na inscrição, com o p corrente); devolve o cancelamento.
 */
export type ProgressoCapa = {
  progresso: RefObject<number>
  monolito: RefObject<MonolitoHandle | null>
  aoScrub: (ouvinte: (p: number) => void) => () => void
}

export const ProgressoCapaContext = createContext<ProgressoCapa | null>(null)

export function useProgressoCapa(): ProgressoCapa | null {
  return useContext(ProgressoCapaContext)
}
