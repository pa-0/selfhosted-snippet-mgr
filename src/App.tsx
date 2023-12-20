import { Route, Routes } from 'react-router-dom'
import EditorPage from '@pages/EditorPage'
import { ActiveSnippetContextProvider } from './contexts/activeSnippetContext'
import HomePage from '@pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/editor'
        element={
          <ActiveSnippetContextProvider>
            <EditorPage />
          </ActiveSnippetContextProvider>
        }
      />
    </Routes>
  )
}

export default App
