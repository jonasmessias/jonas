interface DecorativeCornersProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'static' | 'hover'
  className?: string
}

const sizeMap = {
  sm: 'w-2 h-2 sm:w-3 sm:h-3',
  md: 'w-3 h-3 sm:w-4 sm:h-4',
  lg: 'w-4 h-4 sm:w-6 sm:h-6',
}

export const DecorativeCorners = ({
  size = 'md',
  variant = 'hover',
  className = '',
}: DecorativeCornersProps) => {
  const baseOpacity = variant === 'static' ? 'opacity-100' : 'opacity-0'
  const hoverOpacity = variant === 'hover' ? 'group-hover:opacity-100' : ''
  const opacityClasses = `${baseOpacity} ${hoverOpacity} transition-opacity`
  const sizeClasses = sizeMap[size]

  return (
    <>
      <div
        className={`absolute -top-1 -left-1 ${sizeClasses} border-t border-l border-primary ${opacityClasses} ${className}`}
      />
      <div
        className={`absolute -top-1 -right-1 ${sizeClasses} border-t border-r border-primary ${opacityClasses} ${className}`}
      />
      <div
        className={`absolute -bottom-1 -left-1 ${sizeClasses} border-b border-l border-primary ${opacityClasses} ${className}`}
      />
      <div
        className={`absolute -bottom-1 -right-1 ${sizeClasses} border-b border-r border-primary ${opacityClasses} ${className}`}
      />
    </>
  )
}
