import { GSAPParallax } from '@/components/animations/gsap-animations'

const gradients = [
  {
    speed: -0.3,
    className:
      'absolute inset-0 min-h-screen w-full bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-transparent dark:from-primary/50 dark:via-primary/25',
  },
  {
    speed: -0.2,
    className:
      'absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-400/50 via-purple-400/30 to-transparent dark:from-primary/60 dark:via-primary/25 blur-3xl',
  },
  {
    speed: -0.4,
    className:
      'absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/40 via-cyan-400/20 to-transparent dark:from-primary/40 dark:via-primary/15 blur-3xl',
  },
  {
    speed: -0.25,
    className:
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-violet-400/35 to-transparent dark:via-primary/20 blur-2xl',
  },
  {
    speed: -0.15,
    className:
      'absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-400/35 via-transparent to-transparent dark:from-primary/30 blur-3xl',
  },
]

export const ParallaxBackground = () => {
  return (
    <div
      className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
      style={{
        maskImage:
          'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
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
