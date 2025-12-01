/**
 * GUIA DE USO - Sistema de Animações com Scroll
 *
 * Este arquivo demonstra como usar os novos componentes e hooks
 * de animação com scroll em seu projeto.
 */

import {
  ParallaxSection,
  ScrollFade,
  ScrollReveal,
  useScrollAnimation,
} from '@/components/animations'

// ============================================
// EXEMPLO 1: ScrollReveal - Revelar Elementos
// ============================================

export function ExampleScrollReveal() {
  return (
    <section className="py-24">
      {/* Fade In básico */}
      <ScrollReveal variant="fadeIn">
        <h2>Este texto aparece com fade in</h2>
      </ScrollReveal>

      {/* Fade In Up (de baixo para cima) */}
      <ScrollReveal variant="fadeInUp" duration={1.2} delay={0.2}>
        <p>Este parágrafo sobe suavemente</p>
      </ScrollReveal>

      {/* Fade In Left */}
      <ScrollReveal variant="fadeInLeft" duration={0.8}>
        <div>Vem da esquerda</div>
      </ScrollReveal>

      {/* Scale In */}
      <ScrollReveal variant="scaleIn" duration={1}>
        <img src="/image.jpg" alt="Scaled image" />
      </ScrollReveal>
    </section>
  )
}

// ============================================
// EXEMPLO 2: ScrollFade - Fade com Scrub
// ============================================

export function ExampleScrollFade() {
  return (
    <section className="min-h-screen">
      {/* Fade out conforme rola */}
      <ScrollFade fadeOutOnScroll>
        <h1>Este texto desaparece ao rolar</h1>
      </ScrollFade>

      {/* Fade in com scrub */}
      <ScrollFade>
        <p>Fade in suave vinculado ao scroll</p>
      </ScrollFade>
    </section>
  )
}

// ============================================
// EXEMPLO 3: ParallaxSection - Efeito Parallax
// ============================================

export function ExampleParallax() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background com parallax lento */}
      <ParallaxSection
        speed={0.3}
        direction="down"
        className="absolute inset-0 z-0"
      >
        <img
          src="/bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </ParallaxSection>

      {/* Conteúdo com parallax mais rápido */}
      <ParallaxSection speed={0.6} direction="up" className="relative z-10">
        <h1>Título com Parallax</h1>
      </ParallaxSection>
    </section>
  )
}

// ============================================
// EXEMPLO 4: useScrollAnimation Hook
// ============================================

export function ExampleUseHook() {
  // Usar o hook diretamente para mais controle
  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    variant: 'fadeInUp',
    duration: 1.5,
    delay: 0,
  })

  const imageRef = useScrollAnimation<HTMLDivElement>({
    variant: 'scaleIn',
    duration: 1.2,
  })

  return (
    <section>
      <h1 ref={titleRef}>Título animado com hook</h1>
      <div ref={imageRef}>
        <img src="/hero.jpg" alt="Hero" />
      </div>
    </section>
  )
}

// ============================================
// DICAS DE PERFORMANCE E USO
// ============================================

/**
 * 1. Use `once={true}` (padrão) quando não precisar re-animar
 * 2. Evite muitas animações simultâneas
 * 3. Use delays para criar efeito stagger
 * 4. Prefira `scrub` para animações vinculadas ao scroll
 * 5. ScrollReveal é otimizado e usa GSAP internamente
 *
 * VARIANTES DISPONÍVEIS:
 * - fadeIn: Simples fade in
 * - fadeInUp: Fade in de baixo para cima
 * - fadeInDown: Fade in de cima para baixo
 * - fadeInLeft: Fade in da esquerda
 * - fadeInRight: Fade in da direita
 * - scaleIn: Fade in com escala
 * - slideInLeft: Slide da esquerda (sem fade)
 * - slideInRight: Slide da direita (sem fade)
 */
