'use client'
import Line from './line'

interface VerticalLineProps {
  audioSrc?: string
  volume?: number
}

export default function VerticalLine({ audioSrc, volume }: VerticalLineProps) {
  return <Line orientation="vertical" audioSrc={audioSrc} volume={volume} />
}
