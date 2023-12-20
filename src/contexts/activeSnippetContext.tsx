import { Snippet } from '@utils/types'
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import useDebounce from '../hooks/useDebounce'
import useStorage from '@hooks/useStorage'

interface ActiveSnippetContextProps {
  activeSnippet: Snippet | null
  setActiveSnippet: Dispatch<SetStateAction<Snippet | null>>
}

interface ActiveSnippetProviderProps {
  children: ReactNode
}

const ActiveSnippetContext = createContext<
  ActiveSnippetContextProps | undefined
>(undefined)

export const ActiveSnippetContextProvider: FC<ActiveSnippetProviderProps> = ({
  children,
}) => {
  const { saveSnippet } = useStorage()

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null)

  const save = (snippet: Snippet | null) => {
    if (!snippet) return
    saveSnippet(snippet)
  }

  useEffect(
    useDebounce({
      func: () => save(activeSnippet),
      timeout: 1000,
    }),
    [activeSnippet]
  )

  return (
    <ActiveSnippetContext.Provider value={{ activeSnippet, setActiveSnippet }}>
      {children}
    </ActiveSnippetContext.Provider>
  )
}

export const useActiveSnippet = (): ActiveSnippetContextProps => {
  const context = useContext(ActiveSnippetContext)
  if (!context) {
    throw new Error(
      'useActiveSnippet must be used within a ActiveSnippetProvider'
    )
  }
  return context
}
