import { cn } from '@utils/functions'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, ReactNode } from 'react'

const headingVariants = cva('font-bold text-xl text-lighter dark:text-dark', {
  variants: {
    variant: {
      light: 'text-text-lighter dark:text-text-lighter',
      gray: 'text-text-dark dark:text-text-dark',
      dark: 'text-text-darker dark:text-text-darker',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
  defaultVariants: {
    variant: 'light',
    size: 'xl',
  },
})

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  children: ReactNode
  className?: string
}

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof headingVariants> {
  children: ReactNode
  className?: string
}

export const H1: FC<HeadingProps> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => (
  <h1 className={cn(headingVariants({ size, variant, className }))} {...props}>
    {children}
  </h1>
)

export const H2: FC<HeadingProps> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => (
  <h2 className={cn(headingVariants({ size, variant, className }))} {...props}>
    {children}
  </h2>
)

export const P: FC<ParagraphProps> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => (
  <p className={cn(headingVariants({ size, variant, className }))} {...props}>
    {children}
  </p>
)
