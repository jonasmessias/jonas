import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const textVariants = cva(" leading-normal p-0", {
  variants: {
    size: {
      xs: "text-xs",//12px
      sm: "text-sm",//14px
      md: "text-base",//16px
      lg: "text-lg",//18px
      xl: "text-xl",//20px
      huge: "text-2xl",//24px
      "huge-2": "text-[2rem]",//32px
      "huge-3": "text-4xl",
    },
    weight: {
      regular: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
      extraBold: "font-extrabold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  tag?: React.ElementType
  children?: React.ReactNode
  className?: string
}

const Text = ({
  size,
  weight,
  tag,
  children,
  className,
  ...props
}: TextProps) => {
  const Comp = tag ?? "p"

  return (
    <Comp 
      className={cn(textVariants({ size, weight }), className)} 
      {...props}
    >
      {children}
    </Comp>
  )
}

Text.displayName = "Text"

export { Text, textVariants }

