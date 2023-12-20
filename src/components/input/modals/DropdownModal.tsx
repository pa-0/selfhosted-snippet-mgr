import { stopPropagation } from '@utils/functions'
import { ModalOption } from '@utils/types'
import { FC, HTMLAttributes } from 'react'

interface DropdownModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  options: ModalOption[]
  close: () => void
  category: string | null
}

const DropdownModal: FC<DropdownModalProps> = ({
  isOpen,
  options,
  close,
  category,
  ...props
}) => {
  if (!isOpen) return null

  return (
    <>
      <div
        className='fixed z-10 top-0 left-0 h-screen w-screen'
        onClick={close}
      ></div>
      <div
        className='absolute z-20 bg-bg-light-black dark:bg-bg-dark-white rounded-md shadow-lg'
        role='dialog'
        aria-modal='true'
        {...props}
        onClick={stopPropagation}
      >
        <ul className='w-max'>
          {options.map((option) => (
            <li
              key={option.name}
              className='cursor-pointer p-4 w-full first:rounded-t-md last:rounded-b-md text-text-lighter hover:bg-bg-dark-lighter dark:text-text-darker border-b-[1px] last:border-b-[0px] border-bg-light-dark dark:border-bg-dark-light'
              onClick={() => option.onClick(category || '')}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default DropdownModal
