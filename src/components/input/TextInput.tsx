import { cn } from '@utils/functions'
import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes, forwardRef } from 'react'

const textInputVariants = cva('outline-none rounded-md text-text-darker', {
  variants: {
    variant: {
      bubble: 'p-4 border-[1px] border-text-light bg-bg-light-white',
      transparent: 'bg-transparent text-text-lighter',
    },
  },
  defaultVariants: {
    variant: 'bubble',
  },
})

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(textInputVariants({ variant, className }))}
        type='text'
        {...props}
      />
    )
  }
)

export default TextInput
