import SideNav from '@components/navigation/SideNav/SideNav'
import { FC } from 'react'
import { useActiveSnippet } from '@contexts/activeSnippetContext'
import Editor from '@components/input/Editor'

const EditorPage: FC = () => {
  const { activeSnippet, setActiveSnippet } = useActiveSnippet()

  return (
    <main className='h-screen grid grid-cols-[300px_auto]'>
      <SideNav className='bg-bg-light-light dark:bg-bg-dark-light' />
      <Editor
        className='p-4 bg-bg-light-dark dark:bg-bg-dark-dark'
        snippet={activeSnippet}
        setSnippet={setActiveSnippet}
      />
    </main>
  )
}

export default EditorPage
