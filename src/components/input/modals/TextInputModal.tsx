import { Dispatch, FC, HTMLAttributes, SetStateAction, useRef } from 'react'
import TextInput from '../TextInput'
import { H1, P } from '@components/Typography'
import { Button } from '@components/Button'
import { stopPropagation } from '@utils/functions'

interface TextInputModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
  description: string
  action: (name: string) => void
  actionString: string
}

const TextInputModal: FC<TextInputModalProps> = ({
  title,
  description,
  isOpen,
  setOpen,
  action,
  actionString,
  ...props
}) => {
  if (!isOpen) return null

  const inputRef = useRef<HTMLInputElement>(null)

  const closeModal = () => {
    setOpen(false)
  }

  const submit = () => {
    if (!inputRef.current?.value) throw new Error('Input ref not found.') // TODO: Handle error.
    action(inputRef.current.value)
    closeModal()
  }

  return (
    <div
      className='fixed top-0 left-0 z-10 h-screen w-screen backdrop-blur-sm flex items-center justify-center'
      role='dialog'
      aria-modal='true'
      {...props}
      onClick={() => setOpen(false)}
    >
      <div
        className='p-6 bg-bg-dark-white rounded-md shadow-lg'
        onClick={stopPropagation}
      >
        <H1 variant='dark' size='3xl'>
          {title}
        </H1>
        <P variant='gray' className='mb-4'>
          {description}
        </P>
        <TextInput
          ref={inputRef}
          className='w-full mb-4'
          placeholder='Category name...'
        />
        <div className='flex items-center justify-between gap-4'>
          <Button
            variant='outlined'
            className='w-full'
            size='lg'
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button className='w-full' size='lg' onClick={submit}>
            {actionString}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TextInputModal
