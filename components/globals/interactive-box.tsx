'use client'
import { ReactNode } from 'react'
import Line from './line'

interface InteractiveBoxProps {
  children?: ReactNode
  className?: string
  audioSrc?: string
  volume?: number
  showTop?: boolean
  showRight?: boolean
  showBottom?: boolean
  showLeft?: boolean
}

/**
 * InteractiveBox - Um componente que cria uma caixa com linhas interativas nos 4 lados
 *
 * Uso:
 * <InteractiveBox>
 *   <div>Seu conteúdo aqui</div>
 * </InteractiveBox>
 *
 * Props:
 * - showTop, showRight, showBottom, showLeft: controla quais linhas exibir (padrão: todas true)
 * - audioSrc: caminho para o arquivo de áudio
 * - volume: volume do áudio (0-1)
 * - className: classes adicionais para o container
 */
export default function InteractiveBox({
  children,
  className = '',
  audioSrc,
  volume,
  showTop = true,
  showRight = true,
  showBottom = true,
  showLeft = true,
}: InteractiveBoxProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Top Line */}
      {showTop && (
        <div className="absolute top-0 left-0 w-full z-30">
          <Line
            orientation="horizontal"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.1, duration: 1, from: 'left' }}
          />
        </div>
      )}

      {/* Right Line */}
      {showRight && (
        <div className="absolute top-0 right-0 h-full z-30">
          <Line
            orientation="vertical"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.2, duration: 1, from: 'top' }}
          />
        </div>
      )}

      {/* Bottom Line */}
      {showBottom && (
        <div className="absolute bottom-0 left-0 w-full z-30">
          <Line
            orientation="horizontal"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.3, duration: 1, from: 'right' }}
          />
        </div>
      )}

      {/* Left Line */}
      {showLeft && (
        <div className="absolute top-0 left-0 h-full z-30">
          <Line
            orientation="vertical"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.4, duration: 1, from: 'bottom' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  )
}
