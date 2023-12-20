import { Snippet } from '@utils/types'
import { Dispatch, FC, SetStateAction } from 'react'
import TextInput from './TextInput'
import TextArea from './TextArea'

interface EditorProps {
  snippet: Snippet | null
  setSnippet: Dispatch<SetStateAction<Snippet | null>>
  className?: string
}

const Editor: FC<EditorProps> = ({ className, snippet, setSnippet }) => {
  if (!snippet) return <div className={className}></div> // To keep the background color.

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnippet({ ...snippet, name: e.target.value })
  }

  const updateContent = (value: string) => {
    setSnippet({ ...snippet, content: value })
  }

  return (
    <div className={className}>
      <div className='mb-4 flex items-center justify-between'>
        <TextInput
          variant='transparent'
          className='w-full text-2xl'
          value={snippet.name}
          onChange={updateName}
        />
      </div>
      <TextArea
        className='bg-transparent [&.ace_gutter]:bg-transparent'
        value={snippet.content}
        onChange={updateContent}
      />
    </div>
  )
}

export default Editor
