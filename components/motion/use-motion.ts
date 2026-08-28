'use client'

import { useContext } from 'react'
import { MotionContext, type MotionState } from './motion-provider'

/**
 * Lê o contrato de movimento ({ reduced, coarse, ready, motor }) de
 * qualquer componente de cliente.
 *
 * Quem anima decide COM ele: o efeito de animação gateia em `motor`
 * (null até o download dinâmico aterrissar — e para sempre null com
 * prefers-reduced-motion, que nem baixa o motor). NUNCA importe 'gsap'
 * ou '@gsap/react' estaticamente num componente — isso traria o núcleo
 * de volta ao First Load e desfaria a correção de orçamento.
 *
 * E as duas regras da casa: estado inicial escondido só por gsap.set()
 * dentro do efeito, nunca por CSS; e acima da dobra o motor só
 * transforma no scroll — o HTML do servidor É o estado correto.
 */
export function useMotion(): MotionState {
  return useContext(MotionContext)
}
