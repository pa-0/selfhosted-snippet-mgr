import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@utils/functions'

const buttonVariants = cva(
  'rounded-md inline-flex items-center justify-center gap-2 text-md font-bold transition-all disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        contained: 'bg-bg-light-dark text-text-lighter hover:bg-bg-light-light',
        outlined:
          'bg-transparent text-text-darker border border-bg-light-light hover:text-text-lighter hover:bg-bg-light-light',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
        xl: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ size, variant, className }))}
        {...props}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </button>
    )
  }
)

export { Button, buttonVariants }
