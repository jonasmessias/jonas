import { Text } from '@/components/globals/text'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface SectionHeadingProps {
  no: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Consistent section heading: mono section number + short green rule + title,
 * with an optional supporting description.
 */
export const SectionHeading = ({
  no,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) => {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:gap-4',
        centered && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-primary tabular-nums">
          {no}
        </span>
        <span aria-hidden className="h-px w-8 bg-primary/50" />
        <Text
          tag="h2"
          size="huge-2"
          weight="bold"
          className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
        >
          {title}
        </Text>
      </div>
      {description && (
        <Text
          variant="body"
          size="lg"
          className={cn(
            'text-muted-foreground text-base sm:text-lg max-w-2xl',
            centered && 'mx-auto',
          )}
        >
          {description}
        </Text>
      )}
    </div>
  )
}
