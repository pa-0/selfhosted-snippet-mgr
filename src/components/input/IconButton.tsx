import { cn } from '@utils/functions'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  className?: string
}

const IconButton: FC<IconButtonProps> = ({ className, icon, ...props }) => {
  return (
    <button
      className={cn(
        className,
        'cursor-pointer p-1 rounded-full hover:bg-bg-light-dark transition-colors'
      )}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
