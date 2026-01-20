import { cn } from '@/utils/cn'
import { cva, VariantProps } from 'class-variance-authority'

const textVariants = cva('leading-normal p-0', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      huge: 'text-2xl',
      'huge-2': 'text-[2rem]',
      'huge-3': 'text-4xl',
    },
    weight: {
      regular: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extraBold: 'font-extrabold',
    },
    variant: {
      default: '',
      body: 'font-poppins',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
    variant: 'default',
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  tag?: React.ElementType
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'body'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'huge' | 'huge-2' | 'huge-3'
  weight?: 'regular' | 'semibold' | 'bold'
}

const Text = ({
  size,
  weight,
  tag,
  children,
  className,
  variant,
  ...props
}: TextProps) => {
  const Comp = tag ?? 'p'

  return (
    <Comp
      className={cn(textVariants({ variant, size, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

Text.displayName = 'Text'

export { Text, textVariants }
