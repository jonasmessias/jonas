/**
 * Sistema de Animações com Scroll
 *
 * Este módulo fornece componentes e hooks para criar animações
 * profissionais baseadas em scroll usando GSAP ScrollTrigger
 */

// Componentes
export { default as ParallaxSection } from './parallax-section'
export { default as ScrollFade } from './scroll-fade'
export { default as ScrollReveal } from './scroll-reveal'

// Hooks
export { useScrollAnimation } from '../../utils/animations/use-scroll-animation'
export type { ScrollAnimationVariant } from '../../utils/animations/use-scroll-animation'

// Re-exports dos componentes existentes para manter compatibilidade
export { default as AnimatedBackground } from './animated-background'
export { default as AnimatedElement } from './animated-element'
export { default as AnimatedText } from './animated-text'
export { default as AudioWaveform } from './audio-waveform'
