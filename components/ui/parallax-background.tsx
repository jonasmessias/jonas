import { GSAPParallax } from '@/components/animations/gsap-animations'

const gradients = [
  {
    speed: -0.25,
    className:
      'absolute top-0 right-0 w-[520px] h-[520px] bg-gradient-to-bl from-primary/25 via-primary/5 to-transparent blur-3xl',
  },
  {
    speed: -0.4,
    className:
      'absolute bottom-0 left-0 w-[440px] h-[440px] bg-gradient-to-tr from-accent/15 via-transparent to-transparent blur-3xl',
  },
]

export const ParallaxBackground = () => {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 opacity-70 dark:opacity-60"
      style={{
        maskImage:
          'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
      }}
    >
      {gradients.map((gradient, index) => (
        <GSAPParallax key={index} speed={gradient.speed}>
          <div className={gradient.className} />
        </GSAPParallax>
      ))}
    </div>
  )
}
